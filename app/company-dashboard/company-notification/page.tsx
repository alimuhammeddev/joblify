"use client";

import { Bell, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { getCompanyActivity } from "@/lib/companyActivity";

type CompanyJob = { id: string; title: string };
type Application = { jobId: string; applicantName: string };

export default function CompanyNotification() {
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    let unsubscribeJobs = () => {};
    let unsubscribeApplications = () => {};
    let jobs: CompanyJob[] = [];
    let applications: Application[] = [];
    let companyId = "";

    const updateActivities = () => {
      const jobTitles = new Map(jobs.map((job) => [job.id, job.title]));
      const applicationActivities = applications
        .filter((application) => jobTitles.has(application.jobId))
        .map(
          (application) =>
            `${application.applicantName} applied for ${jobTitles.get(application.jobId)}`,
        );
      const jobActivities = jobs.map((job) => `Your job is live: ${job.title}`);
      const savedActivities = companyId
        ? getCompanyActivity(companyId).recentActivities
        : [];

      setActivities(
        [...savedActivities, ...applicationActivities, ...jobActivities].filter(
          (activity, index, all) => all.indexOf(activity) === index,
        ),
      );
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeJobs();
      unsubscribeApplications();
      jobs = [];
      applications = [];
      companyId = user?.uid || "";

      if (!user) {
        setActivities([]);
        return;
      }

      unsubscribeJobs = onSnapshot(collection(db, "jobs"), (snapshot) => {
        jobs = snapshot.docs
          .filter((job) => job.data().companyId === user.uid)
          .map((job) => ({
            id: job.id,
            title: String(job.data().title || "Untitled job"),
          }));
        updateActivities();
      });

      unsubscribeApplications = onSnapshot(
        collection(db, "applications"),
        (snapshot) => {
          applications = snapshot.docs.map((application) => ({
            jobId: String(application.data().jobId || ""),
            applicantName: String(
              application.data().applicantName || "Applicant",
            ),
          }));
          updateActivities();
        },
      );
    });

    return () => {
      unsubscribeJobs();
      unsubscribeApplications();
      unsubscribeAuth();
    };
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-6">
        <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
          Notifications
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Stay updated with hiring activity and company events
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#F0802D]/10 p-3 rounded-xl">
            <Bell size={22} className="text-[#F0802D]" />
          </div>
          <div>
            <h2 className="font-semibold text-[#1F3064]">
              {activities.length === 0
                ? "No company activity yet"
                : `${activities.length} recent company ${activities.length === 1 ? "activity" : "activities"}`}
            </h2>
            <p className="text-sm text-gray-500">
              Latest updates from your hiring dashboard
            </p>
          </div>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center text-gray-500">
          Your company activity will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={`${activity}-${index}`}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0802D]/30"
            >
              <div className="flex gap-4">
                <div className="bg-[#F0802D]/10 text-[#F0802D] p-3 rounded-xl h-fit">
                  <CheckCircle size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between gap-3 flex-wrap">
                    <h3 className="font-semibold text-[#1F3064]">
                      Company Activity
                    </h3>
                    <span className="text-xs text-gray-400">Recent</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{activity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
