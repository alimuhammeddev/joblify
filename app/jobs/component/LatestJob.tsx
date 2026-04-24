import { MapPin, Wallet, Search } from "lucide-react";

export default function LatestJob() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "MoTechnologies",
      location: "Remote",
      type: "Full-time",
      salary: "₦300k - ₦500k",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Creative Labs",
      location: "Lagos, Nigeria",
      type: "Part-time",
      salary: "₦200k - ₦350k",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "TechCore",
      location: "Abuja, Nigeria",
      type: "Full-time",
      salary: "₦400k - ₦700k",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Innovate Hub",
      location: "Hybrid - Lagos",
      type: "Full-time",
      salary: "₦500k - ₦800k",
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "NextGen Solutions",
      location: "Remote",
      type: "Contract",
      salary: "₦350k - ₦600k",
    },
    {
      id: 6,
      title: "Data Analyst",
      company: "Insight Africa",
      location: "Abuja, Nigeria",
      type: "Full-time",
      salary: "₦250k - ₦450k",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 lg:mt-36 mt-28 mb-16">
      <div className="flex flex-col items-center mb-6">
        <p className="lg:text-xl font-semibold text-[#1F3064]">
          Latest Jobs
        </p>
        <div className="w-28 h-0.5 bg-[#F0802D] mt-2"></div>
        <p className="text-gray-500 mt-2 text-center max-w-2xl">
          Explore the latest job opportunities across various industries and
          locations.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F3064] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-[#1F3064]">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>

              <span className="text-xs bg-[#F0802D]/10 text-[#F0802D] px-3 py-1 rounded-full">
                {job.type}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#F0802D]" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Wallet size={16} className="text-[#F0802D]" />
                <span>{job.salary}</span>
              </div>
            </div>

            <button className="mt-6 w-full cursor-pointer bg-[#1F3064] text-white py-2 rounded-lg hover:bg-[#16254d] transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 border cursor-pointer border-[#1F3064] text-[#1F3064] rounded-lg hover:bg-[#1F3064] hover:text-white transition">
          View More Jobs
        </button>
      </div>
    </section>
  );
}