import {
  Bell,
  Briefcase,
  CheckCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";

export default function CompanyNotification() {
  const notifications = [
    {
      id: 1,
      title: "New Application Received",
      message:
        "12 candidates applied for Frontend Developer at MoTechnologies.",
      time: "2 hours ago",
      icon: <Briefcase size={18} />,
      unread: true,
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message:
        "UI/UX Designer interview with Creative Labs has been scheduled.",
      time: "Yesterday",
      icon: <Calendar size={18} />,
      unread: true,
    },
    {
      id: 3,
      title: "Job Performance Update",
      message:
        "Backend Engineer posting has reached 60+ applicants.",
      time: "2 days ago",
      icon: <CheckCircle size={18} />,
      unread: false,
    },
    {
      id: 4,
      title: "New Message",
      message:
        "A candidate responded to your message regarding TechCore role.",
      time: "3 days ago",
      icon: <MessageSquare size={18} />,
      unread: false,
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">

      {/* Header */}
      <div className="mb-6">
        <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
          Notifications
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Stay updated with hiring activity and company events
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#F0802D]/10 p-3 rounded-xl">
            <Bell size={22} className="text-[#F0802D]" />
          </div>

          <div>
            <h2 className="font-semibold text-[#1F3064]">
              You have {notifications.filter(n => n.unread).length} unread notifications
            </h2>

            <p className="text-sm text-gray-500">
              Latest updates from your hiring dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl p-5 shadow-sm border transition ${
              item.unread
                ? "border-[#F0802D]/30"
                : "border-gray-100"
            }`}
          >
            <div className="flex gap-4">

              {/* Icon */}
              <div className="bg-[#F0802D]/10 text-[#F0802D] p-3 rounded-xl h-fit">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1">

                <div className="flex justify-between gap-3 flex-wrap">

                  <h3 className="font-semibold text-[#1F3064]">
                    {item.title}
                  </h3>

                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {item.time}
                  </span>

                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {item.message}
                </p>

                {item.unread && (
                  <span className="inline-block mt-3 w-2 h-2 rounded-full bg-[#F0802D]" />
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};