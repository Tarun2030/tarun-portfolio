"use client";
import { useState, useRef, useEffect } from "react";

const WORDS = [
  {
    word: "Bonjour",
    pronunciation: "bohn-ZHOOR",
    meaning: "Hello / Good morning",
    type: "GREETING",
    example: "Bonjour! Comment ça va?",
    exampleEn: "Hello! How are you?",
  },
  {
    word: "Merci",
    pronunciation: "mehr-SEE",
    meaning: "Thank you",
    type: "COURTESY",
    example: "Merci beaucoup!",
    exampleEn: "Thank you very much!",
  },
  {
    word: "Demain",
    pronunciation: "duh-MAN",
    meaning: "Tomorrow",
    type: "TIME",
    example: "À demain!",
    exampleEn: "See you tomorrow!",
  },
  {
    word: "Enchanté",
    pronunciation: "ahn-shan-TAY",
    meaning: "Nice to meet you",
    type: "SOCIAL",
    example: "Enchanté de vous rencontrer.",
    exampleEn: "Pleased to meet you.",
  },
  {
    word: "Magnifique",
    pronunciation: "man-yee-FEEK",
    meaning: "Magnificent",
    type: "ADJECTIVE",
    example: "C'est magnifique!",
    exampleEn: "It's magnificent!",
  },
  {
    word: "Courage",
    pronunciation: "koo-RAZH",
    meaning: "Courage / Keep going",
    type: "NOUN",
    example: "Bon courage!",
    exampleEn: "Good luck — keep going!",
  },
  {
    word: "Libre",
    pronunciation: "LEE-bruh",
    meaning: "Free",
    type: "ADJECTIVE",
    example: "Je suis libre.",
    exampleEn: "I am free.",
  },
  {
    word: "Aventure",
    pronunciation: "ah-vahn-TYUR",
    meaning: "Adventure",
    type: "NOUN",
    example: "Quelle aventure!",
    exampleEn: "What an adventure!",
  },
];

export default function FrenchSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-6">
      <div className="max-w-[440px] md:max-w-3xl mx-auto">

        {/* Header */}
        <div
          className="mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#051A24] opacity-40 mb-3">
            En coulisses · Behind the scenes
          </p>
          <h2 className="font-mondwest text-[32px] md:text-[40px] text-[#0D212C] leading-[1.1]">
            Je parle français.{" "}
            <span style={{ opacity: 0.35 }}>Presque.</span>
          </h2>
          <p className="text-sm text-[#051A24] opacity-50 mt-3 leading-relaxed max-w-xs">
            Learning, word by word. Hover a card to see it in context.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {WORDS.map((w, i) => (
            <div
              key={w.word}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-2xl p-4 cursor-default overflow-hidden"
              style={{
                border: "1px solid rgba(5,26,36,0.1)",
                background: hovered === i ? "#F8F4EF" : "#FFFFFF",
                transform: visible
                  ? hovered === i ? "translateY(-4px)" : "translateY(0)"
                  : "translateY(24px)",
                opacity: visible ? 1 : 0,
                boxShadow: hovered === i ? "0 8px 28px rgba(5,26,36,0.08)" : "0 1px 4px rgba(5,26,36,0.04)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, background 0.2s ease, box-shadow 0.2s ease`,
              }}
            >
              {/* Type badge */}
              <p
                className="font-mono uppercase mb-2"
                style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(5,26,36,0.32)" }}
              >
                {w.type}
              </p>

              {/* Word */}
              <p className="font-mondwest text-[22px] md:text-[24px] text-[#0D212C] leading-none mb-1">
                {w.word}
              </p>

              {/* Pronunciation */}
              <p
                className="font-mono italic mb-2"
                style={{ fontSize: "10px", color: "rgba(5,26,36,0.38)" }}
              >
                {w.pronunciation}
              </p>

              {/* Meaning */}
              <p className="text-xs text-[#051A24] leading-snug" style={{ opacity: 0.65 }}>
                {w.meaning}
              </p>

              {/* Example — reveals on hover */}
              <div
                style={{
                  maxHeight: hovered === i ? "80px" : "0px",
                  opacity: hovered === i ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.25s ease",
                }}
              >
                <div
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px solid rgba(5,26,36,0.08)" }}
                >
                  <p
                    className="text-xs text-[#0D212C] italic leading-snug"
                    style={{ fontWeight: 500 }}
                  >
                    &ldquo;{w.example}&rdquo;
                  </p>
                  <p
                    className="mt-1"
                    style={{ fontSize: "10px", color: "rgba(5,26,36,0.45)" }}
                  >
                    {w.exampleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="font-mono text-[10px] mt-8 text-[#051A24]"
          style={{
            opacity: visible ? 0.28 : 0,
            transition: `opacity 0.6s ease ${WORDS.length * 0.07 + 0.3}s`,
            letterSpacing: "0.05em",
          }}
        >
          Duolingo streak: ongoing · Accent: work in progress
        </p>
      </div>
    </section>
  );
}
