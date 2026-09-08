import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import footer from "./assets/footer.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#101d40] text-white">
      <div className="relative mx-auto max-w-7xl py-14 px-4 sm:px-6 lg:px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-8">
          <div className="max-w-xs">
            <Link href="/" aria-label="Joblify home" className="inline-block">
              <Image src={footer} alt="Joblify" className="w-28" />
            </Link>
            <p className="mt-3 text-sm leading-7 text-[#c5cee3]">
              A better way to find meaningful work and build teams that do their
              best work.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[FaInstagram, FaLinkedinIn, FaTwitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={["Instagram", "LinkedIn", "Twitter"][index]}
                  className="rounded-full border border-white/15 p-2.5 text-[#c5cee3] transition hover:border-[#ffad70] hover:bg-[#F0802D] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Explore"
            links={[
              ["Browse jobs", "/jobs"],
              ["About Joblify", "/about"],
              ["Contact us", "/contact"],
            ]}
          />
          <FooterColumn
            title="For companies"
            links={[
              ["Post a job", "/company-signup"],
              ["Company login", "/companylogin"],
              ["Create account", "/companysignup"],
            ]}
          />

          <div>
            <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.16em] text-[#ffad70]">
              Say hello
            </h3>
            <ul className="space-y-4 text-sm text-[#c5cee3]">
              <li className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 shrink-0 text-[#ffad70]" />
                <a
                  href="mailto:support@joblify.com"
                  className="transition hover:text-white"
                >
                  support@joblify.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 shrink-0 text-[#ffad70]" />
                <a
                  href="tel:+2347066678899"
                  className="transition hover:text-white"
                >
                  +234 706 66 78899
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[#ffad70]" />
                <span>Abuja, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#9eabc8] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Joblify. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white">
              Privacy policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.16em] text-[#ffad70]">
        {title}
      </h3>
      <ul className="space-y-4 text-sm text-[#c5cee3]">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 transition hover:text-white"
            >
              {label}
              <ArrowUpRight
                size={13}
                className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
