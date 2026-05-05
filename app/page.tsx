"use client";

import Button from "@/components/Button";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ProjectsSection from "@/components/ProjectsSection";
import PartnerSection from "@/components/PartnerSection";
import Footer from "@/components/Footer";
import CopyrightBar from "@/components/CopyrightBar";
import BottomNav from "@/components/BottomNav";

// ── Marquee images ─────────────────────────────────────────────────────────
const MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
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
            The portfolio of Tarun Sharma
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
              I spent four years as an Executive Assistant at a manufacturing company in Raipur,
              building systems and closing gaps that no one else noticed. I now build the tools I
              always needed but couldn&apos;t find — starting with Relay.
            </p>
            <p>
              The work is deliberate and lean. Every project gets my full attention — from the
              first commit to the final deploy, without cutting corners.
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

      {/* ── 5. TESTIMONIAL CAROUSEL ──────────────────────────────────────── */}
      <TestimonialCarousel />

      {/* ── 6. PROJECTS ──────────────────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── 7. PARTNER ───────────────────────────────────────────────────── */}
      <PartnerSection />

      {/* ── 8. FOOTER ────────────────────────────────────────────────────── */}
      <Footer />

      {/* ── 9. COPYRIGHT BAR ─────────────────────────────────────────────── */}
      <CopyrightBar />

      {/* ── 10. FIXED BOTTOM NAV ─────────────────────────────────────────── */}
      <BottomNav />

      {/* Spacer so bottom nav doesn't overlap content */}
      <div className="h-24" />
    </>
  );
}
