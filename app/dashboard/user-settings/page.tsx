"use client";

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
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, db, storage } from "@/lib/firebase";
import { useUserSettingsStore } from "@/lib/userSettingsStore";
import { recordUserActivity } from "@/lib/userActivity";

type ProfileData = {
  phone?: string;
  bio?: string;
  profileImageUrl?: string;
  cvData?: string;
  cvName?: string;
  cvType?: string;
  jobAlerts?: boolean;
  applicationUpdates?: boolean;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_CV_SIZE = 700 * 1024;
const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function UserSettings() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const {
    profile,
    showPassword,
    loading,
    saving,
    message,
    error,
    updateProfile,
    setShowPassword,
    setLoading,
    setSaving,
    setMessage,
    setError,
    resetProfile,
    resetFeedback,
  } = useUserSettingsStore();
  const {
    fullName,
    email,
    phone,
    bio,
    profileImageUrl,
    cvData,
    cvName,
    cvType,
    jobAlerts,
    applicationUpdates,
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
        fullName: currentUser.displayName || "",
        email: currentUser.email || "",
      });

      try {
        const profileSnapshot = await getDoc(doc(db, "users", currentUser.uid));
        const profile = profileSnapshot.data() as ProfileData | undefined;

        if (profile) {
          updateProfile({
            phone: profile.phone || "",
            bio: profile.bio || "",
            profileImageUrl: profile.profileImageUrl || "",
            cvData: profile.cvData || "",
            cvName: profile.cvName || "",
            cvType: profile.cvType || "",
            jobAlerts: profile.jobAlerts ?? true,
            applicationUpdates: profile.applicationUpdates ?? true,
          });
        }
      } catch {
        setError("We could not load your saved profile details.");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const validateFile = (file: File, type: "image" | "cv") => {
    if (type === "image" && file.size > MAX_IMAGE_SIZE) {
      setError("Profile images must be smaller than 5MB.");
      return false;
    }

    if (type === "cv" && file.size > MAX_CV_SIZE) {
      setError("CV files must be smaller than 700KB when saved to the database.");
      return false;
    }

    if (type === "image" && !file.type.startsWith("image/")) {
      setError("Please choose an image for your profile picture.");
      return false;
    }

    if (type === "cv" && !CV_TYPES.includes(file.type)) {
      setError("Your CV must be a PDF, DOC, or DOCX file.");
      return false;
    }

    setError("");
    return true;
  };

  const handleProfileImageChange = (file: File | undefined) => {
    if (!file || !validateFile(file, "image")) return;

    setProfileImageFile(file);
    updateProfile({ profileImageUrl: URL.createObjectURL(file) });
  };

  const handleCvChange = (file: File | undefined) => {
    if (!file || !validateFile(file, "cv")) return;

    setCvFile(file);
    updateProfile({ cvName: file.name, cvType: file.type });
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();

    const currentUser = user || auth.currentUser;
    if (!currentUser) {
      setError("Please sign in before saving your profile.");
      return;
    }

    setSaving(true);

    try {
      let savedProfileImageUrl = profileImageUrl;
      let savedCvData = cvData;

      if (profileImageFile) {
        const imageReference = ref(
          storage,
          `users/${currentUser.uid}/profile-images/${profileImageFile.name}`
        );
        await uploadBytes(imageReference, profileImageFile);
        savedProfileImageUrl = await getDownloadURL(imageReference);
      }

      if (cvFile) {
        savedCvData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error("Unable to read CV file"));
          reader.readAsDataURL(cvFile);
        });
      }

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          phone: phone.trim(),
          bio: bio.trim(),
          profileImageUrl: savedProfileImageUrl,
          cvData: savedCvData,
          cvName,
          cvType,
          jobAlerts,
          applicationUpdates,
        },
        { merge: true }
      );

      updateProfile({
        profileImageUrl: savedProfileImageUrl,
        cvData: savedCvData,
      });
      recordUserActivity(currentUser.uid, "You updated your profile settings");
      setProfileImageFile(null);
      setCvFile(null);
      setMessage("Your changes have been saved.");
    } catch {
      setError("We could not save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <section className="min-h-screen bg-gray-50 p-6">Loading settings...</section>;
  }

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#1F3064]">User Settings</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your profile information, security, notifications, and CV
        </p>
      </div>

      {!user && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Please sign in to manage your profile.
        </div>
      )}
      {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {message && <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-[#1F3064]"><User size={40} /></div>
              )}
              <label className="absolute bottom-1 right-1 bg-[#1F3064] text-white p-2 rounded-full hover:opacity-90 transition cursor-pointer">
                <Camera size={16} />
                <input type="file" accept="image/*" className="hidden" onChange={(event) => handleProfileImageChange(event.target.files?.[0])} />
              </label>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#1F3064]">{fullName || "User"}</h2>
            <p className="text-sm text-gray-500 whitespace-pre-line">{bio || "Add a short bio about yourself"}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"><User size={18} className="text-gray-400 mr-3" /><input type="text" value={fullName} readOnly className="w-full outline-none text-sm bg-transparent" /></div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"><Mail size={18} className="text-gray-400 mr-3" /><input type="email" value={email} readOnly className="w-full outline-none text-sm bg-transparent" /></div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3"><Phone size={18} className="text-gray-400 mr-3" /><input type="tel" value={phone} onChange={(event) => updateProfile({ phone: event.target.value })} placeholder="Enter your phone number" className="w-full outline-none text-sm" /></div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Current Password</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3"><Lock size={18} className="text-gray-400 mr-3" /><input type="password" placeholder="Enter current password" className="w-full outline-none text-sm" /></div>
            </div>
            <div className="md:col-span-2">
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition"><div className="flex items-center gap-3"><Lock size={18} className="text-gray-400" /><span className="text-sm font-medium text-gray-700">Change Password</span></div><ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${showPassword ? "rotate-180" : ""}`} /></button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showPassword ? "max-h-65 opacity-100 mt-4" : "max-h-0 opacity-0"}`}><div className="border border-gray-300 rounded-xl p-4 space-y-4 bg-gray-50"><input type="password" placeholder="Enter new password" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#1F3064]" /><input type="password" placeholder="Confirm new password" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#1F3064]" /><button type="button" className="bg-[#1F3065] text-white px-4 py-2 rounded-lg hover:opacity-90 transition">Update Password</button></div></div>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 mb-2 block">Bio</label>
              <textarea rows={3} value={bio} onChange={(event) => updateProfile({ bio: event.target.value })} placeholder="e.g Frontend developer with 5 years of experience" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none text-sm resize-none focus:border-[#1F3064]" />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#1F3064] mb-4">Resume / CV</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div className="flex items-center gap-4"><div className="bg-[#F0802D]/10 p-3 rounded-xl"><FileText size={22} className="text-[#F0802D]" /></div><div><p className="font-medium text-sm text-[#1F3064]">{cvName || "Upload Your CV"}</p><p className="text-xs text-gray-500">PDF, DOC, or DOCX (Max 700KB)</p>{cvData && <a href={cvData} download={cvName} className="text-xs text-[#F0802D] hover:underline">Download saved CV</a>}</div></div><label className="cursor-pointer bg-[#1F3064] text-white px-5 py-2 rounded-lg hover:bg-[#16254d] transition flex items-center gap-2"><Upload size={16} /> Upload CV<input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(event) => handleCvChange(event.target.files?.[0])} /></label></div></div>
          </div>

          <div className="mt-8"><h3 className="text-lg font-semibold text-[#1F3064] mb-4">Notification Preferences</h3><div className="space-y-4"><label className="flex items-center justify-between border border-gray-300 rounded-xl p-4 cursor-pointer"><div className="flex items-center gap-3"><Bell size={18} className="text-[#F0802D]" /><div><p className="font-medium text-sm">Job Alerts</p><p className="text-xs text-gray-500">Receive notifications for new job matches</p></div></div><input type="checkbox" checked={jobAlerts} onChange={(event) => updateProfile({ jobAlerts: event.target.checked })} className="w-5 h-5 accent-[#F0802D]" /></label><label className="flex items-center justify-between border border-gray-300 rounded-xl p-4 cursor-pointer"><div className="flex items-center gap-3"><Bell size={18} className="text-[#F0802D]" /><div><p className="font-medium text-sm">Application Updates</p><p className="text-xs text-gray-500">Get updates on your submitted applications</p></div></div><input type="checkbox" checked={applicationUpdates} onChange={(event) => updateProfile({ applicationUpdates: event.target.checked })} className="w-5 h-5 accent-[#F0802D]" /></label></div></div>

          <div className="mt-8 flex justify-end"><button type="submit" disabled={saving || !user} className="bg-[#1F3064] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 disabled:opacity-50"><Save size={18} /> {saving ? "Saving..." : "Save Changes"}</button></div>
        </form>
      </div>
    </section>
  );
}
