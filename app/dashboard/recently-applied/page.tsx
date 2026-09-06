"use client";

import { MapPin, Wallet, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type AppliedJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  coverLetter: string;
  cvName: string;
  appliedAt: string;
};

type ApplicationRecord = {
  jobId: string;
  jobTitle?: string;
  companyName?: string;
  location?: string;
  salary?: string;
  coverLetter?: string;
  cvName?: string;
  createdAt?: { toDate?: () => Date };
};

export default function RecentlyApplied() {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);

  useEffect(() => {
    let unsubscribeApplications = () => {};
    let unsubscribeJobs = () => {};
    let applications: ApplicationRecord[] = [];
    let jobs = new Map<string, Record<string, unknown>>();

    const updateAppliedJobs = () => {
      setAppliedJobs(
        applications.map((application) => {
          const job = jobs.get(application.jobId) || {};
          const minimumSalary = String(job.minimumSalary || "-");
          const maximumSalary = String(job.maximumSalary || "-");
          const appliedDate = application.createdAt?.toDate?.();

          return {
            id: application.jobId,
            title: String(job.title || application.jobTitle || "Untitled job"),
            company: String(job.companyName || application.companyName || "Company"),
            location: String(
              job.location || application.location || "Location not specified",
            ),
            salary: job.minimumSalary || job.maximumSalary
              ? `${minimumSalary} - ${maximumSalary}`
              : String(application.salary || "-"),
            coverLetter: String(application.coverLetter || "Not provided"),
            cvName: String(application.cvName || "CV attached"),
            appliedAt: appliedDate
              ? appliedDate.toLocaleDateString()
              : "Date unavailable",
          };
        }),
      );
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeApplications();
      unsubscribeJobs();
      applications = [];
      jobs = new Map();

      if (!user) {
        setAppliedJobs([]);
        return;
      }

      unsubscribeApplications = onSnapshot(
        query(collection(db, "applications"), where("applicantId", "==", user.uid)),
        (snapshot) => {
          applications = snapshot.docs
            .map((application) => application.data() as ApplicationRecord)
            .sort((first, second) => {
              const firstDate = first.createdAt?.toDate?.()?.getTime() || 0;
              const secondDate = second.createdAt?.toDate?.()?.getTime() || 0;
              return secondDate - firstDate;
            });
          updateAppliedJobs();
        },
      );

      unsubscribeJobs = onSnapshot(collection(db, "jobs"), (snapshot) => {
        jobs = new Map(snapshot.docs.map((job) => [job.id, job.data()]));
        updateAppliedJobs();
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
          Recently Applied
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Track your latest job applications and their progress
        </p>
      </div>

      {appliedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center text-gray-500">
          You have not applied for any jobs yet.
        </div>
      ) : (
        <div className="grid gap-6">
        {appliedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-sm p-6 transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Left Section */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#1F3064]">
                  {job.title}
                </h2>
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

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#F0802D]" />
                    <span>Application sent</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-start md:items-end gap-4">
                <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-sm font-medium">
                  <CheckCircle size={16} />
                  <span>Application Sent</span>
                </div>
                <p className="text-xs text-gray-500">Applied {job.appliedAt}</p>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">CV:</span> {job.cvName}
              </p>
              <p className="mt-2 whitespace-pre-wrap">
                <span className="font-medium text-gray-700">Cover letter:</span>{" "}
                {job.coverLetter}
              </p>
            </div>
          </div>
        ))}
        </div>
      )}
    </section>
  );
};