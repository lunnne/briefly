import NewsCard from "@/components/NewsCard";
import { newsItems } from "@/data/news";

export default function Home() {
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
      <div className="space-y-6">
        {newsItems.map((item, index) => (
          <NewsCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-200 tracking-wider">
        Mock data · No backend
      </footer>
    </main>
  );
}
