"use client";

import { MapPin, Wallet } from "lucide-react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { formatPostedAt, mapJob, type Job } from "@/lib/jobs";

export default function RecentJob() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(Boolean(user));
    });

    return unsubscribe;
  }, []);

  useEffect(() => onSnapshot(collection(db, "jobs"), (snapshot) => {
    setJobs(
      snapshot.docs
        .map(mapJob)
        .sort((firstJob, secondJob) => {
          const firstTime = firstJob.postedAt?.toDate().getTime() || 0;
          const secondTime = secondJob.postedAt?.toDate().getTime() || 0;
          return secondTime - firstTime;
        })
        .slice(0, 3),
    );
  }), []);

  const handleApplyNow = (job: Job) => {
    if (isLoggedIn) {
      router.push(`/dashboard/job-details?jobId=${job.id}`);
      return;
    }

    router.push("/login");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 mt-20 mb-16">
      <div className="flex flex-col items-center mb-12">
        <p className="lg:text-xl font-semibold text-[#1F3064]">Latest Jobs</p>
        <div className="w-28 h-0.5 bg-[#F0802D] mt-2"></div>
        <p className="text-gray-500 mt-2 text-center max-w-2xl">
          Explore the latest job opportunities across various industries and
          locations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
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

      <div className="flex justify-center mt-10">
        <Link href="/jobs">
          <button className="px-6 py-2 border cursor-pointer border-[#1F3064] text-[#1F3064] rounded-lg hover:bg-[#1F3064] hover:text-white transition">
            View More Jobs
          </button>
        </Link>
      </div>
    </section>
  );
}
