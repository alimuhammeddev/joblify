"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/lib/jobs";

function isExternalJob(value: unknown): value is Job {
  if (typeof value !== "object" || value === null) return false;
  const job = value as Record<string, unknown>;

  return (
    typeof job.id === "string"
    && typeof job.source === "string"
    && typeof job.applicationUrl === "string"
    && typeof job.company === "string"
    && typeof job.title === "string"
    && typeof job.location === "string"
    && typeof job.type === "string"
    && typeof job.salary === "string"
  );
}

export function useExternalJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/external-jobs", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`External job listings request failed (${response.status}).`);
        }

        const payload: unknown = await response.json();
        if (
          typeof payload !== "object"
          || payload === null
          || !("jobs" in payload)
          || !Array.isArray(payload.jobs)
        ) {
          throw new Error("External job listings response was invalid.");
        }

        setJobs(payload.jobs.filter(isExternalJob));
        setWarnings(
          "warnings" in payload && Array.isArray(payload.warnings)
            ? payload.warnings.filter((warning): warning is string => typeof warning === "string")
            : [],
        );
      })
      .catch((requestError: unknown) => {
        if (controller.signal.aborted) return;
        console.error("Unable to load external job listings:", requestError);
        setWarnings([]);
        setError(true);
      });

    return () => controller.abort();
  }, []);

  return { jobs, error, warnings };
}
