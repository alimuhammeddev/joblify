import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Clock3, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section>
      <div>
        <Navbar />
      </div>

      <div className="relative overflow-hidden bg-white px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pb-28 lg:pt-36">
        <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F0802D]">
              Contact Joblify
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-[#1F3064] md:text-4xl">
              Let&apos;s build your next career move together.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Have questions about opportunities, hiring talent, or career
              growth? Send us a note and our team will help you find the right
              direction.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-3xl border border-[#1F3064]/10 bg-white lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative overflow-hidden bg-[#1F3064] p-7 text-white sm:p-10">
              <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border-32 border-white/5" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ffad70]">
                  Start a conversation
                </p>
                <h2 className="mt-4 text-xl font-extrabold leading-tight sm:text-2xl">
                  We&apos;re here to help you move forward.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#c5cee3]">
                  Whether you are searching for your next role or building your
                  team, tell us what you need and we&apos;ll point you in the right
                  direction.
                </p>

                <div className="mt-10 space-y-6 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 text-[#ffad70]" size={19} />
                    <div>
                      <p className="font-bold">Email us</p>
                      <p className="mt-1 text-[#c5cee3]">support@joblify.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 text-[#ffad70]" size={19} />
                    <div>
                      <p className="font-bold">Find us</p>
                      <p className="mt-1 text-[#c5cee3]">Available wherever opportunity calls</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 text-[#ffad70]" size={19} />
                    <div>
                      <p className="font-bold">Response time</p>
                      <p className="mt-1 text-[#c5cee3]">Usually within one business day</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="p-7 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="full-name" className="mb-2 block text-sm font-bold text-[#1F3064]">
                    Full name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#1F3064]/15 px-4 py-3 text-sm text-[#1F3064] outline-none transition placeholder:text-slate-400 focus:border-[#F0802D] focus:ring-2 focus:ring-[#F0802D]/15"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#1F3064]">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#1F3064]/15 px-4 py-3 text-sm text-[#1F3064] outline-none transition placeholder:text-slate-400 focus:border-[#F0802D] focus:ring-2 focus:ring-[#F0802D]/15"
                    required
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="phone" className="mb-2 block text-sm font-bold text-[#1F3064]">
                  Phone number <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-[#1F3064]/15 px-4 py-3 text-sm text-[#1F3064] outline-none transition placeholder:text-slate-400 focus:border-[#F0802D] focus:ring-2 focus:ring-[#F0802D]/15"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-bold text-[#1F3064]">
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border border-[#1F3064]/15 px-4 py-3 text-sm text-[#1F3064] outline-none transition placeholder:text-slate-400 focus:border-[#F0802D] focus:ring-2 focus:ring-[#F0802D]/15"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F0802D] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#E67E22]"
              >
                Send message
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </section>
  );
}
