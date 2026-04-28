"use client"

import Link from "next/link";
import {
  Home,
  Briefcase,
  Bookmark,
  Bell,
  Settings,
  User,
  Clock,
} from "lucide-react";
import Image from "next/image";
import joblify from "./assets/joblify.png";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
          <Link href="/dashboard/notifications" className="relative">
            <Bell className="text-gray-700 hover:text-[#1F3064]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>

          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={18} />
            </div>
            <span className="hidden md:block text-sm text-gray-700">
              My Profile
            </span>
          </Link>
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
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-xl"
            >
              <Briefcase size={20} />
              Jobs
            </Link>

            <Link
              href="/dashboard/recently-applied"
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-xl"
            >
              <Clock size={20} />
              Recently Applied
            </Link>

            <Link
              href="/dashboard/saved-jobs"
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-xl"
            >
              <Bookmark size={20} />
              Saved Jobs
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-xl"
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

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-[#f1f1f1] shadow-lg px-4 py-3 flex items-center justify-around z-50">
        <Link
          href="/dashboard"
          className="flex flex-col items-center text-[#1F3064]"
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/dashboard/jobs"
          className="flex flex-col items-center text-gray-600"
        >
          <Briefcase size={20} />
          <span className="text-xs">Jobs</span>
        </Link>

        <Link
          href="/dashboard/recently-applied"
          className="flex flex-col items-center text-gray-600"
        >
          <Clock size={20} />
          <span className="text-xs">Applied</span>
        </Link>

        <Link
          href="/dashboard/saved-jobs"
          className="flex flex-col items-center text-gray-600"
        >
          <Bookmark size={20} />
          <span className="text-xs">Saved</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex flex-col items-center text-gray-600"
        >
          <Settings size={20} />
          <span className="text-xs">Settings</span>
        </Link>
      </nav>
    </section>
  );
}
