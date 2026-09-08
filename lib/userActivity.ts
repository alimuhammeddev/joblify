export type UserActivity = {
  appliedJobIds: string[];
  savedJobIds: string[];
  recentActivities: string[];
  unreadCount: number;
};

const emptyActivity: UserActivity = {
  appliedJobIds: [],
  savedJobIds: [],
  recentActivities: [],
  unreadCount: 0,
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
      unreadCount: typeof activity.unreadCount === "number" ? activity.unreadCount : 0,
    };
  } catch {
    return emptyActivity;
  }
}

function saveUserActivity(userId: string, activity: UserActivity) {
  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(activity));
  window.dispatchEvent(new Event("joblify-activity-updated"));
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
    unreadCount: activity.unreadCount + 1,
  });
}

export function recordUserActivity(userId: string, message: string) {
  const activity = getUserActivity(userId);

  saveUserActivity(userId, {
    appliedJobIds: activity.appliedJobIds,
    savedJobIds: activity.savedJobIds,
    recentActivities: [message, ...activity.recentActivities].slice(0, 50),
    unreadCount: activity.unreadCount + 1,
  });
}

export function toggleSavedJob(
  userId: string,
  jobId: string,
) {
  const activity = getUserActivity(userId);
  const isSaved = activity.savedJobIds.includes(jobId);
  const savedJobIds = isSaved
    ? activity.savedJobIds.filter((savedId) => savedId !== jobId)
    : [...activity.savedJobIds, jobId];

  saveUserActivity(userId, {
    appliedJobIds: activity.appliedJobIds,
    savedJobIds,
    recentActivities: activity.recentActivities,
    unreadCount: activity.unreadCount,
  });

  return !isSaved;
}

export function markUserNotificationsRead(userId: string) {
  const activity = getUserActivity(userId);

  saveUserActivity(userId, {
    ...activity,
    unreadCount: 0,
  });

  window.dispatchEvent(new Event("joblify-notifications-read"));
}