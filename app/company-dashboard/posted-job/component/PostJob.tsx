"use client";

import { X, Briefcase, MapPin, FileText, Building2 } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostJobModal({ isOpen, onClose }: PostJobModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    const formData = new FormData(event.currentTarget);

    await addDoc(collection(db, "jobs"), {
      companyId: user.uid,
      companyName: user.displayName || "Company",
      title: formData.get("title"),
      location: formData.get("location"),
      type: formData.get("type"),
      minimumSalary: formData.get("minimumSalary"),
      maximumSalary: formData.get("maximumSalary"),
      description: formData.get("description"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      applicantCount: 0,
      postedAt: serverTimestamp(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl md:max-h-[90vh] max-h-[80vh] overflow-y-auto md:mt-0 -mt-16">
        <div className="bg-linear-to-r from-[#1F3064] to-[#2B4287] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/15 p-3 rounded-2xl">
                <Briefcase size={20} />
              </div>

              <div>
                <h2 className="lg:text-2xl text-xl font-bold">Post New Job</h2>

                <p className="text-white/80 text-sm mt-1">
                  Create a new opportunity and attract top talent.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-5">
              Job Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Job Title */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Job Title
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#F0802D]">
                  <Briefcase size={18} className="text-[#F0802D] mr-3" />

                  <input
                    name="title"
                    type="text"
                    placeholder="Frontend Developer"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Company Name
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#F0802D]">
                  <Building2 size={18} className="text-[#F0802D] mr-3" />

                  <input
                    name="company"
                    type="text"
                    value={auth.currentUser?.displayName || ""}
                    readOnly
                    placeholder="Joblify Inc."
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Location
                </label>

                <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#F0802D]">
                  <MapPin size={18} className="text-[#F0802D] mr-3" />

                  <input
                    name="location"
                    type="text"
                    placeholder="Abuja, Nigeria"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Employment Type
                </label>

                <select name="type" className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[#F0802D]">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-5">
              Compensation
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Minimum Salary
                </label>

                <input
                  name="minimumSalary"
                  type="number"
                  placeholder="500000"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[#F0802D]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Maximum Salary
                </label>

                <input
                  name="maximumSalary"
                  type="number"
                  placeholder="1000000"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[#F0802D]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Job Description
            </label>

            <div className="border border-gray-200 rounded-2xl p-4 focus-within:border-[#F0802D]">
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-[#F0802D] mt-1" />

                <textarea
                  name="description"
                  rows={2}
                  placeholder="Describe responsibilities, requirements, qualifications, and expectations..."
                  className="w-full outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Responsibilities
            </label>

            <div className="border border-gray-200 rounded-2xl p-4 focus-within:border-[#F0802D]">
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-[#F0802D] mt-1" />

                <textarea
                  name="responsibilities"
                  rows={3}
                  placeholder="e.g Build and maintain frontend applications, collaborate with backend team..."
                  className="w-full outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Requirements
            </label>

            <div className="border border-gray-200 rounded-2xl p-4 focus-within:border-[#F0802D]">
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-[#F0802D] mt-1" />

                <textarea
                  name="requirements"
                  rows={3}
                  placeholder="e.g 3+ years experience, React, TypeScript, strong communication skills..."
                  className="w-full outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 mb-7">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-6 py-3 rounded-2xl font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#1F3064] hover:bg-[#182650] text-white px-8 py-3 rounded-2xl font-medium transition shadow-md"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
