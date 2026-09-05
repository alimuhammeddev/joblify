"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserSettingsProfile = {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  profileImageUrl: string;
  cvData: string;
  cvName: string;
  cvType: string;
  jobAlerts: boolean;
  applicationUpdates: boolean;
};

type UserSettingsState = {
  profile: UserSettingsProfile;
  showPassword: boolean;
  loading: boolean;
  saving: boolean;
  message: string;
  error: string;
  updateProfile: (updates: Partial<UserSettingsProfile>) => void;
  setShowPassword: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setMessage: (message: string) => void;
  setError: (error: string) => void;
  resetProfile: () => void;
  resetFeedback: () => void;
};

const initialProfile: UserSettingsProfile = {
  fullName: "",
  email: "",
  phone: "",
  bio: "",
  profileImageUrl: "",
  cvData: "",
  cvName: "",
  cvType: "",
  jobAlerts: true,
  applicationUpdates: true,
};

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      showPassword: false,
      loading: true,
      saving: false,
      message: "",
      error: "",
      updateProfile: (updates) =>
        set((state) => ({ profile: { ...state.profile, ...updates } })),
      setShowPassword: (showPassword) => set({ showPassword }),
      setLoading: (loading) => set({ loading }),
      setSaving: (saving) => set({ saving }),
      setMessage: (message) => set({ message }),
      setError: (error) => set({ error }),
      resetProfile: () => set({ profile: initialProfile }),
      resetFeedback: () => set({ message: "", error: "" }),
    }),
    {
      name: "joblify-user-settings",
      partialize: (state) => ({
        profile: state.profile,
        showPassword: state.showPassword,
      }),
    },
  ),
);
