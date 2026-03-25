// src/lib/runDailyPipeline.ts
// 매일 카드 3장을 생성하는 전체 파이프라인을 순서대로 실행.
// API 라우트, Cron 작업, 스크립트 등 어디서든 호출 가능.

import { fetchTopNewsForGermany } from "./fetchNews";
import { prepareArticles } from "./prepareArticles";
import { generateCards } from "./generateCards";
import { saveCards } from "./saveCards";

// 파이프라인 실행 결과 타입 — 각 단계에서 처리된 건수를 담음
export interface PipelineResult {
  success: boolean;
  date: string;
  cards_generated: number;
  steps: {
    fetched: number;     // NewsAPI에서 가져온 기사 수
    candidates: number;  // 필터링 후 남은 기사 수
    generated: number;   // AI가 생성한 카드 수
    saved: number;       // Supabase에 저장된 카드 수
  };
}

export async function runDailyPipeline(date?: string): Promise<PipelineResult> {
  // date를 직접 넘기면 그 날짜로 저장 (기본값: 오늘)
  const today = date ?? new Date().toISOString().split("T")[0];

  console.log(`[pipeline] Starting daily generation for ${today}`);

  // 1단계: NewsAPI에서 독일 관련 최신 기사 15개 가져오기
  const raw = await fetchTopNewsForGermany(15);
  console.log(`[pipeline] Fetched ${raw.length} articles`);

  if (raw.length === 0) {
    throw new Error("No articles returned from NewsAPI.");
  }

  // 2단계: 너무 짧거나 중복된 기사 제거
  const candidates = prepareArticles(raw);
  console.log(`[pipeline] ${candidates.length} candidates after filtering`);

  // AI에 넘기기 전에 최소 3개는 있어야 함
  if (candidates.length < 3) {
    throw new Error(`Not enough candidates to generate cards (got ${candidates.length}, need at least 3).`);
  }

  // 3단계: OpenAI로 카드 3장 생성 (한/영 요약 + 말하기 문장 포함)
  const cards = await generateCards(candidates);
  console.log(`[pipeline] Generated ${cards.length} cards`);

  // 4단계: 생성된 카드를 Supabase에 저장
  const saved = await saveCards(cards, today);
  console.log(`[pipeline] Saved ${saved.length} cards for ${today}`);

  return {
    success: true,
    date: today,
    cards_generated: cards.length,
    steps: {
      fetched: raw.length,
      candidates: candidates.length,
      generated: cards.length,
      saved: saved.length,
    },
  };
}
