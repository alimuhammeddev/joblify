"use client";

import {
  Users,
  Briefcase,
  MapPin,
  Clock,
  Building2,
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

      return onSnapshot(jobsQuery, (snapshot) => {
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
      });
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
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
            {companyName}
          </h1>
        </div>

        <Link href="/company-dashboard/posted-job">
          <button className="bg-[#1F3064] text-white px-5 py-3 rounded-2xl font-medium hover:opacity-90 transition">
            Post New Job
          </button>
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active Job Listings */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1F3064]">
              Active Job Listings
            </h2>

            <Link href="/company-dashboard/posted-job" className="text-sm text-[#1F3064] font-medium">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition"
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
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1F3064] mb-4">
              Recent Activity
            </h2>

            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                {jobs.length === 0
                  ? "No activity yet. Post a job to get started."
                  : `${jobs.length} job${jobs.length === 1 ? "" : "s"} posted`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
