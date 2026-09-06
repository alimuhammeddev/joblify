"use client";

import { Bell, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserActivity } from "@/lib/userActivity";

export default function UserNotification() {
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setActivities(user ? getUserActivity(user.uid).recentActivities : []);
    });
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#1F3064]">
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
                {activities.length === 0
                  ? "No activity yet"
                  : `${activities.length} recent platform ${activities.length === 1 ? "activity" : "activities"}`}
              </h2>
              <p className="text-sm text-gray-500">
                Review your latest updates
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Notifications List */}
      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center text-gray-500">
          Your platform activity will appear here.
        </div>
      ) : (
      <div className="grid gap-5">
        {activities.map((activity, index) => (
          <div
            key={`${activity}-${index}`}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300 border border-[#F0802D]/30"
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="bg-[#F0802D]/10 text-[#F0802D] p-3 rounded-xl h-fit">
                <CheckCircle size={18} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#1F3064]">Platform Activity</h3>
                  </div>

                  <p className="text-xs text-gray-400">Recent</p>
                </div>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {activity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
};