import {
  Search,
  Briefcase,
  Bookmark,
  Bell,
  MapPin,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const recommendedJobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Lagos, Nigeria",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    title: "UI/UX Designer",
    company: "Pixel Studio",
    location: "Abuja, Nigeria",
    type: "Remote",
    posted: "1 day ago",
  },
  {
    title: "Backend Engineer",
    company: "CloudStack",
    location: "Port Harcourt, Nigeria",
    type: "Hybrid",
    posted: "3 days ago",
  },
];

const recentActivities = [
  "You applied for Product Designer at Creativex",
  "Your profile was viewed by DevCore",
  "Interview invitation from InsightHub",
];

export default function Dashboard() {
  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-8">
        <p className="text-sm text-gray-500">Welcome back</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F3064]">
          King Rudy
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Applied Jobs", value: "24", icon: Briefcase },
          { label: "Saved Jobs", value: "12", icon: Bookmark },
          { label: "Profile Views", value: "89", icon: TrendingUp },
          { label: "Interview Invites", value: "5", icon: Bell },
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1F3064]">
              Recommended Jobs
            </h2>
            <Link href="#" className="text-sm text-[#1F3064] font-medium">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {recommendedJobs.map((job, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">{job.company}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#F0802D]" />{" "}
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-[#F0802D]" />{" "}
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#F0802D]" />{" "}
                        {job.posted}
                      </span>
                    </div>
                  </div>

                  <button className="bg-[#1F3064] text-white px-5 py-2 rounded-xl text-sm font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
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

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#1F3064] mb-3">
              Profile Completion
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className="bg-[#1F3064] h-3 rounded-full w-[75%]" />
            </div>
            <p className="text-sm text-gray-500">
              Your profile is 75% complete
            </p>
            <button className="mt-4 w-full bg-[#1F3064] text-white py-2 rounded-xl font-medium">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
