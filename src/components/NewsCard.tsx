import { NewsItem } from "@/types/news";
import SayItSection from "./SayItSection";
import SummarySection from "./SummarySection";

interface Props {
  item: NewsItem;
  index: number;
}

export default function NewsCard({ item, index }: Props) {
  return (
    <article className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] px-6 py-7">
      {/* Index */}
      <span className="text-[10px] tracking-[0.18em] text-gray-300 uppercase">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <h2 className="mt-2 font-serif text-2xl leading-tight text-pretty text-gray-900">
        {item.title}
      </h2>

      {/* Summary / Why it matters — language toggle */}
      <SummarySection summary={item.summary} whyItMatters={item.whyItMatters} />

      {/* Keywords */}
      <div className="mt-5 flex flex-wrap gap-2">
        {item.keywords.map((kw) => (
          <span
            key={kw}
            className="text-[12px] text-gray-400 bg-gray-50 rounded-full px-3 py-1"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Say It */}
      <SayItSection sayIt={item.sayIt} />
    </article>
  );
}
