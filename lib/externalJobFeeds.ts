import type { Job } from "@/lib/jobs";

type FeedResult = {
  jobs: Job[];
  warnings: string[];
};

type JobFields = {
  id?: string | number;
  title?: string;
  company?: string;
  location?: string;
  type?: string;
  salary?: string;
  url?: string;
  sourceUrl?: string;
  description?: string;
  postedAt?: string;
};

const yubhubCountries = [
  { slug: "united-states", name: "United States" },
  { slug: "united-kingdom", name: "United Kingdom" },
  { slug: "canada", name: "Canada" },
];

const jobicyCountries = ["usa", "uk", "canada", "netherlands"];
const jobsEveryHourCategories = 50;
const targetCountryAliases = [
  "united states",
  "united states of america",
  "usa",
  "u s a",
  "us",
  "u s",
  "united kingdom",
  "great britain",
  "britain",
  "england",
  "scotland",
  "wales",
  "northern ireland",
  "uk",
  "u k",
  "gbr",
  "gb",
  "ca",
  "canada",
  "canadian",
  "netherlands",
  "the netherlands",
  "holland",
  "nl",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() || fallback : fallback;
}

function asStringList(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").join(", ");
  }
  return "";
}

function getHttpsUrl(value: unknown, hosts?: string[]) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    if (
      hosts
      && !hosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function getDescription(value: unknown) {
  return asString(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 800);
}

function isTargetCountryLocation(location: string) {
  const normalizedLocation = ` ${location.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;
  return targetCountryAliases.some((country) => normalizedLocation.includes(` ${country} `));
}

function createJob(fields: JobFields, source: string): Job | null {
  const id = String(fields.id ?? "").trim();
  const applicationUrl = getHttpsUrl(fields.url);

  if (!id || !fields.title || !applicationUrl) return null;

  return {
    id: `${source.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${id}`,
    source,
    sourceUrl: getHttpsUrl(fields.sourceUrl) || applicationUrl,
    applicationUrl,
    company: fields.company || "Company",
    title: fields.title,
    location: fields.location || "Location not specified",
    type: fields.type || "Not specified",
    salary: fields.salary || "Not provided",
    minimumSalary: "-",
    maximumSalary: "-",
    description: fields.description || "",
    responsibilities: "",
    requirements: "",
    status: "Open",
    applicants: 0,
    postedAt: fields.postedAt,
  };
}

async function fetchJson(url: string, revalidate: number): Promise<unknown> {
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "Joblify job listings" },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Feed request returned ${response.status}`);
  }

  return response.json();
}

function getArray(payload: unknown, key: string) {
  if (!isRecord(payload) || !Array.isArray(payload[key])) return null;
  return payload[key];
}

function parseJobs(
  payload: unknown,
  key: string,
  mapper: (value: unknown) => Job | null,
): Job[] {
  const rows = getArray(payload, key);
  if (!rows) throw new Error(`Feed response did not contain a ${key} list.`);
  const jobs = rows.map(mapper).filter((job): job is Job => job !== null);
  if (rows.length > 0 && jobs.length === 0) {
    throw new Error("Feed did not contain any usable job records.");
  }
  return jobs;
}

async function fetchProvider(
  source: string,
  url: string,
  revalidate: number,
  parse: (payload: unknown) => Job[],
): Promise<FeedResult> {
  try {
    return { jobs: parse(await fetchJson(url, revalidate)), warnings: [] };
  } catch (error) {
    console.error(`Unable to load ${source} listings:`, error);
    return { jobs: [], warnings: [source] };
  }
}

function mapJobicyJob(value: unknown): Job | null {
  if (!isRecord(value)) return null;

  const job = value as Record<string, unknown>;
  const id = job.id;
  const sourceUrl = getHttpsUrl(job.url, ["jobicy.com"]);

  return createJob({
    id: typeof id === "string" || typeof id === "number" ? id : undefined,
    title: asString(job.jobTitle),
    company: asString(job.companyName, "Company"),
    location: asString(job.jobGeo, "Location not specified"),
    type: asStringList(job.jobType) || "Remote",
    salary: asString(job.jobSalary, "Not provided"),
    url: sourceUrl || undefined,
    sourceUrl: sourceUrl || undefined,
    description: getDescription(job.jobExcerpt),
    postedAt: asString(job.pubDate),
  }, "Jobicy");
}

function mapRemoteOkJob(value: unknown): Job | null {
  if (!isRecord(value) || typeof value.id !== "string") return null;

  const listingUrl = getHttpsUrl(value.url, ["remoteok.com", "www.remoteok.com"])
    || (typeof value.slug === "string"
      ? getHttpsUrl(`https://remoteok.com/remote-jobs/${encodeURIComponent(value.slug)}`)
      : null);
  const applyUrl = getHttpsUrl(value.apply_url) || listingUrl;
  if (!listingUrl || !applyUrl) return null;

  const salaryMin = typeof value.salary_min === "number" ? value.salary_min : null;
  const salaryMax = typeof value.salary_max === "number" ? value.salary_max : null;
  const salary = salaryMin !== null || salaryMax !== null
    ? `${salaryMin?.toLocaleString("en-US") || "-"} - ${salaryMax?.toLocaleString("en-US") || "-"}`
    : "Not provided";

  return createJob({
    id: value.id,
    title: asString(value.position),
    company: asString(value.company, "Company"),
    location: asString(value.location, "Remote"),
    type: asStringList(value.tags) || "Remote",
    salary,
    url: applyUrl,
    sourceUrl: listingUrl,
    description: getDescription(value.description),
    postedAt: asString(value.date),
  }, "RemoteOK");
}

function mapArbeitnowJob(value: unknown): Job | null {
  if (!isRecord(value)) return null;

  const jobUrl = getHttpsUrl(value.url, ["arbeitnow.com", "www.arbeitnow.com"]);
  const types = asStringList(value.job_types);
  const tags = asStringList(value.tags);

  return createJob({
    id: typeof value.slug === "string" ? value.slug : undefined,
    title: asString(value.title),
    company: asString(value.company_name, "Company"),
    location: asString(value.location, "Location not specified"),
    type: [types, value.remote === true ? "Remote" : ""].filter(Boolean).join(" · ")
      || tags,
    salary: "Not provided",
    url: jobUrl || undefined,
    sourceUrl: jobUrl || undefined,
    description: getDescription(value.description),
    postedAt: typeof value.created_at === "number"
      ? new Date(value.created_at * 1000).toISOString()
      : asString(value.created_at),
  }, "Arbeitnow");
}

function mapJobsEveryHourJob(value: unknown): Job | null {
  if (!isRecord(value)) return null;

  const jobUrl = getHttpsUrl(value.url, ["jobseveryhour.com", "www.jobseveryhour.com"]);
  return createJob({
    id: typeof value.id === "string" || typeof value.id === "number"
      ? value.id
      : jobUrl || undefined,
    title: asString(value.title),
    company: asString(value.company, "Company"),
    location: asString(value.location, "Location not specified"),
    type: value.remote === true ? "Remote" : asString(value.category, "Not specified"),
    salary: asString(value.salary, "Not provided"),
    url: jobUrl || undefined,
    sourceUrl: jobUrl || undefined,
    description: getDescription(value.description),
    postedAt: asString(value.posted),
  }, "Jobs Every Hour");
}

function mapOnJobJob(value: unknown): Job | null {
  if (!isRecord(value)) return null;

  const listingUrl = getHttpsUrl(value.url, ["onjob.io", "www.onjob.io"]);
  const location = [
    asString(value.city),
    asString(value.state),
    asString(value.country),
  ].filter(Boolean).join(", ");

  return createJob({
    id: typeof value.id === "string" ? value.id : undefined,
    title: asString(value.title),
    company: asString(value.company, "Company"),
    location: location || asString(value.location, "Location not specified"),
    type: asString(value.employmentType, asString(value.category, "Not specified")),
    salary: asString(value.salary, "Not provided"),
    url: listingUrl || undefined,
    sourceUrl: listingUrl || undefined,
    description: getDescription(value.descriptionHtml),
    postedAt: asString(value.datePosted),
  }, "OnJob.io");
}

function mapYubHubJob(value: unknown, country: typeof yubhubCountries[number]): Job | null {
  if (!isRecord(value)) return null;

  const identifier = isRecord(value.identifier) ? value.identifier.value : undefined;
  const organization = isRecord(value.hiringOrganization)
    ? value.hiringOrganization.name
    : undefined;
  const location = Array.isArray(value.jobLocation) ? value.jobLocation[0] : value.jobLocation;
  const address = isRecord(location) && isRecord(location.address) ? location.address : {};
  const addressCountry = isRecord(address.addressCountry)
    ? address.addressCountry.name
    : address.addressCountry;
  const locationText = [
    asString(address.addressLocality),
    asString(address.addressRegion),
    asString(addressCountry, country.name),
  ].filter(Boolean).join(", ");
  const applyUrl = getHttpsUrl(value["x-apply-url"]) || getHttpsUrl(value.url);

  return createJob({
    id: typeof identifier === "string" || typeof identifier === "number"
      ? identifier
      : applyUrl || undefined,
    title: asString(value.title),
    company: asString(organization, "Company"),
    location: locationText || country.name,
    type: asString(value["x-job-type"], asStringList(value.employmentType) || "Not specified"),
    salary: asString(value["x-salary-range"], "Not provided"),
    url: applyUrl || undefined,
    sourceUrl: `https://yubhub.co/jobs/country/${country.slug}/`,
    description: getDescription(value.description),
    postedAt: asString(value.datePosted),
  }, "YubHub");
}

async function fetchJobsEveryHour(): Promise<FeedResult> {
  const warnings: string[] = [];
  const jobs: Job[] = [];
  const feeds = [
    "https://jobseveryhour.com/api/v1/latest.json",
    "https://jobseveryhour.com/api/v1/remote.json",
  ];

  try {
    const index = await fetchJson("https://jobseveryhour.com/api/v1/index.json", 3600);
    const entries = getArray(index, "feeds");
    if (!entries) throw new Error("Feed index did not contain a feeds list.");
    const categories = entries
      .flatMap((entry) => {
        if (!isRecord(entry) || typeof entry.feed !== "string") return [];

        const url = getHttpsUrl(entry.feed, ["jobseveryhour.com"]);
        if (!url || !new URL(url).pathname.includes("/api/v1/categories/")) return [];

        return [{
          url,
          total: typeof entry.total === "number" ? entry.total : 0,
        }];
      })
      .sort((left, right) => right.total - left.total)
      .slice(0, jobsEveryHourCategories);
    feeds.push(...categories.map((category) => category.url));
  } catch (error) {
    console.error("Unable to load Jobs Every Hour feed index:", error);
    warnings.push("Jobs Every Hour");
  }

  for (let index = 0; index < feeds.length; index += 8) {
    const batch = feeds.slice(index, index + 8);
    const results = await Promise.all(batch.map(async (url) => {
      try {
        return parseJobs(await fetchJson(url, 3600), "jobs", mapJobsEveryHourJob);
      } catch (error) {
        console.error("Unable to load a Jobs Every Hour category feed:", error);
        warnings.push("Jobs Every Hour");
        return [];
      }
    }));
    jobs.push(...results.flat());
  }

  return { jobs, warnings: [...new Set(warnings)] };
}

async function fetchOnJob(): Promise<FeedResult> {
  const warnings: string[] = [];
  const jobs: Job[] = [];
  const feedUrl = "https://onjob.io/feeds/jobs.json";

  try {
    const firstPage: unknown = await fetchJson(feedUrl, 86400);
    jobs.push(...parseJobs(firstPage, "jobs", mapOnJobJob));

    const pageEntries = getArray(firstPage, "pages") || [];
    const pageUrls = pageEntries
      .filter((page) => isRecord(page) && typeof page.url === "string")
      .map((page) => (page as Record<string, unknown>).url)
      .filter((url): url is string => Boolean(getHttpsUrl(url, ["onjob.io", "www.onjob.io"])))
      .filter((url) => url !== feedUrl);

    for (let index = 0; index < pageUrls.length; index += 4) {
      const batch = pageUrls.slice(index, index + 4);
      const results = await Promise.all(batch.map(async (url) => {
        try {
          return parseJobs(await fetchJson(url, 86400), "jobs", mapOnJobJob);
        } catch (error) {
          console.error("Unable to load an OnJob.io feed page:", error);
          warnings.push("OnJob.io");
          return [];
        }
      }));
      jobs.push(...results.flat());
    }
  } catch (error) {
    console.error("Unable to load OnJob.io listings:", error);
    warnings.push("OnJob.io");
  }

  return { jobs, warnings };
}

async function fetchYubHub(): Promise<FeedResult> {
  const jobs: Job[] = [];
  const warnings: string[] = [];

  for (let index = 0; index < yubhubCountries.length; index += 4) {
    const batch = yubhubCountries.slice(index, index + 4);
    const results = await Promise.all(batch.map(async (country) => {
      try {
        const url = `https://feeds.yubhub.co/facet/country/${country.slug}.json`;
        return parseJobs(await fetchJson(url, 86400), "jobs", (job) => mapYubHubJob(job, country));
      } catch (error) {
        console.error(`Unable to load YubHub listings for ${country.name}:`, error);
        warnings.push("YubHub");
        return [];
      }
    }));
    jobs.push(...results.flat());
  }

  return { jobs, warnings: [...new Set(warnings)] };
}

async function fetchRemoteOK(): Promise<FeedResult> {
  return fetchProvider("RemoteOK", "https://remoteok.com/api", 3600, (payload) => {
    if (!Array.isArray(payload)) throw new Error("Feed response was not a job list.");
    const jobs = payload.map(mapRemoteOkJob).filter((job): job is Job => job !== null);
    if (payload.length > 1 && jobs.length === 0) {
      throw new Error("Feed did not contain any usable job records.");
    }
    return jobs;
  });
}

async function fetchArbeitnow(): Promise<FeedResult> {
  return fetchProvider("Arbeitnow", "https://www.arbeitnow.com/api/job-board-api", 3600, (payload) =>
    parseJobs(payload, "data", mapArbeitnowJob),
  );
}

async function fetchJobicy(): Promise<FeedResult> {
  const results = await Promise.all(jobicyCountries.map((country) =>
    fetchProvider(
      "Jobicy",
      `https://jobicy.com/api/v2/remote-jobs?geo=${country}`,
      3600,
      (payload) => parseJobs(payload, "jobs", mapJobicyJob),
    ),
  ));

  return {
    jobs: results.flatMap((result) => result.jobs),
    warnings: results.flatMap((result) => result.warnings),
  };
}

function deduplicateJobs(jobs: Job[]) {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    const key = [job.title, job.company, job.location]
      .map((value) => value.trim().toLowerCase().replace(/\s+/g, " "))
      .join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function fetchExternalJobs(): Promise<FeedResult> {
  const results = await Promise.all([
    fetchRemoteOK(),
    fetchJobicy(),
    fetchArbeitnow(),
    fetchJobsEveryHour(),
    fetchOnJob(),
    fetchYubHub(),
  ]);
  const jobs = deduplicateJobs(
    results
      .flatMap((result) => result.jobs)
      .filter((job) => isTargetCountryLocation(job.location)),
  );
  const warnings = [...new Set(results.flatMap((result) => result.warnings))];

  return { jobs, warnings };
}
