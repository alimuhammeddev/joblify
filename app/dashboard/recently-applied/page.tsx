import { MapPin, Wallet, Clock, CheckCircle } from "lucide-react";

export default function RecentlyApplied() {
  const appliedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "MoTechnologies",
      location: "Remote",
      salary: "₦300k - ₦500k",
      appliedDate: "2 days ago",
      status: "Under Review",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Creative Labs",
      location: "Lagos, Nigeria",
      salary: "₦200k - ₦350k",
      appliedDate: "5 days ago",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "TechCore",
      location: "Abuja, Nigeria",
      salary: "₦400k - ₦700k",
      appliedDate: "1 week ago",
      status: "Application Sent",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Innovate Hub",
      location: "Hybrid - Lagos",
      salary: "₦500k - ₦800k",
      appliedDate: "3 days ago",
      status: "Shortlisted",
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F3064]">
          Recently Applied
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Track your latest job applications and their progress
        </p>
      </div>

      <div className="grid gap-6">
        {appliedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-6 transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Left Section */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#1F3064]">
                  {job.title}
                </h2>
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

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#F0802D]" />
                    <span>Applied {job.appliedDate}</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-start md:items-end gap-4">
                <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-sm font-medium">
                  <CheckCircle size={16} />
                  <span>{job.status}</span>
                </div>

                <button className="border border-[#1F3064] text-[#1F3064] px-5 py-2 rounded-lg hover:bg-[#1F3064] hover:text-white transition cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};