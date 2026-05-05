"use client";

import Button from "@/components/Button";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import ProjectsSection from "@/components/ProjectsSection";
import FrenchSection from "@/components/FrenchSection";
import PartnerSection from "@/components/PartnerSection";
import Footer from "@/components/Footer";
import CopyrightBar from "@/components/CopyrightBar";
import BottomNav from "@/components/BottomNav";

// ── Marquee images ─────────────────────────────────────────────────────────
// RELAY SLOTS (A): swap these 3 with real screen recordings from myrelay.space
// when ready — use Kap (Mac) or LICEcap to export as .gif, drop in /public/
const MARQUEE_IMAGES = [
  "https://images.unsplash.com/photo-1461749280684-ddd244803543?auto=format&fit=crop&w=1200&q=80", // → relay: dashboard view
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // → relay: link share flow
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80", // → relay: mobile view
  // ATMOSPHERIC (D): EA / ops / builder context — keep these
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", // executive desk
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80", // travel — Germany/Agritechnica angle
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", // analytics / ops
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", // modern office
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80", // planning / notebook
];
// Duplicate for seamless loop
const MARQUEE_DOUBLED = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center px-6 pt-12 md:pt-16 pb-0">
        <div className="w-full max-w-[440px]">

          {/* Logo */}
          <h1
            className="font-mondwest text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-[#051A24] tracking-tight mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Tarun Sharma
          </h1>

          {/* Tagline */}
          <p
            className="font-mono text-xs md:text-sm text-[#051A24] mb-2 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            EA · Builder · Raipur, India
          </p>

          {/* Main heading */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <p
              className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight whitespace-nowrap"
            >
              Build the{" "}
              <span className="font-mondwest">next wave,</span>
            </p>
            <p
              className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight whitespace-nowrap"
            >
              the <span className="font-mondwest">bold way.</span>
            </p>
          </div>

          {/* Description */}
          <div
            className="flex flex-col gap-6 text-sm md:text-base text-[#051A24] leading-relaxed mt-5 md:mt-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <p>
              I&apos;ve spent 4+ years inside executive operations — calendars, export logistics,
              high-stakes travel, cross-border stakeholders. In 2025, I represented Shivalik at
              Agritechnica in Germany, the world&apos;s largest agricultural trade fair. That work
              taught me to think in systems before reaching for tools.
            </p>
            <p>
              Somewhere in that, I noticed the tools EAs rely on are terrible. So I started
              building Relay — alone, in Next.js, while working full-time. The gap between what I
              needed and what existed bothered me enough to close it myself.
            </p>
            <p>Engagements start at $5,000 per month.</p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button variant="primary" href="mailto:mail2tarun.30@gmail.com">
              Start a chat
            </Button>
            <Button variant="secondary" href="#work">
              View projects
            </Button>
          </div>

        </div>
      </section>

      {/* ── 2. MARQUEE ────────────────────────────────────────────────────── */}
      <div className="w-full mt-16 md:mt-20 mb-16 overflow-hidden">
        <div
          className="animate-marquee flex"
          style={{ width: "max-content" }}
        >
          {MARQUEE_DOUBLED.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* ── 3. TESTIMONIAL QUOTE ─────────────────────────────────────────── */}
      <TestimonialSection />

      {/* ── 4. PRICING ───────────────────────────────────────────────────── */}
      <PricingSection />

      {/* ── 5. FRENCH ────────────────────────────────────────────────────── */}
      <FrenchSection />

      {/* ── 7. PROJECTS ──────────────────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── 8. PARTNER ───────────────────────────────────────────────────── */}
      <PartnerSection />

      {/* ── 9. FOOTER ────────────────────────────────────────────────────── */}
      <Footer />

      {/* ── 10. COPYRIGHT BAR ────────────────────────────────────────────── */}
      <CopyrightBar />

      {/* ── 11. FIXED BOTTOM NAV ─────────────────────────────────────────── */}
      <BottomNav />

      {/* Spacer so bottom nav doesn't overlap content */}
      <div className="h-24" />
    </>
  );
}
