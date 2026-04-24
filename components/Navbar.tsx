"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import joblify from "./assets/joblify.png";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm top-0 z-50 fixed">
      <div className="max-w-7xl mx-auto md:px-6 px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Image src={joblify} alt="Brand Logo" className="w-28" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a
            href="/"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            About
          </a>
          <a
            href="/jobs"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            Jobs
          </a>
          <a
            href="/contact"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            Contact
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <button className="text-[#1F3064] border border-[#1F3064] px-4 py-2 rounded-lg hover:text-[#FFFFFF] hover:bg-[#1F3064] hover:border-[#1F3064] cursor-pointer transition">
              Login
            </button>
          </Link>
          <button className="bg-[#F0802D] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#E67E22] transition">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-4 text-gray-700 font-medium">
          <a
            href="/"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            About
          </a>
          <a
            href="/jobs"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            Jobs
          </a>
          <a
            href="/contact"
            className="hover:text-[#F0802D] text-[#1F3064] transition"
          >
            Contact
          </a>

          <button className="text-[#1F3064] py-2 border border-[#1F3064] rounded-lg cursor-pointer">
            Login
          </button>
          <button className="bg-[#F0802D] text-white py-2 rounded-lg hover:bg-[#E67E22]">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
