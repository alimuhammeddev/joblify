import { FaCheckCircle, FaBullseye, FaBolt, FaHandshake } from "react-icons/fa";

export default function Choose() {
  const features = [
    {
      title: "Verified Job Listings",
      desc: "We ensure all job postings are authentic, helping you avoid scams and focus on real opportunities.",
      icon: <FaCheckCircle />,
    },
    {
      title: "Smart Job Matching",
      desc: "Our platform connects you with jobs that match your skills, experience, and career goals.",
      icon: <FaBullseye />,
    },
    {
      title: "Fast Hiring Process",
      desc: "Apply easily and get connected with employers quickly, reducing delays in your job search.",
      icon: <FaBolt />,
    },
    {
      title: "For Employers & Talent",
      desc: "Whether you're hiring or job hunting, Joblify makes the process simple and efficient.",
      icon: <FaHandshake />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F0802D]">
              Why Joblify
            </p>
            <h2 className="max-w-md text-3xl font-extrabold leading-tight text-[#1F3064] sm:text-4xl">
              A better way to move your career forward.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:justify-self-end lg:text-lg">
            We bring clarity to the job search with trusted listings, smarter
            matches, and a simpler path from first search to first day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[#1F3064]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F0802D]/40 hover:shadow-xl hover:shadow-[#1F3064]/10"
            >
              <div className="mb-10 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1e8] text-2xl text-[#F0802D] transition group-hover:bg-[#F0802D] group-hover:text-white">
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-[#1F3064]/25">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1F3064]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {item.desc}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F0802D] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}