"use client";

import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Camera,
  Save,
  Upload,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function UserSettings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#1F3064]">
          User Settings
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your profile information, security, notifications, and CV
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
              <button className="absolute bottom-1 right-1 bg-[#1F3064] text-white p-2 rounded-full hover:opacity-90 transition">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-[#1F3064]">
              King Rudy
            </h2>
            <p className="text-sm text-gray-500">Frontend Developer</p>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <User size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  defaultValue="King Rudy"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <Mail size={18} className="text-gray-400 mr-3" />
                <input
                  type="email"
                  defaultValue="kingrudy@email.com"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <Phone size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  defaultValue="+234 800 000 0000"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Current Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  defaultValue="CurrentPassword123"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Change Password */}
            <div className="md:col-span-2">
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Change Password
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-300 ${
                    showPassword ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated dropdown */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showPassword
                    ? "max-h-65 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="border border-gray-300 rounded-xl p-4 space-y-4 bg-gray-50">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#1F3064]"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#1F3064]"
                    />
                  </div>

                  <button className="bg-[#1F3065] text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Bio
              </label>

              <textarea
                rows={1}
                placeholder="e.g Frontend developer with 5 years of experience"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none text-sm resize-none focus:border-[#1F3064]"
              />
            </div>
          </div>

          {/* CV Upload Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Resume / CV
            </h3>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F0802D]/10 p-3 rounded-xl">
                    <FileText size={22} className="text-[#F0802D]" />
                  </div>

                  <div>
                    <p className="font-medium text-sm text-[#1F3064]">
                      Upload Your CV
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, or DOCX (Max 5MB)
                    </p>
                  </div>
                </div>

                <label className="cursor-pointer bg-[#1F3064] text-white px-5 py-2 rounded-lg hover:bg-[#16254d] transition flex items-center gap-2">
                  <Upload size={16} />
                  Upload CV
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Notification Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between border border-gray-300 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-[#F0802D]" />
                  <div>
                    <p className="font-medium text-sm">Job Alerts</p>
                    <p className="text-xs text-gray-500">
                      Receive notifications for new job matches
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-[#F0802D]"
                />
              </div>

              <div className="flex items-center justify-between border border-gray-300 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-[#F0802D]" />
                  <div>
                    <p className="font-medium text-sm">Application Updates</p>
                    <p className="text-xs text-gray-500">
                      Get updates on your submitted applications
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-[#F0802D]"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-[#1F3064] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
