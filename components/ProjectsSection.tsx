"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "Relay",
    description: "An EA tool I built for myself first — handoffs, reminders, follow-through for everything that falls between other tools. Live at myrelay.space",
    // SWAP → screenshot or screen recording of myrelay.space
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    href: "https://myrelay.space",
  },
  {
    name: "Portfolio OS",
    description: "Where I document what I'm building and thinking. You're looking at it.",
    // SWAP → screenshot of this portfolio
    image: "https://images.unsplash.com/photo-1559136555-9303baea8eae?auto=format&fit=crop&w=1400&q=85",
    href: "#",
  },
  {
    name: "Audit Arsenal",
    description: "A prompt kit for reviewing copy and UI the way an operator would — from the outside, looking for what breaks.",
    // SWAP → screenshot of the prompt kit in action
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=85",
    href: "#",
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
        <a
          href={project.href}
          target={project.href.startsWith("http") ? "_blank" : undefined}
          rel={project.href.startsWith("http") ? "noreferrer" : undefined}
          className="font-mondwest text-2xl md:text-3xl font-semibold text-[#051A24] mb-1 hover:opacity-70 transition inline-block"
        >
          {project.name} ↗
        </a>
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
