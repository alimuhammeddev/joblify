"use client";

import { X, Mail, User, Eye, FileText, Download } from "lucide-react";
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-linear-to-r from-[#1F3064] to-[#2B4287] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Applicants</h2>
              <p className="text-sm text-white/80">{jobTitle}</p>
            </div>

            <button
              onClick={onClose}
              className="bg-white/10 p-2 rounded-xl hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Applicants List */}
        <div className="p-6 max-h-100 overflow-y-auto">
          <div className="space-y-4">
            {applicants.map((applicant) => {
              const isOpen = openApplicant === applicant.id;

              return (
                <div
                  key={applicant.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Applicant Info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <User size={18} className="text-[#F0802D]" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-semibold text-[#1F3064] truncate">
                              {applicant.name}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 truncate">
                              <Mail size={14} />
                              <span className="truncate">
                                {applicant.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() =>
                          setOpenApplicant(isOpen ? null : applicant.id)
                        }
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1F3064] text-white px-4 py-2.5 rounded-xl hover:bg-[#2B4287] transition"
                      >
                        <Eye size={16} />

                        {isOpen ? "Hide Application" : "View Application"}
                      </button>
                    </div>
                  </div>

                  {/* Dropdown */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-175 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 p-4 space-y-5">
                      {/* Resume */}
                      <div className="bg-white rounded-xl border border-gray-300 p-4">
                        <div className="flex items-center gap-2 font-semibold text-[#1F3064] mb-3">
                          <FileText size={18} />
                          Resume
                        </div>

                        <p className="text-sm text-gray-600 break-all">
                          {applicant.resumeName || "CV attached"}
                        </p>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <a
                            href={applicant.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 border border-[#1F3064] text-[#1F3064] py-2.5 rounded-xl hover:bg-[#1F3064] hover:text-white transition"
                          >
                            <Eye size={16} />
                            View Resume
                          </a>

                          <a
                            href={applicant.resume}
                            download={applicant.resumeName || "applicant-cv"}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#F0802D] text-white py-2.5 rounded-xl hover:opacity-90 transition"
                          >
                            <Download size={16} />
                            Download
                          </a>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="bg-white rounded-xl border border-gray-300 p-4">
                        <div className="flex items-center gap-2 font-semibold text-[#1F3064] mb-3">
                          <FileText size={18} />
                          Cover Letter
                        </div>

                        <div className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                          {applicant.coverLetter}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {applicants.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No applicants yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
