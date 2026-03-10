"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ChevronDown, ExternalLink, SlidersHorizontal } from "lucide-react";
import { PROJECTS, CATEGORIES, type Project } from "@/data/portfolio";

/* ── Abstract animation data ── */
const PF_ORBS = [
  { size: 520, x: 88, y: 18, color: "#003FBB", opacity: 0.17, dur: 15 },
  { size: 360, x: 7,  y: 72, color: "#0067A1", opacity: 0.13, dur: 20 },
  { size: 270, x: 52, y: 92, color: "#1B3D80", opacity: 0.15, dur: 12 },
  { size: 210, x: 2,  y: 8,  color: "#0047AB", opacity: 0.09, dur: 17 },
];
const PF_NODES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  cx: (i * 43 + 7)  % 88 + 6,
  cy: (i * 59 + 11) % 84 + 8,
  r:  i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  delay: i * 0.3,
  dur:   3 + (i % 4),
}));
const PF_EDGES: [number, number][] = [
  [0, 3], [3, 7],  [7, 12], [12, 17],
  [1, 5], [5, 10], [10, 15],
  [2, 6], [6, 11], [11, 16],
  [4, 9], [9, 14], [0, 1], [5, 6], [10, 11],
];

/* ── Lightbox ── */
function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: Project[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    globalThis.addEventListener("keydown", handler);
    return () => globalThis.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-200 flex items-center justify-center"
    >
      <button
        type="button"
        aria-label="Đóng lightbox"
        className="absolute inset-0 bg-black/92 backdrop-blur-md cursor-default border-0 p-0 w-full"
        onClick={onClose}
      />

      <dialog
        aria-modal="true"
        className="relative z-10 max-w-5xl w-full mx-4 flex flex-col bg-transparent border-0 p-0"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-white font-bold text-xl">{item.title}</h3>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-sm">{currentIndex + 1} / {items.length}</span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-500/70 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Image — scrollable full height so user can see the entire website design */}
        <div className="relative">
          <div
            className="overflow-y-auto rounded-2xl bg-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ maxHeight: "72vh" }}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={item.image.width}
                height={item.image.height}
                className="w-full h-auto block"
                sizes="(max-width: 1024px) 100vw, 1000px"
                priority
              />
            </motion.div>
          </div>

          {/* Bottom scroll hint */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none rounded-b-2xl"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
          >
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
              <ChevronDown className="w-4 h-4 text-white/50 animate-bounce" />
              <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Scroll</span>
            </div>
          </div>

          {/* Prev / Next navigation */}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-blue/70 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-blue/70 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </dialog>
    </motion.div>
  );
}

/* ── Main PortfolioSection ── */
export default function PortfolioSection() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered =
    selectedCats.length === 0
      ? PROJECTS
      : PROJECTS.filter((p) => selectedCats.includes(p.category));

  function toggleCat(cat: string) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  useEffect(() => {
    if (!filterOpen) return;
    function handler(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    globalThis.addEventListener("mousedown", handler);
    return () => globalThis.removeEventListener("mousedown", handler);
  }, [filterOpen]);

  return (
    <section className="overflow-hidden">

      {/* ── Abstract header strip ── */}
      <div
        className="relative py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3D80 0%, #003FBB 60%, #0067A1 100%)" }}
      >
        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PF_ORBS.map((orb) => (
            <motion.div
              key={`pf-orb-${orb.x}-${orb.y}`}
              className="absolute rounded-full"
              style={{
                width: orb.size, height: orb.size,
                left: `${orb.x}%`, top: `${orb.y}%`,
                background: orb.color, opacity: orb.opacity,
                filter: "blur(85px)", transform: "translate(-50%,-50%)",
              }}
              animate={{ x: [0, 32, -20, 12, 0], y: [0, -26, 20, -8, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* SVG: nodes + connection lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {PF_EDGES.map(([a, b], i) => (
              <motion.line
                key={`pf-e-${a}-${b}`}
                x1={`${PF_NODES[a].cx}%`} y1={`${PF_NODES[a].cy}%`}
                x2={`${PF_NODES[b].cx}%`} y2={`${PF_NODES[b].cy}%`}
                stroke="rgba(255,255,255,0.07)" strokeWidth="0.6"
                animate={{ opacity: [0, 0.85, 0] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}
            {PF_NODES.map((n) => (
              <motion.circle
                key={`pf-n-${n.id}`}
                cx={`${n.cx}%`} cy={`${n.cy}%`} r={n.r}
                fill="rgba(255,255,255,0.5)"
                animate={{ opacity: [0.15, 0.75, 0.15] }}
                transition={{ duration: n.dur, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* Orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="absolute rounded-full border border-white/8"
              style={{ width: "55vmin", height: "55vmin" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/25" />
              <div className="absolute top-1/4 -right-1 w-2 h-2 rounded-full bg-[#0067A1]/60" />
            </motion.div>
            <motion.div
              className="absolute rounded-full border border-dashed border-white/5"
              style={{ width: "38vmin", height: "38vmin" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/25" />
            </motion.div>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-white/20" />
          <div className="absolute top-5 right-5 w-10 h-10 border-t border-r border-white/20" />
          <div className="absolute bottom-5 left-5 w-10 h-10 border-b border-l border-white/20" />
          <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-white/20" />
        </div>

        {/* Header content */}
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-3 text-white/55 text-xs font-semibold uppercase tracking-[0.22em] mb-4">
              <span className="w-8 h-px bg-white/30" />{" "}
              Portfolio
              {" "}<span className="w-8 h-px bg-white/30" />
            </span>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Dự án đã thực hiện
            </h2>
          </motion.div>
        </div>
      </div>

      {/* ── Project grid ── */}
      <div className="py-16 bg-[#F1F2F4]">
        <div className="container mx-auto px-4">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-7">
            <p className="text-sm text-[#676767]">
              <span className="font-bold text-[#444547]">{filtered.length}</span>{" "}dự án
              {selectedCats.length > 0 && (
                <span className="ml-1.5 text-brand-blue/70">· {selectedCats.join(" · ")}</span>
              )}
            </p>

            <div ref={filterRef} className="relative">
              <button
                type="button"
                onClick={() => setFilterOpen((v) => !v)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  filterOpen || selectedCats.length > 0
                    ? "bg-[#003FBB] text-white border-[#003FBB] shadow-md shadow-[#003FBB]/20"
                    : "bg-white text-[#444547] border-[#E8EAEE] hover:border-[#003FBB]/40 hover:text-[#003FBB]"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Lọc lĩnh vực
                {selectedCats.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white text-[#003FBB] text-[9px] font-black flex items-center justify-center leading-none">
                    {selectedCats.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl shadow-black/10 border border-[#E8EAEE] z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8EAEE]">
                      <span className="text-[10px] font-bold text-[#444547] uppercase tracking-widest">Lĩnh vực</span>
                      {selectedCats.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedCats([])}
                          className="text-[10px] text-[#003FBB] font-semibold hover:underline cursor-pointer"
                        >
                          Xoá bộ lọc
                        </button>
                      )}
                    </div>
                    <div className="p-3 grid grid-cols-2 gap-0.5 max-h-72 overflow-y-auto [scrollbar-width:thin]">
                      {CATEGORIES.slice(1).map((cat) => {
                        const count = PROJECTS.filter((p) => p.category === cat).length;
                        const checked = selectedCats.includes(cat);
                        return (
                          <label
                            key={cat}
                            className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#F1F2F4] cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCat(cat)}
                              className="w-3.5 h-3.5 accent-[#003FBB] cursor-pointer"
                            />
                            <span className="text-xs text-[#444547] flex-1 truncate">{cat}</span>
                            {count > 0 && (
                              <span className="text-[9px] font-bold text-[#003FBB]/50 tabular-nums">{count}</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCats.join(",")}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-body-text">
                  <span className="text-4xl mb-4 opacity-30">📂</span>
                  <p className="text-sm">Chưa có dự án trong danh mục này.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filtered.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.07 }}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg hover:shadow-brand-blue/10 transition-all duration-500 cursor-pointer"
                      onClick={() => setLightboxIndex(idx)}
                    >
                      {/* Image */}
                      <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-brand-blue/72 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full border-2 border-white/60 flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        {/* Abstract corner brackets on hover */}
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r border-white/0 group-hover:border-white/50 transition-all duration-300" />
                        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b border-l border-white/0 group-hover:border-white/50 transition-all duration-300" />
                      </div>

                      {/* Name only */}
                      <div className="px-4 py-3 flex items-center justify-between">
                        <h3 className="font-bold text-heading-dark text-sm leading-snug">{item.title}</h3>
                        <span className="text-[10px] font-medium text-brand-blue/60 bg-brand-blue/8 px-2 py-0.5 rounded-full shrink-0 ml-2">
                          {item.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex((i) =>
                i === null ? null : (i - 1 + filtered.length) % filtered.length
              )
            }
            onNext={() =>
              setLightboxIndex((i) =>
                i === null ? null : (i + 1) % filtered.length
              )
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
