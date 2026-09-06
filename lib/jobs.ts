import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type Job = {
  id: string;
  companyId?: string;
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
  postedAt?: { toDate: () => Date };
};

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
  return job.postedAt ? job.postedAt.toDate().toLocaleDateString() : "Recently";
}
