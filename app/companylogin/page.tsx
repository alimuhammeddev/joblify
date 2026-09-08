"use client";

import { useState } from "react";
import { ArrowRight, Building2, LockKeyhole, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import icon from "@/components/assets/icon.png";
import { setAuthToast } from "@/components/AuthToast";

export default function CompanyLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setResetMessage("");
    setLoading(true);

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      setAuthToast("Logged in successfully.");
      router.push("/company-dashboard");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/user-not-found":
          setError("No account exists with this email.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;

        case "auth/configuration-not-found":
          setError(
            "Firebase Authentication is not configured correctly. Please check your Firebase project settings.",
          );
          break;

        default:
          setError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");

    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      setResetMessage(
        "Password reset instructions have been sent to your email.",
      );
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-not-found":
          setError("No account exists with this email.");
          break;

        default:
          setError("Unable to send password reset email. Please try again.");
      }
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F6F7FA] px-4 py-8 sm:px-6">
      <div className="relative w-full max-w-md rounded-3xl border border-white bg-white p-5 sm:p-8">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2"
        >
          <Image src={icon} alt="Joblify home" className="h-11 w-11" />
        </Link>

        {/* Heading */}
        <div className="mb-7 mt-7 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F0802D]">
            Company account
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F3064]">
            Welcome to Job<span className="text-[#F0802D]">Lify</span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Sign in to manage your hiring workspace.
          </p>
        </div>

        {/* Account Type */}
        <div className="mb-7 grid grid-cols-2 gap-3">
          {/* Individual Account */}
          <Link
            href="/login"
            className="rounded-2xl border border-gray-200 p-3.5 transition hover:border-[#1F3064] hover:bg-[#F7F9FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E7EBF5] text-[#1F3064]">
                <User size={17} />
              </span>
              <span className="text-xs font-bold leading-4 text-[#1F3064]">
                Individual
                <span className="block font-medium text-gray-500">
                  Switch account
                </span>
              </span>
            </div>
          </Link>

          {/* Company Account */}
          <div className="rounded-2xl border-2 border-[#F0802D] bg-[#FFF9F5] p-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0802D] text-white">
                <Building2 size={17} />
              </span>
              <span className="text-xs font-bold leading-4 text-[#1F3064]">
                Company
                <span className="block font-medium text-[#F0802D]">
                  Selected
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
            {error}
          </div>
        )}

        {/* Password Reset Success */}
        {resetMessage && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
            {resetMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <Mail size={18} className="shrink-0 text-gray-400" />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <LockKeyhole size={18} className="shrink-0 text-gray-400" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 text-[#1F3064]">
              <input type="checkbox" className="h-4 w-4 accent-[#1F3064]" />
              Remember me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-semibold text-[#F0802D] transition hover:text-[#d7671b] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3064] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#16254d] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        {/* Create Account */}
        <p className="mt-7 text-center text-sm text-[#1F3064]">
          New to Joblify?{" "}
          <Link
            href="/companysignup"
            className="text-[#F0802D] font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}
