"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import homeData from "@/data/home.json";
import siteData from "@/data/site.json";
import { useRef } from "react";

/* Highlight tags below headline */
const HIGHLIGHT_TAGS = ["Thiết kế Website", "Google Ads", "Facebook Ads", "TikTok Ads", "SEO"];

/* ── Abstract animation data ── */
const HERO_ORBS = [
  { size: 700, x: 78, y: 18,  color: "#003FBB", opacity: 0.14, duration: 14 },
  { size: 480, x: 10, y: 60,  color: "#0067A1", opacity: 0.11, duration: 18 },
  { size: 340, x: 90, y: 75,  color: "#1B3D80", opacity: 0.16, duration: 10 },
  { size: 260, x: 44, y: 90,  color: "#003FBB", opacity: 0.1, duration: 22 },
  { size: 300, x:  4, y: 10,  color: "#0047AB", opacity: 0.09, duration: 13 },
];

const HERO_NODES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  cx: (i * 37 + 11) % 90 + 5,
  cy: (i * 53 + 7)  % 88 + 5,
  r:  i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  delay: i * 0.25,
  dur:   3 + (i % 4),
}));

const EDGES: [number, number][] = [
  [0,3],[3,7],[7,12],[12,18],[18,23],
  [1,5],[5,9],[9,15],[15,21],
  [2,6],[6,11],[11,17],[17,22],
  [4,8],[8,14],[14,20],
  [0,1],[1,2],[5,6],[11,12],[16,20],
];

export default function Hero() {
  const { hero } = homeData;
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background Image with Parallax ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.backgroundImage}
          alt="CCMARTECH Agency"
          className="w-full h-full object-cover object-top"
        />
        {/* Dark gradient overlay — brand blue tint */}
        <div className="absolute inset-0 bg-linear-to-b from-[#001D5E]/80 via-[#003FBB]/70 to-[#001840]/90" />
        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 dot-bg-hero" />
      </motion.div>

      {/* ── Abstract animation layer ── */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">

        {/* Animated orbs */}
        {HERO_ORBS.map((orb) => (
          <motion.div
            key={`hero-orb-${orb.x}-${orb.y}`}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: orb.color,
              opacity: orb.opacity,
              filter: "blur(90px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ x: [0, 45, -28, 18, 0], y: [0, -32, 26, -12, 0] }}
            transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* SVG: connection lines + node dots */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={`edge-${a}-${b}`}
              x1={`${HERO_NODES[a].cx}%`}
              y1={`${HERO_NODES[a].cy}%`}
              x2={`${HERO_NODES[b].cx}%`}
              y2={`${HERO_NODES[b].cy}%`}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.6"
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            />
          ))}
          {HERO_NODES.map((n) => (
            <motion.circle
              key={`node-${n.id}`}
              cx={`${n.cx}%`}
              cy={`${n.cy}%`}
              r={n.r}
              fill="rgba(255,255,255,0.5)"
              animate={{ opacity: [0.15, 0.75, 0.15] }}
              transition={{ duration: n.dur, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Rotating orbit rings — centered on viewport */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Ring 1: large, slow clockwise */}
          <motion.div
            className="absolute rounded-full border border-white/8"
            style={{ width: "72vmin", height: "72vmin" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/30" />
            <div className="absolute top-1/4 -right-1 w-2 h-2 rounded-full bg-[#0067A1]/70" />
          </motion.div>
          {/* Ring 2: medium, counter-clockwise dashed */}
          <motion.div
            className="absolute rounded-full border border-dashed border-white/5"
            style={{ width: "52vmin", height: "52vmin" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#003FBB]/80" />
            <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 rounded-full bg-white/30" />
          </motion.div>
          {/* Ring 3: small, fast clockwise */}
          <motion.div
            className="absolute rounded-full border border-white/10"
            style={{ width: "33vmin", height: "33vmin" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" />
          </motion.div>
        </div>

        {/* Corner accent brackets */}
        <div className="absolute top-20 left-8 w-14 h-14 border-t border-l border-white/20" />
        <div className="absolute top-20 right-8 w-14 h-14 border-t border-r border-white/20" />
        <div className="absolute bottom-8 left-8 w-14 h-14 border-b border-l border-white/20" />
        <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r border-white/20" />

      </div>

      {/* ── Centered Content ── */}
      <motion.div
        className="relative z-10 container mx-auto px-4 pt-40 pb-28 flex flex-col items-center text-center"
        style={{ y: contentY }}
      >
        <div className="max-w-2xl xl:max-w-3xl w-full flex flex-col items-center">

          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">
              <span className="hidden sm:inline">{siteData.contact.address} &nbsp;·&nbsp; </span>
              {siteData.contact.hotline}
            </span>
          </motion.div>

          {/* Label row */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              className="h-px bg-linear-to-r from-white/0 to-white/80"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <span className="text-white/60 text-xs tracking-[0.25em] uppercase font-semibold">
              Hiệu quả · Chiến lược · Kết quả
            </span>
            <motion.div
              className="h-px bg-linear-to-l from-white/0 to-white/80"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          {/* ── Headline with accents ── */}
          <h1
            className="font-black leading-[1.04] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
          >
            {/* Line 1: "Giải pháp" + accent "Marketing" */}
            <motion.span
              className="block overflow-hidden"
              initial={{ opacity: 0, y: "60%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white">{hero.titleLine1.split(" ").slice(0, -1).join(" ")}{" "}</span>
              {/* Accent word — gradient + animated underline */}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-white via-sky-200 to-[#60C0FF] bg-clip-text text-transparent">
                  {hero.titleLine1.split(" ").at(-1)}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.75 w-full bg-linear-to-r from-white to-[#0067A1] rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </motion.span>

            {/* Line 2: "cho" normal + accent "Doanh nghiệp" */}
            <motion.span
              className="block overflow-hidden mt-1"
              initial={{ opacity: 0, y: "60%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white/70">{hero.titleLine2.split(" ").slice(0, 1).join(" ")}{" "}</span>
              {/* Boxed accent highlight */}
              <span className="relative inline-block text-white">
                <span className="relative z-10">{hero.titleLine2.split(" ").slice(1).join(" ")}</span>
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-[40%] bg-brand-blue/40 rounded-sm z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.span>
          </h1>

          {/* Service tag pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {HIGHLIGHT_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.07 }}
                className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed mb-12 text-center"
          >
            {hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-blue font-bold text-sm hover:bg-[#F1F2F4] hover:scale-[1.03] transition-all duration-300 shadow-2xl shadow-black/20"
            >
              {hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dich-vu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-medium text-sm bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              {hero.ctaSecondary}
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
