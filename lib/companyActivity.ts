import {
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type CompanyActivity = {
  recentActivities: string[];
  unreadCount: number;
};

const companyActivityKey = (companyId: string) =>
  `joblify-company-activity-${companyId}`;

export function getCompanyActivity(companyId: string): CompanyActivity {
  if (typeof window === "undefined") return { recentActivities: [], unreadCount: 0 };

  try {
    const stored = window.localStorage.getItem(companyActivityKey(companyId));
    const activity = stored ? (JSON.parse(stored) as Partial<CompanyActivity>) : {};
    return {
      recentActivities: Array.isArray(activity.recentActivities)
        ? activity.recentActivities
        : [],
      unreadCount: typeof activity.unreadCount === "number" ? activity.unreadCount : 0,
    };
  } catch {
    return { recentActivities: [], unreadCount: 0 };
  }
}

export function recordCompanyActivity(companyId: string, message: string) {
  const activity = getCompanyActivity(companyId);
  window.localStorage.setItem(
    companyActivityKey(companyId),
    JSON.stringify({
      recentActivities: [message, ...activity.recentActivities].slice(0, 50),
      unreadCount: activity.unreadCount + 1,
    }),
  );
  window.dispatchEvent(new Event("joblify-company-activity-updated"));
}

export function markCompanyNotificationsRead(companyId: string) {
  const activity = getCompanyActivity(companyId);
  window.localStorage.setItem(
    companyActivityKey(companyId),
    JSON.stringify({ ...activity, unreadCount: 0 }),
  );
  window.dispatchEvent(new Event("joblify-company-notifications-read"));
}

export async function recordJobApplication(
  jobId: string,
  applicantId: string,
  applicantName: string,
  applicantEmail: string,
  jobTitle: string,
  companyName: string,
  location: string,
  salary: string,
  coverLetter: string,
  cvData: string,
  cvName: string,
  cvType: string,
) {
  const applicationRef = doc(db, "applications", `${jobId}_${applicantId}`);
  const jobRef = doc(db, "jobs", jobId);
  let companyId = "";

  const created = await runTransaction(db, async (transaction) => {
    const existingApplication = await transaction.get(applicationRef);

    if (existingApplication.exists()) {
      return false;
    }

    const jobSnapshot = await transaction.get(jobRef);
    companyId = String(jobSnapshot.data()?.companyId || "");

    transaction.set(applicationRef, {
      jobId,
      jobTitle,
      companyName,
      location,
      salary,
      applicantId,
      applicantName,
      applicantEmail,
      coverLetter,
      cvData,
      cvName,
      cvType,
      createdAt: serverTimestamp(),
    });
    transaction.update(jobRef, { applicantCount: increment(1) });

    return true;
  });

  if (created && companyId) {
    recordCompanyActivity(companyId, `${applicantName} applied for ${jobTitle}`);
  }

  return created;
}