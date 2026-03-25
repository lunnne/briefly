"use client";

import { useState } from "react";
import { CEFRLevel, SayItContent, SpeakingLine } from "@/types/news";

const LEVELS: CEFRLevel[] = ["A1", "B1", "B2", "C1"];

interface Props {
  sayIt: SayItContent;
}

// 문장 안에서 highlight.phrase를 찾아 강조 span으로 감싸서 반환
function renderText(line: SpeakingLine, isFocused: boolean) {
  if (!isFocused || !line.highlight) {
    return <span>{line.text}</span>;
  }

  const { phrase } = line.highlight;
  const idx = line.text.indexOf(phrase);

  // phrase가 text 안에 없으면 그냥 표시
  if (idx === -1) return <span>{line.text}</span>;

  const before = line.text.slice(0, idx);
  const after = line.text.slice(idx + phrase.length);

  return (
    <span>
      {before}
      <mark className="bg-stone-100 text-gray-800 rounded px-0.5 not-italic font-normal">
        {phrase}
      </mark>
      {after}
    </span>
  );
}

export default function SayItSection({ sayIt }: Props) {
  const [active, setActive] = useState<CEFRLevel>("B1");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  function handleLevelChange(level: CEFRLevel) {
    setActive(level);
    setFocusedIndex(null);
  }

  function handleSentenceClick(i: number) {
    setFocusedIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <p className="text-[13px] text-gray-400 italic">Say it in your own words</p>

        {/* Level tabs */}
        <div className="flex gap-1">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              className={`
                text-xs tracking-wider px-2.5 py-1 rounded-full transition-colors duration-200
                ${
                  active === level
                    ? "text-gray-700 bg-gray-100"
                    : "text-gray-300 hover:text-gray-500"
                }
              `}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Sentences */}
      <ol className="space-y-1">
        {sayIt[active].map((line, i) => {
          const isFocused = focusedIndex === i;
          const isDimmed = focusedIndex !== null && !isFocused;
          return (
            <li
              key={i}
              onClick={() => handleSentenceClick(i)}
              className={`
                flex gap-4 rounded-xl px-3 py-2.5 cursor-pointer select-none
                transition-all duration-300
                ${isFocused ? "bg-gray-50" : "hover:bg-gray-50/70"}
                ${isDimmed ? "opacity-25" : "opacity-100"}
              `}
            >
              <span
                className={`
                  mt-0.5 text-[10px] tabular-nums shrink-0 w-3 transition-colors duration-300
                  ${isFocused ? "text-gray-400" : "text-gray-300"}
                `}
              >
                {i + 1}
              </span>

              <div className="flex flex-col gap-1.5">
                <p className="text-[14px] text-gray-600 leading-[1.7]">
                  {renderText(line, isFocused)}
                </p>

                {/* Phrase hint — only when focused and highlight exists */}
                {isFocused && line.highlight && (
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    <span className="text-gray-300 mr-1.5">↳</span>
                    {line.highlight.phrase}
                    <span className="text-gray-300 mx-1.5">·</span>
                    {line.highlight.meaning}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
