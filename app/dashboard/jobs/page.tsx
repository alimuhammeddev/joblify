"use client";

import { Search, MapPin, Wallet, Bookmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getUserActivity, toggleSavedJob } from "@/lib/userActivity";
import { formatPostedAt, isJobOpen, mapJob, sortJobsByNewestFirst, type Job } from "@/lib/jobs";
import { useExternalJobs } from "@/lib/useExternalJobs";
import Toast from "@/components/Toast";

const formatSalary = (salary: string) =>
  salary.replace(/\d{4,}/g, (num) => Number(num).toLocaleString("en-US"));

export default function Jobs() {
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [jobsError, setJobsError] = useState(false);
  const {
    jobs: externalJobs,
    error: externalJobsError,
    warnings: externalJobsWarnings,
  } = useExternalJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState("");
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const user = auth.currentUser;
    return user ? getUserActivity(user.uid).savedJobIds : [];
  });

  useEffect(() => {
    return onSnapshot(
      collection(db, "jobs"),
      (snapshot) => {
        const jobs: Job[] = snapshot.docs.map(mapJob).filter(isJobOpen);
        setPostedJobs(sortJobsByNewestFirst(jobs));
        setJobsError(false);
      },
      (error) => {
        console.error("Unable to load jobs:", error);
        setJobsError(true);
      },
    );
  }, []);

  const availableJobs = sortJobsByNewestFirst([...postedJobs, ...externalJobs]).filter((job) =>
    [
      job.title,
      job.company,
      job.location,
      job.type,
      job.salary,
      job.description,
      job.responsibilities,
      job.requirements,
    ].some((value) => value.toLowerCase().includes(activeSearchTerm)),
  );
  const pageSize = 30;
  const pageCount = Math.max(1, Math.ceil(availableJobs.length / pageSize));
  const visibleJobs = availableJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div>
        <div className="mb-5">
          <h1 className="text-xl md:text-2xl font-bold text-[#1F3064]">Jobs</h1>
          {jobsError && (
            <p className="mt-2 text-sm text-red-600">
              Jobs could not be loaded. Please try again later.
            </p>
          )}
          {externalJobsError && (
            <p className="mt-2 text-sm text-slate-500">
              External jobs are temporarily unavailable. Showing Joblify jobs.
            </p>
          )}
          {externalJobsWarnings.length > 0 && (
            <p className="mt-2 text-sm text-slate-500">
              Some external job sources could not be loaded: {externalJobsWarnings.join(", ")}.
            </p>
          )}
        </div>

        <form
          className="bg-white rounded-2xl p-4 border border-gray-100 mb-8"
          onSubmit={(event) => {
            event.preventDefault();
            setActiveSearchTerm(searchTerm.trim().toLowerCase());
            setCurrentPage(1);
          }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search jobs"
                className="w-full outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1F3064] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Search Jobs
            </button>
          </div>
        </form>

        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleJobs.map((job) => (
              <div
                key={job.id}
                className="group flex min-h-71.25 flex-col rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {formatPostedAt(job)}
                    </p>
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight text-[#1F3064]">
                      {job.title}
                    </h3>
                    <p className="mt-2 truncate text-sm font-semibold text-slate-500">
                      {job.company}
                    </p>
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
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const user = auth.currentUser;
                        if (!user) return;

                        const isSaved = toggleSavedJob(user.uid, String(job.id));
                        setToast(isSaved ? "Job saved." : "Job removed from saved jobs.");
                        setSavedJobIds((currentIds) =>
                          isSaved
                            ? [...currentIds, String(job.id)]
                            : currentIds.filter((id) => id !== String(job.id)),
                        );
                      }}
                      className={`transition cursor-pointer ${
                        savedJobIds.includes(String(job.id))
                          ? "text-[#F0802D]"
                          : "text-gray-400 hover:text-[#F0802D]"
                      }`}
                      aria-label={`${savedJobIds.includes(String(job.id)) ? "Remove" : "Save"} ${job.title}`}
                    >
                      <Bookmark
                        size={20}
                        fill={
                          savedJobIds.includes(String(job.id))
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <span className="rounded-full bg-[#1f3064] px-3 py-1.5 text-xs font-bold text-white">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="mt-6 mb-4 space-y-3 text-sm text-slate-500">
                  <div className="flex items-center gap-3">
                    <MapPin size={17} className="shrink-0 text-[#F0802D]" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Wallet size={17} className="shrink-0 text-[#F0802D]" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                </div>

                {job.applicationUrl ? (
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1F3064] py-3 text-sm font-bold text-white"
                  >
                    Apply now
                  </a>
                ) : (
                  <Link
                    href={`/dashboard/job-details?jobId=${job.id}`}
                    className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1F3064] py-3 text-sm font-bold text-white"
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            ))}
          </div>
          {availableJobs.length === 0 && (
            <p className="py-12 text-center text-sm text-gray-500">
              No jobs found. Try a different search.
            </p>
          )}
        </div>
        {pageCount > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-[#1F3064] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-slate-500">
              Page {currentPage} of {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
              disabled={currentPage === pageCount}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-[#1F3064] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Toast message={toast} onClose={() => setToast("")} />
    </section>
  );
}
