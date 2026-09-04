"use client";

import { User, Building2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import icon from "@/components/assets/icon.png";

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
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl md:p-8 p-4">
        {/* Logo */}
        <Link href="/">
          <Image src={icon} alt="icon" className="w-10" />
        </Link>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-[#1F3064]">
            Welcome to{" "}
            <span className="text-[#1F3064]">
              Job<span className="text-[#F0802D]">Lify</span>
            </span>
          </h1>

          <p className="text-gray-500">Create your Company Joblify account</p>
        </div>

        {/* Account Type */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
          {/* Individual */}
          <Link href="/signup">
            <div className="border border-[#1F3064] rounded-xl p-4 cursor-pointer hover:shadow-md hover:bg-[#f8fafc] transition duration-300">
              <div className="flex flex-col items-start gap-3">
                <div className="bg-[#1F3064] text-white p-3 rounded-lg">
                  <User size={16} />
                </div>

                <div>
                  <h1 className="text-[#1F3064] font-bold text-sm">
                    Individual Account
                  </h1>
                </div>
              </div>
            </div>
          </Link>

          {/* Company */}
          <div className="border border-[#1F3064] rounded-xl p-4 bg-[#fff7f1] shadow-sm">
            <div className="flex flex-col items-start gap-3">
              <div className="bg-[#F0802D] text-white p-3 rounded-lg">
                <Building2 size={16} />
              </div>

              <div>
                <h1 className="text-[#1F3064] font-bold text-sm">
                  Company Account
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Company Name
            </label>

            <input
              type="text"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          {/* Company Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Company Email
            </label>

            <input
              type="email"
              placeholder="Enter company email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Industry
            </label>

            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter company phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className="mt-1 rounded text-[#1F3064]"
            />

            <p className="text-[#1F3064]">
              I agree to the{" "}
              <a href="#" className="text-[#F0802D] hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F3064] text-white py-2 rounded-md font-semibold hover:bg-[#16254d] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Company Account"}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-[#1F3064] mt-6">
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
