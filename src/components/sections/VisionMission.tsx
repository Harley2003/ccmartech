"use client";

import { motion } from "motion/react";
import { Eye, Target, Rocket, Heart } from "lucide-react";
import homeData from "@/data/home.json";

const pillars = [
  {
    icon: Eye,
    title: "Tầm nhìn",
    desc: homeData.vision.vision,
    accent: "from-[#003FBB] to-[#0067A1]"
  },
  {
    icon: Target,
    title: "Sứ mệnh",
    desc: homeData.vision.mission,
    accent: "from-[#1B3D80] to-[#003FBB]"
  },
  {
    icon: Rocket,
    title: "Chiến lược",
    desc: "Ứng dụng công nghệ AI và dữ liệu thực chiến để tối ưu từng chiến dịch — biến ngân sách marketing thành kết quả đo lường được.",
    accent: "from-[#0067A1] to-[#0A3EA4]"
  },
  {
    icon: Heart,
    title: "Giá trị cốt lõi",
    desc: "Minh bạch · Cam kết · Sáng tạo · Hiệu quả. Mỗi quyết định đều đặt lợi ích khách hàng lên hàng đầu.",
    accent: "from-[#003FBB] to-[#1B3D80]"
  }
];

/* ── Abstract animation constants ── */
const VM_ORBS = [
  { size: 560, x: 92, y: 10, color: "#003FBB", opacity: 0.18, dur: 16 },
  { size: 400, x: 5, y: 65, color: "#0067A1", opacity: 0.13, dur: 22 },
  { size: 300, x: 50, y: 95, color: "#1B3D80", opacity: 0.14, dur: 13 },
  { size: 240, x: 2, y: 5, color: "#0047AB", opacity: 0.1, dur: 18 },
  { size: 180, x: 75, y: 55, color: "#003FBB", opacity: 0.08, dur: 20 }
];
const VM_NODES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  cx: ((i * 41 + 9) % 90) + 5,
  cy: ((i * 57 + 13) % 86) + 7,
  r: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  delay: i * 0.28,
  dur: 3 + (i % 4)
}));
const VM_EDGES: [number, number][] = [
  [0, 4],
  [4, 9],
  [9, 14],
  [14, 19],
  [1, 6],
  [6, 11],
  [11, 16],
  [16, 21],
  [2, 7],
  [7, 12],
  [12, 17],
  [3, 8],
  [8, 13],
  [13, 18],
  [0, 1],
  [5, 6],
  [10, 11],
  [15, 16],
  [4, 5],
  [9, 10],
  [14, 15]
];

export default function VisionMission() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #0A2460 0%, #003FBB 45%, #0067A1 100%)"
      }}
    >
      {/* ── Abstract animation layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orbs */}
        {VM_ORBS.map((orb) => (
          <motion.div
            key={`vm-orb-${orb.x}-${orb.y}`}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: orb.color,
              opacity: orb.opacity,
              filter: "blur(90px)",
              transform: "translate(-50%,-50%)"
            }}
            animate={{ x: [0, 28, -18, 10, 0], y: [0, -22, 18, -6, 0] }}
            transition={{
              duration: orb.dur,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* SVG nodes + edges */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {VM_EDGES.map(([a, b], i) => (
            <motion.line
              key={`vm-e-${a}-${b}`}
              x1={`${VM_NODES[a].cx}%`}
              y1={`${VM_NODES[a].cy}%`}
              x2={`${VM_NODES[b].cx}%`}
              y2={`${VM_NODES[b].cy}%`}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.6"
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.35,
                ease: "easeInOut"
              }}
            />
          ))}
          {VM_NODES.map((n) => (
            <motion.circle
              key={`vm-n-${n.id}`}
              cx={`${n.cx}%`}
              cy={`${n.cy}%`}
              r={n.r}
              fill="rgba(255,255,255,0.45)"
              animate={{ opacity: [0.1, 0.7, 0.1] }}
              transition={{
                duration: n.dur,
                repeat: Infinity,
                delay: n.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>

        {/* Orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute rounded-full border border-white/7"
            style={{ width: "62vmin", height: "62vmin" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/25" />
            <div className="absolute top-1/3 -right-1 w-2 h-2 rounded-full bg-[#0067A1]/60" />
          </motion.div>
          <motion.div
            className="absolute rounded-full border border-dashed border-white/5"
            style={{ width: "42vmin", height: "42vmin" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
          </motion.div>
          <motion.div
            className="absolute rounded-full border border-white/4"
            style={{ width: "22vmin", height: "22vmin" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
          </motion.div>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-white/20" />
        <div className="absolute top-5 right-5 w-10 h-10 border-t border-r border-white/20" />
        <div className="absolute bottom-5 left-5 w-10 h-10 border-b border-l border-white/20" />
        <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-white/20" />
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 py-24 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-3 text-white/75 text-xs font-semibold uppercase tracking-[0.22em] mb-4">
            <span className="w-8 h-px bg-white/30" /> Định hướng phát triển{" "}
            <span className="w-8 h-px bg-white/30" />
          </span>
          <h2
            className="font-black text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Tầm nhìn &amp; Sứ mệnh
          </h2>
          <p className="text-white/85 leading-relaxed text-[15px]">
            Chúng tôi xây dựng CCMARTECH không chỉ là một agency — mà là đối tác
            chiến lược đồng hành cùng sự phát triển bền vững của doanh nghiệp.
          </p>
        </motion.div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: image card */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            {/* Image card + floating badges share a relative wrapper */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 aspect-3/4 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={homeData.vision.image}
                  alt="Tầm nhìn CCMARTECH"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#001D5E]/80 via-[#003FBB]/20 to-transparent" />

                {/* Corner brackets on image */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/30" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-white/30" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/30" />
              </div>

              {/* Floating stat badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 lg:-top-4 lg:-right-4 rounded-2xl p-4 shadow-xl shadow-[#003FBB]/30 border border-[#003FBB]/15 bg-white"
              >
                <p className="text-[11px] text-[#676767] font-medium mb-0.5">
                  Thành lập
                </p>
                <p className="text-2xl font-black text-[#003FBB]">2020</p>
              </motion.div>

              {/* Floating metric */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-0 left-0 lg:-bottom-4 lg:-left-4 rounded-2xl px-4 py-3 shadow-xl shadow-[#003FBB]/30 border border-[#003FBB]/15 bg-white"
              >
                <p className="text-[11px] text-[#676767] font-medium mb-0.5">
                  Khách hàng
                </p>
                <p className="text-xl font-black text-[#003FBB]">500+</p>
              </motion.div>
            </div>

            {/* Caption — outside image/badge scope, never obscured */}
            <div className="mt-8 px-1">
              <p className="font-black text-white text-2xl leading-tight mb-1">
                Dẫn đầu xu hướng
              </p>
              <p className="text-white/75 text-sm">Performance Marketing</p>
            </div>
          </motion.div>

          {/* Right: 2×2 pillar cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-6 rounded-2xl border border-white/12 backdrop-blur-sm overflow-hidden hover:-translate-y-1 transition-all duration-400"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  {/* Card glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 70%)"
                    }}
                  />
                  {/* Top-right corner bracket */}
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/0 group-hover:border-white/30 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/0 group-hover:border-white/30 transition-all duration-300" />

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl bg-linear-to-br ${p.accent} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="font-bold text-white text-base mb-2">
                    {p.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
