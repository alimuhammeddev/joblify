"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/lib/jobs";

const externalJobsCacheKey = "joblify:external-jobs:v1";

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

function readCachedJobs() {
  try {
    const cachedValue = window.localStorage.getItem(externalJobsCacheKey);
    if (!cachedValue) return null;

    const cached: unknown = JSON.parse(cachedValue);
    if (
      typeof cached !== "object"
      || cached === null
      || !("jobs" in cached)
      || !Array.isArray(cached.jobs)
    ) {
      return null;
    }

    return {
      jobs: cached.jobs.filter(isExternalJob),
      warnings: "warnings" in cached && Array.isArray(cached.warnings)
        ? cached.warnings.filter((warning): warning is string => typeof warning === "string")
        : [],
    };
  } catch (cacheError: unknown) {
    console.error("Unable to read cached external job listings:", cacheError);
    return null;
  }
}

export function useExternalJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const cached = readCachedJobs();

    if (cached) {
      setJobs(cached.jobs);
      setWarnings(cached.warnings);
    }

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

        const freshJobs = payload.jobs.filter(isExternalJob);
        const freshWarnings =
          "warnings" in payload && Array.isArray(payload.warnings)
            ? payload.warnings.filter((warning): warning is string => typeof warning === "string")
            : [];
        setJobs(freshJobs);
        setWarnings(freshWarnings);
        setError(false);

        try {
          window.localStorage.setItem(
            externalJobsCacheKey,
            JSON.stringify({ jobs: freshJobs, warnings: freshWarnings }),
          );
        } catch (cacheError: unknown) {
          console.error("Unable to cache external job listings:", cacheError);
        }
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
