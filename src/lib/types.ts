import type { CategoryId } from "./constants";

export interface Article {
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceIcon: string;
  sourceColor: string;
  publishedAt: string;
  categories: CategoryId[];
  isImpact: boolean;
  slug: string;
  imageUrl?: string;
  region?: "international" | "france" | "product";
  product?: string;
  summaryFr?: string; // French translation for flash
}

export interface FlashItem {
  title: string;
  summary: string;
  keyPoints: string[];
  source: string;
  publishedAt: string;
  category: CategoryId;
  isImpact: boolean;
  slug: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  strengths: string[];
  useCases: string[];
  tips: string[];
  difficulty: "debutant" | "intermediaire" | "avance";
  lastUpdated: string;
  content: string;
}
