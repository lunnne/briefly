import NewsCard from "@/components/NewsCard";
import { getTodayCards } from "@/lib/getTodayCards";

// 항상 최신 데이터를 가져오도록 — 페이지를 정적 캐시하지 않음
export const dynamic = "force-dynamic";

export default async function Home() {
  const cards = await getTodayCards();

  return (
    <main className="min-h-screen max-w-lg mx-auto px-5 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="font-serif text-4xl text-gray-900 tracking-tight">
          Briefly
        </h1>
        <p className="mt-2 text-sm text-gray-400 tracking-wide">
          Today's news. In your own words.
        </p>
      </header>

      {/* News feed */}
      {cards.length > 0 ? (
        <div className="space-y-6">
          {cards.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-gray-400 text-sm">No cards for today yet.</p>
          <p className="mt-1 text-gray-300 text-xs">Check back later.</p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-200 tracking-wider">
        Briefly
      </footer>
    </main>
  );
}
