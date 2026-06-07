import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Bell,
  Lock,
  Camera,
  Save,
  LucideIcon,
} from "lucide-react";

type InputFieldProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export default function CompanySettings() {
  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">Company Settings</h1>

        <p className="text-gray-500 mt-2">
          Manage your company profile, branding, hiring contacts, and account
          preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Company Branding Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-fit">
          {/* Cover */}
          <div className="h-28 bg-[#1F3064]" />

          <div className="px-6 pb-6">
            {/* Logo */}
            <div className="-mt-12 relative w-fit mx-auto">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623"
                alt="Company Logo"
                className="w-24 h-24 rounded-2xl border-4 border-white object-cover"
              />

              <button className="absolute -bottom-2 -right-2 bg-[#F0802D] text-white p-2 rounded-full">
                <Camera size={15} />
              </button>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold text-[#1F3064]">
                TechNova Ltd
              </h2>

              <p className="text-sm text-gray-500">Software & Technology</p>
            </div>

            <button className="mt-6 w-full border border-[#1F3064] text-[#1F3064] py-2 rounded-xl hover:bg-[#1F3064] hover:text-white transition">
              Update Branding
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          {/* Company Info */}
          <h3 className="text-lg font-semibold text-[#1F3064] mb-5">
            Company Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <InputField
              icon={Building2}
              label="Company Name"
              value="TechNova Ltd"
            />

            <InputField icon={Globe} label="Website" value="www.technova.com" />

            <InputField
              icon={Mail}
              label="Company Email"
              value="contact@technova.com"
            />

            <InputField
              icon={Phone}
              label="Phone Number"
              value="+234 800 000 000"
            />

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Company Address
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">
                <MapPin size={18} className="text-gray-400 mr-3" />

                <input
                  className="w-full outline-none text-sm"
                  defaultValue="Abuja, Nigeria"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Company Description
              </label>

              <textarea
                rows={5}
                className="w-full border rounded-2xl p-4 outline-none resize-none"
                placeholder="Describe your company..."
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Notifications
            </h3>

            {[
              "Receive applicant notifications",
              "Get job performance updates",
              "Receive interview reminders",
            ].map((item) => (
              <div
                key={item}
                className="border rounded-xl p-4 flex items-center justify-between mb-3"
              >
                <div className="flex gap-3 items-center">
                  <Bell className="text-[#F0802D]" size={18} />
                  <span className="text-sm">{item}</span>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-[#F0802D] w-5 h-5"
                />
              </div>
            ))}
          </div>

          {/* Security */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Security
            </h3>

            <button className="border border-[#1F3064] px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-[#1F3064] hover:text-white transition">
              <Lock size={18} />
              Change Password
            </button>
          </div>

          {/* Save */}
          <div className="mt-10 flex justify-end">
            <button className="bg-[#1F3064] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({ icon: Icon, label, value }: InputFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 block mb-2">
        {label}
      </label>

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Icon size={18} className="text-gray-400 mr-3" />

        <input defaultValue={value} className="w-full outline-none text-sm" />
      </div>
    </div>
  );
}
