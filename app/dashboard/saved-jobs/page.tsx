"use client";

import { ArrowRight, MapPin, Wallet, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { getUserActivity, toggleSavedJob } from "@/lib/userActivity";
import { isJobOpen, type Job } from "@/lib/jobs";
import { useExternalJobs } from "@/lib/useExternalJobs";

type SavedJob = {
  id: string;
  source?: string;
  sourceUrl?: string;
  applicationUrl?: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
};

const formatSalary = (salary: string) =>
  salary.replace(/\d{4,}/g, (num) => Number(num).toLocaleString("en-US"));

export default function SavedJobs() {
  const [savedInternalJobs, setSavedInternalJobs] = useState<SavedJob[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const user = auth.currentUser;
    return user ? getUserActivity(user.uid).savedJobIds : [];
  });
  const {
    jobs: externalJobs,
    error: externalJobsError,
    warnings: externalJobsWarnings,
  } = useExternalJobs();

  useEffect(() => {
    let unsubscribeJobs = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeJobs();

      if (!user) {
        setSavedInternalJobs([]);
        setSavedJobIds([]);
        return;
      }

      setSavedJobIds(getUserActivity(user.uid).savedJobIds);
      unsubscribeJobs = onSnapshot(collection(db, "jobs"), (snapshot) => {
        const savedJobIds = getUserActivity(user.uid).savedJobIds;
        setSavedInternalJobs(
          snapshot.docs
            .filter((job) => isJobOpen({ status: String(job.data().status || "Open") }))
            .filter((job) => savedJobIds.includes(job.id))
            .map((job) => {
              const data = job.data();
              return {
                id: job.id,
                title: String(data.title || "Untitled job"),
                company: String(data.companyName || "Company"),
                location: String(data.location || "Location not specified"),
                type: String(data.type || "Not specified"),
                salary: `${data.minimumSalary || "-"} - ${data.maximumSalary || "-"}`,
              };
            }),
        );
      });
    });

    return () => {
      unsubscribeJobs();
      unsubscribeAuth();
    };
  }, []);

  const savedExternalJobs: SavedJob[] = externalJobs
    .filter((job) => savedJobIds.includes(job.id) && isJobOpen(job))
    .map((job: Job) => ({
      id: job.id,
      source: job.source,
      sourceUrl: job.sourceUrl,
      applicationUrl: job.applicationUrl,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
    }));
  const savedJobs = [...savedInternalJobs, ...savedExternalJobs];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#1F3064]">
          Saved Jobs
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage jobs you bookmarked for later applications
        </p>
      </div>

      {externalJobsError && (
        <p className="mb-4 text-sm text-slate-500">
          External saved jobs are temporarily unavailable.
        </p>
      )}
      {externalJobsWarnings.length > 0 && (
        <p className="mb-4 text-sm text-slate-500">
          Some external job sources could not be loaded: {externalJobsWarnings.join(", ")}.
        </p>
      )}

      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center text-gray-500">
          You have not saved any jobs yet.
        </div>
      ) : (
        <div className="grid gap-6">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-6 shadow-xs"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-[#1F3064]">
                    {job.title}
                  </h2>

                  <span className="text-xs bg-[#1f3064] text-white px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{job.company}</p>
                {job.source && job.applicationUrl && (
                  <a
                    href={job.sourceUrl || job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-slate-400 underline underline-offset-2"
                  >
                    {job.source === "YubHub" ? "Data by YubHub" : `Source: ${job.source}`}
                  </a>
                )}

                <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#F0802D]" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wallet size={16} className="text-[#F0802D]" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                {job.applicationUrl ? (
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3064] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#16254d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2 sm:min-w-36"
                  >
                    Apply now
                    <ArrowRight size={17} />
                  </a>
                ) : (
                  <Link
                    href={`/dashboard/job-details?jobId=${job.id}`}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3064] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#16254d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2 sm:min-w-36"
                  >
                    Apply Now
                    <ArrowRight size={17} />
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const user = auth.currentUser;
                    if (!user) return;

                    toggleSavedJob(user.uid, job.id);
                    setSavedJobIds(getUserActivity(user.uid).savedJobIds);
                    setSavedInternalJobs((currentJobs) =>
                      currentJobs.filter((currentJob) => currentJob.id !== job.id),
                    );
                  }}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 cursor-pointer sm:min-w-36"
                >
                  <Trash2 size={17} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </section>
  );
};