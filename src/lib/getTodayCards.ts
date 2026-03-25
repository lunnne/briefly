// src/lib/getTodayCards.ts
// Supabase에서 오늘 날짜의 카드 3장을 가져와서 UI 타입(NewsItem)으로 변환.
// 서버 전용 — 브라우저에서 직접 호출하지 않음.

import { createClient } from "@supabase/supabase-js";
import type { NewsItem, SpeakingLine } from "@/types/news";

// Supabase DB에서 가져오는 행(row)의 타입 정의
interface NewsCardRow {
  rank: number;
  headline: string;
  quick_understanding_ko: string[];  // 한국어 요약 3줄
  quick_understanding_en: string[];  // 영어 요약 3줄
  keywords: string[];
  speaking_lines: {
    a1: SpeakingLine[];
    b1: SpeakingLine[];
    b2: SpeakingLine[];
    c1: SpeakingLine[];
  };
}

// 환경변수에서 Supabase 클라이언트 생성
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, key);
}

// DB 컬럼명과 UI 컴포넌트가 기대하는 필드명이 다르기 때문에 변환 필요
// 예: headline → title, quick_understanding_ko → summary
function toNewsItem(row: NewsCardRow): NewsItem {
  return {
    id: String(row.rank),
    title: row.headline,
    summary: row.quick_understanding_ko,
    whyItMatters: row.quick_understanding_en,
    keywords: row.keywords,
    sayIt: {
      // DB는 소문자(a1), UI 타입은 대문자(A1) — 여기서 맞춰줌
      A1: row.speaking_lines.a1,
      B1: row.speaking_lines.b1,
      B2: row.speaking_lines.b2,
      C1: row.speaking_lines.c1,
    },
  };
}

export async function getTodayCards(): Promise<NewsItem[]> {
  // 오늘 날짜를 "YYYY-MM-DD" 형식으로 만들기
  const today = new Date().toISOString().split("T")[0];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("news_cards")
    .select("rank, headline, quick_understanding_ko, quick_understanding_en, keywords, speaking_lines")
    .eq("date", today)         // 오늘 날짜의 카드만
    .order("rank", { ascending: true })  // rank 1 → 2 → 3 순서
    .limit(3);

  if (error) {
    throw new Error(`Failed to fetch cards: ${error.message}`);
  }

  // 각 DB 행을 UI 컴포넌트가 쓸 수 있는 형태로 변환해서 반환
  return (data as NewsCardRow[]).map(toNewsItem);
}
