import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type Job = {
  id: string;
  companyId?: string;
  source?: string;
  sourceUrl?: string;
  applicationUrl?: string;
  company: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  minimumSalary: string;
  maximumSalary: string;
  description: string;
  responsibilities: string;
  requirements: string;
  status: string;
  applicants: number;
  postedAt?: string | { toDate: () => Date };
};

function getPostedAtDate(postedAt: Job["postedAt"]) {
  const date = typeof postedAt === "string" ? new Date(postedAt) : postedAt?.toDate();
  return date instanceof Date && Number.isFinite(date.getTime()) ? date : null;
}

export function sortJobsByNewestFirst<T extends { postedAt?: Job["postedAt"] }>(jobs: T[]) {
  return [...jobs].sort((left, right) => {
    const leftTime = getPostedAtDate(left.postedAt)?.getTime() ?? 0;
    const rightTime = getPostedAtDate(right.postedAt)?.getTime() ?? 0;

    return rightTime - leftTime;
  });
}

export function mapJob(snapshot: QueryDocumentSnapshot<DocumentData>): Job {
  const data = snapshot.data();
  const minimumSalary = String(data.minimumSalary || "-");
  const maximumSalary = String(data.maximumSalary || "-");

  return {
    id: snapshot.id,
    companyId: data.companyId,
    company: String(data.companyName || "Company"),
    title: String(data.title || "Untitled job"),
    location: String(data.location || "Location not specified"),
    type: String(data.type || "Not specified"),
    salary: `${minimumSalary} - ${maximumSalary}`,
    minimumSalary,
    maximumSalary,
    description: String(data.description || ""),
    responsibilities: String(data.responsibilities || ""),
    requirements: String(data.requirements || ""),
    status: String(data.status || "Open"),
    applicants: Number(data.applicantCount || 0),
    postedAt: data.postedAt,
  };
}

export function formatPostedAt(job: Job) {
  return getPostedAtDate(job.postedAt)?.toLocaleDateString() ?? "Recently";
}

export function isJobOpen(job: Pick<Job, "status">) {
  return job.status.trim().toLowerCase() === "open";
}
