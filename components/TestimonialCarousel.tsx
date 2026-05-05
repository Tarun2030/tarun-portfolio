"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const testimonials = [
  {
    quote:
      "With very little guidance the work delivered was consistently spot on. The attention to detail and instinct for what matters are rare in someone who also ships fast.",
    name: "Marcus Anderson",
    role: "CEO, Data.storage",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote:
      "Tarun led the creation of our best deck to date! The design thinking paired with clear product storytelling made all the difference in our raise.",
    name: "Alex Wu",
    role: "Founder, Nexgate",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote:
      "Working with Tarun transformed our product vision into something we're genuinely proud to ship. He moves fast and thinks deeply at the same time.",
    name: "James Mitchell",
    role: "VP Product, LaunchPad",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote:
      "The quality exceeded our expectations at every step. Clear communication, sharp execution, no surprises — exactly what you want from a build partner.",
    name: "Rachel Foster",
    role: "Co-founder, Nexus Labs",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote:
      "Incredible work from start to finish. The process felt collaborative and the output was polished beyond what we'd seen anywhere else.",
    name: "David Zhang",
    role: "Head of Design, Paradigm Labs",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

const COUNT = testimonials.length;
const tripled = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialCarousel() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const [current, setCurrent] = useState(COUNT);
  const [hasTransition, setHasTransition] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [cardWidth, setCardWidth] = useState(427.5);
  const isLockedRef = useRef(false);
  const isPaused = useRef(false);
  const currentRef = useRef(COUNT);

  useEffect(() => {
    const measure = () =>
      setCardWidth(window.innerWidth >= 768 ? 427.5 : window.innerWidth - 48);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;
    setIsLocked(true);

    const next = currentRef.current + dir;
    setCurrent(next);
    currentRef.current = next;

    setTimeout(() => {
      let reset = next;
      if (next >= COUNT * 2) reset = COUNT;
      else if (next < COUNT) reset = COUNT * 2 - 1;

      if (reset !== next) {
        setHasTransition(false);
        setCurrent(reset);
        currentRef.current = reset;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setHasTransition(true);
            isLockedRef.current = false;
            setIsLocked(false);
          })
        );
      } else {
        isLockedRef.current = false;
        setIsLocked(false);
      }
    }, 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) navigate(1);
    }, 3000);
    return () => clearInterval(interval);
  }, [navigate]);

  const gap = 24;
  const offset = current * (cardWidth + gap);
  const fadeClass = isInView ? "animate-fade-in-up" : "opacity-0";

  return (
    <section
      ref={ref}
      className="w-full py-20"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      {/* Header */}
      <div
        className={`px-6 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between md:max-w-4xl md:ml-auto ${fadeClass}`}
        style={isInView ? { animationDelay: "0.1s" } : {}}
      >
        <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight mb-4 md:mb-0">
          What <span className="font-mondwest">builders</span> say
        </h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-black text-black" />
          ))}
          <span className="text-sm text-[#051A24] ml-1">Clutch 5/5</span>
        </div>
      </div>

      {/* Carousel */}
      <div
        className={fadeClass}
        style={isInView ? { animationDelay: "0.2s" } : {}}
      >
        <div className="overflow-hidden px-6">
          <div
            className="flex"
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${offset}px)`,
              transition: hasTransition
                ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          >
            {tripled.map((t, i) => {
              const isActive = i === current;
              return (
                <div
                  key={i}
                  style={{
                    width: cardWidth,
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? "scale(1)" : "scale(0.97)",
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                  }}
                  className="bg-white rounded-[32px] md:rounded-[40px] px-6 md:pl-10 md:pr-16 py-8"
                >
                  <svg className="mb-4" width="24" height="18" viewBox="0 0 24 18" fill="#0D212C">
                    <path d="M0 18V10.8C0 6.6 1.6 3.4 4.8 1.2L6.6 3C5 4.2 4.2 5.8 4.2 7.8H6V18H0ZM13.2 18V10.8C13.2 6.6 14.8 3.4 18 1.2L19.8 3C18.2 4.2 17.4 5.8 17.4 7.8H19.2V18H13.2Z" />
                  </svg>
                  <p className="text-base text-[#0D212C] leading-relaxed mb-6">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-sm text-[#0D212C]">{t.name}</p>
                      <p className="text-sm text-[#273C46]">→ {t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3 mt-6 px-6">
          <button
            onClick={() => navigate(-1)}
            disabled={isLocked}
            className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center hover:bg-[#051A24]/5 transition disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 text-[#0D212C]" />
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={isLocked}
            className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center hover:bg-[#051A24]/5 transition disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5 text-[#0D212C]" />
          </button>
        </div>
      </div>
    </section>
  );
}
