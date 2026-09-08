"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import joblify from "./assets/joblify.png";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Joblify home">
            <Image src={joblify} alt="Joblify" className="w-28" priority />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Jobs", "/jobs"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-semibold text-[#1F3064] transition hover:text-[#F0802D]"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#1F3064] transition hover:bg-[#f8f9fc]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-[#F0802D] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#E67E22]"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-[#1F3064] transition hover:bg-[#f8f9fc] md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen ? "max-h-96 pt-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 border-t border-[#1F3064]/10 pt-4">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Jobs", "/jobs"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 font-semibold text-[#1F3064] transition hover:bg-[#fff1e8] hover:text-[#F0802D]"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-[#1F3064]/15 px-4 py-2.5 text-center text-sm font-bold text-[#1F3064]"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-[#F0802D] px-4 py-2.5 text-center text-sm font-bold text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
