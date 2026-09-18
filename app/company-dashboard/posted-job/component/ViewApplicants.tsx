"use client";

import {
  X,
  Mail,
  User,
  FileText,
  Download,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  resume: string;
  resumeName: string;
  coverLetter: string;
}

interface ApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  applicants: Applicant[];
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ViewApplicants({
  isOpen,
  onClose,
  jobTitle,
  applicants,
}: ApplicantsModalProps) {
  const [openApplicant, setOpenApplicant] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-4">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl h-[80dvh] max-h-[calc(100dvh-4rem)] -translate-y-7 sm:h-[85dvh] sm:max-h-[calc(100dvh-2rem)] sm:-translate-y-2 rounded-2xl bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-[#1F3064] px-8 py-7">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-40 blur-2xl" />
          <div className="relative flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-wider text-[#F0802D]">
                Hiring pipeline
              </div>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-white truncate">
                {jobTitle}
              </h2>
              <p className="mt-1.5 text-sm text-white/65">
                {applicants.length}{" "}
                {applicants.length === 1 ? "person has" : "people have"} applied
                for this role
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close applicants modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto bg-slate-50/70 px-4 py-4 sm:px-5">
          {applicants.length > 0 ? (
            <div className="space-y-3">
              {applicants.map((applicant, index) => {
                const isApplicantOpen = openApplicant === applicant.id;
                const accents = ["#1F3064", "#F0802D", "#2E7D6B", "#7C5CBF"];
                const accent = accents[index % accents.length];

                return (
                  <div
                    key={applicant.id}
                    className={`overflow-hidden rounded-2xl bg-white border transition-shadow duration-200 ${
                      isApplicantOpen
                        ? "border-[#1F3064]/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white"
                          style={{ backgroundColor: accent }}
                        >
                          {initials(applicant.name) || <User size={20} />}
                        </div>

                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 truncate">
                            {applicant.name}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500 truncate">
                            <Mail
                              size={13}
                              className="shrink-0 text-slate-400"
                            />
                            <span className="truncate">{applicant.email}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setOpenApplicant(
                            isApplicantOpen ? null : applicant.id,
                          )
                        }
                        className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isApplicantOpen
                            ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            : "bg-[#1F3064] text-white hover:bg-[#182650]"
                        }`}
                      >
                        {isApplicantOpen ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                        {isApplicantOpen
                          ? "Hide Application"
                          : "View Application"}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            isApplicantOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isApplicantOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5">
                          <div className="grid gap-5 sm:grid-cols-[1fr_1.3fr] rounded-2xl bg-slate-50 border border-slate-200 p-5">
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Resume
                              </div>

                              <a
                                href={applicant.resume}
                                download={
                                  applicant.resumeName || "applicant-cv"
                                }
                                className="mt-3 flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-3.5 py-3 transition-colors hover:border-[#1F3064]/30"
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0802D]/10 text-[#F0802D]">
                                  <FileText size={16} />
                                </span>
                                <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
                                  {applicant.resumeName || "CV attached"}
                                </span>
                                <Download
                                  size={15}
                                  className="shrink-0 text-slate-400"
                                />
                              </a>
                            </div>

                            <div className="min-w-0">
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Cover letter
                              </div>
                              <p className="mt-3 text-sm leading-6 text-slate-600 whitespace-pre-wrap">
                                {applicant.coverLetter}
                              </p>
                            </div>
                          </div>

                          <a
                            href={`mailto:${applicant.email}`}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#1F3064] hover:underline"
                          >
                            <Mail size={14} />
                            Email {applicant.name.split(" ")[0]}
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1F3064]/8 text-[#1F3064]">
                <FileText size={24} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No applicants yet
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Applications for this role will show up here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};