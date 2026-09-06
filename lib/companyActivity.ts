import {
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type CompanyActivity = {
  recentActivities: string[];
};

const companyActivityKey = (companyId: string) =>
  `joblify-company-activity-${companyId}`;

export function getCompanyActivity(companyId: string): CompanyActivity {
  if (typeof window === "undefined") return { recentActivities: [] };

  try {
    const stored = window.localStorage.getItem(companyActivityKey(companyId));
    const activity = stored ? (JSON.parse(stored) as Partial<CompanyActivity>) : {};
    return {
      recentActivities: Array.isArray(activity.recentActivities)
        ? activity.recentActivities
        : [],
    };
  } catch {
    return { recentActivities: [] };
  }
}

export function recordCompanyActivity(companyId: string, message: string) {
  const activity = getCompanyActivity(companyId);
  window.localStorage.setItem(
    companyActivityKey(companyId),
    JSON.stringify({
      recentActivities: [message, ...activity.recentActivities].slice(0, 50),
    }),
  );
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

  return runTransaction(db, async (transaction) => {
    const existingApplication = await transaction.get(applicationRef);

    if (existingApplication.exists()) {
      return false;
    }

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
}