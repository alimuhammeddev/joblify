"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  Eye,
  Pencil,
  Plus,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { formatPostedAt, mapJob, sortJobsByNewestFirst, type Job } from "@/lib/jobs";
import PostJobModal from "./component/PostJob";
import ViewApplicants from "./component/ViewApplicants";
import EditJobModal from "./component/EditJob";
import Toast from "@/components/Toast";

export default function PostedJob() {
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isApplicantsOpen, setIsApplicantsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [toast, setToast] = useState("");
  const [applicants, setApplicants] = useState<
    {
      id: string;
      name: string;
      email: string;
      resume: string;
      resumeName: string;
      coverLetter: string;
    }[]
  >([]);

  useEffect(() => {
    let unsubscribeJobs = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeJobs();

      if (!user) {
        setPostedJobs([]);
        return;
      }

      const jobsQuery = query(
        collection(db, "jobs"),
        where("companyId", "==", user.uid),
      );

      unsubscribeJobs = onSnapshot(jobsQuery, (snapshot) => {
        const jobs = snapshot.docs.map(mapJob);
        setPostedJobs(sortJobsByNewestFirst(jobs));
      }, (error) => {
        console.error("Unable to load posted jobs:", error);
        setPostedJobs([]);
      });
    });

    return () => {
      unsubscribeJobs();
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (!selectedJob) {
      setApplicants([]);
      return;
    }

    const applicationsQuery = query(
      collection(db, "applications"),
      where("jobId", "==", selectedJob.id),
    );

    return onSnapshot(
      applicationsQuery,
      (snapshot) => {
        setApplicants(
          snapshot.docs.map((application) => {
            const data = application.data();

            return {
              id: application.id,
              name: String(data.applicantName || "Applicant"),
              email: String(data.applicantEmail || ""),
              resume: String(data.cvData || ""),
              resumeName: String(data.cvName || "CV"),
              coverLetter: String(data.coverLetter || "No cover letter provided."),
            };
          }),
        );
      },
      (error) => {
        console.error("Unable to load applicants:", error);
        setApplicants([]);
      },
    );
  }, [selectedJob]);

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-gray-500">Manage your openings</p>

          <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
            Posted Jobs
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsPostJobOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3064] px-5 py-3 text-sm font-bold text-white shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2 sm:w-auto"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
            <Plus size={16} />
          </span>
          Post New Job
        </button>
      </div>

      <div className="space-y-5">
        {postedJobs.map((job) => (
          <div
            key={job.id}
            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition"
          >
            <div className="h-1 bg-[#F0802D]" />
            <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Content */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E7] text-[#F0802D]">
                    <Building2 size={18} />
                  </span>

                  <h2 className="min-w-0 text-lg font-extrabold text-[#1F3064] sm:text-xl">
                    {job.title}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      job.status.trim().toLowerCase() === "open"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <Users size={16} className="text-[#F0802D]" />
                  {job.applicants} applicant{job.applicants === 1 ? "" : "s"}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                    <MapPin size={15} className="text-[#F0802D]" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                    <Briefcase size={15} className="text-[#F0802D]" />
                    {job.type}
                  </span>

                  <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                    <Wallet size={15} className="text-[#F0802D]" />
                    {job.salary}
                  </span>

                  <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                    <Clock size={15} className="text-[#F0802D]" />
                    {formatPostedAt(job)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid w-full shrink-0 grid-cols-1 gap-2 sm:grid-cols-3 lg:w-auto lg:grid-cols-1 xl:grid-cols-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job);
                    setIsApplicantsOpen(true);
                  }}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#1F3064] px-4 py-2 text-sm font-bold text-[#1F3064] transition hover:bg-[#1F3064] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2"
                >
                  <Eye size={17} />
                  View Applicants
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job);
                    setIsEditOpen(true);
                  }}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3064] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#16254d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2"
                >
                  <Pencil size={17} />
                  Edit Job
                </button>

                <button
                  type="button"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
                >
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {postedJobs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
            <Briefcase className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <h2 className="text-lg font-semibold text-[#1F3064]">
              No jobs posted yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Post your first job to start receiving applications.
            </p>
          </div>
        )}
      </div>

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
      />

      <ViewApplicants
        isOpen={isApplicantsOpen}
        onClose={() => setIsApplicantsOpen(false)}
        jobTitle={selectedJob?.title || ""}
        applicants={applicants}
      />

      <EditJobModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        job={selectedJob}
        onSaved={() => setToast("Job changes saved successfully.")}
      />

      <Toast message={toast} onClose={() => setToast("")} />
    </section>
  );
}
