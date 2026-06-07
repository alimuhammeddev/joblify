import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  Users,
} from "lucide-react";

const postedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    applicants: 45,
    location: "Lagos, Nigeria",
    type: "Full-time",
    posted: "2 days ago",
    status: "Open",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    applicants: 28,
    location: "Abuja, Nigeria",
    type: "Remote",
    posted: "1 day ago",
    status: "Open",
  },
  {
    id: 3,
    title: "Backend Engineer",
    applicants: 63,
    location: "Port Harcourt, Nigeria",
    type: "Hybrid",
    posted: "3 days ago",
    status: "Closed",
  },
];

export default function PostedJob() {
  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-gray-500">
            Manage your openings
          </p>

          <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
            Posted Jobs
          </h1>
        </div>

        <button className="bg-[#1F3064] text-white px-5 py-3 rounded-2xl font-medium hover:opacity-90 transition">
          + Post New Job
        </button>
      </div>

      {/* Jobs */}
      <div className="space-y-5">
        {postedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              {/* Left Content */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-[#F0802D]" />

                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4 text-[#F0802D]" />
                  {job.applicants} Applicants
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                  
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#F0802D]" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-[#F0802D]" />
                    {job.type}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#F0802D]" />
                    {job.posted}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="border border-[#1F3064] text-[#1F3064] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1F3064] hover:text-white transition">
                  View Applicants
                </button>

                <button className="bg-[#1F3064] text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
                  Edit Job
                </button>

                <button className="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500 hover:text-white transition">
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}