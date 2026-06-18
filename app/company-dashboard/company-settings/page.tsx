"use client";

import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Bell,
  Lock,
  Camera,
  Save,
  LucideIcon,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

type InputFieldProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

const industries = [
  "Information Technology",
  "Software Development",
  "FinTech",
  "Banking & Finance",
  "Healthcare",
  "Education",
  "Telecommunications",
  "Manufacturing",
  "Construction",
  "Real Estate",
  "Oil & Gas",
  "Energy & Utilities",
  "Agriculture",
  "Transportation & Logistics",
  "Retail & E-commerce",
  "Media & Entertainment",
  "Hospitality & Tourism",
  "Consulting",
  "Government",
  "Non-Profit",
  "Human Resources",
  "Marketing & Advertising",
  "Legal Services",
  "Security Services",
  "Other",
];

export default function CompanySettings() {
  const [industry, setIndustry] = useState("Software Development");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
          Company Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your company profile, branding, hiring contacts, and account
          preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Company Branding Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-fit">
          {/* Cover */}
          <div className="h-28 bg-[#1F3064]" />

          <div className="px-6 pb-6">
            {/* Logo */}
            <div className="-mt-12 relative w-fit mx-auto">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623"
                alt="Company Logo"
                className="w-24 h-24 rounded-2xl border-4 border-white object-cover"
              />

              <button className="absolute -bottom-2 -right-2 bg-[#F0802D] text-white p-2 rounded-full">
                <Camera size={15} />
              </button>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold text-[#1F3064]">
                TechNova Ltd
              </h2>

              <p className="text-sm text-gray-500">Software Development</p>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          {/* Company Info */}
          <h3 className="text-lg font-semibold text-[#1F3064] mb-5">
            Company Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Company Name
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <Building2 size={18} className="text-gray-400 mr-3" />

                <input
                  type="text"
                  defaultValue="TechNova Ltd"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Website
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <Globe size={18} className="text-gray-400 mr-3" />

                <input
                  type="text"
                  defaultValue="www.technova.com"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Company Email
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <Mail size={18} className="text-gray-400 mr-3" />

                <input
                  type="email"
                  defaultValue="contact@technova.com"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Phone Number
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <Phone size={18} className="text-gray-400 mr-3" />

                <input
                  type="text"
                  defaultValue="+234 800 000 000"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Industry
              </label>

              <div className="relative flex items-center border border-gray-300 w-full rounded-xl px-4 py-3 focus-within:border-[#1F3064] transition-colors">
                <Building2 size={18} className="text-gray-400 mr-3 shrink-0" />

                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full appearance-none bg-transparent outline-none text-sm text-gray-700 pr-8 cursor-pointer"
                >
                  <option value="">Select Industry</option>

                  {industries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="absolute right-4 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Company Address
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                <MapPin size={18} className="text-gray-400 mr-3" />

                <input
                  className="w-full outline-none text-sm"
                  defaultValue="Abuja, Nigeria"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Company Description
              </label>

              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded-2xl p-4 outline-none resize-none"
                placeholder="Describe your company..."
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Notifications
            </h3>

            {[
              "Receive applicant notifications",
              "Get job performance updates",
              "Receive interview reminders",
            ].map((item) => (
              <div
                key={item}
                className="border border-gray-300 rounded-xl p-4 flex items-center justify-between mb-3"
              >
                <div className="flex gap-3 items-center">
                  <Bell className="text-[#F0802D]" size={18} />
                  <span className="text-sm">{item}</span>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-[#F0802D] w-5 h-5"
                />
              </div>
            ))}
          </div>

          {/* Security */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Security
            </h3>

            <button
              onClick={() => setShowPasswordForm((prev) => !prev)}
              className="w-full border border-gray-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-[#1F3064] hover:text-white text-base transition"
            >
              <Lock size={18} className="text-gray-400" />
              Change Password
              <ChevronDown
                size={18}
                className={`ml-auto transition-transform duration-300 ${
                  showPasswordForm ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Animated Dropdown */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showPasswordForm
                  ? "max-h-75 opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-2xl p-5 space-y-4 bg-gray-50">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1F3064]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1F3064]"
                  />
                </div>

                <button className="bg-[#1F3064] text-white px-5 py-3 rounded-xl hover:opacity-90">
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="mt-10 flex justify-end">
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

function InputField({ icon: Icon, label, value }: InputFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 block mb-2">
        {label}
      </label>

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Icon size={18} className="text-gray-400 mr-3" />

        <input defaultValue={value} className="w-full outline-none text-sm" />
      </div>
    </div>
  );
}
