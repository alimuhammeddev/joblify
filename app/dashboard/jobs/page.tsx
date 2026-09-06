"use client";

import { Search, MapPin, Wallet, Bookmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getUserActivity, toggleSavedJob } from "@/lib/userActivity";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
};

export default function Jobs() {
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [jobsError, setJobsError] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const user = auth.currentUser;
    return user ? getUserActivity(user.uid).savedJobIds : [];
  });

  useEffect(() => {
    return onSnapshot(
      collection(db, "jobs"),
      (snapshot) => {
        const jobs: Job[] = snapshot.docs.map((job) => {
          const data = job.data();

          return {
            id: job.id,
            title: String(data.title || "Untitled job"),
            company: String(data.companyName || "Company"),
            location: String(data.location || "Location not specified"),
            type: String(data.type || "Not specified"),
            salary: `${data.minimumSalary || "-"} - ${data.maximumSalary || "-"}`,
          };
        });
        setPostedJobs(jobs);
        setJobsError(false);
      },
      (error) => {
        console.error("Unable to load jobs:", error);
        setJobsError(true);
      },
    );
  }, []);

  const availableJobs = postedJobs;

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
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                className="w-full outline-none text-sm"
              />
            </div>
            <button className="bg-[#1F3064] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
              Search Jobs
            </button>
          </div>
        </div>

        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableJobs.map((job) => (
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

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const user = auth.currentUser;
                        if (!user) return;

                        const isSaved = toggleSavedJob(
                          user.uid,
                          String(job.id),
                          job.title,
                        );
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

                    <span className="text-xs bg-[#F0802D]/10 text-[#F0802D] px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
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

                <Link href={`/dashboard/job-details?jobId=${job.id}`}>
                  <button className="mt-6 w-full cursor-pointer bg-[#1F3064] text-white py-2 rounded-lg hover:bg-[#16254d] transition">
                    Apply Now
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 border cursor-pointer border-[#1F3064] text-[#1F3064] rounded-lg hover:bg-[#1F3064] hover:text-white transition">
              View More Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
