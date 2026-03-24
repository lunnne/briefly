export type CEFRLevel = "A1" | "B1" | "B2" | "C1";

export interface SayItContent {
  A1: string[];
  B1: string[];
  B2: string[];
  C1: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string[];
  keywords: string[];
  whyItMatters: string[];
  sayIt: SayItContent;
}
