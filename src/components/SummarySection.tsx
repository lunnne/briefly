"use client";

import { useState } from "react";

type Lang = "kr" | "en";

interface Props {
  summary: string[];
  whyItMatters: string[];
}

export default function SummarySection({ summary, whyItMatters }: Props) {
  const [lang, setLang] = useState<Lang>("kr");

  const lines = lang === "kr" ? summary : whyItMatters;

  return (
    <div className="mt-8">
      {/* Lang toggle */}
      <div className="flex gap-4 mb-3">
        {(["kr", "en"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`
              text-xs tracking-wider uppercase pb-0.5 transition-colors duration-200
              ${lang === l
                ? "text-gray-500 border-b border-gray-400"
                : "text-gray-300 hover:text-gray-400"
              }
            `}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-2.5 items-start">
            <span className="mt-[5px] shrink-0 w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[14px] text-gray-500 leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
