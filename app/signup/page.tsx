"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  LockKeyhole,
  Mail,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import icon from "@/components/assets/icon.png";
import { setAuthToast } from "@/components/AuthToast";

export default function Signup() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    // Validate name
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user's name to Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        fullName: fullName.trim(),
        email: userCredential.user.email,
        accountType: "individual",
        createdAt: serverTimestamp(),
      });

      setAuthToast("Account created successfully.");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Your password is too weak.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F6F7FA] px-4 py-8 sm:px-6">

      <div className="relative w-full max-w-md rounded-3xl border border-white bg-white p-5 sm:p-8">

        <Link
          href="/"
          className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2"
        >
          <Image src={icon} alt="Joblify home" className="h-11 w-11" />
        </Link>

        <div className="mb-7 mt-7 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F0802D]">
            Create your profile
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F3064]">
            Join Job<span className="text-[#F0802D]">Lify</span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Create your individual account and find work that moves you forward.
          </p>
        </div>

        {/* Account type */}
        <div className="mb-7 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border-2 border-[#1F3064] bg-[#F7F9FC] p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1F3064] text-white">
                <User size={17} />
              </span>
              <span className="text-xs font-bold leading-4 text-[#1F3064]">
                Individual
                <span className="block font-medium text-gray-500">Selected</span>
              </span>
            </div>
          </div>

          <Link
            href="/companysignup"
            className="rounded-2xl border border-gray-200 p-3.5 transition hover:border-[#F0802D] hover:bg-[#FFF9F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDE6D5] text-[#F0802D]">
                <Building2 size={17} />
              </span>
              <span className="text-xs font-bold leading-4 text-[#1F3064]">
                Company
                <span className="block font-medium text-gray-500">Switch account</span>
              </span>
            </div>
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <UserRound size={18} className="shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <Mail size={18} className="shrink-0 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
                required
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Confirm Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <LockKeyhole size={18} className="shrink-0 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 accent-[#1F3064]"
            />

            <p className="text-[#1F3064]">
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-[#F0802D] hover:underline"
              >
                Terms & Conditions
              </a>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3064] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#16254d] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0802D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <ArrowRight size={17} />}
          </button>

        </form>

        <p className="mt-7 text-center text-sm text-[#1F3064]">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-[#F0802D] font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </section>
  );
}