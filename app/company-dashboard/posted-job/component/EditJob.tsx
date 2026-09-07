"use client";

import { useState, useEffect } from "react";
import { X, Briefcase, MapPin, Wallet } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import type { Job } from "@/lib/jobs";
import { auth, db } from "@/lib/firebase";
import { recordCompanyActivity } from "@/lib/companyActivity";
import Toast from "@/components/Toast";

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export default function EditJobModal({
  isOpen,
  onClose,
  job,
}: EditJobModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    status: "",
    salary: "",
    description: "",
    responsibilities: "",
    requirements: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        location: job.location,
        type: job.type,
        status: job.status,
        salary: job.salary,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
      });
    }
  }, [job]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!job) return;

    setSaving(true);
    setError("");

    try {
      const [minimumSalary, maximumSalary] = formData.salary
        .split("-")
        .map((value) => value.trim());

      await updateDoc(doc(db, "jobs", job.id), {
        title: formData.title.trim(),
        location: formData.location.trim(),
        type: formData.type,
        status: formData.status,
        minimumSalary: minimumSalary || formData.salary.trim(),
        maximumSalary: maximumSalary || formData.salary.trim(),
        description: formData.description.trim(),
        responsibilities: formData.responsibilities.trim(),
        requirements: formData.requirements.trim(),
      });

      if (auth.currentUser) {
        recordCompanyActivity(auth.currentUser.uid, `You updated the job: ${formData.title.trim()}`);
      }
      setToast("Changes saved successfully.");
    } catch (saveError) {
      console.error("Unable to update job:", saveError);
      setError("Unable to save these changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <Toast message={toast} onClose={() => setToast("")} />
      <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl md:max-h-[90vh] max-h-[80vh] overflow-y-auto md:mt-0 -mt-16">
        {/* Header */}
        <div className="bg-linear-to-r from-[#1F3064] to-[#2B4287] text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Edit Job</h2>

            <p className="text-sm text-white/80">Update job details</p>
          </div>

          <button
            onClick={onClose}
            className="bg-white/10 p-2 rounded-xl hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Job Title
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3">
              <Briefcase size={18} className="text-[#F0802D] mr-3" />

              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Location
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3">
              <MapPin size={18} className="text-[#F0802D] mr-3" />

              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Salary Range
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3">
              <Wallet size={18} className="text-[#F0802D] mr-3" />

              <input
                type="text"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: e.target.value,
                  })
                }
                placeholder="₦500,000 - ₦800,000/month"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Job Type
              </label>

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Status
              </label>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              >
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Job Description
            </label>

            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the role..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Responsibilities
            </label>

            <textarea
              rows={3}
              value={formData.responsibilities}
              onChange={(e) =>
                setFormData({ ...formData, responsibilities: e.target.value })
              }
              placeholder="List job responsibilities..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Requirements
            </label>

            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              placeholder="List job requirements..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end md:flex-row flex-col gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#1F3064] text-white px-6 py-3 rounded-xl"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
