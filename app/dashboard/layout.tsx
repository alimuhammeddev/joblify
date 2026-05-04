"use client";

import Link from "next/link";
import {
  Home,
  Briefcase,
  Bookmark,
  Bell,
  Settings,
  User,
  Clock,
  LogOut,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import joblify from "./assets/joblify.png";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const isActive = (path: string) => pathname === path;
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col overflow-hidden pt-20">
      {/* Top Navbar */}
      <header className="w-full bg-[#f1f1f1] px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 h-20">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Image src={joblify} alt="joblify" className="w-28" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard/user-notification" className="relative">
            <Bell className="text-gray-700 hover:text-[#1F3064]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition">
                <User size={18} />
              </div>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 z-50">
                <div className="pb-3 bg-[#FDE6D5] p-3">
                  <h3 className="font-semibold text-[#1F3064]">King Rudy</h3>
                  <p className="text-sm text-gray-500">kingurdy@email.com</p>
                </div>

                <Link href="/dashboard/user-settings">
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center mt-3 gap-3 px-3 py-2 hover:bg-gray-100 transition text-gray-700 cursor-pointer"
                  >
                    <Settings size={18} />
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                </Link>

                <Link href="/dashboard/help-support">
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 transition text-gray-700 cursor-pointer"
                  >
                    <HelpCircle size={18} />
                    <span className="text-sm font-medium">Help & Support</span>
                  </button>
                </Link>

                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 transition text-red-500 cursor-pointer"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-72 min-h-screen bg-[#f1f1f1] p-6 fixed top-20 left-0 bottom-0">
          <nav className="space-y-3">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive("/dashboard")
                  ? "bg-[#1F3064] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home size={20} />
              Dashboard
            </Link>

            <Link
              href="/dashboard/jobs"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive("/dashboard/jobs")
                  ? "bg-[#1F3064] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Briefcase size={20} />
              Jobs
            </Link>

            <Link
              href="/dashboard/recently-applied"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive("/dashboard/recently-applied")
                  ? "bg-[#1F3064] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Clock size={20} />
              Recently Applied
            </Link>

            <Link
              href="/dashboard/saved-jobs"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive("/dashboard/saved-jobs")
                  ? "bg-[#1F3064] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Bookmark size={20} />
              Saved Jobs
            </Link>

            <Link
              href="/dashboard/user-settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive("/dashboard/user-settings")
                  ? "bg-[#1F3064] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings size={20} />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 p-6 md:p-10 overflow-y-auto h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-[#f1f1f1] shadow-lg px-4 py-3 flex items-center justify-around z-50">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center ${
            isActive("/dashboard") ? "text-[#1F3064]" : "text-gray-600"
          }`}
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/dashboard/jobs"
          className={`flex flex-col items-center ${
            isActive("/dashboard/jobs") ? "text-[#1F3064]" : "text-gray-600"
          }`}
        >
          <Briefcase size={20} />
          <span className="text-xs">Jobs</span>
        </Link>

        <Link
          href="/dashboard/recently-applied"
          className={`flex flex-col items-center ${
            isActive("/dashboard/recently-applied")
              ? "text-[#1F3064]"
              : "text-gray-600"
          }`}
        >
          <Clock size={20} />
          <span className="text-xs">Applied</span>
        </Link>

        <Link
          href="/dashboard/saved-jobs"
          className={`flex flex-col items-center ${
            isActive("/dashboard/saved-jobs")
              ? "text-[#1F3064]"
              : "text-gray-600"
          }`}
        >
          <Bookmark size={20} />
          <span className="text-xs">Saved</span>
        </Link>

        <Link
          href="/dashboard/user-settings"
          className={`flex flex-col items-center ${
            isActive("/dashboard/user-settings")
              ? "text-[#1F3064]"
              : "text-gray-600"
          }`}
        >
          <Settings size={20} />
          <span className="text-xs">Settings</span>
        </Link>
      </nav>
    </section>
  );
}
