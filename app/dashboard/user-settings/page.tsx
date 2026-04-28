import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Camera,
  Save,
  Upload,
  FileText,
} from "lucide-react";

export default function UserSettings() {
  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F3064]">
          User Settings
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your profile information, security, notifications, and CV
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
              <button className="absolute bottom-1 right-1 bg-[#1F3064] text-white p-2 rounded-full hover:opacity-90 transition">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-[#1F3064]">
              King Rudy
            </h2>
            <p className="text-sm text-gray-500">Frontend Developer</p>

            <button className="mt-5 border border-[#1F3064] text-[#1F3064] px-5 py-2 rounded-lg hover:bg-[#1F3064] hover:text-white transition">
              Update Profile
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Full Name
              </label>
              <div className="flex items-center border rounded-xl px-4 py-3">
                <User size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  defaultValue="King Rudy"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Email Address
              </label>
              <div className="flex items-center border rounded-xl px-4 py-3">
                <Mail size={18} className="text-gray-400 mr-3" />
                <input
                  type="email"
                  defaultValue="kingrudy@email.com"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Phone Number
              </label>
              <div className="flex items-center border rounded-xl px-4 py-3">
                <Phone size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  defaultValue="+234 800 000 0000"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Password
              </label>
              <div className="flex items-center border rounded-xl px-4 py-3">
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  defaultValue="password123"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* CV Upload Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Resume / CV
            </h3>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F0802D]/10 p-3 rounded-xl">
                    <FileText size={22} className="text-[#F0802D]" />
                  </div>

                  <div>
                    <p className="font-medium text-sm text-[#1F3064]">
                      Upload Your CV
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, or DOCX (Max 5MB)
                    </p>
                  </div>
                </div>

                <label className="cursor-pointer bg-[#1F3064] text-white px-5 py-2 rounded-lg hover:bg-[#16254d] transition flex items-center gap-2">
                  <Upload size={16} />
                  Upload CV
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Notification Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between border rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-[#F0802D]" />
                  <div>
                    <p className="font-medium text-sm">Job Alerts</p>
                    <p className="text-xs text-gray-500">
                      Receive notifications for new job matches
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-[#F0802D]"
                />
              </div>

              <div className="flex items-center justify-between border rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-[#F0802D]" />
                  <div>
                    <p className="font-medium text-sm">
                      Application Updates
                    </p>
                    <p className="text-xs text-gray-500">
                      Get updates on your submitted applications
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-[#F0802D]"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-[#1F3064] text-white px-6 py-3 rounded-xl hover:bg-[#16254d] transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};