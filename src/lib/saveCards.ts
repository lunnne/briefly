// src/lib/saveCards.ts
// 생성된 카드 3장을 Supabase의 news_cards 테이블에 저장.
// upsert를 사용해서 같은 날짜+순위로 다시 실행해도 덮어쓰기됨 (중복 에러 없음).

import { createClient } from "@supabase/supabase-js";
import type { NewsCard } from "./generateCards";

// 서비스 롤 키로 Supabase 클라이언트 생성 — RLS(행 수준 보안)를 우회해서 쓰기 가능
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");

  return createClient(url, key);
}

// 저장 성공 후 반환되는 간략한 결과 타입
export interface SaveResult {
  date: string;
  rank: number;
  headline: string;
}

export async function saveCards(
  cards: NewsCard[],
  date: string // "YYYY-MM-DD" 형식
): Promise<SaveResult[]> {
  // 항상 정확히 3장이어야 함 — 그 외는 파이프라인 오류로 간주
  if (cards.length !== 3) {
    throw new Error(`Expected 3 cards, got ${cards.length}.`);
  }

  const supabase = getSupabaseClient();

  // 카드 배열을 DB 행 배열로 변환
  // rank는 1부터 시작 (index + 1)
  const rows = cards.map((card, i) => ({
    date,
    rank: i + 1,
    headline: card.headline,
    category: card.category ?? null,
    quick_understanding_ko: card.quick_understanding_ko,
    quick_understanding_en: card.quick_understanding_en,
    keywords: card.keywords,
    speaking_lines: card.speaking_lines,
  }));

  // upsert: (date, rank) 조합이 이미 있으면 업데이트, 없으면 삽입
  const { data, error } = await supabase
    .from("news_cards")
    .upsert(rows, { onConflict: "date,rank" })
    .select("date, rank, headline");

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  return data as SaveResult[];
}
