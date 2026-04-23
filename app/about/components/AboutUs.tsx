import Image from "next/image";
import about from "./assets/about.jpg";

export default function AboutUS() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 lg:mt-36 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-5">
          <div>
            <p className="text-[#1F3064] font-bold uppercase tracking-wide lg:text-start text-center">
              About{" "}
              <span className="text-[#1F3064]">
                Job<span className="text-[#F0802D]">Lify</span>
              </span>
            </p>

            <h1 className="mt-2 text-3xl md:text-5xl font-medium text-[#1F3064] leading-tight lg:text-start text-center">
              Connecting Talent with{" "}
              <span className="text-[#F0802D]">Opportunity</span>
            </h1>

            <p className="mt-4 md:text-lg text-gray-600">
              <span className="text-[#1F3064]">
                Job<span className="text-[#F0802D]">Lify</span>
              </span>{" "}
              is a modern job platform built to bridge the gap between job
              seekers and employers. We simplify the hiring process, making it
              faster, smarter, and more accessible for everyone.
            </p>

            <p className="mt-4 md:text-lg text-gray-600">
              Whether you're looking for your next career move or searching for
              top talent,{" "}
              <span className="text-[#1F3064]">
                Job<span className="text-[#F0802D]">Lify</span>
              </span>{" "}
              gives you the tools to succeed.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="w-auto bg-[#F0802D] text-white px-6 py-3 rounded-xl hover:bg-[#E67E22] transition cursor-pointer">
                Find Jobs
              </button>

              <button className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
                Post a Job
              </button>
            </div>
          </div>

          <div>
            <Image src={about} alt="About JobLify" className="rounded-lg"/>
          </div>
        </div>
      </div>
    </section>
  );
}
