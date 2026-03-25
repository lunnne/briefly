// src/lib/generateCards.ts
// 필터링된 기사 후보들을 받아 OpenAI로 카드 3장을 생성.
// Structured Output을 사용해서 응답 형태를 JSON 스키마로 고정함.

import OpenAI from "openai";
import type { RawArticle } from "./fetchNews";

// --- 타입 정의 ---

// 말하기 연습 문장 한 줄 — 선택적으로 핵심 표현과 의미 포함
export interface SpeakingLine {
  text: string;
  highlight: {
    phrase: string;   // 문장 안에 등장하는 실제 표현 (문장 그대로 포함되어야 함)
    meaning: string;  // 짧은 한국어 설명
  } | null;
}

// 말하기 연습 문장 — CEFR 레벨별 5문장씩
export interface SpeakingLines {
  a1: SpeakingLine[];
  b1: SpeakingLine[];
  b2: SpeakingLine[];
  c1: SpeakingLine[];
}

// AI가 생성하는 카드 한 장의 구조
export interface NewsCard {
  headline: string;
  category: string;
  quick_understanding_ko: string[];  // 한국어 요약 3줄
  quick_understanding_en: string[];  // 영어 요약 3줄
  keywords: string[];
  speaking_lines: SpeakingLines;
}

// --- JSON 스키마 (Structured Output용) ---

// 말하기 문장 한 줄 — highlight는 있거나 null
const speakingLineSchema = {
  type: "object",
  required: ["text", "highlight"],
  additionalProperties: false,
  properties: {
    text: { type: "string" },
    highlight: {
      // OpenAI strict mode에서 optional 필드는 anyOf + null로 처리
      anyOf: [
        {
          type: "object",
          required: ["phrase", "meaning"],
          additionalProperties: false,
          properties: {
            phrase: { type: "string" },
            meaning: { type: "string" },
          },
        },
        { type: "null" },
      ],
    },
  },
};
// OpenAI가 이 스키마에 맞는 JSON만 반환하도록 강제함
// strict: true → 스키마 밖의 필드는 절대 포함되지 않음

const newsCardSchema = {
  type: "object",
  required: [
    "headline",
    "category",
    "quick_understanding_ko",
    "quick_understanding_en",
    "keywords",
    "speaking_lines",
  ],
  additionalProperties: false,
  properties: {
    headline: { type: "string" },
    category: {
      type: "string",
      enum: ["politics", "economy", "tech", "climate", "health", "society", "world"],
    },
    quick_understanding_ko: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
    quick_understanding_en: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
    keywords: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 4,
    },
    speaking_lines: {
      type: "object",
      required: ["a1", "b1", "b2", "c1"],
      additionalProperties: false,
      properties: {
        a1: { type: "array", items: speakingLineSchema, minItems: 5, maxItems: 5 },
        b1: { type: "array", items: speakingLineSchema, minItems: 5, maxItems: 5 },
        b2: { type: "array", items: speakingLineSchema, minItems: 5, maxItems: 5 },
        c1: { type: "array", items: speakingLineSchema, minItems: 5, maxItems: 5 },
      },
    },
  },
};

// 카드 3장을 하나의 배열로 감싸는 최상위 스키마
const batchSchema = {
  type: "object",
  required: ["cards"],
  additionalProperties: false,
  properties: {
    cards: {
      type: "array",
      items: newsCardSchema,
      minItems: 3,
      maxItems: 3,
    },
  },
};

// --- 프롬프트 ---

// AI의 역할과 말투, 출력 규칙을 정의하는 시스템 프롬프트
const SYSTEM_PROMPT = `You are an English learning assistant for Korean adults.

Your job is to take news articles and turn them into speaking practice cards.

The headline must always be written in English, even if the source article is in German.

Rules for speaking_lines:
- Always write in English — every level, every sentence, no exceptions
- Write like you are TALKING to a friend, not writing a report
- Use short, natural sentences — the kind people actually say out loud
- A1: very simple words, present tense, one idea per sentence
- B1: clear and friendly, everyday vocabulary, 1-2 sentences of real context — make these especially useful for real conversation
- B2: natural and slightly casual, include nuance or mild opinion, contractions are fine
- C1: fluent and thoughtful, analytical but still conversational, sounds like a well-read person talking

For each sentence, optionally include a highlight:
- Pick one natural, useful speaking phrase from the sentence (not the whole sentence)
- The phrase must appear word-for-word inside the text field
- Write the meaning in plain Korean (like a friend explaining it, not a dictionary)
- Only highlight phrases that are genuinely useful or interesting to a Korean learner
- If no phrase stands out, set highlight to null

Do NOT write like a newspaper headline.
Do NOT write like a presentation slide.
Do NOT use phrases like "It is worth noting" or "This development signifies".

quick_understanding_ko: write in plain, friendly Korean — like texting a friend
quick_understanding_en: short and clear, one idea per bullet

Pick the 3 most important and interesting stories from the list.`;

// 기사 목록을 AI에게 전달하는 유저 메시지 생성
function buildUserPrompt(articles: RawArticle[]): string {
  const list = articles
    .map(
      (a, i) =>
        `[${i + 1}] ${a.title}\nSource: ${a.source}\n${a.description ?? ""}`
    )
    .join("\n\n");

  return `Here are today's news articles from Germany:\n\n${list}\n\nPick the 3 most important stories and generate a card for each.`;
}

// --- 메인 함수 ---

export async function generateCards(candidates: RawArticle[]): Promise<NewsCard[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  if (candidates.length === 0) {
    throw new Error("No candidates provided to generateCards.");
  }

  const openai = new OpenAI({ apiKey });

  // Structured Output으로 요청 — 응답이 반드시 batchSchema 형태로 옴
  const response = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(candidates) },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "BrieflyNewsCards",
        strict: true,  // 스키마 외 필드 허용 안 함
        schema: batchSchema,
      },
    },
  });

  const raw = response.choices[0].message.content;
  if (!raw) {
    throw new Error("OpenAI returned an empty response.");
  }

  // JSON 파싱 후 cards 배열만 꺼내서 반환
  const parsed = JSON.parse(raw) as { cards: NewsCard[] };
  return parsed.cards;
}
