import { Search, MapPin, Wallet, Bookmark } from "lucide-react";

export default function Jobs() {
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
    <section className="bg-gray-50 min-h-screen mb-20">
      <div>
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1F3064]">
            Jobs
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 border rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                className="w-full outline-none text-sm"
              />
            </div>
            <button className="bg-[#1F3064] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
              Search Jobs
            </button>
          </div>
        </div>

        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-sm p-3 hover:shadow-md transition duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F3064]">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-[#F0802D] transition cursor-pointer">
                      <Bookmark size={20} />
                    </button>

                    <span className="text-xs bg-[#F0802D]/10 text-[#F0802D] px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
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
        </div>
      </div>
    </section>
  );
}