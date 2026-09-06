"use client";

import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiUpload,
} from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { recordApplication } from "@/lib/userActivity";
import { recordJobApplication } from "@/lib/companyActivity";

type JobDetails = {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  status: string;
  description: string;
  responsibilities: string;
  requirements: string;
};

function JobDetailsContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [savedCvName, setSavedCvName] = useState("");
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getDoc(doc(db, "users", user.uid)).then((snapshot) => {
        setSavedCvName(String(snapshot.data()?.cvName || ""));
      });
    }
  }, []);

  useEffect(() => {
    if (!jobId) {
      setLoadError("This job could not be found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError("");

    getDoc(doc(db, "jobs", jobId))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          setLoadError("This job could not be found.");
          return;
        }

        const data = snapshot.data();
        const minimumSalary = String(data.minimumSalary || "-");
        const maximumSalary = String(data.maximumSalary || "-");

        setJob({
          title: String(data.title || "Untitled job"),
          company: String(data.companyName || "Company"),
          location: String(data.location || "Location not specified"),
          type: String(data.type || "Not specified"),
          salary: `${minimumSalary} - ${maximumSalary}`,
          status: String(data.status || "Open"),
          description: String(data.description || "Not provided."),
          responsibilities: String(data.responsibilities || "Not provided."),
          requirements: String(data.requirements || "Not provided."),
        });
      })
      .catch((error) => {
        console.error("Unable to load job details:", error);
        setLoadError("Unable to load this job. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user || !job || !jobId) {
      return;
    }

    setSubmitError("");
    setSubmitting(true);

    try {
      let cvData = "";
      let cvName = "";
      let cvType = "";

      if (cvFile) {
        cvData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error("Unable to read CV file"));
          reader.readAsDataURL(cvFile);
        });
        cvName = cvFile.name;
        cvType = cvFile.type;
      } else {
        const profileSnapshot = await getDoc(doc(db, "users", user.uid));
        const profile = profileSnapshot.data();
        cvData = String(profile?.cvData || "");
        cvName = String(profile?.cvName || "");
        cvType = String(profile?.cvType || "");
      }

      if (!cvData) {
        setSubmitError("Please upload a CV or save one in your settings first.");
        return;
      }

      const created = await recordJobApplication(
        jobId,
        user.uid,
        user.displayName || "Applicant",
        user.email || "",
        job.title,
        job.company,
        job.location,
        job.salary,
        coverLetter.trim(),
        cvData,
        cvName,
        cvType,
      );

      if (!created) {
        setSubmitError("You have already applied for this job.");
        return;
      }

      recordApplication(user.uid, jobId, `${job.title} at ${job.company}`);
      setSubmitted(true);
    } catch (error) {
      console.error("Unable to submit application:", error);
      setSubmitError("Unable to submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCvChange = (file: File | undefined) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (file.size > 700 * 1024) {
      setSubmitError("CV files must be smaller than 700KB.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setSubmitError("Your CV must be a PDF, DOC, or DOCX file.");
      return;
    }

    setSubmitError("");
    setCvFile(file);
  };

  if (loading) {
    return <p className="text-gray-600">Loading job details...</p>;
  }

  if (loadError || !job) {
    return <p className="text-red-600">{loadError || "This job could not be found."}</p>;
  }

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mx-auto">
        
        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#1F3064]">
            {job.title}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {job.company} • {job.location}
          </p>
        </div>

        {/* Job Info */}
        <div className="flex sm:grid sm:grid-cols-4 gap-3 mb-6 overflow-x-auto sm:overflow-visible">
          
          {/* Card */}
          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiBriefcase className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Job Type</p>
              <p className="font-medium text-sm">{job.type}</p>
            </div>
          </div>

          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiClock className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="font-medium text-sm">{job.status}</p>
            </div>
          </div>

          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiDollarSign className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Salary</p>
              <p className="font-medium text-sm">{job.salary}</p>
            </div>
          </div>

          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiMapPin className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-sm">{job.location}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-[#1F3064] mb-2">
            Job Description
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Responsibilities */}
        <div className="mb-5 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-[#1F3064] mb-2">
            Responsibilities
          </h2>
          <p className="whitespace-pre-wrap text-gray-600 text-sm sm:text-base leading-relaxed">
            {job.responsibilities}
          </p>
        </div>

        {/* Requirements */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-[#1F3064] mb-2">
            Requirements
          </h2>
          <p className="whitespace-pre-wrap text-gray-600 text-sm sm:text-base leading-relaxed">
            {job.requirements}
          </p>
        </div>

        {/* Application Section */}
        <div className="pt-5 sm:pt-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1F3064] mb-4">
            Apply for this job
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {submitError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {submitError}
              </p>
            )}
            
            {/* Cover Letter */}
            <div>
              <label className="block font-medium text-sm mb-1 text-gray-700">
                Cover Letter
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
                rows={5}
                placeholder="Write your cover letter..."
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                required
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block font-medium text-sm mb-1 text-gray-700">
                Upload CV
              </label>

              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-5 cursor-pointer hover:border-[#1F3064] transition text-sm text-gray-600">
                <FiUpload />
                {cvFile?.name || savedCvName || "Tap to upload your CV"}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => handleCvChange(event.target.files?.[0])}
                />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitted || submitting}
              className="w-full bg-[#1F3064] text-white py-3 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base hover:bg-[#16254d] transition"
            >
              {submitted
                ? "Application Submitted"
                : submitting
                  ? "Submitting..."
                  : "Submit Application"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

export default function JobDetailsPage() {
  return (
    <Suspense fallback={<div>Loading job details...</div>}>
      <JobDetailsContent />
    </Suspense>
  );
}