"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Palette,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Lightbulb,
  Brush,
  BookOpen,
  Award,
  FileText,
  Zap,
  ArrowLeft,
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
  color = "#003FBB",
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
      d="M45.3,-58.9C57.1,-48.3,64.2,-32.7,67.8,-16.4C71.4,-0.1,71.5,16.9,65.1,31.4C58.7,45.9,45.8,57.9,30.8,64.5C15.8,71.1,-1.3,72.3,-17.8,67.8C-34.3,63.3,-50.2,53.1,-60.2,38.8C-70.2,24.5,-74.3,6.1,-72.1,-11.5C-69.9,-29.1,-61.4,-45.9,-48.7,-56.3C-36,-66.7,-18,-70.7,-0.6,-69.9C16.8,-69.1,33.5,-63.5,45.3,-58.9Z"
      transform="translate(100 100)"
    />
  </motion.svg>
);

const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute w-1 h-1 bg-[#003FBB] rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// ==================== DATA CONSTANTS ====================

const HERO_ORBS = [
  { color: "#003FBB", size: 500, blur: 110, x: "10%", y: "15%", delay: 0 },
  { color: "#1B3D80", size: 420, blur: 95, x: "75%", y: "25%", delay: 0.5 },
  { color: "#0A3EA4", size: 360, blur: 90, x: "50%", y: "75%", delay: 1 },
];

const FEATURES = [
  {
    icon: Eye,
    title: "Nhận diện thương hiệu mạnh mẽ",
    desc: "Logo và bộ nhận diện thương hiệu độc đáo, dễ nhớ, tạo ấn tượng khác biệt trong lòng khách hàng",
  },
  {
    icon: Target,
    title: "Brand Positioning rõ ràng",
    desc: "Xác định vị thế thương hiệu, đối tượng mục tiêu và điểm khác biệt so với đối thủ cạnh tranh",
  },
  {
    icon: Heart,
    title: "Brand Storytelling chân thực",
    desc: "Xây dựng câu chuyện thương hiệu xúc động, kết nối cảm xúc và tạo dựng lòng trung thành",
  },
  {
    icon: Brush,
    title: "Visual Identity System",
    desc: "Hệ thống nhận diện thị giác hoàn chỉnh: logo, màu sắc, typography, imagery guidelines",
  },
  {
    icon: BookOpen,
    title: "Brand Guideline chi tiết",
    desc: "Brand book hướng dẫn đầy đủ cách sử dụng thương hiệu trên mọi kênh truyền thông",
  },
  {
    icon: Award,
    title: "Tone & Voice nhất quán",
    desc: "Phong cách giao tiếp thương hiệu xuyên suốt, tạo tính cách riêng biệt và dễ nhận biết",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Nghiên cứu & Phân tích",
    description: "Phân tích thị trường, đối thủ cạnh tranh, xu hướng ngành và insight khách hàng mục tiêu",
    icon: Target,
    tasks: [
      "Market research & competitor analysis",
      "Target audience insights",
      "Industry trends & opportunities",
      "Brand audit (nếu có)",
    ],
  },
  {
    step: "02",
    title: "Chiến lược & Định vị",
    description: "Xác định brand positioning, giá trị cốt lõi, tính cách thương hiệu và câu chuyện thương hiệu",
    icon: Lightbulb,
    tasks: [
      "Brand positioning statement",
      "Core values & personality",
      "Brand story & messaging",
      "Unique value proposition",
    ],
  },
  {
    step: "03",
    title: "Thiết kế nhận diện",
    description: "Thiết kế logo, color palette, typography và toàn bộ hệ thống nhận diện thương hiệu",
    icon: Brush,
    tasks: [
      "Logo design & variations",
      "Color palette & typography",
      "Visual elements & patterns",
      "Brand applications",
    ],
  },
  {
    step: "04",
    title: "Brand Guideline & Bàn giao",
    description: "Hoàn thiện brand book, hướng dẫn ứng dụng và hỗ trợ triển khai trên tất cả kênh",
    icon: FileText,
    tasks: [
      "Complete brand guideline book",
      "Usage examples & templates",
      "Team training & support",
      "Post-launch optimization",
    ],
  },
];

const STATS = [
  { value: "80+", label: "Thương hiệu đã xây dựng", icon: Palette },
  { value: "100%", label: "Bàn giao đúng hạn", icon: Award },
  { value: "98%", label: "Khách hàng hài lòng", icon: Heart },
  { value: "5+", label: "Năm kinh nghiệm", icon: TrendingUp },
];

const DELIVERABLES = [
  "Logo chính & biến thể (PNG, SVG, AI)",
  "Bảng màu thương hiệu (CMYK, RGB, HEX)",
  "Bộ font chữ & hướng dẫn sử dụng",
  "Brand guideline book PDF hoàn chỉnh",
  "Business card, letterhead design",
  "Social media templates & assets",
  "Mockup presentations",
  "Source files đầy đủ",
];

const PACKAGES = [
  {
    name: "Starter",
    price: "25-35 triệu",
    desc: "Phù hợp startup, SME mới thành lập",
    features: [
      "Logo design + 3 variations",
      "Color palette & typography",
      "Basic brand guideline (20-30 trang)",
      "Business card & letterhead",
      "3 rounds of revisions",
      "Hỗ trợ 1 tháng sau bàn giao",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "50-80 triệu",
    desc: "Doanh nghiệp vừa cần nâng cấp thương hiệu",
    features: [
      "Full logo system + unlimited variations",
      "Complete visual identity system",
      "Comprehensive brand guideline (50-70 trang)",
      "Brand storytelling & messaging",
      "Social media templates",
      "Unlimited revisions",
      "Hỗ trợ 3 tháng sau bàn giao",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "100-200 triệu+",
    desc: "Tập đoàn lớn, rebranding toàn diện",
    features: [
      "Complete brand strategy consulting",
      "Multi-brand architecture (nếu cần)",
      "Premium brand guideline (100+ trang)",
      "Brand activation campaign",
      "Video brand story production",
      "Dedicated brand manager",
      "Hỗ trợ 6 tháng + maintenance",
    ],
    popular: false,
  },
];

const FAQS = [
  {
    q: "Thời gian thiết kế một bộ nhận diện thương hiệu mất bao lâu?",
    a: "Thông thường mất 4-6 tuần cho gói Professional. Gói Starter: 3-4 tuần, Gói Enterprise: 8-12 tuần tùy quy mô dự án.",
  },
  {
    q: "Tôi có được sở hữu toàn bộ bản quyền thiết kế không?",
    a: "Có, sau khi thanh toán đầy đủ, bạn sẽ sở hữu 100% bản quyền logo và toàn bộ thiết kế. Chúng tôi bàn giao đầy đủ source files.",
  },
  {
    q: "Có bao nhiêu lần chỉnh sửa (revision)?",
    a: "Gói Starter: 3 rounds, Gói Professional: unlimited revisions, Gói Enterprise: unlimited với dedicated manager.",
  },
  {
    q: "Tôi cần chuẩn bị gì trước khi bắt đầu dự án?",
    a: "Brief về doanh nghiệp, sản phẩm/dịch vụ, đối tượng khách hàng, đối thủ cạnh tranh, và các thương hiệu bạn yêu thích làm tham khảo.",
  },
];

// ==================== MAIN COMPONENT ====================

export default function BrandingPage() {
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
        <AbstractShape className="w-72 h-72 -top-10 -left-10" delay={0} color="#003FBB" />
        <AbstractShape className="w-80 h-80 -bottom-20 -right-20" delay={1.5} color="#1B3D80" />
        <AbstractShape className="w-64 h-64 top-1/3 right-1/4" delay={3} color="#0A3EA4" />

        <ParticleField />

        <motion.div
          className="container mx-auto px-4 relative z-10 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-8 border border-[#003FBB]/10"
          >
            <Palette className="w-4 h-4 text-[#003FBB]" />
            <span className="font-['Space_Mono'] text-sm text-[#676767] font-medium">
              BRANDING SERVICE
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-[#444547] mb-6 leading-tight font-['Be_Vietnam_Pro']"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Xây dựng thương hiệu
            <br />
            <span className="bg-linear-to-r from-[#1B3D80] via-[#003FBB] to-[#0067A1] bg-clip-text text-transparent">
              Mạnh mẽ & Độc đáo
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#676767] max-w-3xl mx-auto mb-10 font-['Be_Vietnam_Pro']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tạo dựng bản sắc thương hiệu chuyên nghiệp từ A-Z với logo độc đáo, nhận diện thị giác
            nhất quán và chiến lược định vị rõ ràng.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#lien-he"
              className="group px-8 py-4 bg-linear-to-r from-[#1B3D80] to-[#0067A1] text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#003FBB]/30 hover:scale-105 inline-flex items-center gap-2 font-['Be_Vietnam_Pro']"
            >
              Tư vấn miễn phí
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#quy-trinh"
              className="px-8 py-4 bg-white text-[#003FBB] rounded-lg font-semibold border-2 border-[#003FBB]/20 hover:border-[#003FBB] transition-all duration-300 hover:shadow-lg font-['Be_Vietnam_Pro']"
            >
              Xem quy trình
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#003FBB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#0067A1]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#003FBB] font-semibold tracking-wider uppercase">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Dịch vụ toàn diện
            </h2>
            <p className="text-lg text-[#676767] max-w-2xl mx-auto font-['Be_Vietnam_Pro']">
              Từ nghiên cứu thị trường đến bàn giao brand guideline hoàn chỉnh
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
                  className="group bg-linear-to-br from-white to-[#F8F8F9] rounded-xl p-6 border border-[#003FBB]/10 hover:border-[#003FBB]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#003FBB]/10 to-[#0067A1]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#003FBB]" />
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
        <AbstractShape className="w-80 h-80 top-10 right-0 opacity-5" delay={0} />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#003FBB] font-semibold tracking-wider uppercase">
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Quy trình 4 bước
            </h2>
            <p className="text-lg text-[#676767] max-w-2xl mx-auto font-['Be_Vietnam_Pro']">
              Từ nghiên cứu đến bàn giao, chúng tôi đảm bảo thương hiệu của bạn được xây dựng chuyên nghiệp
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
                  {/* Connecting line */}
                  {idx < PROCESS.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-linear-to-b from-[#003FBB] to-transparent opacity-20 md:left-12" />
                  )}

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex items-center gap-4 md:w-40 shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#1B3D80] to-[#0067A1] flex items-center justify-center text-white font-bold text-lg z-10 relative group-hover:scale-110 transition-transform duration-300 font-['Space_Mono']">
                          {step.step}
                        </div>
                        <div className="absolute inset-0 bg-linear-to-br from-[#1B3D80] to-[#0067A1] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Icon className="w-6 h-6 text-[#003FBB]" />
                      </div>
                    </div>

                    <div className="flex-1 bg-white rounded-2xl p-6 border border-[#003FBB]/10 group-hover:border-[#003FBB]/30 group-hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-[#444547] mb-2 font-['Be_Vietnam_Pro']">
                        {step.title}
                      </h3>
                      <p className="text-[#676767] mb-4 font-['Be_Vietnam_Pro']">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.tasks.map((task, i) => (
                          <li key={`${step.step}-task-${i}`} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#003FBB] shrink-0 mt-0.5" />
                            <span className="text-sm text-[#676767] font-['Be_Vietnam_Pro']">{task}</span>
                          </li>
                        ))}
                      </ul>
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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#003FBB] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0067A1] rounded-full blur-3xl" />
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
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-[#003FBB]/10 to-[#0067A1]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#003FBB]" />
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

      {/* ==================== DELIVERABLES SECTION ==================== */}
      <section className="py-24 bg-linear-to-b from-[#F8F8F9] to-[#F1F2F4]">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#003FBB] font-semibold tracking-wider uppercase">
              Deliverables
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Sản phẩm bàn giao
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {DELIVERABLES.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center gap-3 bg-white rounded-lg p-4 border border-[#003FBB]/10 hover:border-[#003FBB]/30 hover:shadow-md transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-[#003FBB] shrink-0" />
                <span className="text-[#676767] font-['Be_Vietnam_Pro']">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PACKAGES SECTION ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-['Space_Mono'] text-sm text-[#003FBB] font-semibold tracking-wider uppercase">
              Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mt-3 mb-4 font-['Be_Vietnam_Pro']">
              Gói dịch vụ
            </h2>
            <p className="text-lg text-[#676767] max-w-2xl mx-auto font-['Be_Vietnam_Pro']">
              Chọn gói phù hợp với nhu cầu và ngân sách của bạn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                  pkg.popular
                    ? "border-[#003FBB] shadow-lg scale-105"
                    : "border-[#003FBB]/10 hover:border-[#003FBB]/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-[#1B3D80] to-[#0067A1] text-white text-sm font-semibold rounded-full font-['Space_Mono']">
                    POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold text-[#444547] mb-2 font-['Be_Vietnam_Pro']">
                  {pkg.name}
                </h3>
                <div className="text-3xl font-bold text-[#003FBB] mb-3 font-['Be_Vietnam_Pro']">
                  {pkg.price}
                </div>
                <p className="text-sm text-[#676767] mb-6 font-['Be_Vietnam_Pro']">{pkg.desc}</p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={`${pkg.name}-feature-${i}`} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#003FBB] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#676767] font-['Be_Vietnam_Pro']">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#lien-he"
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 font-['Be_Vietnam_Pro'] ${
                    pkg.popular
                      ? "bg-linear-to-r from-[#1B3D80] to-[#0067A1] text-white hover:shadow-xl"
                      : "bg-[#F1F2F4] text-[#003FBB] hover:bg-[#003FBB] hover:text-white"
                  }`}
                >
                  Chọn gói này
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-24 bg-linear-to-b from-[#F1F2F4] to-[#E8EAEE]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="font-['Space_Mono'] text-sm text-[#003FBB] font-semibold tracking-wider uppercase">
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
                className="bg-white rounded-xl border border-[#003FBB]/10 overflow-hidden"
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
                      className="w-5 h-5 text-[#003FBB]"
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
          background: "linear-gradient(135deg, #1B3D80 0%, #003FBB 50%, #0067A1 100%)",
        }}
      >
        <FloatingOrb color="#ffffff" size={400} blur={100} x="10%" y="20%" duration={10} />
        <FloatingOrb color="#ffffff" size={350} blur={90} x="80%" y="60%" delay={1} duration={12} />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Be_Vietnam_Pro']">
              Sẵn sàng xây dựng thương hiệu độc đáo?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 font-['Be_Vietnam_Pro']">
              Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết cho dự án branding của bạn
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/lien-he"
                className="group px-8 py-4 bg-white text-[#003FBB] rounded-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2 font-['Be_Vietnam_Pro']"
              >
                Liên hệ ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:0123456789"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#003FBB] transition-all duration-300 font-['Be_Vietnam_Pro']"
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
