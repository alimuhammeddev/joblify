"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  Users,
  Wallet,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { formatPostedAt, mapJob, type Job } from "@/lib/jobs";
import PostJobModal from "./component/PostJob";
import ViewApplicants from "./component/ViewApplicants";
import EditJobModal from "./component/EditJob";

export default function PostedJob() {
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isApplicantsOpen, setIsApplicantsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
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
        setPostedJobs(snapshot.docs.map(mapJob));
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
          onClick={() => setIsPostJobOpen(true)}
          className="bg-[#1F3064] text-white px-5 py-3 rounded-2xl font-medium hover:opacity-90 transition"
        >
          + Post New Job
        </button>
      </div>

      <div className="space-y-5">
        {postedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-[#F0802D]" />

                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4 text-[#F0802D]" />
                  {job.applicants} Applicants
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#F0802D]" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-[#F0802D]" />
                    {job.type}
                  </span>

                  <span className="flex items-center gap-1">
                    <Wallet className="w-4 h-4 text-[#F0802D]" />
                    {job.salary}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#F0802D]" />
                    {formatPostedAt(job)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsApplicantsOpen(true);
                  }}
                  className="border border-[#1F3064] text-[#1F3064] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1F3064] hover:text-white transition"
                >
                  View Applicants
                </button>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsEditOpen(true);
                  }}
                  className="bg-[#1F3064] text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  Edit Job
                </button>

                <button className="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500 hover:text-white transition">
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
      />
    </section>
  );
}
