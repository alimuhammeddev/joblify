"use client";

import {
  Users,
  Briefcase,
  CheckCircle2,
  MapPin,
  Clock,
  Building2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type CompanyJob = {
  id: string;
  title: string;
  applicants: number;
  location: string;
  type: string;
  postedAt?: { toDate: () => Date };
};

export default function CompanyDashboard() {
  const [companyName, setCompanyName] = useState("Company");
  const [jobs, setJobs] = useState<CompanyJob[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCompanyName(user?.displayName || "Company");

      if (!user) {
        setJobs([]);
        return;
      }

      const jobsQuery = query(
        collection(db, "jobs"),
        where("companyId", "==", user.uid),
      );

      return onSnapshot(
        jobsQuery,
        (snapshot) => {
          setJobs(
            snapshot.docs.map((job) => {
              const data = job.data();

              return {
                id: job.id,
                title: data.title || "Untitled job",
                applicants: data.applicantCount || 0,
                location: data.location || "Location not specified",
                type: data.type || "Not specified",
                postedAt: data.postedAt,
              };
            }),
          );
        },
        (error) => {
          console.error("Unable to load company jobs:", error);
          setJobs([]);
        },
      );
    });
  }, []);

  const totalApplicants = jobs.reduce(
    (total, job) => total + job.applicants,
    0,
  );

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="border-l-4 border-[#F0802D] pl-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0802D]">
            Company overview
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#1F3064] md:text-3xl">
            Welcome back, <span className="text-[#F0802D]">{companyName}</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Keep your hiring moving with confidence.
          </p>
        </div>

        <Link
          href="/company-dashboard/posted-job"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3064] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#16254d] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2 sm:w-auto"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
            <Plus size={16} />
          </span>
          Post New Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 mb-8">
        {[
          { label: "Posted Jobs", value: jobs.length, icon: Briefcase },
          { label: "Total Applicants", value: totalApplicants, icon: Users },
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active Job Listings */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1F3064]">
              Active Job Listings
            </h2>

            <Link
              href="/company-dashboard/posted-job"
              className="text-sm text-[#1F3064] font-medium"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-100 rounded-2xl p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-[#F0802D]" />
                      <h3 className="font-semibold text-lg text-gray-800">
                        {job.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500">
                      {job.applicants} Applicants
                    </p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#F0802D]" />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-[#F0802D]" />
                        {job.type}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#F0802D]" />
                        {job.postedAt
                          ? job.postedAt.toDate().toLocaleDateString()
                          : "Recently"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="border border-[#1F3064] text-[#1F3064] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1F3064] hover:text-white transition">
                      View Applicants
                    </button>

                    <button className="bg-[#1F3064] text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
                      Edit Job
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-500">
                No jobs posted yet.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[#1F3064]">
                  Recent Activity
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Your latest company updates
                </p>
              </div>
              {jobs.length > 0 && (
                <span className="rounded-full bg-[#FDE6D5] px-2.5 py-1 text-xs font-bold text-[#F0802D]">
                  1
                </span>
              )}
            </div>

            {jobs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center">
                <p className="text-sm font-medium text-gray-600">
                  No activity yet.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Post a job to get started.
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 transition hover:border-[#FDE6D5] hover:bg-[#FFF9F5]">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FDE6D5] text-[#F0802D]">
                  <CheckCircle2 size={15} />
                </span>
                <p className="min-w-0 text-sm leading-6 text-gray-600">
                  {jobs.length} job{jobs.length === 1 ? "" : "s"} posted
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
