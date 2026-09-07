"use client";

import Image from "next/image";
import hero from "./assets/hero.png";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-8">
        <div className="max-w-xl text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F0802D] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#F0802D]">
            <span className="h-2 w-2 rounded-full bg-[#F0802D]" />
            Your next chapter starts here
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-[#1F3064] sm:text-5xl lg:text-7xl">
            Find work that feels <span className="text-[#F0802D]">right.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
            Discover meaningful opportunities, meet ambitious teams, and take
            the next confident step in your career with Joblify.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/jobs"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F0802D] px-6 py-3.5 font-bold text-white transition hover:bg-[#E67E22] sm:w-auto"
            >
              Explore open roles
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1F3064]/15 bg-white px-6 py-3.5 font-bold text-[#1F3064] transition duration-500 hover:border-[#1F3064]/30 hover:bg-[#1F3064] hover:text-white sm:w-auto"
            >
              <Play size={16} fill="currentColor" />
              How it works
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#F0802D]" /> Verified listings
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#F0802D]" /> Fast applications
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="absolute -right-3 -top-3 z-10 hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#1F3064] sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff1e8] text-[#F0802D]">
              <Search size={17} />
            </span>
            Opportunities made visible
          </div>
          <div className="rounded-4xl border border-white/80 bg-white/60 p-2 backdrop-blur-sm sm:p-3">
            <Image
              src={hero}
              alt="Professionals exploring opportunities on Joblify"
              priority
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-3 z-10 rounded-2xl bg-[#1F3064] px-4 py-3 text-white sm:-left-6">
            <p className="text-xl font-extrabold">100+</p>
            <p className="text-xs text-white/70">career possibilities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
