import Image from "next/image";
import Link from "next/link";
import about from "./assets/about.jpg";

export default function AboutUS() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#F0802D]">
            About Joblify
          </p>

          <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-[#1F3064] md:text-4xl">
            Where ambition meets its next <span className="text-[#F0802D]">opportunity.</span>
          </h1>

          <div className="mt-7 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>
              Joblify is a modern job platform built to bridge the gap between
              job seekers and employers. We make the hiring process faster,
              smarter, and more accessible for everyone.
            </p>
            <p>
              Whether you are finding your next career move or searching for
              exceptional talent, Joblify gives you the tools to move forward
              with confidence.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-xl bg-[#F0802D] px-6 py-3.5 font-bold text-white transition hover:bg-[#E67E22]"
            >
              Find your next role
            </Link>
            <Link
              href="/companysignup"
              className="inline-flex items-center justify-center rounded-xl border border-[#1F3064]/15 px-6 py-3.5 font-bold text-[#1F3064] transition duration-500 hover:bg-[#1F3064] hover:text-white"
            >
              Post a job
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-[#1F3064]/10 pt-6">
            <div>
              <p className="text-2xl font-extrabold text-[#1F3064]">100+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active seekers
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#1F3064]">50+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Trusted employers
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#1F3064]">24/7</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Opportunities
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -bottom-5 -left-1 z-10 rounded-2xl bg-[#1F3064] px-5 py-4 text-white sm:-left-8">
            <p className="text-sm font-bold text-[#F0802D]">Built for progress</p>
            <p className="mt-1 text-xs text-white">One better connection at a time.</p>
          </div>
          <div className="rounded-4xl border border-[#1F3064]/10 bg-[#f8f9fc] p-3 sm:p-4">
            <Image
              src={about}
              alt="Professionals connecting through Joblify"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
