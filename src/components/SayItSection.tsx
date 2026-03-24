"use client";

import { useState } from "react";
import { CEFRLevel, SayItContent } from "@/types/news";

const LEVELS: CEFRLevel[] = ["A1", "B1", "B2", "C1"];

interface Props {
  sayIt: SayItContent;
}

export default function SayItSection({ sayIt }: Props) {
  const [active, setActive] = useState<CEFRLevel>("B1");
  const [focusedSentence, setFocusedSentence] = useState<number | null>(null);

  function handleLevelChange(level: CEFRLevel) {
    setActive(level);
    setFocusedSentence(null);
  }

  function handleSentenceClick(i: number) {
    setFocusedSentence((prev) => (prev === i ? null : i));
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <p className="text-[13px] text-gray-400 italic">Say it in your own words</p>

        {/* Level tabs — pill style */}
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
        {sayIt[active].map((sentence, i) => {
          const isFocused = focusedSentence === i;
          const isDimmed = focusedSentence !== null && !isFocused;
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
              <p className="text-[14px] text-gray-600 leading-[1.7]">
                {sentence}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
