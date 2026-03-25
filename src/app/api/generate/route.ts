// src/app/api/generate/route.ts
// 카드 생성 파이프라인을 수동 또는 자동으로 실행하는 API 엔드포인트.
// 두 가지 인증 방식을 지원함:
//   - 개발용 수동 실행: ?secret=<DEV_TRIGGER_SECRET> 또는 x-trigger-secret 헤더
//   - Vercel Cron 자동 실행: Authorization: Bearer <CRON_SECRET>
// GET /api/generate?secret=<DEV_TRIGGER_SECRET>

import { NextRequest } from "next/server";
import { runDailyPipeline } from "@/lib/runDailyPipeline";

// 요청이 인증된 것인지 확인하는 함수
function isAuthorized(req: NextRequest): boolean {
  // Vercel Cron이 자동으로 주입하는 헤더: Authorization: Bearer <CRON_SECRET>
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const bearer = req.headers.get("authorization");
    if (bearer === `Bearer ${cronSecret}`) return true;
  }

  // 개발 중 수동 트리거 — URL 쿼리 파라미터 또는 커스텀 헤더로 시크릿 전달
  const devSecret = process.env.DEV_TRIGGER_SECRET;
  if (devSecret) {
    const fromQuery = req.nextUrl.searchParams.get("secret");
    const fromHeader = req.headers.get("x-trigger-secret");
    if (fromQuery === devSecret || fromHeader === devSecret) return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  // 인증 실패 시 즉시 401 반환
  if (!isAuthorized(req)) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 파이프라인 전체 실행 (뉴스 fetch → 필터링 → AI 카드 생성 → Supabase 저장)
    const result = await runDailyPipeline();
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[generate route] Pipeline error:", message);
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
