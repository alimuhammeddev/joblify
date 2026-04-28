import {
  Bell,
  Briefcase,
  CheckCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";

export default function UserNotification() {
  const notifications = [
    {
      id: 1,
      title: "Application Update",
      message:
        "Your application for Frontend Developer at MoTechnologies is now under review.",
      time: "2 hours ago",
      icon: <Briefcase size={18} />,
      unread: true,
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message:
        "You have been invited for an interview with Creative Labs for the UI/UX Designer role.",
      time: "Yesterday",
      icon: <Calendar size={18} />,
      unread: true,
    },
    {
      id: 3,
      title: "New Job Match",
      message:
        "A new Backend Engineer role matches your profile preferences.",
      time: "2 days ago",
      icon: <CheckCircle size={18} />,
      unread: false,
    },
    {
      id: 4,
      title: "Message from Recruiter",
      message:
        "A recruiter from TechCore sent you a message regarding your application.",
      time: "3 days ago",
      icon: <MessageSquare size={18} />,
      unread: false,
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F3064]">
          Notifications
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Stay updated with your job applications and recruiter activities
        </p>
      </div>

      {/* Notification Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#F0802D]/10 p-3 rounded-xl">
              <Bell size={22} className="text-[#F0802D]" />
            </div>

            <div>
              <h2 className="font-semibold text-[#1F3064]">
                You have 2 unread notifications
              </h2>
              <p className="text-sm text-gray-500">
                Review your latest updates
              </p>
            </div>
          </div>

          <button className="border border-[#1F3064] text-[#1F3064] px-5 py-2 rounded-lg hover:bg-[#1F3064] hover:text-white transition cursor-pointer">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="grid gap-5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300 border ${
              item.unread
                ? "border-[#F0802D]/30"
                : "border-transparent"
            }`}
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="bg-[#F0802D]/10 text-[#F0802D] p-3 rounded-xl h-fit">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#1F3064]">
                      {item.title}
                    </h3>

                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#F0802D]"></span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.message}
                </p>

                <div className="mt-4 flex gap-3">
                  <button className="text-sm font-medium text-[#1F3064] hover:underline">
                    View Details
                  </button>

                  <button className="text-sm font-medium text-gray-500 hover:underline">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};