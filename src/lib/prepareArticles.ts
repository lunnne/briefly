// src/lib/prepareArticles.ts
// AI에 넘기기 전에 기사를 필터링하고 중복을 제거.
// 외부 의존성 없음 — 순수 함수들로만 구성됨.

import type { RawArticle } from "./fetchNews";

// description이 이 길이보다 짧으면 내용이 너무 빈약한 것으로 판단
const MIN_DESCRIPTION_LENGTH = 40;

// 두 기사 제목의 단어 겹침이 이 비율 이상이면 중복으로 간주
const DUPLICATE_SIMILARITY_THRESHOLD = 0.6;

// 유사도 계산 시 의미 없는 단어(조사, 관사 등)는 무시
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
  "has", "have", "had", "as", "its", "it", "this", "that", "not", "no",
  // 독일어 불용어
  "der", "die", "das", "und", "in", "von", "zu", "den", "dem", "des",
  "ein", "eine", "ist", "im", "auf", "mit", "sich", "für", "als",
]);

// 외부에서 호출하는 진입점 — 필터링 → 중복 제거 순서로 실행
export function prepareArticles(articles: RawArticle[]): RawArticle[] {
  const filtered = articles.filter(isUsable);
  const deduped = removeDuplicates(filtered);
  return deduped;
}

// --- 필터링 ---

// 설명이 너무 짧거나 제목이 너무 짧은 기사는 카드 생성에 적합하지 않음
function isUsable(article: RawArticle): boolean {
  if (!article.description) return false;
  if (article.description.length < MIN_DESCRIPTION_LENGTH) return false;
  if (article.title.length < 10) return false;
  return true;
}

// --- 중복 제거 ---

// 앞에서 선택된 기사와 제목이 너무 비슷하면 같은 사건을 다루는 기사로 판단해 제외.
// Jaccard 유사도 사용: 공통 단어 수 / 전체 고유 단어 수
function removeDuplicates(articles: RawArticle[]): RawArticle[] {
  const kept: RawArticle[] = [];

  for (const candidate of articles) {
    // 이미 선택된 기사들 중 하나라도 너무 비슷하면 건너뜀
    const isDuplicate = kept.some(
      (existing) =>
        titleSimilarity(candidate.title, existing.title) >= DUPLICATE_SIMILARITY_THRESHOLD
    );

    if (!isDuplicate) {
      kept.push(candidate);
    }
  }

  return kept;
}

// 두 제목 간의 Jaccard 유사도 계산 (0 ~ 1, 1에 가까울수록 유사)
function titleSimilarity(a: string, b: string): number {
  const wordsA = tokenize(a);
  const wordsB = tokenize(b);

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  const intersection = new Set([...wordsA].filter((w) => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);

  return intersection.size / union.size;
}

// 제목을 소문자 단어 집합으로 변환 — 불용어와 1글자 단어 제거
function tokenize(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\säöüß]/g, "") // 알파벳·숫자·독일어 특수문자만 남김
      .split(/\s+/)
      .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
  );
}
