"use client";

import type { FC, CSSProperties } from "react";
import { C } from "./strive";

/** Photo slot: renders a real image if `src` is set, else a brand-toned placeholder. */
export const Photo: FC<{ src?: string; label?: string; bw?: boolean; className?: string; style?: CSSProperties }> = ({ src, label, bw, className, style }) => {
  if (src) return <img src={src} alt={label ?? ""} className={`h-full w-full object-cover ${className ?? ""}`} style={style} />;
  return (
    <div
      className={`flex h-full w-full items-end ${className ?? ""}`}
      style={{ background: bw ? "linear-gradient(150deg,#6f7a79,#2f3a39)" : `linear-gradient(150deg, ${C.blue}, ${C.teal})`, ...style }}
    >
      {label && <span className="p-4 font-sans text-[10px] uppercase tracking-[0.25em] text-white/80">{label}</span>}
    </div>
  );
};

/** Crest-style oval monogram echoing their ornate logo mark. */
export const Crest: FC<{ size?: number; color?: string }> = ({ size = 56, color = C.teal }) => (
  <span className="inline-flex items-center justify-center border" style={{ width: size, height: size * 1.25, borderColor: color, borderRadius: "50%" }}>
    <span className="font-serif italic" style={{ color, fontSize: size * 0.5 }}>iH</span>
  </span>
);
