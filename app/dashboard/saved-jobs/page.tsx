import { MapPin, Wallet, Bookmark, Trash2 } from "lucide-react";

export default function SavedJobs() {
  const savedJobs = [
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
  ];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F3064]">
          Saved Jobs
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage jobs you bookmarked for later applications
        </p>
      </div>

      <div className="grid gap-6">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-[#1F3064]">
                    {job.title}
                  </h2>

                  <span className="text-xs bg-[#F0802D]/10 text-[#F0802D] px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{job.company}</p>

                <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#F0802D]" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wallet size={16} className="text-[#F0802D]" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-[#1F3064] text-white px-5 py-2 rounded-lg hover:bg-[#16254d] transition cursor-pointer">
                  Apply Now
                </button>

                <button className="flex items-center justify-center gap-2 border border-red-200 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition cursor-pointer">
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};