"use client";
import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export default function TestimonialSection() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const imageRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = imageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const ratio = (center - window.innerHeight / 2) / window.innerHeight;
      setParallaxY(Math.max(-100, Math.min(100, ratio * 200)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeClass = isInView ? "animate-fade-in-up" : "opacity-0";

  return (
    <section ref={ref} className="py-12 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col items-center text-center">

        <div className={fadeClass} style={isInView ? { animationDelay: "0.1s" } : {}}>
          <Quote className="w-6 h-6 text-slate-900 mb-6" />
        </div>

        <h2
          className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight mb-4 ${fadeClass}`}
          style={isInView ? { animationDelay: "0.2s" } : {}}
        >
          I left EA work to build the{" "}
          <span className="font-mondwest">products</span>{" "}
          I always wanted
        </h2>

        <p
          className={`italic text-sm text-[#273C46] mb-8 ${fadeClass}`}
          style={isInView ? { animationDelay: "0.3s" } : {}}
        >
          Tarun Sharma
        </p>

        <div
          className={`flex items-center justify-center gap-8 mb-10 ${fadeClass}`}
          style={isInView ? { animationDelay: "0.4s" } : {}}
        >
          {[
            { label: "EA", w: 80 },
            { label: "Ops", w: 83 },
            { label: "Builder", w: 110 },
          ].map((c) => (
            <span
              key={c.label}
              className="font-medium text-slate-900 text-center"
              style={{ width: c.w, fontSize: 24 }}
            >
              {c.label}
            </span>
          ))}
        </div>

        <div
          ref={imageRef}
          className={`w-full max-w-xs ${fadeClass}`}
          style={isInView ? { animationDelay: "0.5s" } : {}}
        >
          <div style={{ transform: `translateY(${parallaxY}px)`, transition: "transform 0.1s linear" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tarun.jpg"
              alt="Tarun"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
