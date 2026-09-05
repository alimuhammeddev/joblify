"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CompanySettingsProfile = {
  companyName: string;
  email: string;
  industry: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  logoUrl: string;
  applicantNotifications: boolean;
  performanceUpdates: boolean;
  interviewReminders: boolean;
};

type CompanySettingsState = {
  profile: CompanySettingsProfile;
  showPasswordForm: boolean;
  loading: boolean;
  saving: boolean;
  message: string;
  error: string;
  updateProfile: (updates: Partial<CompanySettingsProfile>) => void;
  setShowPasswordForm: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setMessage: (message: string) => void;
  setError: (error: string) => void;
  resetProfile: () => void;
  resetFeedback: () => void;
};

const initialProfile: CompanySettingsProfile = {
  companyName: "",
  email: "",
  industry: "",
  phone: "",
  website: "",
  address: "",
  description: "",
  logoUrl: "",
  applicantNotifications: true,
  performanceUpdates: true,
  interviewReminders: true,
};

export const useCompanySettingsStore = create<CompanySettingsState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      showPasswordForm: false,
      loading: true,
      saving: false,
      message: "",
      error: "",
      updateProfile: (updates) =>
        set((state) => ({ profile: { ...state.profile, ...updates } })),
      setShowPasswordForm: (showPasswordForm) => set({ showPasswordForm }),
      setLoading: (loading) => set({ loading }),
      setSaving: (saving) => set({ saving }),
      setMessage: (message) => set({ message }),
      setError: (error) => set({ error }),
      resetProfile: () => set({ profile: initialProfile }),
      resetFeedback: () => set({ message: "", error: "" }),
    }),
    {
      name: "joblify-company-settings",
      partialize: (state) => ({
        profile: state.profile,
        showPasswordForm: state.showPasswordForm,
      }),
    },
  ),
);
