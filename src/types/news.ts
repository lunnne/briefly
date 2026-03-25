export type CEFRLevel = "A1" | "B1" | "B2" | "C1";

export interface SpeakingLine {
  text: string;
  highlight: {
    phrase: string;
    meaning: string;
  } | null;
}

export interface SayItContent {
  A1: SpeakingLine[];
  B1: SpeakingLine[];
  B2: SpeakingLine[];
  C1: SpeakingLine[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string[];
  keywords: string[];
  whyItMatters: string[];
  sayIt: SayItContent;
}
