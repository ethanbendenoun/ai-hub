"use client";

// ─── LocalStorage-based like system ───
// Stores user preferences to personalize the feed over time

const STORAGE_KEY = "ai-hub-likes";

export interface LikeData {
  liked: string[]; // URLs of liked articles
  disliked: string[]; // URLs of disliked articles
  likedCategories: Record<string, number>; // category -> score
  likedSources: Record<string, number>; // source -> score
}

function getStorage(): LikeData {
  if (typeof window === "undefined") {
    return { liked: [], disliked: [], likedCategories: {}, likedSources: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { liked: [], disliked: [], likedCategories: {}, likedSources: {} };
    return JSON.parse(raw);
  } catch {
    return { liked: [], disliked: [], likedCategories: {}, likedSources: {} };
  }
}

function saveStorage(data: LikeData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function likeArticle(url: string, categories: string[], source: string) {
  const data = getStorage();

  // Remove from disliked if it was there
  data.disliked = data.disliked.filter((u) => u !== url);

  // Add to liked
  if (!data.liked.includes(url)) {
    data.liked.push(url);
  }

  // Boost category scores
  categories.forEach((cat) => {
    data.likedCategories[cat] = (data.likedCategories[cat] || 0) + 1;
  });

  // Boost source score
  data.likedSources[source] = (data.likedSources[source] || 0) + 1;

  saveStorage(data);
}

export function dislikeArticle(url: string, categories: string[], source: string) {
  const data = getStorage();

  // Remove from liked if it was there
  data.liked = data.liked.filter((u) => u !== url);

  // Add to disliked
  if (!data.disliked.includes(url)) {
    data.disliked.push(url);
  }

  // Lower category scores
  categories.forEach((cat) => {
    data.likedCategories[cat] = (data.likedCategories[cat] || 0) - 1;
  });

  // Lower source score
  data.likedSources[source] = (data.likedSources[source] || 0) - 1;

  saveStorage(data);
}

export function removeReaction(url: string) {
  const data = getStorage();
  data.liked = data.liked.filter((u) => u !== url);
  data.disliked = data.disliked.filter((u) => u !== url);
  saveStorage(data);
}

export function getArticleStatus(url: string): "liked" | "disliked" | null {
  const data = getStorage();
  if (data.liked.includes(url)) return "liked";
  if (data.disliked.includes(url)) return "disliked";
  return null;
}

export function getLikeStats(): LikeData {
  return getStorage();
}

export function getTopCategories(): string[] {
  const data = getStorage();
  return Object.entries(data.likedCategories)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0)
    .map(([cat]) => cat);
}

export function getTopSources(): string[] {
  const data = getStorage();
  return Object.entries(data.likedSources)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0)
    .map(([source]) => source);
}

export function getTotalLikes(): number {
  return getStorage().liked.length;
}

export function getTotalDislikes(): number {
  return getStorage().disliked.length;
}
