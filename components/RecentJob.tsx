import { MapPin, Wallet } from "lucide-react";

export default function RecentJob() {
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
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 mt-16 mb-16">
      <div className="flex flex-col items-center mb-12">
        <p className="lg:text-xl font-semibold text-[#1F3064]">Latest Jobs</p>
        <div className="w-28 h-0.5 bg-[#F0802D] mt-2"></div>
        <p className="text-gray-500 mt-2 text-center max-w-2xl">
          Explore the latest job opportunities across various industries and
          locations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
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

      <div className="flex justify-center mt-12">
        <button className="px-6 py-2 border cursor-pointer border-[#1F3064] text-[#1F3064] rounded-lg hover:bg-[#1F3064] hover:text-white transition">
          View More Jobs
        </button>
      </div>
    </section>
  );
}
