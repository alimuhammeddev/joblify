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
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserActivity } from "@/lib/userActivity";
import { signOut } from "firebase/auth";
import { setAuthToast } from "@/components/AuthToast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    const updateUnreadCount = () => {
      setUnreadCount(user ? getUserActivity(user.uid).unreadCount : 0);
    };

    updateUnreadCount();
    window.addEventListener("storage", updateUnreadCount);
    window.addEventListener("joblify-activity-updated", updateUnreadCount);
    window.addEventListener("joblify-notifications-read", updateUnreadCount);
    return () => {
      window.removeEventListener("storage", updateUnreadCount);
      window.removeEventListener("joblify-activity-updated", updateUnreadCount);
      window.removeEventListener(
        "joblify-notifications-read",
        updateUnreadCount,
      );
    };
  }, [user]);

  useEffect(() => {
    if (!showDropdown) return;

    const closeDropdown = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowDropdown(false);
    };

    document.addEventListener("pointerdown", closeDropdown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeDropdown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [showDropdown]);

  const isActive = (path: string) => pathname === path;
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col overflow-hidden pt-20">
      {/* Top Navbar */}
      <header className="w-full bg-[#f1f1f1] px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 h-16">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Image src={joblify} alt="joblify" className="w-28" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard/user-notification" className="relative">
            <Bell className="text-gray-700 hover:text-[#1F3064]" />
            {unreadCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F0802D] px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-expanded={showDropdown}
              aria-haspopup="menu"
              className="flex cursor-pointer items-center gap-2 rounded-xl p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FDE6D5] text-[#1F3064] transition">
                <User size={18} />
              </div>
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-[#1F3064]/10"
                role="menu"
              >
                <div className="border-b border-[#F5D4B8] bg-[#FFF4EA] px-4 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F0802D]">
                    Account
                  </p>
                  <h3 className="mt-1 truncate font-bold text-[#1F3064]">
                    {user?.displayName || "User"}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {user?.email || "No email available"}
                  </p>
                </div>

                <div className="space-y-1 p-2">
                  <Link
                    href="/dashboard/user-settings"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 transition hover:bg-gray-50 hover:text-[#1F3064]"
                    role="menuitem"
                  >
                    <Settings size={17} />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>

                  <Link
                    href="/dashboard/help-support"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 transition hover:bg-gray-50 hover:text-[#1F3064]"
                    role="menuitem"
                  >
                    <HelpCircle size={17} />
                    <span className="text-sm font-medium">Help & Support</span>
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    onClick={async () => {
                      await signOut(auth);
                      setShowDropdown(false);
                      setAuthToast("Logged out successfully.");
                      router.push("/login");
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-red-500 transition hover:bg-red-50"
                    role="menuitem"
                  >
                    <LogOut size={17} />
                    <span className="text-sm font-medium">Logout</span>
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
        <aside className="hidden md:flex flex-col w-72 min-h-screen bg-[#f1f1f1] p-6 fixed top-16 left-0 bottom-0">
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
