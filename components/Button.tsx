"use client";
import React from "react";

type Variant = "primary" | "secondary" | "tertiary";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  avatarSrc?: string;
  disabled?: boolean;
}

const shadowPrimary =
  "0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)";
const shadowSecondary =
  "0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)";
const shadowTertiary =
  "0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0)";

const variantStyles: Record<Variant, { cls: string; shadow: string }> = {
  primary: { cls: "bg-[#051A24] text-white", shadow: shadowPrimary },
  secondary: { cls: "bg-white text-[#051A24]", shadow: shadowSecondary },
  tertiary: { cls: "bg-white text-[#051A24]", shadow: shadowTertiary },
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  avatarSrc,
  disabled,
}: ButtonProps) {
  const { cls, shadow } = variantStyles[variant];
  const base =
    "inline-flex items-center gap-2 rounded-full font-medium text-sm px-7 py-3 transition-opacity duration-200 hover:opacity-90 cursor-pointer select-none";
  const combined = `${base} ${cls} ${className}`;
  const style = { boxShadow: shadow };

  const inner = (
    <>
      {avatarSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarSrc}
          alt=""
          className="w-10 h-10 rounded-full object-cover -ml-2 flex-shrink-0"
        />
      )}
      {children}
    </>
  );

  if (href)
    return (
      <a href={href} className={combined} style={style}>
        {inner}
      </a>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={combined} style={style}>
      {inner}
    </button>
  );
}
