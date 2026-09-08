"use client";

import { Bell, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  getCompanyActivity,
  markCompanyNotificationsRead,
} from "@/lib/companyActivity";

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

      if (companyId) {
        markCompanyNotificationsRead(companyId);
      }
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
      <div className="mb-8 border-l-4 border-[#F0802D] pl-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0802D]">
          Your updates
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#1F3064] md:text-3xl">
          Notifications
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Stay updated with hiring activity and company events.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E7] text-[#F0802D]">
              <Bell size={21} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                Hiring activity
              </p>
              <h2 className="mt-1 font-bold text-[#1F3064]">
                {activities.length === 0
                  ? "No company activity yet"
                  : `${activities.length} recent company ${activities.length === 1 ? "activity" : "activities"}`}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest updates from your hiring dashboard
              </p>
            </div>
          </div>
          {activities.length > 0 && (
            <span className="rounded-full bg-[#FDE6D5] px-3 py-1.5 text-xs font-bold text-[#F0802D]">
              {activities.length} updates
            </span>
          )}
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Bell size={20} />
          </div>
          <p className="mt-4 text-sm font-semibold text-[#1F3064]">
            Your hiring feed is quiet
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Job posts and applicant updates will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {activities.map((activity, index) => (
            <div
              key={`${activity}-${index}`}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 md:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E7] text-[#F0802D]">
                <CheckCircle size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-[#1F3064]">
                    Company Activity
                  </h3>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500">
                    Recent
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {activity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
