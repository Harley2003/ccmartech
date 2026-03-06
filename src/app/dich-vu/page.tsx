"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import Link from "next/link";
import {
  ArrowRight, Award, TrendingUp, Users, Zap,
  MessageSquare, ClipboardList, Cpu, CheckSquare,
} from "lucide-react";
import servicesData from "@/data/services.json";
import ServiceCard from "@/components/sections/ServiceCard";

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "ads", label: "Quảng cáo" },
  { id: "web", label: "Website & SEO" },
  { id: "brand", label: "Thương hiệu" },
  { id: "automation", label: "Tự động hóa" },
];

const siteStats = [
  { value: "200+", label: "Dự án hoàn thành", icon: Award },
  { value: "5 năm", label: "Kinh nghiệm", icon: TrendingUp },
  { value: "98%", label: "Khách hàng hài lòng", icon: Users },
  { value: "50+", label: "Chuyên gia", icon: Zap },
];

const processSteps = [
  {
    step: "01",
    title: "Tư vấn & Khảo sát",
    desc: "Lắng nghe nhu cầu, phân tích thị trường và đối thủ để hiểu rõ mục tiêu kinh doanh của bạn",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Lập kế hoạch",
    desc: "Xây dựng chiến lược chi tiết, timeline, KPI rõ ràng và phân bổ nguồn lực hợp lý",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Triển khai",
    desc: "Thực thi chiến dịch theo đúng kế hoạch với đội ngũ chuyên gia giàu kinh nghiệm",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Tối ưu & Báo cáo",
    desc: "Theo dõi liên tục, tối ưu hiệu suất và cung cấp báo cáo minh bạch định kỳ",
    icon: CheckSquare,
  },
];

/* ══════════════════════════════════════════
   HERO — orbs, nodes, orbit rings
   ══════════════════════════════════════════ */
const HERO_ORBS = [
  { size: 660, x: 82, y: 10, color: "#003FBB", opacity: 0.22, dur: 14 },
  { size: 420, x:  5, y: 68, color: "#0067A1", opacity: 0.15, dur: 19 },
  { size: 330, x: 94, y: 80, color: "#1B3D80", opacity: 0.18, dur: 11 },
  { size: 240, x: 42, y: 94, color: "#003FBB", opacity: 0.12, dur: 24 },
  { size: 290, x:  2, y:  6, color: "#0047AB", opacity: 0.1, dur: 16 },
];
const HERO_NODES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  cx: (i * 37 + 11) % 90 + 5,
  cy: (i * 53 + 7)  % 88 + 5,
  r:  i % 4 === 0 ? 3.5 : i % 3 === 0 ? 2.5 : 1.5,
  delay: i * 0.22,
  dur:   3 + (i % 4),
}));
const HERO_EDGES: [number, number][] = [
  [0,3],[3,7],[7,12],[12,18],[18,24],
  [1,5],[5,9],[9,15],[15,21],[21,25],
  [2,6],[6,11],[11,17],[17,23],
  [4,8],[8,14],[14,20],
  [0,1],[1,2],[5,6],[11,12],[17,18],[22,24],
];

/* ══════════════════════════════════════════
   STATS — dark brand section
   ══════════════════════════════════════════ */
const STAT_ORBS = [
  { size: 520, x: 92, y: 20, color: "#0067A1", opacity: 0.22, dur: 16 },
  { size: 360, x:  4, y: 78, color: "#003FBB", opacity: 0.18, dur: 21 },
  { size: 260, x: 50, y: 115, color: "#1B3D80", opacity: 0.2, dur: 13 },
];
const STAT_NODES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  cx: (i * 53 + 13) % 92 + 4,
  cy: (i * 37 + 17) % 88 + 6,
  r:  i % 3 === 0 ? 2.5 : 1.5,
  delay: i * 0.3,
  dur: 3 + (i % 4),
}));
const STAT_EDGES: [number, number][] = [
  [0,4],[4,9],[9,14],[1,6],[6,11],[11,16],[2,7],[7,13],[3,8],[8,15],[0,1],[5,6],[12,13],
];

/* ══════════════════════════════════════════
   SERVICES — light section floating shapes
   ══════════════════════════════════════════ */
const SVC_ORBS = [
  { size: 480, x: 96, y: 8,  color: "#003FBB", opacity: 0.05, dur: 20 },
  { size: 340, x:  2, y: 88, color: "#0067A1", opacity: 0.04, dur: 25 },
  { size: 220, x: 50, y: 50, color: "#1B3D80", opacity: 0.03, dur: 17 },
];

/* ══════════════════════════════════════════
   PROCESS — subtle light animation
   ══════════════════════════════════════════ */
const PROC_ORBS = [
  { size: 400, x: 98, y: 20, color: "#003FBB", opacity: 0.06, dur: 18 },
  { size: 300, x:  2, y: 85, color: "#0067A1", opacity: 0.05, dur: 23 },
];

export default function DichVuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const processRef = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "all"
      ? servicesData.services
      : servicesData.services.filter((s) => s.category === activeCategory);

  return (
    <div className="overflow-hidden">

      {/* ════════════════════════════════════════════
          HERO — full abstract animation
          ════════════════════════════════════════════ */}
      <section
        className="relative pt-40 pb-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1F5C 0%, #0047AB 55%, #003FBB 100%)" }}
      >
        {/* ── Animated orbs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {HERO_ORBS.map((orb) => (
            <motion.div
              key={`hero-orb-${orb.x}-${orb.y}`}
              className="absolute rounded-full"
              style={{
                width: orb.size, height: orb.size,
                left: `${orb.x}%`, top: `${orb.y}%`,
                background: orb.color, opacity: orb.opacity,
                filter: "blur(90px)", transform: "translate(-50%,-50%)",
              }}
              animate={{ x: [0, 40, -26, 16, 0], y: [0, -30, 24, -12, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* ── SVG network ── */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {HERO_EDGES.map(([a, b], i) => (
              <motion.line
                key={`h-edge-${a}-${b}`}
                x1={`${HERO_NODES[a].cx}%`} y1={`${HERO_NODES[a].cy}%`}
                x2={`${HERO_NODES[b].cx}%`} y2={`${HERO_NODES[b].cy}%`}
                stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}
            {HERO_NODES.map((n) => (
              <motion.circle
                key={`h-node-${n.id}`}
                cx={`${n.cx}%`} cy={`${n.cy}%`} r={n.r}
                fill="rgba(255,255,255,0.55)"
                animate={{ opacity: [0.12, 0.8, 0.12] }}
                transition={{ duration: n.dur, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* ── Orbit rings ── */}
          <div className="absolute inset-0 flex items-center justify-end pr-[8%]">
            {[68, 48, 30].map((vmin, i) => (
              <motion.div
                key={`ring-${vmin}`}
                className="absolute rounded-full border border-white/[0.07]"
                style={{ width: `${vmin}vmin`, height: `${vmin}vmin` }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
              >
                {i === 0 && (
                  <motion.div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/40"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Corner brackets ── */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/25 rounded-tl" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/25 rounded-tr" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/25 rounded-bl" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/25 rounded-br" />

          {/* ── Scanning line ── */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Data dots ── */}
          {[
            { x: "20%", y: "25%", id: "d0" }, { x: "75%", y: "60%", id: "d1" },
            { x: "40%", y: "80%", id: "d2" }, { x: "85%", y: "30%", id: "d3" },
          ].map((pos) => (
            <motion.div
              key={`dot-${pos.id}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60"
              style={{ left: pos.x, top: pos.y }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: ["d0","d1","d2","d3"].indexOf(pos.id) * 0.7 }}
            />
          ))}
        </div>

        {/* ── Hero content ── */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-8 border border-white/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
              Giải pháp marketing toàn diện
              <span className="w-px h-3 bg-white/20" />
              <span className="font-mono text-xs text-white/50">v2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-black text-white leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
            >
              Dịch vụ{" "}
              <span
                className="block"
                style={{
                  backgroundImage: "linear-gradient(90deg, #67e8f9 0%, #a5b4fc 50%, #93c5fd 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                chuyên nghiệp
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed"
            >
              Từ thiết kế website đến quảng cáo đa kênh — chúng tôi cung cấp giải pháp marketing
              toàn diện giúp doanh nghiệp tăng trưởng bền vững.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-blue rounded-xl font-bold text-sm hover:bg-[#F1F2F4] transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-black/20"
              >
                Tư vấn miễn phí
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#dich-vu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm text-white border border-white/25 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Khám phá dịch vụ
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS — dark brand section with abstract bg
          ════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden" style={{ background: "#001840" }}>
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {STAT_ORBS.map((orb) => (
            <motion.div
              key={`stat-orb-${orb.x}`}
              className="absolute rounded-full"
              style={{
                width: orb.size, height: orb.size,
                left: `${orb.x}%`, top: `${orb.y}%`,
                background: orb.color, opacity: orb.opacity,
                filter: "blur(80px)", transform: "translate(-50%,-50%)",
              }}
              animate={{ x: [0, 28, -18, 0], y: [0, -22, 16, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          {/* Network */}
          <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {STAT_EDGES.map(([a, b], i) => (
              <motion.line
                key={`se-${a}-${b}`}
                x1={`${STAT_NODES[a].cx}%`} y1={`${STAT_NODES[a].cy}%`}
                x2={`${STAT_NODES[b].cx}%`} y2={`${STAT_NODES[b].cy}%`}
                stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
            {STAT_NODES.map((n) => (
              <motion.circle
                key={`sn-${n.id}`}
                cx={`${n.cx}%`} cy={`${n.cy}%`} r={n.r}
                fill="rgba(255,255,255,0.35)"
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: n.dur, repeat: Infinity, delay: n.delay }}
              />
            ))}
          </svg>
          {/* Horizontal scan */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0067A1]/40 to-transparent"
            animate={{ top: ["5%", "95%", "5%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {siteStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col items-center py-12 px-6 bg-white/3 hover:bg-white/7 transition-colors duration-300 group relative overflow-hidden"
              >
                {/* Glow dot on hover */}
                <div className="absolute inset-0 bg-linear-to-b from-brand-blue/0 to-brand-blue/0 group-hover:from-brand-blue/5 group-hover:to-transparent transition-all duration-500" />
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:border-white/30 transition-colors duration-300">
                  <stat.icon className="w-5 h-5 text-white/70" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }}
                  className="font-black text-white mb-1.5 leading-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-white/50 text-center font-mono uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SERVICES GRID — light with floating shapes
          ════════════════════════════════════════════ */}
      <section id="dich-vu" className="relative py-28 bg-[#F1F2F4] overflow-hidden">
        {/* Subtle light orbs */}
        {SVC_ORBS.map((orb) => (
          <motion.div
            key={`svc-orb-${orb.x}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.size, height: orb.size,
              left: `${orb.x}%`, top: `${orb.y}%`,
              background: orb.color, opacity: orb.opacity,
              filter: "blur(80px)", transform: "translate(-50%,-50%)",
            }}
            animate={{ x: [0, 20, -14, 0], y: [0, -18, 12, 0] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Cross grid bg */}
        <div className="absolute inset-0 cross-bg-light opacity-50 pointer-events-none" />

        {/* Floating ring decorations */}
        {[
          { size: 280, x: "96%", y: "8%", dur: 28, id: "r0", dir: 1 },
          { size: 180, x: "3%",  y: "78%", dur: 20, id: "r1", dir: -1 },
        ].map((ring) => (
          <motion.div
            key={`svc-ring-${ring.id}`}
            className="absolute rounded-full border border-brand-blue/6 pointer-events-none"
            style={{ width: ring.size, height: ring.size, left: ring.x, top: ring.y, transform: "translate(-50%,-50%)" }}
            animate={{ rotate: ring.dir === 1 ? 360 : -360 }}
            transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-brand-blue text-sm font-semibold uppercase tracking-widest block mb-4 font-mono">
              — Danh mục dịch vụ —
            </span>
            <h2
              className="font-black text-heading-dark leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              Chọn giải pháp{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                phù hợp
              </span>
            </h2>
            <p className="text-body-text max-w-xl mx-auto leading-relaxed">
              Từng dịch vụ được thiết kế tối ưu cho mục tiêu kinh doanh cụ thể của bạn
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2.5 mb-14"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer overflow-hidden ${
                  activeCategory === cat.id
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                    : "bg-white text-body-text hover:text-heading-dark border border-gray-200 hover:border-brand-blue/30 hover:shadow-sm"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-brand-blue rounded-xl"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ServiceCard
                    title={service.title}
                    description={service.shortDesc}
                    icon={service.icon}
                    gradient={service.gradient}
                    features={service.features.slice(0, 3)}
                    link={`/dich-vu/${service.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PROCESS — animated timeline
          ════════════════════════════════════════════ */}
      <section className="relative py-28 bg-white overflow-hidden">
        {/* Subtle orbs */}
        {PROC_ORBS.map((orb) => (
          <motion.div
            key={`proc-orb-${orb.x}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.size, height: orb.size,
              left: `${orb.x}%`, top: `${orb.y}%`,
              background: orb.color, opacity: orb.opacity,
              filter: "blur(70px)", transform: "translate(-50%,-50%)",
            }}
            animate={{ x: [0, 18, -12, 0], y: [0, -16, 10, 0] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-brand-blue text-sm font-semibold uppercase tracking-widest font-mono block mb-4">
              — Quy trình làm việc —
            </span>
            <h2
              className="font-black text-heading-dark leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              4 bước đến{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                thành công
              </span>
            </h2>
            <p className="text-body-text max-w-xl mx-auto leading-relaxed">
              Quy trình chuyên nghiệp, minh bạch từ tư vấn đến bàn giao và hỗ trợ lâu dài
            </p>
          </motion.div>

          {/* Steps */}
          <div ref={processRef} className="relative">
            {/* Animated connector line — desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gray-100 z-0">
              <motion.div
                className="h-full bg-linear-to-r from-brand-blue via-[#0067A1] to-brand-blue origin-left"
                style={{ boxShadow: "0 0 8px rgba(0,63,187,0.4)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: processInView ? 1 : 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex flex-col items-center text-center relative"
                  >
                    {/* Step number badge */}
                    <div className="relative mb-7 z-10">
                      <motion.div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-brand-blue/20"
                        style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Icon className="w-8 h-8 text-white/90" />
                        {/* Shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.6, ease: "easeInOut" }}
                        />
                      </motion.div>
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center">
                        <span className="text-[10px] font-black text-brand-blue">{step.step}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-heading-dark mb-3 group-hover:text-brand-blue transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-body-text text-sm leading-relaxed max-w-50">{step.desc}</p>

                    {/* Vertical connector — mobile */}
                    {index < processSteps.length - 1 && (
                      <div className="lg:hidden w-px h-8 bg-brand-blue/20 mt-6" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA — maximum abstract drama
          ════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1F5C 0%, #0047AB 55%, #003FBB 100%)" }}
      >
        {/* Full abstract layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Orbs */}
          {[
            { size: 560, x: 92, y: 50, color: "#003FBB", opacity: 0.22, dur: 17 },
            { size: 380, x:  4, y: 40, color: "#0067A1", opacity: 0.18, dur: 22 },
            { size: 260, x: 50, y: 100, color: "#1B3D80", opacity: 0.2, dur: 14 },
          ].map((orb) => (
            <motion.div
              key={`cta-orb-${orb.x}`}
              className="absolute rounded-full"
              style={{
                width: orb.size, height: orb.size,
                left: `${orb.x}%`, top: `${orb.y}%`,
                background: orb.color, opacity: orb.opacity,
                filter: "blur(80px)", transform: "translate(-50%,-50%)",
              }}
              animate={{ x: [0, 32, -20, 0], y: [0, -26, 18, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Pulsing rings from center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[160, 280, 420, 580].map((size, i) => (
              <motion.div
                key={`cta-ring-${size}`}
                className="absolute rounded-full border border-white/[0.07]"
                style={{ width: size, height: size }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.15, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
              />
            ))}
            {/* Inner rotating ring */}
            <motion.div
              className="absolute rounded-full border border-dashed border-white/10"
              style={{ width: 220, height: 220 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400/50" />
            </motion.div>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-8 left-8 w-14 h-14 border-t-2 border-l-2 border-white/20" />
          <div className="absolute top-8 right-8 w-14 h-14 border-t-2 border-r-2 border-white/20" />
          <div className="absolute bottom-8 left-8 w-14 h-14 border-b-2 border-l-2 border-white/20" />
          <div className="absolute bottom-8 right-8 w-14 h-14 border-b-2 border-r-2 border-white/20" />

          {/* Floating accent dots */}
          {[
            { x: "15%", y: "20%", id: "a0" }, { x: "82%", y: "25%", id: "a1" },
            { x: "10%", y: "75%", id: "a2" }, { x: "88%", y: "70%", id: "a3" },
          ].map((pos) => (
            <motion.div
              key={`acc-${pos.id}`}
              className="absolute w-2 h-2 rounded-full bg-cyan-300/40"
              style={{ left: pos.x, top: pos.y }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.6, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, delay: ["a0","a1","a2","a3"].indexOf(pos.id) * 0.9 }}
            />
          ))}

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent"
            animate={{ top: ["8%", "92%", "8%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* CTA content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />{" "}
              Sẵn sàng hợp tác
            </motion.div>

            <h2
              className="font-black text-white mb-6 leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Bạn cần tư vấn{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #67e8f9, #a5b4fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                giải pháp?
              </span>
            </h2>
            <p className="text-white/65 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Đội ngũ chuyên gia sẵn sàng tư vấn giải pháp phù hợp nhất — miễn phí và không ràng buộc.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-brand-blue rounded-xl font-bold text-sm hover:bg-[#F1F2F4] transition-all duration-300 hover:scale-[1.03] shadow-2xl shadow-black/25"
              >
                Liên hệ tư vấn ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+84000000000"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/25 text-white rounded-xl font-medium text-sm hover:bg-white/10 transition-all duration-300"
              >
                Gọi ngay tư vấn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
