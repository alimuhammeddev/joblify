import { User, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import icon from "@/components/assets/icon.png";

export default function Login() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg md:p-8 p-4">
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
            Sign in to access your Individual Joblify account
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
          <Link href="/login">
            <div className="border border-[#1F3064] rounded-xl p-4 cursor-pointer hover:shadow-md hover:bg-[#f8fafc] transition duration-300">
              <div className="flex flex-col items-start gap-3">
                <div className="bg-[#1F3064] text-white p-3 rounded-lg">
                  <User size={16} />
                </div>

                <div>
                  <h1 className="text-[#1F3064] font-bold text-sm ">
                    Individual Account
                  </h1>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/companylogin">
            <div className="border border-[#1F3064] rounded-xl p-4 cursor-pointer hover:shadow-md hover:bg-[#fff7f1] transition duration-300">
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
          </Link>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#1F3064] mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#1F3064]">
              <input type="checkbox" className="rounded text-[#1F3064]" />
              Remember me
            </label>
            <a href="#" className="text-[#F0802D] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1F3064] text-white py-2 rounded-md font-semibold hover:bg-[#16254d] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#1F3064] mt-6">
          New to Joblify?{" "}
          <a href="#" className="text-[#F0802D] font-medium hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </section>
  );
}
