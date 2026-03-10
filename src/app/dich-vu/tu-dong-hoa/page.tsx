"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Workflow,
  Settings,
  Mail,
  Bot,
  Database,
  Clock,
  Share2,
  Users,
  ArrowLeft,
  Rocket,
  Activity,
  Gauge,
  Cpu,
} from "lucide-react";
import Link from "next/link";

// ==================== ABSTRACT ANIMATION COMPONENTS ====================

const FloatingOrb = ({
  color,
  size,
  blur,
  x,
  y,
  delay = 0,
  duration = 8,
}: {
  color: string;
  size: number;
  blur: number;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: `blur(${blur}px)`,
      left: x,
      top: y,
    }}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.95, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const AbstractShape = ({
  className,
  delay = 0,
  color = "#0067A1",
}: {
  className?: string;
  delay?: number;
  color?: string;
}) => (
  <motion.svg
    className={`absolute ${className}`}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 0.08, rotate: 360 }}
    transition={{ duration: 25, delay, repeat: Infinity, ease: "linear" }}
  >
    <path
      fill={color}
      d="M38.7,-65.5C48.9,-58.3,55.4,-44.8,62.3,-30.8C69.2,-16.8,76.5,-2.3,76.3,12.1C76.1,26.5,68.4,40.8,58.1,51.8C47.8,62.8,34.9,70.5,20.8,73.9C6.7,77.3,-8.6,76.4,-22.9,71.8C-37.2,67.2,-50.5,58.9,-60.8,47.3C-71.1,35.7,-78.4,20.8,-80.1,5.1C-81.8,-10.6,-77.9,-27.1,-69.3,-40.4C-60.7,-53.7,-47.4,-63.8,-33.1,-69.3C-18.8,-74.8,-3.4,-75.7,10.8,-72.3C25,-68.9,28.5,-72.7,38.7,-65.5Z"
      transform="translate(100 100)"
    />
  </motion.svg>
);

const CircuitPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit-auto" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M 0 50 L 25 50 M 75 50 L 100 50 M 50 0 L 50 25 M 50 75 L 50 100"
            stroke="#0067A1"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="50" r="5" fill="#0067A1" />
          <circle cx="25" cy="50" r="3" fill="#0067A1" />
          <circle cx="75" cy="50" r="3" fill="#0067A1" />
          <circle cx="50" cy="25" r="3" fill="#0067A1" />
          <circle cx="50" cy="75" r="3" fill="#0067A1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-auto)" />
    </svg>
  </div>
);

const DataFlowParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{
          background: "linear-gradient(135deg, #0067A1, #0A3EA4)",
          left: `${(i * 4) % 100}%`,
          top: `${(i * 7) % 100}%`,
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          opacity: [0, 0.8, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5 + Math.random() * 3,
          delay: i * 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-auto" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0067A1" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-auto)" />
    </svg>
  </div>
);

// ==================== DATA CONSTANTS ====================

const HERO_ORBS = [
  { color: "#0067A1", size: 520, blur: 115, x: "8%", y: "12%", delay: 0 },
  { color: "#0A3EA4", size: 440, blur: 100, x: "80%", y: "18%", delay: 0.7 },
  { color: "#1B3D80", size: 380, blur: 92, x: "50%", y: "75%", delay: 1.4 },
  { color: "#003FBB", size: 320, blur: 85, x: "20%", y: "65%", delay: 2.1 },
];

const FEATURES = [
  {
    icon: Mail,
    title: "Email Marketing Automation",
    desc: "Tự động gửi email theo hành vi khách hàng, nurture leads hiệu quả với personalization",
  },
  {
    icon: Bot,
    title: "AI Chatbot 24/7",
    desc: "Chatbot thông minh trả lời tự động, chuyển đổi lead và hỗ trợ khách hàng mọi lúc",
  },
  {
    icon: Database,
    title: "CRM Integration",
    desc: "Đồng bộ dữ liệu khách hàng từ mọi kênh, quản lý tập trung và phân tích insight",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Tự động hóa toàn bộ customer journey từ awareness đến retention",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Theo dõi KPI real-time, báo cáo chi tiết và phân tích ROI từng chiến dịch",
  },
  {
    icon: Share2,
    title: "Multi-channel Automation",
    desc: "Lên lịch và tự động đăng nội dung lên Facebook, Instagram, LinkedIn, TikTok",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Phân tích quy trình",
    desc: "Audit quy trình marketing hiện tại, xác định bottleneck và cơ hội tự động hóa",
    icon: Target,
  },
  {
    step: "02",
    title: "Lên kế hoạch",
    desc: "Thiết kế customer journey map, xây dựng workflow automation và chọn công cụ phù hợp",
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Tích hợp & Triển khai",
    desc: "Cài đặt các công cụ automation, tích hợp CRM, email platform và các kênh marketing",
    icon: Settings,
  },
  {
    step: "04",
    title: "Đào tạo & Vận hành",
    desc: "Đào tạo đội ngũ sử dụng, theo dõi hiệu suất và tối ưu liên tục automation workflows",
    icon: Rocket,
  },
];

const STATS = [
  { value: "70%", label: "Tiết kiệm thời gian", icon: Clock },
  { value: "3x", label: "Tăng tốc độ phản hồi", icon: MessageSquare },
  { value: "150%", label: "ROI trung bình", icon: TrendingUp },
  { value: "24/7", label: "Hoạt động tự động", icon: Activity },
];

const BENEFITS = [
  {
    icon: Clock,
    title: "Tiết kiệm 70% thời gian",
    desc: "Tự động hóa các tác vụ lặp lại, team tập trung vào chiến lược sáng tạo",
  },
  {
    icon: TrendingUp,
    title: "Tăng 150% hiệu quả",
    desc: "Lead nurturing tự động, remarketing thông minh tăng conversion",
  },
  {
    icon: MessageSquare,
    title: "Phản hồi tức thì",
    desc: "Chatbot AI và email automation trả lời ngay lập tức 24/7",
  },
  {
    icon: Users,
    title: "Personalization tự động",
    desc: "Cá nhân hóa nội dung cho từng segment khách hàng",
  },
  {
    icon: BarChart3,
    title: "Data-driven insights",
    desc: "Dashboard tổng hợp dữ liệu, phân tích để tối ưu chiến dịch",
  },
  {
    icon: Gauge,
    title: "Scale dễ dàng",
    desc: "Mở rộng quy mô marketing không cần tăng headcount",
  },
];

const AUTOMATION_TOOLS = [
  { icon: Mail, title: "Email Marketing", desc: "Mailchimp, SendGrid, ActiveCampaign" },
  { icon: Bot, title: "Chatbot AI", desc: "ManyChat, Chatfuel, Custom AI" },
  { icon: Database, title: "CRM System", desc: "HubSpot, Salesforce, Pipedrive" },
  { icon: Workflow, title: "Automation", desc: "Zapier, Make, n8n" },
  { icon: BarChart3, title: "Analytics", desc: "GA4, Mixpanel, Data Studio" },
  { icon: Share2, title: "Social Media", desc: "Buffer, Hootsuite, Later" },
];

const FAQS = [
  {
    q: "Tự động hóa marketing là gì?",
    a: "Tự động hóa marketing sử dụng công nghệ để tự động thực hiện các tác vụ marketing lặp đi lặp lại như gửi email, theo dõi khách hàng, phân loại leads, giúp tiết kiệm thời gian và tăng hiệu quả.",
  },
  {
    q: "Thời gian triển khai hệ thống automation mất bao lâu?",
    a: "Tùy quy mô: Setup cơ bản 2-3 tuần, hệ thống đầy đủ 4-6 tuần, enterprise phức tạp 8-12 tuần. Bao gồm planning, integration, testing và training.",
  },
  {
    q: "Chi phí đầu tư ban đầu và vận hành là bao nhiêu?",
    a: "Setup: 15-70 triệu tùy gói. Vận hành: 3-10 triệu/tháng cho phí công cụ (Mailchimp, Zapier...). Chúng tôi tư vấn gói phù hợp ngân sách của bạn.",
  },
  {
    q: "Công ty có hỗ trợ sau khi triển khai không?",
    a: "Có, chúng tôi cung cấp support 1-6 tháng tùy gói, training team sử dụng công cụ, và tối ưu workflows liên tục để đảm bảo hiệu quả cao nhất.",
  },
];

// ==================== MAIN COMPONENT ====================

export default function TuDongHoaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const processRef = useRef(null);
  const statsRef = useRef(null);

  const processInView = useInView(processRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="overflow-hidden bg-[#F1F2F4]">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#F1F2F4] via-[#E8EAEE] to-[#F8F8F9]">
        {/* Abstract Floating Orbs */}
        {HERO_ORBS.map((orb) => (
          <FloatingOrb key={`orb-${orb.x}-${orb.y}`} {...orb} />
        ))}

        {/* Abstract Shapes */}
        <AbstractShape className="w-96 h-96 -top-20 -left-20" delay={0} color="#0067A1" />
        <AbstractShape className="w-[28rem] h-[28rem] -bottom-32 -right-32" delay={1.5} color="#0A3EA4" />
        <AbstractShape className="w-72 h-72 top-1/3 right-1/4" delay={3} color="#1B3D80" />

        <CircuitPattern />
        <DataFlowParticles />
        <GridPattern />

        <motion.div
          className="container mx-auto px-4 relative z-10 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-8 border border-[#0067A1]/10"
          >
            <Zap className="w-4 h-4 text-[#0067A1]" />
            <span className="font-['Space_Mono'] text-sm text-[#676767] font-medium">
              MARKETING AUTOMATION
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-[#444547] mb-6 leading-tight font-['Be_Vietnam_Pro']"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tự động hóa Marketing
            <br />
            <span className="bg-linear-to-r from-[#0067A1] via-[#0A3EA4] to-[#1B3D80] bg-clip-text text-transparent">
              Tiết kiệm & Hiệu quả
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#676767] max-w-3xl mx-auto mb-10 font-['Be_Vietnam_Pro']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tự động hóa toàn bộ quy trình marketing với công nghệ tiên tiến. Tiết kiệm 70% thời gian,
            tăng 150% hiệu quả và chăm sóc khách hàng 24/7.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#lien-he"
              className="group px-8 py-4 bg-linear-to-r from-[#0067A1] to-[#1B3D80] text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#0067A1]/30 hover:scale-105 inline-flex items-center gap-2 font-['Be_Vietnam_Pro']"
            >
              Tư vấn miễn phí
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#quy-trinh"
              className="px-8 py-4 bg-white text-[#0067A1] rounded-lg font-semibold border-2 border-[#0067A1]/20 hover:border-[#0067A1] transition-all duration-300 hover:shadow-lg font-['Be_Vietnam_Pro']"
            >
              Xem quy trình
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-10 w-40 h-40 bg-[#0067A1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#0A3EA4]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#0067A1] font-semibold tracking-wider uppercase">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Tính năng tự động hóa
            </h2>
            <p className="text-lg text-[#676767] max-w-2xl mx-auto font-['Be_Vietnam_Pro']">
              Email marketing, chatbot AI, CRM automation và workflow cho mọi điểm chạm khách hàng
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-linear-to-br from-white to-[#F8F8F9] rounded-xl p-6 border border-[#0067A1]/10 hover:border-[#0067A1]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0067A1]/10 to-[#0A3EA4]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#0067A1]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#444547] mb-2 font-['Be_Vietnam_Pro']">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#676767] leading-relaxed font-['Be_Vietnam_Pro']">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROCESS SECTION ==================== */}
      <section
        id="quy-trinh"
        ref={processRef}
        className="py-24 bg-linear-to-b from-[#F1F2F4] to-[#E8EAEE] relative overflow-hidden"
      >
        <AbstractShape className="w-80 h-80 top-10 right-0 opacity-5" delay={0} color="#0067A1" />
        <AbstractShape className="w-96 h-96 bottom-0 left-0 opacity-5" delay={2} color="#0A3EA4" />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#0067A1] font-semibold tracking-wider uppercase">
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Quy trình làm việc
            </h2>
            <p className="text-lg text-[#676767] max-w-2xl mx-auto font-['Be_Vietnam_Pro']">
              4 bước từ phân tích đến triển khai và tối ưu
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {PROCESS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative"
                >
                  {idx < PROCESS.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-linear-to-b from-[#0067A1] to-transparent opacity-20 md:left-12" />
                  )}

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex items-center gap-4 md:w-40 shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#0067A1] to-[#1B3D80] flex items-center justify-center text-white font-bold text-lg z-10 relative group-hover:scale-110 transition-transform duration-300 font-['Space_Mono']">
                          {step.step}
                        </div>
                        <div className="absolute inset-0 bg-linear-to-br from-[#0067A1] to-[#1B3D80] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Icon className="w-6 h-6 text-[#0067A1]" />
                      </div>
                    </div>

                    <div className="flex-1 bg-white rounded-2xl p-6 border border-[#0067A1]/10 group-hover:border-[#0067A1]/30 group-hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-[#444547] mb-2 font-['Be_Vietnam_Pro']">
                        {step.title}
                      </h3>
                      <p className="text-[#676767] font-['Be_Vietnam_Pro']">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section ref={statsRef} className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#0067A1] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#0A3EA4] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-[#0067A1]/10 to-[#0A3EA4]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#0067A1]" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[#444547] mb-2 font-['Be_Vietnam_Pro']">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#676767] font-['Be_Vietnam_Pro']">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS SECTION ==================== */}
      <section className="py-24 bg-linear-to-b from-[#F8F8F9] to-[#F1F2F4] relative overflow-hidden">
        <AbstractShape className="w-72 h-72 -top-10 -left-10 opacity-5" color="#0067A1" />
        <AbstractShape className="w-80 h-80 -bottom-20 -right-20 opacity-5" delay={1} color="#0A3EA4" />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#0067A1] font-semibold tracking-wider uppercase">
              Benefits
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Lợi ích vượt trội
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white rounded-xl p-6 border border-[#0067A1]/10 hover:border-[#0067A1]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0067A1]/10 to-[#0A3EA4]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#0067A1]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#444547] mb-2 font-['Be_Vietnam_Pro']">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#676767] leading-relaxed font-['Be_Vietnam_Pro']">
                    {benefit.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== AUTOMATION TOOLS SECTION ==================== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#0067A1] font-semibold tracking-wider uppercase">
              Technology Stack
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Công cụ tự động hóa
            </h2>
            <p className="text-lg text-[#676767] max-w-2xl mx-auto font-['Be_Vietnam_Pro']">
              Tích hợp với các nền tảng marketing automation hàng đầu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {AUTOMATION_TOOLS.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group flex items-start gap-4 bg-linear-to-br from-white to-[#F8F8F9] rounded-xl p-5 border border-[#0067A1]/10 hover:border-[#0067A1]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-linear-to-br from-[#0067A1]/10 to-[#0A3EA4]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#0067A1]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#444547] mb-1 font-['Be_Vietnam_Pro']">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-[#676767] font-['Be_Vietnam_Pro']">{tool.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-24 bg-linear-to-b from-[#F1F2F4] to-[#E8EAEE]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="font-['Space_Mono'] text-sm text-[#0067A1] font-semibold tracking-wider uppercase">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Câu hỏi thường gặp
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl border border-[#0067A1]/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F8F8F9] transition-colors"
                >
                  <span className="font-semibold text-[#444547] pr-4 font-['Be_Vietnam_Pro']">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-5 h-5 text-[#0067A1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === idx ? "auto" : 0,
                    opacity: openFaq === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-[#676767] leading-relaxed font-['Be_Vietnam_Pro']">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section
        id="lien-he"
        className="relative py-24 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0067A1 0%, #0A3EA4 50%, #1B3D80 100%)",
        }}
      >
        <FloatingOrb color="#ffffff" size={450} blur={110} x="8%" y="15%" duration={11} />
        <FloatingOrb color="#ffffff" size={380} blur={95} x="85%" y="55%" delay={1.2} duration={13} />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Be_Vietnam_Pro']">
              Sẵn sàng tự động hóa marketing?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 font-['Be_Vietnam_Pro']">
              Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết cho dự án automation của bạn
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/lien-he"
                className="group px-8 py-4 bg-white text-[#0067A1] rounded-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2 font-['Be_Vietnam_Pro']"
              >
                Liên hệ ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:0123456789"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#0067A1] transition-all duration-300 font-['Be_Vietnam_Pro']"
              >
                Hotline: 0123 456 789
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
