import {
  Users,
  Briefcase,
  Eye,
  Bell,
  MapPin,
  Clock,
  TrendingUp,
  Building2,
} from "lucide-react";
import Link from "next/link";

const activeJobs = [
  {
    title: "Frontend Developer",
    applicants: "45 Applicants",
    location: "Lagos, Nigeria",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    title: "UI/UX Designer",
    applicants: "28 Applicants",
    location: "Abuja, Nigeria",
    type: "Remote",
    posted: "1 day ago",
  },
  {
    title: "Backend Engineer",
    applicants: "63 Applicants",
    location: "Port Harcourt, Nigeria",
    type: "Hybrid",
    posted: "3 days ago",
  },
];

const recentActivities = [
  "New application received for Frontend Developer",
  "Backend Engineer job reached 60 applicants",
  "Interview scheduled with Sarah Johnson",
];

export default function CompanyDashboard() {
  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
            TechNova Ltd
          </h1>
        </div>

        <Link href="/company-dashboard/posted-job">
          <button className="bg-[#1F3064] text-white px-5 py-3 rounded-2xl font-medium hover:opacity-90 transition">
            Post New Job
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 mb-8">
        {[
          { label: "Posted Jobs", value: "12", icon: Briefcase },
          { label: "Total Applicants", value: "248", icon: Users },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <item.icon className="w-6 h-6 text-[#1F3064]" />
              <span className="text-2xl font-bold text-[#1F3064]">
                {item.value}
              </span>
            </div>

            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active Job Listings */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1F3064]">
              Active Job Listings
            </h2>

            <Link href="/company-dashboard/posted-job" className="text-sm text-[#1F3064] font-medium">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {activeJobs.map((job, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-[#F0802D]" />
                      <h3 className="font-semibold text-lg text-gray-800">
                        {job.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500">{job.applicants}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
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

                  <div className="flex gap-3">
                    <button className="border border-[#1F3064] text-[#1F3064] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1F3064] hover:text-white transition">
                      View Applicants
                    </button>

                    <button className="bg-[#1F3064] text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
                      Edit Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1F3064] mb-4">
              Recent Activity
            </h2>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 border-b pb-2 last:border-none"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
