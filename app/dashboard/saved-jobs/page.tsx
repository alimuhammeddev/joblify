"use client";

import { MapPin, Wallet, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { getUserActivity, toggleSavedJob } from "@/lib/userActivity";

type SavedJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
};

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);

  useEffect(() => {
    let unsubscribeJobs = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeJobs();

      if (!user) {
        setSavedJobs([]);
        return;
      }

      unsubscribeJobs = onSnapshot(collection(db, "jobs"), (snapshot) => {
        const savedJobIds = getUserActivity(user.uid).savedJobIds;
        setSavedJobs(
          snapshot.docs
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

      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center text-gray-500">
          You have not saved any jobs yet.
        </div>
      ) : (
        <div className="grid gap-6">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-[#1F3064]">
                    {job.title}
                  </h2>

                  <span className="text-xs bg-[#F0802D]/10 text-[#F0802D] px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{job.company}</p>

                <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#F0802D]" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wallet size={16} className="text-[#F0802D]" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/dashboard/job-details?jobId=${job.id}`}>
                <button className="bg-[#1F3064] text-white px-5 py-2 rounded-lg hover:bg-[#16254d] transition cursor-pointer">
                  Apply Now
                </button>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const user = auth.currentUser;
                    if (!user) return;

                    toggleSavedJob(user.uid, job.id, job.title);
                    setSavedJobs((currentJobs) =>
                      currentJobs.filter((currentJob) => currentJob.id !== job.id),
                    );
                  }}
                  className="flex items-center justify-center gap-2 border border-red-200 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition cursor-pointer"
                >
                  <Trash2 size={16} />
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