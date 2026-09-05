import {
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function recordJobApplication(
  jobId: string,
  applicantId: string,
  applicantName: string,
  applicantEmail: string,
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
      applicantId,
      applicantName,
      applicantEmail,
      createdAt: serverTimestamp(),
    });
    transaction.update(jobRef, { applicantCount: increment(1) });

    return true;
  });
}