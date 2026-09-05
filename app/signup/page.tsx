"use client";

import { useState } from "react";
import { User, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import icon from "@/components/assets/icon.png";

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

      // Redirect to dashboard
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
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl md:p-8 p-4">

        <Link href="/">
          <Image src={icon} alt="icon" className="w-10" />
        </Link>

        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-[#1F3064]">
            Welcome to{" "}
            <span className="text-[#1F3064]">
              Job<span className="text-[#F0802D]">Lify</span>
            </span>
          </h1>

          <p className="text-gray-500">
            Create your Individual Joblify account
          </p>
        </div>

        {/* Account type */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          <div className="border border-[#1F3064] rounded-xl p-4 bg-[#f8fafc] shadow-sm">
            <div className="flex flex-col items-start gap-3">
              <div className="bg-[#1F3064] text-white p-3 rounded-lg">
                <User size={16} />
              </div>

              <h1 className="text-[#1F3064] font-bold text-sm">
                Individual Account
              </h1>
            </div>
          </div>

          <Link href="/companysignup">
            <div className="border border-[#1F3064] rounded-xl p-4 cursor-pointer hover:shadow-md hover:bg-[#fff7f1] transition duration-300">
              <div className="flex flex-col items-start gap-3">
                <div className="bg-[#F0802D] text-white p-3 rounded-lg">
                  <Building2 size={16} />
                </div>

                <h1 className="text-[#1F3064] font-bold text-sm">
                  Company Account
                </h1>
              </div>
            </div>
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              required
            />
          </div>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              required
              className="mt-1 rounded text-[#1F3064]"
            />

            <p className="text-[#1F3064]">
              I agree to the{" "}
              <a
                href="#"
                className="text-[#F0802D] hover:underline"
              >
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-sm text-[#1F3064] mt-6">
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