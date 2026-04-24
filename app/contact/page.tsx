import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <section>
      <div>
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 lg:mt-32 mt-28 mb-20">
        <div className="flex flex-col items-center">
          <p className="lg:text-xl text-[#1F3064] font-bold">Contact Us</p>
          <div className="w-28 h-0.5 bg-[#F0802D] mt-2"></div>
        </div>
        <div className="flex lg:flex-row flex-col items-center mx-auto justify-between lg:gap-28 gap-5 mt-10">
          <div className="space-y-4">
            <h1 className="text-lg lg:text-2xl font-medium lg:text-start md:text-center">
              Let’s Build Your Career Journey Together
            </h1>
            <p className="text-gray-600 lg:text-base text-sm lg:text-start md:text-center">
              Have questions about job opportunities, hiring talent, or career
              growth? Connect with{" "}
              <span className="text-[#1F3064]">
                Job<span className="text-[#F0802D]">Lify</span>
              </span>{" "}
              your trusted platform for discovering jobs, connecting with top
              employers, and unlocking new career possibilities.
            </p>
          </div>
          <div className="w-full max-w-md lg:max-w-lg md:max-w-lg">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              />
            </div>
            <div className="mb-5">
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
              />
            </div>
            <button className="bg-[#1F3064] text-white px-6 py-3 text-sm font-medium hover:bg-[#0d1a3a] transition rounded-sm cursor-pointer w-full">
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </section>
  );
}
