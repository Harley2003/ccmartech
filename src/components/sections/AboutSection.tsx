"use client";

import Image from "next/image";
import { motion, useInView, animate } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Play, X, CheckCircle2, Users, Briefcase, Award } from "lucide-react";
import siteData from "@/data/site.json";

/* Count-up animation component */
function CountUp({
  value,
  label,
  icon: Icon
}: {
  value: string;
  label: string;
  icon: React.ElementType;
}) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 min-w-20">
      <span className="w-9 h-9 rounded-full bg-brand-blue/10 flex items-center justify-center mb-1">
        <Icon className="w-4.5 h-4.5 text-brand-blue" />
      </span>
      <span className="text-2xl font-black text-brand-blue leading-none">
        {display}
        {suffix}
      </span>
      <span className="text-xs text-body-text text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

/* About highlights */
const highlights = [
  "Tư vấn chiến lược Marketing bài bản, phù hợp từng doanh nghiệp",
  "Giải pháp toàn diện: từ nghiên cứu thị trường đến triển khai chiến dịch",
  "Tối ưu lợi nhuận bằng công nghệ tiên tiến & phân tích dữ liệu",
  "Cam kết đồng hành dài hạn — đối tác tin cậy trên thị trường số"
];

/* Floating orbs config */
const ORBS = [
  {
    size: 320,
    x: "60%",
    y: "10%",
    color: "#003FBB",
    opacity: 0.18,
    duration: 8
  },
  {
    size: 220,
    x: "10%",
    y: "55%",
    color: "#0067A1",
    opacity: 0.14,
    duration: 11
  },
  {
    size: 160,
    x: "75%",
    y: "65%",
    color: "#1B3D80",
    opacity: 0.2,
    duration: 7
  },
  {
    size: 100,
    x: "30%",
    y: "15%",
    color: "#003FBB",
    opacity: 0.12,
    duration: 13
  },
  { size: 80, x: "85%", y: "30%", color: "#0067A1", opacity: 0.16, duration: 9 }
];

/* Tiny floating node dots */
const NODES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${((i * 37 + 11) % 90) + 5}%`,
  y: `${((i * 53 + 7) % 85) + 5}%`,
  r: i % 3 === 0 ? 4 : 2.5,
  delay: i * 0.3
}));

// YouTube video ID
const YOUTUBE_ID = "fH_ciiYP6d4";
// Video thumbnail
const VIDEO_THUMB =
  "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=900&q=80";

export default function AboutSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── LEFT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            {/* Label */}
            <span className="inline-flex items-center gap-2 text-brand-blue text-xs font-semibold uppercase tracking-widest mb-5">
              <span className="w-6 h-px bg-brand-blue/50" /> Về chúng tôi
            </span>

            <div className="mb-5">
              <Image
                src="/about-logo.png"
                alt="CCMARTECH"
                width={560}
                height={170}
                className="max-w-115 h-auto object-contain"
              />
            </div>

            <p className="text-body-text leading-relaxed mb-6 text-[15px]">
              <strong>Công ty Cổ phần CCMARTECH</strong> được thành lập vào năm
              2020 dưới sự dẫn dắt của Nhà sáng lập kiêm Giám đốc điều hành
              Nguyễn Thanh Tùng. Trải qua nhiều giai đoạn phát triển, CCMARTECH
              hiện đã mở rộng quy mô với 3 chi nhánh tại Hà Nội: Chi nhánh Cầu
              Diễn, Chi nhánh Trường Chinh và Chi nhánh Tây Hồ.
            </p>

            <p className="text-body-text leading-relaxed mb-8 text-[15px]">
              Với khẩu hiệu{" "}
              <strong>&quot;Giải pháp Marketing cho Doanh nghiệp&quot;</strong>,
              CCMARTECH tập trung cung cấp dịch vụ Marketing tích hợp ứng dụng
              công nghệ trên nền tảng kỹ thuật số. Các giải pháp của công ty
              hướng đến mục tiêu:
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#444547] leading-snug"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-brand-blue" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Stat badges with count-up */}
            <div className="flex flex-wrap gap-8">
              {[
                {
                  value: siteData.stats.clients,
                  label: "Khách hàng",
                  icon: Users
                },
                {
                  value: siteData.stats.projects,
                  label: "Dự án",
                  icon: Briefcase
                },
                {
                  value: siteData.stats.experience,
                  label: "Năm kinh nghiệm",
                  icon: Award
                }
              ].map((s) => (
                <CountUp
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  icon={s.icon}
                />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Video with abstract animation surrounding it ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            {/* ── Abstract decorations AROUND the video frame ── */}

            {/* Soft glow blobs */}
            {ORBS.map((orb, i) => (
              <motion.div
                key={`orb-${orb.color}-${orb.size}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: orb.size,
                  height: orb.size,
                  left: orb.x,
                  top: orb.y,
                  background: orb.color,
                  opacity: orb.opacity,
                  filter: "blur(70px)",
                  transform: "translate(-50%, -50%)"
                }}
                animate={{ x: [0, 25, -15, 10, 0], y: [0, -20, 18, -8, 0] }}
                transition={{
                  duration: orb.duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Floating node dots scattered around */}
            {NODES.map((n) => (
              <motion.div
                key={n.id}
                className="absolute rounded-full bg-[#003FBB] pointer-events-none"
                style={{
                  width: n.r * 2,
                  height: n.r * 2,
                  left: n.x,
                  top: n.y,
                  transform: "translate(-50%, -50%)"
                }}
                animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
                transition={{
                  duration: 3 + (n.id % 3),
                  repeat: Infinity,
                  delay: n.delay,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Orbit rings around the video */}
            <motion.div
              className="absolute rounded-full border border-[#003FBB]/20 pointer-events-none"
              style={{ width: "110%", height: "110%", aspectRatio: "auto" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#003FBB]/60" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0067A1]/50" />
            </motion.div>
            <motion.div
              className="absolute rounded-full border border-dashed border-[#003FBB]/15 pointer-events-none"
              style={{ width: "125%", height: "125%", aspectRatio: "auto" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#60A5FF]/50" />
            </motion.div>

            {/* Corner accent lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="0"
                x2="40"
                y2="0"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="100%"
                y1="0"
                x2="calc(100% - 40px)"
                y2="0"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="40"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="0"
                y1="100%"
                x2="40"
                y2="100%"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="0"
                y1="100%"
                x2="0"
                y2="calc(100% - 40px)"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="100%"
                y1="100%"
                x2="calc(100% - 40px)"
                y2="100%"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="100%"
                y1="100%"
                x2="100%"
                y2="calc(100% - 40px)"
                stroke="#003FBB"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
            </svg>

            {/* ── The actual video frame ── */}
            <div className="relative w-full overflow-hidden aspect-video z-10">
              {playing ? (
                <div className="relative w-full h-full bg-black overflow-hidden">
                  {/* Offset iframe to crop YouTube title bar (top) and branding (bottom) */}
                  <iframe
                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&controls=0&modestbranding=1&rel=0`}
                    title="CCMARTECH intro video"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="absolute -top-15 -bottom-15 left-0 w-full"
                    style={{ height: "calc(100% + 120px)" }}
                  />
                  <button
                    onClick={() => setPlaying(false)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors z-10"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="relative w-full h-full cursor-pointer group block"
                  onClick={() => setPlaying(true)}
                  onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
                  aria-label="Phát video giới thiệu CCMARTECH"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={VIDEO_THUMB}
                    alt="About CCMARTECH"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#001D5E]/50 group-hover:bg-[#001D5E]/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 backdrop-blur-sm flex items-center justify-center"
                    >
                      <span className="absolute w-16 h-16 rounded-full border border-white/30 animate-ping" />
                      <Play
                        className="w-6 h-6 text-white ml-0.5"
                        fill="white"
                      />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">
                      Giới thiệu công ty
                    </p>
                    <p className="font-bold text-sm">
                      CCMARTECH Agency — Câu chuyện thành công
                    </p>
                  </div>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
