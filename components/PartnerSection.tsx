"use client";
import { useRef, useState } from "react";
import Button from "./Button";

// Same pool as marquee — swap relay slots when recordings are ready
const marqueeImages = [
  "https://images.unsplash.com/photo-1461749280684-ddd244803543?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=75",
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
