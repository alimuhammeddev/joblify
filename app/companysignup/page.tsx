"use client";

import {
  ArrowRight,
  Building2,
  ChevronDown,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import icon from "@/components/assets/icon.png";
import { setAuthToast } from "@/components/AuthToast";

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

export default function CompanySignup() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    // Validate company name
    if (!companyName.trim()) {
      setError("Please enter your company name.");
      return;
    }

    // Validate industry
    if (!industry) {
      setError("Please select your industry.");
      return;
    }

    // Validate phone
    if (!phone.trim()) {
      setError("Please enter your company phone number.");
      return;
    }

    // Validate passwords
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate terms
    if (!termsAccepted) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: companyName,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        companyName: companyName,
        email: user.email,
        industry: industry,
        phone: phone,
        accountType: "company",
        createdAt: serverTimestamp(),
      });

      setAuthToast("Account created successfully.");
      router.push("/company-dashboard");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid company email address.");
          break;

        case "auth/weak-password":
          setError("Your password is too weak. Use at least 6 characters.");
          break;

        case "auth/configuration-not-found":
          setError(
            "Firebase Authentication is not configured correctly. Please check your Firebase settings.",
          );
          break;

        case "permission-denied":
          setError(
            "Unable to save company information. Please check your Firestore security rules.",
          );
          break;

        default:
          setError(
            "Something went wrong while creating your account. Please try again.",
          );
      }
    } finally {
      setLoading(false);
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
            Create your company profile
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F3064]">
            Grow with Job<span className="text-[#F0802D]">Lify</span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Build your hiring presence and connect with great candidates.
          </p>
        </div>

        {/* Account Type */}
        <div className="mb-7 grid grid-cols-2 gap-3">
          {/* Individual */}
          <Link
            href="/signup"
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

          {/* Company */}
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

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Company Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <Building2 size={18} className="shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Company Email */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Company Email
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

          {/* Industry */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Industry
            </label>

            <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
                className="w-full appearance-none bg-transparent px-4 py-3 text-sm text-gray-700 outline-none"
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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1F3064]">
              Phone Number
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#1F3064] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1F3064]/15">
              <Phone size={18} className="shrink-0 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter company phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
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
                required
                className="w-full bg-transparent text-sm text-[#1F3064] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
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
            {loading ? "Creating Account..." : "Create Company Account"}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-[#1F3064]">
          Already have a company account?{" "}
          <Link
            href="/companylogin"
            className="text-[#F0802D] font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
