"use client";

import { MapPin, Wallet } from "lucide-react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { mapJob, type Job } from "@/lib/jobs";

export default function RecentJob() {
  const [jobs, setJobs] = useState<Job[]>([]);

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
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-[#1F3064]">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
              <span className="text-xs bg-[#F0802D]/10 text-[#F0802D] px-3 py-1 rounded-full">
                {job.type}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#F0802D]" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Wallet size={16} className="text-[#F0802D]" />
                <span>{job.salary}</span>
              </div>
            </div>

            <button className="mt-6 w-full cursor-pointer bg-[#1F3064] text-white py-2 rounded-lg hover:bg-[#16254d] transition">
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
