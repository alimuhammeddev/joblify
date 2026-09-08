"use client";

import {
  BriefcaseBusiness,
  MapPin,
  Search,
  Sparkles,
  Wallet,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { formatPostedAt, isJobOpen, mapJob, sortJobsByNewestFirst, type Job } from "@/lib/jobs";

export default function LatestJob() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(Boolean(user));
    });

    return unsubscribe;
  }, []);

  useEffect(
    () =>
      onSnapshot(collection(db, "jobs"), (snapshot) => {
        const jobs = snapshot.docs.map(mapJob).filter(isJobOpen);
        setJobs(sortJobsByNewestFirst(jobs));
      }),
    [],
  );

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredJobs = jobs.filter((job) =>
    [job.title, job.company, job.location, job.type].some((value) =>
      value.toLowerCase().includes(normalizedSearchTerm),
    ),
  );

  const handleApplyNow = (job: Job) => {
    if (isLoggedIn) {
      router.push(`/dashboard/job-details?jobId=${job.id}`);
      return;
    }

    router.push("/login");
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F0802D]">
              Find your next job
            </p>
            <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#1F3064] md:text-4xl">
              Work that moves
              <span className="text-[#F0802D]"> you forward.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Browse fresh opportunities from ambitious teams and find a role
              that fits the way you want to grow.
            </p>
          </div>
        </div>

        <div className="mb-10 p-3 sm:p-4">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, company, location, or type..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search jobs"
              className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-11 pr-4 text-sm text-[#1F3064] outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-[#F0802D]"
            />
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F0802D]">
              Featured opportunities
            </p>
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="text-sm font-bold text-[#1F3064] underline decoration-[#F0802D] underline-offset-4 cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group flex min-h-71.25 flex-col rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {formatPostedAt(job)}
                  </p>
                  <h3 className="line-clamp-2 text-xl font-extrabold leading-tight text-[#1F3064]">
                    {job.title}
                  </h3>
                  <p className="mt-2 truncate text-sm font-semibold text-slate-500">
                    {job.company}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#1f3064] px-3 py-1.5 text-xs font-bold text-white">
                  {job.type}
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-3">
                  <MapPin size={17} className="shrink-0 text-[#F0802D]" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Wallet size={17} className="shrink-0 text-[#F0802D]" />
                  <span>{job.salary}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleApplyNow(job)}
                className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1F3064] py-3 text-sm font-bold text-white"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <BriefcaseBusiness className="mx-auto text-slate-300" size={34} />
            <p className="mt-4 font-bold text-[#1F3064]">No roles found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try a different search or check back soon for new opportunities.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
