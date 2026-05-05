"use client";
import { useRef, useState } from "react";
import Button from "./Button";

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
];

interface FloatingImg {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

let counter = 0;

export default function PartnerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<FloatingImg[]>([]);
  const lastSpawn = useRef(0);
  const imgIndex = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;

    const rect = containerRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotation = Math.random() * 20 - 10;
    const src = marqueeImages[imgIndex.current % marqueeImages.length];
    imgIndex.current++;
    const id = ++counter;

    setImages((prev) => [...prev, { id, x, y, src, rotation }]);
    setTimeout(() => {
      setImages((prev) => prev.filter((img) => img.id !== id));
    }, 1000);
  };

  return (
    <section className="w-full py-12 px-6">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative max-w-7xl mx-auto py-48 rounded-[40px] flex flex-col items-center justify-center overflow-hidden bg-white"
        style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            className="absolute pointer-events-none"
            style={{
              left: img.x - 64,
              top: img.y - 40,
              transform: `rotate(${img.rotation}deg)`,
              animation: "floatFade 1000ms ease-out forwards",
              zIndex: 10,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt=""
              className="w-32 h-20 object-cover rounded-xl shadow-lg"
            />
          </div>
        ))}

        <h2 className="font-mondwest text-[48px] md:text-[64px] lg:text-[80px] text-[#0D212C] mb-12 text-center relative z-20 px-6">
          Partner with us
        </h2>

        <Button
          variant="primary"
          href="mailto:mail2tarun.30@gmail.com"
          avatarSrc="/tarun.jpg"
          className="relative z-20"
        >
          Start chat with Tarun
        </Button>
      </div>
    </section>
  );
}
