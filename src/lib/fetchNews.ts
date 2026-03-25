// src/lib/fetchNews.ts
// NewsAPI에서 독일 관련 최신 기사를 가져와서 정규화된 형태로 반환.
// 서버 전용 — API 키가 브라우저에 노출되면 안 됨.

const NEWS_API_BASE = "https://newsapi.org/v2/everything";

// 파이프라인 내부에서 사용하는 기사 타입 (정규화 후)
export interface RawArticle {
  title: string;
  description: string | null;
  source: string;
  url: string;
  published_at: string;
}

// NewsAPI 응답 구조 타입들
interface NewsApiSource {
  id: string | null;
  name: string;
}

interface NewsApiArticle {
  title: string;
  description: string | null;
  url: string;
  publishedAt: string;
  source: NewsApiSource;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
  message?: string; // 에러 응답일 때만 포함됨
}

export async function fetchTopNewsForGermany(limit = 10): Promise<RawArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing NEWS_API_KEY environment variable.");
  }

  // 쿼리 파라미터 조립 — 독일 관련 기사를 최신순으로 요청
  const url = new URL(NEWS_API_BASE);
  url.searchParams.set("q", "Deutschland OR Bundesregierung OR Bundesregierung");
  url.searchParams.set("language", "de");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", String(limit));
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url.toString(), {
    cache: "no-store", // Next.js 캐시 비활성화 — 항상 최신 뉴스를 가져와야 함
  });

  if (!response.ok) {
    throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`);
  }

  const data: NewsApiResponse = await response.json();

  // NewsAPI는 HTTP 200이어도 status 필드로 에러를 내려줄 수 있음
  if (data.status !== "ok") {
    throw new Error(`NewsAPI error: ${data.message ?? "Unknown error"}`);
  }

  // 유효한 기사만 걸러내고, 내부 타입으로 변환해서 반환
  return data.articles
    .filter(isValidArticle)
    .map(normalize);
}

// 제목이나 URL이 없거나, NewsAPI가 삭제 처리한 기사 제외
function isValidArticle(article: NewsApiArticle): boolean {
  return (
    Boolean(article.title) &&
    article.title !== "[Removed]" &&
    Boolean(article.url)
  );
}

// NewsAPI 응답 형태 → 앱 내부 RawArticle 형태로 변환
function normalize(article: NewsApiArticle): RawArticle {
  return {
    title: article.title.trim(),
    description: article.description?.trim() ?? null,
    source: article.source.name,
    url: article.url,
    published_at: article.publishedAt,
  };
}
