"use client";

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
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { useCompanySettingsStore } from "@/lib/companySettingsStore";
import { recordCompanyActivity } from "@/lib/companyActivity";

type CompanyProfile = {
  companyName?: string;
  email?: string;
  industry?: string;
  phone?: string;
  website?: string;
  address?: string;
  description?: string;
  logoUrl?: string;
  applicantNotifications?: boolean;
  performanceUpdates?: boolean;
  interviewReminders?: boolean;
};

const MAX_LOGO_SIZE = 5 * 1024 * 1024;
const industries = [
  "Information Technology",
  "Software Development",
  "FinTech",
  "Banking & Finance",
  "Healthcare",
  "Education",
  "Telecommunications",
  "Manufacturing",
  "Construction",
  "Real Estate",
  "Oil & Gas",
  "Energy & Utilities",
  "Agriculture",
  "Transportation & Logistics",
  "Retail & E-commerce",
  "Media & Entertainment",
  "Hospitality & Tourism",
  "Consulting",
  "Government",
  "Non-Profit",
  "Human Resources",
  "Marketing & Advertising",
  "Legal Services",
  "Security Services",
  "Other",
];

export default function CompanySettings() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const {
    profile,
    showPasswordForm,
    loading,
    saving,
    message,
    error,
    updateProfile,
    setShowPasswordForm,
    setLoading,
    setSaving,
    setMessage,
    setError,
    resetProfile,
    resetFeedback,
  } = useCompanySettingsStore();
  const {
    companyName,
    email,
    industry,
    phone,
    website,
    address,
    description,
    logoUrl,
    applicantNotifications,
    performanceUpdates,
    interviewReminders,
  } = profile;

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        resetProfile();
        setLoading(false);
        return;
      }

      resetProfile();
      updateProfile({
        companyName: currentUser.displayName || "",
        email: currentUser.email || "",
      });
      try {
        const profileSnapshot = await getDoc(doc(db, "users", currentUser.uid));
        const profile = profileSnapshot.data() as CompanyProfile | undefined;
        if (profile) {
          updateProfile({
            companyName: profile.companyName || currentUser.displayName || "",
            email: profile.email || currentUser.email || "",
            industry: profile.industry || "",
            phone: profile.phone || "",
            website: profile.website || "",
            address: profile.address || "",
            description: profile.description || "",
            logoUrl: profile.logoUrl || "",
            applicantNotifications: profile.applicantNotifications ?? true,
            performanceUpdates: profile.performanceUpdates ?? true,
            interviewReminders: profile.interviewReminders ?? true,
          });
        }
      } catch {
        setError("We could not load your saved company details.");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const handleLogoChange = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_LOGO_SIZE) {
      setError("Company logos must be smaller than 5MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image for your company logo.");
      return;
    }
    setError("");
    setLogoFile(file);
    updateProfile({ logoUrl: URL.createObjectURL(file) });
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();
    const currentUser = user || auth.currentUser;
    if (!currentUser) {
      setError("Please sign in before saving your company profile.");
      return;
    }

    setSaving(true);
    try {
      let savedLogoUrl = logoUrl;
      if (logoFile) {
        const logoReference = ref(
          storage,
          `companies/${currentUser.uid}/logos/${logoFile.name}`,
        );
        await uploadBytes(logoReference, logoFile);
        savedLogoUrl = await getDownloadURL(logoReference);
      }

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          uid: currentUser.uid,
          companyName: companyName.trim(),
          email: email.trim(),
          industry,
          phone: phone.trim(),
          website: website.trim(),
          address: address.trim(),
          description: description.trim(),
          logoUrl: savedLogoUrl,
          accountType: "company",
          applicantNotifications,
          performanceUpdates,
          interviewReminders,
        },
        { merge: true },
      );

      if (
        companyName.trim() &&
        companyName.trim() !== currentUser.displayName
      ) {
        await updateFirebaseProfile(currentUser, {
          displayName: companyName.trim(),
        });
      }
      updateProfile({ logoUrl: savedLogoUrl });
      recordCompanyActivity(currentUser.uid, "You updated your company settings");
      setLogoFile(null);
      setMessage("Your company changes have been saved.");
    } catch {
      setError("We could not save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <section className="min-h-screen bg-gray-50 p-6">
        Loading settings...
      </section>
    );

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-8">
        <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
          Company Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your company profile, branding, hiring contacts, and account
          preferences.
        </p>
      </div>

      {!user && (
        <Notice kind="error">
          Please sign in to manage your company profile.
        </Notice>
      )}
      {error && <Notice kind="error">{error}</Notice>}
      {message && <Notice kind="success">{message}</Notice>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-fit">
          <div className="h-28 bg-[#1F3064]" />
          <div className="px-6 pb-6">
            <div className="-mt-12 relative w-fit mx-auto">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Company Logo"
                  className="w-24 h-24 rounded-2xl border-4 border-white object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-gray-100 flex items-center justify-center text-[#1F3064]">
                  <Building2 size={36} />
                </div>
              )}
              <label className="absolute -bottom-2 -right-2 bg-[#F0802D] text-white p-2 rounded-full cursor-pointer">
                <Camera size={15} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    handleLogoChange(event.target.files?.[0])
                  }
                />
              </label>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold text-[#1F3064]">
                {companyName || "Company"}
              </h2>
              <p className="text-sm text-gray-500">
                {industry || "Add your industry"}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-[#1F3064] mb-5">
            Company Information
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field
              icon={Building2}
              label="Company Name"
              value={companyName}
              onChange={(value) => updateProfile({ companyName: value })}
            />
            <Field
              icon={Globe}
              label="Website"
              value={website}
              onChange={(value) => updateProfile({ website: value })}
              placeholder="https://example.com"
            />
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Company Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                <Mail size={18} className="text-gray-400 mr-3" />
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>
            <Field
              icon={Phone}
              label="Phone Number"
              value={phone}
              onChange={(value) => updateProfile({ phone: value })}
            />
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Industry
              </label>
              <div className="relative flex items-center border border-gray-300 w-full rounded-xl px-4 py-3 focus-within:border-[#1F3064]">
                <Building2 size={18} className="text-gray-400 mr-3 shrink-0" />
                <select
                  value={industry}
                  onChange={(event) =>
                    updateProfile({ industry: event.target.value })
                  }
                  className="w-full appearance-none bg-transparent outline-none text-sm text-gray-700 pr-8 cursor-pointer"
                >
                  <option value="">Select Industry</option>
                  {industries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Field
                icon={MapPin}
                label="Company Address"
                value={address}
                onChange={(value) => updateProfile({ address: value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Company Description
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(event) =>
                  updateProfile({ description: event.target.value })
                }
                className="w-full border border-gray-300 rounded-2xl p-4 outline-none resize-none focus:border-[#1F3064]"
                placeholder="Describe your company..."
              />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Notifications
            </h3>
            <NotificationToggle
              label="Receive applicant notifications"
              checked={applicantNotifications}
              onChange={(checked) =>
                updateProfile({ applicantNotifications: checked })
              }
            />
            <NotificationToggle
              label="Get job performance updates"
              checked={performanceUpdates}
              onChange={(checked) =>
                updateProfile({ performanceUpdates: checked })
              }
            />
            <NotificationToggle
              label="Receive interview reminders"
              checked={interviewReminders}
              onChange={(checked) =>
                updateProfile({ interviewReminders: checked })
              }
            />
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">
              Security
            </h3>
            <button
              type="button"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full border border-gray-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-[#1F3064] hover:text-white text-base transition"
            >
              <Lock size={18} className="text-gray-400" />
              Change Password
              <ChevronDown
                size={18}
                className={`ml-auto transition-transform duration-300 ${showPasswordForm ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${showPasswordForm ? "max-h-75 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
            >
              <div className="border border-gray-300 rounded-2xl p-5 space-y-4 bg-gray-50">
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1F3064]"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1F3064]"
                />
                <button
                  type="button"
                  className="bg-[#1F3064] text-white px-5 py-3 rounded-xl hover:opacity-90"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={saving || !user}
              className="bg-[#1F3064] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
        <Icon size={18} className="text-gray-400 mr-3" />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full outline-none text-sm"
        />
      </div>
    </div>
  );
}

function NotificationToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="border border-gray-300 rounded-xl p-4 flex items-center justify-between mb-3 cursor-pointer">
      <div className="flex gap-3 items-center">
        <Bell className="text-[#F0802D]" size={18} />
        <span className="text-sm">{label}</span>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-[#F0802D] w-5 h-5"
      />
    </label>
  );
}

function Notice({
  kind,
  children,
}: {
  kind: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mb-6 rounded-xl border px-4 py-3 text-sm ${kind === "error" ? "border-red-200 bg-red-50 text-red-600" : "border-green-200 bg-green-50 text-green-700"}`}
    >
      {children}
    </div>
  );
}
