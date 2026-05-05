"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "Relay",
    description: "An EA tool I built for myself first — handoffs, reminders, follow-through for everything that falls between other tools. Live at myrelay.space",
    image: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  },
  {
    name: "Portfolio OS",
    description: "Where I document what I'm building and thinking. You're looking at it.",
    image: "https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif",
  },
  {
    name: "Audit Arsenal",
    description: "A prompt kit for reviewing copy and UI the way an operator would — from the outside, looking for what breaks.",
    image: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  },
];

function ProjectItem({ project }: { project: (typeof projects)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
      }}
    >
      <div className="ml-20 md:ml-28 mb-4">
        <h3 className="font-mondwest text-2xl md:text-3xl font-semibold text-[#051A24] mb-1">
          {project.name}
        </h3>
        <p className="text-sm md:text-base text-[#051A24]/70">{project.description}</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.name}
        className="w-full rounded-2xl shadow-lg object-cover"
        style={{ maxHeight: 500 }}
      />
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col gap-16 md:gap-20">
        {projects.map((p) => (
          <ProjectItem key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
}
