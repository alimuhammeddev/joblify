"use client";

import { useState } from "react";
import { User, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import icon from "@/components/assets/icon.png";

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
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Login successful
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
            "Firebase Authentication is not configured correctly. Please check your Firebase project settings."
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
        "Password reset instructions have been sent to your email."
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
          setError(
            "Unable to send password reset email. Please try again."
          );
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl md:p-8 p-4">

        {/* Logo */}
        <Link href="/">
          <Image
            src={icon}
            alt="icon"
            className="w-10"
          />
        </Link>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-[#1F3064]">
            Welcome to{" "}
            <span className="text-[#1F3064]">
              Job<span className="text-[#F0802D]">Lify</span>
            </span>
          </h1>

          <p className="text-gray-500">
            Sign in to access your Company Joblify account
          </p>
        </div>

        {/* Account Type */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">

          {/* Individual Account */}
          <Link href="/login">
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

          {/* Company Account */}
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

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Password Reset Success */}
        {resetMessage && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            {resetMessage}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-[#1F3064]">
              <input
                type="checkbox"
                className="rounded text-[#1F3064]"
              />

              Remember me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#F0802D] hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F3064] text-white py-2 rounded-md font-semibold hover:bg-[#16254d] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {/* Create Account */}
        <p className="text-center text-sm text-[#1F3064] mt-6">
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