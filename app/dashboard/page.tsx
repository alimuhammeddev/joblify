"use client";

import { Briefcase, Bookmark, MapPin, Wallet } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { getUserActivity, type UserActivity } from "@/lib/userActivity";
import { db } from "@/lib/firebase";
import { mapJob, type Job } from "@/lib/jobs";

export default function Dashboard() {
  const [displayName, setDisplayName] = useState("User");
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setDisplayName(user?.displayName || "User");
      setUserActivity(user ? getUserActivity(user.uid) : null);
    });
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "jobs"), (snapshot) => {
      setPostedJobs(snapshot.docs.map(mapJob));
    });
  }, []);

  const dashboardJobs = postedJobs;

  const dashboardStats = {
    appliedJobs: String(userActivity?.appliedJobIds.length || 0),
    savedJobs: String(userActivity?.savedJobIds.length || 0),
  };
  const activities = userActivity?.recentActivities || [];
  const hasApplications = Boolean(userActivity?.appliedJobIds.length);

  const analyticsData = hasApplications
    ? [
        { label: "Applied", value: "100%", color: "bg-[#1F3064]" },
        { label: "Interviewing", value: "0%", color: "bg-[#F0802D]" },
        { label: "Shortlisted", value: "0%", color: "bg-[#4F8A70]" },
        { label: "Rejected", value: "0%", color: "bg-[#D9DEE8]" },
      ]
    : [
        { label: "Applied", value: "0%", color: "bg-[#1F3064]" },
        { label: "Interviewing", value: "0%", color: "bg-[#F0802D]" },
        { label: "Shortlisted", value: "0%", color: "bg-[#4F8A70]" },
        { label: "Rejected", value: "0%", color: "bg-[#D9DEE8]" },
      ];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-8">
        <p className="text-sm text-gray-500">Welcome back</p>
        <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
          {displayName}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 mb-8">
        {[
          {
            label: "Applied Jobs",
            value: dashboardStats.appliedJobs,
            icon: Briefcase,
          },
          {
            label: "Saved Jobs",
            value: dashboardStats.savedJobs,
            icon: Bookmark,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <item.icon className="w-6 h-6 text-[#1F3064]" />
              <span className="text-2xl font-bold text-[#1F3064]">
                {item.value}
              </span>
            </div>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1F3064]">
              Recommended Jobs
            </h2>
            <Link
              href="/dashboard/jobs"
              className="text-sm text-[#1F3064] font-medium"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {dashboardJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">{job.company}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#F0802D]" />{" "}
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-[#F0802D]" />{" "}
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wallet className="w-4 h-4 text-[#F0802D]" />{" "}
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  <Link href={`/dashboard/job-details?jobId=${job.id}`}>
                    <button className="bg-[#1F3064] text-white px-5 py-2 rounded-xl text-sm font-medium">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1F3064] mb-4">
              Recent Activity
            </h2>
            {activities.length === 0 ? (
              <p className="text-sm text-gray-500">No recent activity yet.</p>
            ) : (
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-600 border-b pb-2 last:border-none"
                  >
                    {activity}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#1F3064]">
                Application Analytics
              </h2>
              <span className="text-xs font-medium text-gray-400">
                This month
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div
                className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: hasApplications
                    ? "conic-gradient(#1F3064 0 100%, #F0802D 100% 100%, #4F8A70 100% 100%, #D9DEE8 100% 100%)"
                    : "#D9DEE8",
                }}
                role="img"
                aria-label={
                  hasApplications
                    ? "Application analytics: 100 percent applied"
                    : "Application analytics: no applications yet"
                }
              >
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-bold text-[#1F3064]">
                    {dashboardStats.appliedJobs}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    applications
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                {analyticsData.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-gray-600">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="font-semibold text-[#1F3064]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
