export type UserActivity = {
  appliedJobIds: string[];
  savedJobIds: string[];
  recentActivities: string[];
};

const emptyActivity: UserActivity = {
  appliedJobIds: [],
  savedJobIds: [],
  recentActivities: [],
};

const getStorageKey = (userId: string) => `joblify-activity-${userId}`;

export function getUserActivity(userId: string): UserActivity {
  if (typeof window === "undefined") {
    return emptyActivity;
  }

  const storedActivity = window.localStorage.getItem(getStorageKey(userId));

  if (!storedActivity) {
    return emptyActivity;
  }

  try {
    const activity = JSON.parse(storedActivity) as Partial<UserActivity>;

    return {
      appliedJobIds: Array.isArray(activity.appliedJobIds) ? activity.appliedJobIds : [],
      savedJobIds: Array.isArray(activity.savedJobIds) ? activity.savedJobIds : [],
      recentActivities: Array.isArray(activity.recentActivities)
        ? activity.recentActivities
        : [],
    };
  } catch {
    return emptyActivity;
  }
}

function saveUserActivity(userId: string, activity: UserActivity) {
  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(activity));
}

export function recordApplication(userId: string, jobId: string, jobTitle: string) {
  const activity = getUserActivity(userId);

  if (activity.appliedJobIds.includes(jobId)) {
    return;
  }

  saveUserActivity(userId, {
    appliedJobIds: [...activity.appliedJobIds, jobId],
    savedJobIds: activity.savedJobIds,
    recentActivities: [`You applied for ${jobTitle}`, ...activity.recentActivities].slice(0, 50),
  });
}

export function recordUserActivity(userId: string, message: string) {
  const activity = getUserActivity(userId);

  saveUserActivity(userId, {
    appliedJobIds: activity.appliedJobIds,
    savedJobIds: activity.savedJobIds,
    recentActivities: [message, ...activity.recentActivities].slice(0, 50),
  });
}

export function toggleSavedJob(
  userId: string,
  jobId: string,
  jobTitle: string
) {
  const activity = getUserActivity(userId);
  const isSaved = activity.savedJobIds.includes(jobId);
  const savedJobIds = isSaved
    ? activity.savedJobIds.filter((savedId) => savedId !== jobId)
    : [...activity.savedJobIds, jobId];

  saveUserActivity(userId, {
    appliedJobIds: activity.appliedJobIds,
    savedJobIds,
    recentActivities: [
      isSaved ? `You removed ${jobTitle} from saved jobs` : `You saved ${jobTitle}`,
      ...activity.recentActivities,
    ].slice(0, 50),
  });

  return !isSaved;
}