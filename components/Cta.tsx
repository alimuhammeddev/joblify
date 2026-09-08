import { ArrowRight, Mail, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="mx-auto mb-16 mt-16 max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="relative isolate overflow-hidden rounded-4xl bg-[#101d40] shadow-2xl shadow-[#1F3064]/15">
        <div className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border border-white/10 sm:block" />
        <div className="grid gap-10 p-7 sm:p-10 md:p-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffad70]/40 bg-[#F0802D]/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ffad70]">
              <Sparkles size={14} />
              Stay in the know
            </div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              Good opportunities don&apos;t wait around.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#c5cee3] sm:text-base">
              Get fresh roles, practical career advice, and stories from
              ambitious teams delivered to your inbox.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0802D] text-white">
                <Mail size={19} />
              </span>
              <div>
                <p className="font-bold text-white">Join our newsletter</p>
                <p className="text-xs text-[#aebbd5]">
                  A little career momentum, weekly.
                </p>
              </div>
            </div>
            <form className="space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/15 bg-[#0b1734]/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#8090b0] focus:border-[#ffad70] focus:ring-2 focus:ring-[#F0802D]/25"
                required
              />
              <button
                type="submit"
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-[#1F3064] transition"
              >
                Subscribe for updates
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
