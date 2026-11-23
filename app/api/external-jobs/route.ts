import { fetchExternalJobs } from "@/lib/externalJobFeeds";

export async function GET() {
  const result = await fetchExternalJobs();

  if (result.jobs.length === 0 && result.warnings.length === 6) {
    return Response.json(
      { error: "External job listings are unavailable." },
      { status: 502 },
    );
  }

  return Response.json({
    jobs: result.jobs,
    warnings: result.warnings,
  });
}
