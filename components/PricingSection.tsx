"use client";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import Button from "./Button";

export default function PricingSection() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const fadeClass = isInView ? "animate-fade-in-up" : "opacity-0";

  return (
    <section ref={ref} className="w-full py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl md:ml-auto">

        {/* Dark card */}
        <div
          className={`rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 bg-[#051A24] ${fadeClass}`}
          style={{
            animationDelay: isInView ? "0.1s" : undefined,
            boxShadow: "inset 0 2px 8px 0 rgba(255,255,255,0.05)",
          }}
        >
          <p className="text-[#E0EBF0] text-xs font-mono mt-4 mb-2">Most popular</p>
          <h3 className="text-[22px] font-medium text-[#F6FCFF] mb-2">Monthly Partnership</h3>
          <p className="text-[#E0EBF0] text-sm mb-6 leading-relaxed">
            A dedicated creative design session. <br />
            You work directly with Tarun.
          </p>
          <div className="mb-6">
            <span className="text-2xl font-semibold text-[#F6FCFF]">$5,000</span>
            <p className="text-[#E0EBF0] text-sm mt-1">Monthly</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" href="mailto:mail2tarun.30@gmail.com">
              Start a chat
            </Button>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium text-[#E0EBF0] border border-[#E0EBF0]/20 hover:opacity-80 transition"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Light card */}
        <div
          className={`rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 bg-white ${fadeClass}`}
          style={{
            animationDelay: isInView ? "0.2s" : undefined,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-[#273C46] text-xs font-mono mt-4 mb-2">Fixed scope</p>
          <h3 className="text-[22px] font-medium text-[#0D212C] mb-2">Custom Project</h3>
          <p className="text-[#051A24]/70 text-sm mb-6 leading-relaxed">
            Fixed scope, fixed timeline. <br />
            Same focus, same standards.
          </p>
          <div className="mb-6">
            <span className="text-2xl font-semibold text-[#0D212C]">$5,000</span>
            <p className="text-[#273C46] text-sm mt-1">Minimum</p>
          </div>
          <Button variant="primary" href="mailto:mail2tarun.30@gmail.com">
            Start a chat
          </Button>
        </div>

      </div>
    </section>
  );
}
