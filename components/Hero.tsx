"use client";

import Image from "next/image";
import hero from "./assets/hero.png";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:mt-36 mt-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="lg:text-5xl text-3xl font-extrabold text-gray-700 leading-tight">
            Welcome to{" "}
            <span className="text-[#1F3064]">
              Job<span className="text-[#F0802D]">Lify</span>
            </span>
          </h1>

          <p className="mt-4 text-gray-600 lg:text-lg text-base leading-relaxed">
            Find your dream job faster with{" "}
            <span className="text-[#1F3064]">
              Job<span className="text-[#F0802D]">Lify</span>
            </span>
            . Explore curated opportunities, connect with employers, and take
            the next step in your career journey all in one place.
          </p>

          <div className="flex mt-5 w-full">
            <button className="w-full md:w-auto bg-[#F0802D] text-white px-6 py-3 rounded-lg hover:bg-[#E67E22] transition cursor-pointer">
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full max-w-md">
          <Image
            src={hero}
            alt="Hero Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
