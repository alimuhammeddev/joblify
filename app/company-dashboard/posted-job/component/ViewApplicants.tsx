"use client";

import {
  X,
  Mail,
  User,
  Eye,
  FileText,
  Download,
  Briefcase,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  ExternalLink,
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

export default function ViewApplicants({
  isOpen,
  onClose,
  jobTitle,
  applicants,
}: ApplicantsModalProps) {
  const [openApplicant, setOpenApplicant] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-4xl max-h-[calc(100vh-2rem)] rounded-4xl bg-white overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-[#1F3064] text-white px-7 py-7 shrink-0">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-3">
              <div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight mt-1">
                    Applicants
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/82">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
                <span className="font-medium truncate max-w-125">
                  {jobTitle}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="group p-2 rounded-xl bg-white/12 text-white border border-white/16 flex items-center justify-center"
              aria-label="Close applicants modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center border border-slate-100">
                <FileText size={22} className="text-[#1F3064]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Shortlist
                </div>
                <div className="text-base font-semibold text-slate-900">
                  {applicants.length}{" "}
                  {applicants.length === 1 ? "Applicant" : "Applicants"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F0802D]" />
              <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Active Review
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-4">
            {applicants.length > 0 ? (
              applicants.map((applicant) => {
                const isApplicantOpen = openApplicant === applicant.id;

                return (
                  <div
                    key={applicant.id}
                    className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white"
                  >
                    <div className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="rounded-xl p-2 bg-[#1F3064] text-white flex items-center justify-center">
                            <User size={26} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base text-[#1F3064] truncate">
                                {applicant.name}
                              </h3>
                              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-black uppercase text-emerald-700 border border-emerald-100">
                                New
                              </span>
                            </div>

                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                              <Mail size={14} className="text-[#F0802D]" />
                              <span className="truncate max-w-62.5 lg:max-w-85">
                                {applicant.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() =>
                              setOpenApplicant(
                                isApplicantOpen ? null : applicant.id,
                              )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1F3064] px-5 py-3 font-semibold text-sm text-white"
                          >
                            <Eye size={16} />
                            <span>
                              {isApplicantOpen
                                ? "Hide Application"
                                : "View Application"}
                            </span>
                            {isApplicantOpen ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isApplicantOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5">
                          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                                <div className="flex items-center gap-2 font-semibold text-[#1F3064]">
                                  <FileText size={17} />
                                  <span className="text-sm uppercase tracking-wide">
                                    Resume
                                  </span>
                                </div>

                                <div className="mt-4 rounded-2xl bg-[#eef4f8] px-4 py-3 border border-slate-200">
                                  <div className="flex items-center gap-3">
                                    <span className="h-10 w-10 rounded-xl bg-white flex items-center justify-center">
                                      <FileText
                                        size={18}
                                        className="text-[#F0802D]"
                                      />
                                    </span>
                                    <span className="text-sm font-semibold text-slate-700 break-all">
                                      {applicant.resumeName || "CV attached"}
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <a
                                    href={applicant.resume}
                                    download={
                                      applicant.resumeName || "applicant-cv"
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3064] px-4 py-2.5 text-sm font-semibold text-white"
                                  >
                                    <Download size={16} />
                                    Download Resume
                                  </a>
                                </div>
                              </div>

                              <div className="rounded-[1.25rem] bg-white border border-slate-200 p-4">
                                <div className="flex items-center gap-2 font-semibold text-[#1F3064]">
                                  <FileText size={17} />
                                  <span className="text-sm uppercase tracking-wide">
                                    Cover Letter
                                  </span>
                                </div>

                                <div className="mt-2">
                                  <div className="text-sm leading-7 text-slate-600 whitespace-pre-wrap">
                                    {applicant.coverLetter}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
                              <span className="inline-flex items-center gap-2 rounded-full bg-[#eef4f8] px-3 py-2 text-xs font-semibold uppercase text-[#1F3064]">
                                <CalendarDays size={14} />
                                Application Sent
                              </span>

                              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff7ee] px-3 py-2 text-xs font-semibold uppercase text-[#F0802D]">
                                <BadgeCheck size={14} />
                                Profile Ready
                              </span>

                              <a
                                href={`mailto:${applicant.email}`}
                                className="ml-auto inline-flex items-center gap-2 rounded-full border border-[#1F3064] px-4 py-2 text-xs font-black uppercase text-[#1F3064] transition hover:bg-[#1F3064] hover:text-white"
                              >
                                <Mail size={14} />
                                Contact
                                <ExternalLink size={14} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef4f8] text-[#1F3064]">
                  <FileText size={28} />
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-900">
                  No applicants yet
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Applications for this role will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
