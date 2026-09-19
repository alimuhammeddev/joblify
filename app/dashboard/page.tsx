"use client";

import {
  Briefcase,
  Bookmark,
  CheckCircle2,
  MapPin,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { getUserActivity, type UserActivity } from "@/lib/userActivity";
import { db } from "@/lib/firebase";
import { isJobOpen, mapJob, sortJobsByNewestFirst, type Job } from "@/lib/jobs";

const formatSalary = (salary: string) =>
  salary.replace(/\d{4,}/g, (num) => Number(num).toLocaleString("en-US"));

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
      const jobs = snapshot.docs.map(mapJob).filter(isJobOpen);
      setPostedJobs(sortJobsByNewestFirst(jobs));
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
      <div className="mb-8 border-l-4 border-[#F0802D] pl-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0802D]">
          Dashboard overview
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#1F3064] md:text-3xl">
          Welcome back, <span className="text-[#F0802D]">{displayName}</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Keep moving toward your next opportunity.
        </p>
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
            className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100"
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
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
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
                className="border border-gray-100 rounded-2xl p-5 transition"
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
                        {formatSalary(job.salary)}
                      </span>
                    </div>
                  </div>

                  <Link href={`/dashboard/job-details?jobId=${job.id}`}>
                    <button className="bg-[#1F3064] text-white px-5 py-2 rounded-xl text-sm font-medium cursor-pointer">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[#1F3064]">
                  Recent Activity
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Your latest account updates
                </p>
              </div>
              {activities.length > 0 && (
                <span className="rounded-full bg-[#FDE6D5] px-2.5 py-1 text-xs font-bold text-[#F0802D]">
                  {activities.length}
                </span>
              )}
            </div>
            {activities.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center">
                <p className="text-sm font-medium text-gray-600">
                  No recent activity yet.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Your job updates will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 transition hover:border-[#FDE6D5] hover:bg-[#FFF9F5]"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FDE6D5] text-[#F0802D]">
                      <CheckCircle2 size={15} />
                    </span>
                    <p className="min-w-0 text-sm leading-6 text-gray-600">
                      {activity}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#1F3064]">
                Application Analytics
              </h2>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-[#F4F6FB] px-5 py-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1F3064] text-white">
                <Briefcase className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <p className="text-2xl font-extrabold leading-none text-[#1F3064]">
                  {dashboardStats.appliedJobs}
                </p>
                <p className="mt-1.5 text-sm text-gray-500">
                  {hasApplications
                    ? Number(dashboardStats.appliedJobs) === 1
                      ? "Job applied to"
                      : "Jobs applied to"
                    : "No applications yet"}
                </p>
              </div>
            </div>

            {!hasApplications && (
              <p className="mt-3 text-xs text-gray-400">
                Apply to a job and your count will show up here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
