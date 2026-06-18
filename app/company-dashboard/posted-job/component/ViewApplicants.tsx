"use client";

import { X, Mail, User } from "lucide-react";

interface Applicant {
  id: number;
  name: string;
  email: string;
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-linear-to-r from-[#1F3064] to-[#2B4287] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Applicants
              </h2>
              <p className="text-sm text-white/80">
                {jobTitle}
              </p>
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
        <div className="p-6 max-h-125 overflow-y-auto">
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <User
                      size={16}
                      className="text-[#F0802D]"
                    />
                    <h3 className="font-semibold text-[#1F3064]">
                      {applicant.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Mail size={14} />
                    {applicant.email}
                  </div>
                </div>
              </div>
            ))}
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