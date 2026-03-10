"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown,
  Palette,
  Search,
  Zap,
  Monitor,
  Shield,
  Settings,
  Headphones,
  Banknote,
  X,
  ZoomIn,
  Send,
  SlidersHorizontal
} from "lucide-react";
import { PROJECTS, CATEGORIES, type Project } from "@/data/portfolio";
import PartnersSection from "@/components/sections/PartnersSection";

import avatarHaLinh from "@/assest/clients/ha-linh.jpg";
import avatarHoangDat from "@/assest/clients/hoang-dat.jpg";
import avatarHongNhung from "@/assest/clients/hong-nhung.jpg";

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const WHY_FEATURES = [
  {
    icon: Palette,
    title: "Giao diện đẹp & Sáng tạo",
    desc: "Thiết kế độc đáo, cá nhân hóa theo thương hiệu, ấn tượng ngay từ cái nhìn đầu tiên"
  },
  {
    icon: Search,
    title: "Chuẩn SEO từ nền tảng",
    desc: "Cấu trúc URL, schema markup, meta tags được tối ưu ngay trong quá trình xây dựng"
  },
  {
    icon: Zap,
    title: "Tốc độ tải siêu nhanh",
    desc: "Core Web Vitals đạt điểm cao, tối ưu hình ảnh, CDN và cache hiệu quả"
  },
  {
    icon: Monitor,
    title: "Responsive mọi thiết bị",
    desc: "Giao diện hoàn hảo trên máy tính, tablet và điện thoại với mọi kích cỡ màn hình"
  },
  {
    icon: Shield,
    title: "Bảo mật & An toàn",
    desc: "SSL miễn phí, chống DDoS, backup dữ liệu định kỳ và cập nhật bảo mật liên tục"
  },
  {
    icon: Settings,
    title: "Dễ quản trị, tự chủ động",
    desc: "CMS trực quan với WordPress, không cần kỹ thuật vẫn cập nhật nội dung dễ dàng"
  },
  {
    icon: Headphones,
    title: "Hỗ trợ tận tâm 24/7",
    desc: "Đội ngũ kỹ thuật hỗ trợ sau bàn giao, giải quyết mọi vấn đề nhanh chóng"
  },
  {
    icon: Banknote,
    title: "Chi phí tiết kiệm tối đa",
    desc: "Báo giá minh bạch, không phát sinh, gói dịch vụ linh hoạt phù hợp mọi ngân sách"
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Thấu hiểu khách hàng",
    desc: "Đội ngũ nhân viên của CCMARTECH gặp gỡ bạn, lắng nghe ý tưởng bạn muốn thực hiện và thảo luận về tính năng mà bạn mong muốn trong thiết kế web. Chúng tôi lên kế hoạch thiết kế sau khi quá trình tư vấn hoàn thành. Sau đó chúng ta sẽ tiến hành ký kết."
  },
  {
    num: "02",
    title: "Ký kết và hợp tác",
    desc: "Để đảm bảo quyền lợi cho bạn, chúng ta cùng nhau ghi nhận bằng văn bản pháp lý. Cái bắt tay nhỏ thể hiện tinh thần lớn, CCMARTECH sẽ đồng hành cùng bạn xây dựng giải pháp thiết kế website, qua đó phù hợp và nâng tầm thương hiệu của bạn trên thị trường."
  },
  {
    num: "03",
    title: "Thiết kế web demo",
    desc: "Dựa trên ý tưởng của bạn, đội ngũ thiết kế website CCMARTECH giàu kinh nghiệm sẽ tạo ra bản demo thiết kế phù hợp và các tính năng hữu ích nhất. Sau khi bạn xem xét bản demo, đội ngũ thiết kế sẽ tiến hành chỉnh sửa để bạn chốt bản thiết kế chi tiết."
  },
  {
    num: "04",
    title: "Bàn giao toàn diện",
    desc: "Bàn giao toàn diện là trách nhiệm của toàn thể đội ngũ CCMARTECH. Đội ngũ chúng tôi sẽ hướng dẫn bạn quản trị web tận tình và chu đáo. Dù đã hoàn thành dự án, đội ngũ CCMARTECH luôn sẵn sàng hỗ trợ bạn trong quá trình bạn vận hành và quản trị website."
  }
];

// Portfolio data imported from @/data/portfolio

const TESTIMONIALS = [
  {
    name: "Mrs. Hồng Nhung",
    role: "Khách Hàng",
    rating: 5,
    text: "CCMARTECH tạo ra trang web tuyệt vời, vượt xa mong đợi! Hiệu suất ổn định và thiết kế đẹp mắt",
    avatar: avatarHongNhung
  },
  {
    name: "Mr. Hoàng Đạt",
    role: "Khách Hàng",
    rating: 4,
    text: "Tôi ấn tượng với sự sáng tạo và hỗ trợ nhanh chóng. Chúng tôi hài lòng với mỗi khía cạnh của dự án!",
    avatar: avatarHoangDat
  },
  {
    name: "Mrs. Hà Linh",
    role: "Khách Hàng",
    rating: 5,
    text: "Dịch vụ chuyên nghiệp, chi phí hợp lý. CCMARTECH là đối tác đáng tin cậy cho mọi doanh nghiệp!",
    avatar: avatarHaLinh
  }
];

const FAQ_ITEMS = [
  {
    q: "Thiết kế website là gì?",
    a: "Thiết kế website là quá trình lên ý tưởng, bố cục, màu sắc, hình ảnh và nội dung để tạo ra giao diện hiển thị trên trình duyệt web. Bao gồm UI design (giao diện), UX design (trải nghiệm người dùng) và lập trình frontend để hiện thực hóa thiết kế."
  },
  {
    q: "Thiết kế website chuẩn SEO là gì?",
    a: "Website chuẩn SEO là website được xây dựng đáp ứng các tiêu chí kỹ thuật của Google: tốc độ tải nhanh (Core Web Vitals), cấu trúc HTML semantic, URL thân thiện, schema markup, meta tags tối ưu, hình ảnh được nén và có alt text đúng chuẩn."
  },
  {
    q: "Thiết kế website responsive là gì?",
    a: "Website responsive là website tự động điều chỉnh bố cục, kích cỡ font và hình ảnh theo kích thước màn hình. Đảm bảo trải nghiệm hoàn hảo trên mọi thiết bị từ điện thoại 320px đến màn hình 4K, không cần tạo nhiều phiên bản riêng biệt."
  },
  {
    q: "Thiết kế website theo yêu cầu là gì?",
    a: "Thiết kế theo yêu cầu (custom design) có nghĩa là giao diện được tạo ra hoàn toàn mới, không dùng template có sẵn. CCMARTECH thiết kế 100% theo nhu cầu, nhận diện thương hiệu và mục tiêu kinh doanh cụ thể của từng khách hàng."
  },
  {
    q: "Thiết kế website bao gồm những gì?",
    a: "Dịch vụ thiết kế website tại CCMARTECH bao gồm: UI/UX design, lập trình frontend và backend, tích hợp CMS (WordPress/Next.js), tối ưu SEO kỹ thuật, cài đặt hosting và domain, SSL miễn phí, hướng dẫn quản trị và hỗ trợ 3 tháng sau bàn giao."
  },
  {
    q: "CCMARTECH thiết kế website bằng mã nguồn nào?",
    a: "CCMARTECH sử dụng WordPress (cho website doanh nghiệp, TMDT dễ quản trị) và Next.js/React (cho landing page hiệu suất cao, web app phức tạp). Chúng tôi tư vấn công nghệ phù hợp nhất với quy mô và mục tiêu của từng dự án."
  },
  {
    q: "Tại sao bạn cần thiết kế website chuyên nghiệp?",
    a: "Website chuyên nghiệp giúp tăng uy tín thương hiệu, thu hút khách hàng tiềm năng 24/7, cải thiện thứ hạng SEO, tăng tỷ lệ chuyển đổi và tiết kiệm chi phí marketing dài hạn. Trong môi trường số, website là 'văn phòng trực tuyến' không thể thiếu."
  },
  {
    q: "Dịch vụ thiết kế website là gì?",
    a: "Dịch vụ thiết kế website là gói giải pháp trọn gói bao gồm tư vấn, thiết kế, lập trình, triển khai và bảo trì website. CCMARTECH cung cấp dịch vụ end-to-end từ ý tưởng đến website hoàn chỉnh, hoạt động ổn định trên môi trường sản xuất."
  },
  {
    q: "Thời gian hoàn thành thiết kế website là bao lâu?",
    a: "Tùy theo độ phức tạp: Landing Page đơn giản 5–7 ngày làm việc. Website doanh nghiệp cơ bản 10–15 ngày. Website TMDT đầy đủ tính năng 20–30 ngày. Dự án đặc thù có thể kéo dài hơn. CCMARTECH cam kết bàn giao đúng tiến độ đã thỏa thuận."
  },
  {
    q: "Thiết kế website tại CCMARTECH có hợp đồng cụ thể không?",
    a: "Có. Mọi dự án tại CCMARTECH đều được ký kết hợp đồng kinh tế đầy đủ pháp lý, ghi rõ phạm vi công việc, tiến độ bàn giao, điều khoản bảo hành và quyền sở hữu source code. Điều này đảm bảo quyền lợi tối đa cho cả hai bên."
  },
  {
    q: "Cách thức thanh toán dịch vụ thiết kế website",
    a: "CCMARTECH chia thanh toán thành 2 đợt linh hoạt: Đợt 1 (50%) khi ký hợp đồng và bắt đầu triển khai. Đợt 2 (50%) khi bàn giao website hoàn chỉnh. Chấp nhận chuyển khoản ngân hàng. Hóa đơn VAT được xuất đầy đủ theo yêu cầu."
  }
];

// ─────────────────────────────────────────────────────────
// HERO ORBS CONFIG
// ─────────────────────────────────────────────────────────
interface OrbConfig {
  w: number;
  h: number;
  color: string;
  delay: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}
const HERO_ORBS: OrbConfig[] = [
  { w: 400, h: 400, color: "#003FBB", delay: 0, top: "-10%", left: "-5%" },
  { w: 350, h: 350, color: "#0067A1", delay: 2, top: "20%", right: "-8%" },
  { w: 300, h: 300, color: "#1B3D80", delay: 4, bottom: "5%", left: "30%" },
  { w: 250, h: 250, color: "#0A3EA4", delay: 1, top: "50%", left: "10%" },
  { w: 200, h: 200, color: "#003FBB", delay: 3, bottom: "20%", right: "20%" }
];

// ─────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────
export default function ThietKeWebsitePage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Thiết kế Website",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredPortfolio =
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

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="overflow-hidden">
      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center pt-40 pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #001222 0%, #001840 55%, #0A3EA4 100%)"
        }}
      >
        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Orbs */}
          {HERO_ORBS.map((orb, i) => (
            <motion.div
              key={`orb-${orb.color}-${orb.delay}`}
              className="absolute rounded-full"
              style={{
                width: orb.w,
                height: orb.h,
                background: orb.color,
                filter: "blur(90px)",
                opacity: 0.25,
                top: orb.top,
                left: orb.left,
                right: orb.right,
                bottom: orb.bottom
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.3, 0.18] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: orb.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* SVG node network */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {(
              [
                [100, 120, 280, 200],
                [280, 200, 450, 150],
                [450, 150, 620, 300],
                [280, 200, 300, 380],
                [620, 300, 750, 200],
                [300, 380, 500, 420],
                [500, 420, 750, 200]
              ] as [number, number, number, number][]
            ).map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={`line-${x1}-${y1}-${x2}-${y2}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#60A5FA"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, delay: i * 0.25, ease: "easeOut" }}
              />
            ))}
            {(
              [
                [100, 120],
                [280, 200],
                [450, 150],
                [620, 300],
                [300, 380],
                [500, 420],
                [750, 200]
              ] as [number, number][]
            ).map(([cx, cy], i) => (
              <motion.circle
                key={`node-${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={4}
                fill="#60A5FA"
                animate={{ r: [3, 5.5, 3], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </svg>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #60A5FA 50%, transparent 100%)"
            }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbit rings */}
          <div className="absolute top-1/2 right-16 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 rounded-full border border-cyan-400/10"
              style={{ borderStyle: "dashed" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-blue-400/15"
              style={{ borderStyle: "dashed" }}
            />
          </div>

          {/* Corner brackets */}
          {(
            [
              "top-24 left-6 border-t border-l",
              "top-24 right-6 border-t border-r",
              "bottom-6 left-6 border-b border-l",
              "bottom-6 right-6 border-b border-r"
            ] as string[]
          ).map((cls) => (
            <div
              key={cls}
              className={`absolute ${cls} w-8 h-8 border-cyan-400/30`}
            />
          ))}
        </div>

        {/* ── Hero content ── */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 text-sm font-mono tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />{" "}
              DỊCH VỤ THIẾT KẾ WEB
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CCMARTECH{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #60A5FA, #38BDF8)"
                }}
              >
                AGENCY
              </span>
              <br />
              <span className="text-4xl md:text-5xl font-semibold text-white/90">
                Dịch vụ thiết kế website
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-medium text-white/70">
                chuyên nghiệp theo yêu cầu
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white/70 text-lg leading-relaxed max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              Thiết kế website uy tín chất lượng tại CCMARTECH, tạo lập giá trị
              nhận diện tuyệt đối và giúp doanh nghiệp phát triển bền vững từ
              kênh website. Chúng tôi tạo ra những trang web{" "}
              <span className="text-cyan-300 font-semibold">
                ĐẸP MẮT · SÁNG TẠO · CHUẨN SEO · CHUYÊN NGHIỆP
              </span>{" "}
              mà bất kỳ ai cũng có thể tự quản trị với chi phí tiết kiệm.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #1B3D80, #0067A1)"
                }}
              >
                Nhận báo giá <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#quy-trinh"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all duration-300"
              >
                Quy trình
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. WHY CHOOSE US — 2×4 grid
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-page-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">
              Tại sao chọn chúng tôi
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-heading-dark mb-4">
              Lý do khách hàng tin tưởng CCMARTECH
            </h2>
            <p className="text-body-text max-w-2xl mx-auto leading-relaxed">
              8 điểm khác biệt tạo nên chất lượng dịch vụ thiết kế website của
              chúng tôi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-colors duration-300">
                  <feat.icon className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-heading-dark mb-2 text-sm leading-snug">
                  {feat.title}
                </h3>
                <p className="text-body-text text-xs leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CONTACT / CONSULTATION — split layout
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — hero card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden p-10 text-white"
              style={{
                background: "linear-gradient(135deg, #001840, #003FBB)"
              }}
            >
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                style={{ background: "#0067A1", filter: "blur(70px)" }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                style={{ background: "#60A5FA", filter: "blur(60px)" }}
              />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-300 mb-4">
                  Tư vấn miễn phí
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Sẵn sàng xây dựng
                  <br />
                  website của bạn?
                </h2>
                <p className="text-white/70 leading-relaxed mb-8">
                  Hãy để CCMARTECH đồng hành cùng bạn từ ý tưởng đến website
                  hoàn chỉnh. Tư vấn miễn phí, không ràng buộc.
                </p>
                <ul className="space-y-3">
                  {[
                    "200+ website đã bàn giao",
                    "98% khách hàng hài lòng",
                    "5 năm kinh nghiệm",
                    "Hỗ trợ kỹ thuật 24/7"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-heading-dark mb-6">
                Điền thông tin để nhận báo giá
              </h3>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-bold text-heading-dark">
                    Đã gửi thành công!
                  </p>
                  <p className="text-body-text">
                    Chúng tôi sẽ liên hệ bạn trong vòng 24 giờ.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="f-name"
                        className="block text-sm font-medium text-heading-dark mb-1.5"
                      >
                        Họ tên *
                      </label>
                      <input
                        id="f-name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-page-bg focus:outline-none focus:border-brand-blue text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="f-phone"
                        className="block text-sm font-medium text-heading-dark mb-1.5"
                      >
                        Số điện thoại *
                      </label>
                      <input
                        id="f-phone"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="0912 345 678"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-page-bg focus:outline-none focus:border-brand-blue text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="f-email"
                      className="block text-sm font-medium text-heading-dark mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="email@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-page-bg focus:outline-none focus:border-brand-blue text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-service"
                      className="block text-sm font-medium text-heading-dark mb-1.5"
                    >
                      Dịch vụ quan tâm
                    </label>
                    <select
                      id="f-service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-page-bg focus:outline-none focus:border-brand-blue text-sm transition-colors"
                    >
                      <option>Thiết kế Website</option>
                      <option>Landing Page</option>
                      <option>Website Thương mại điện tử</option>
                      <option>Website Doanh nghiệp</option>
                      <option>Bảo trì Website</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="f-message"
                      className="block text-sm font-medium text-heading-dark mb-1.5"
                    >
                      Mô tả yêu cầu
                    </label>
                    <textarea
                      id="f-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Mô tả ngắn gọn website bạn muốn xây dựng..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-page-bg focus:outline-none focus:border-brand-blue text-sm transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all"
                    style={{
                      background: "linear-gradient(135deg, #1B3D80, #0067A1)"
                    }}
                  >
                    <Send className="w-4 h-4" /> Gửi yêu cầu tư vấn
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. PROCESS — glowing line
      ══════════════════════════════════════════ */}
      <section id="quy-trinh" className="py-24 bg-page-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">
              Quy trình làm việc
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-heading-dark mb-4">
              Các bước hình thành website
              <br />
              tại CCMARTECH
            </h2>
            <p className="text-body-text max-w-2xl mx-auto leading-relaxed">
              CCMARTECH với phương châm làm việc lấy khách hàng làm trung tâm,
              tối ưu tối đa thời gian hoàn thành dự án để khách hàng không phải
              chờ đợi lâu.
            </p>
          </motion.div>

          <div className="relative">
            {/* Glowing connector line */}
            <div className="hidden lg:block absolute top-11 left-[12.5%] right-[12.5%] h-px bg-gray-200 overflow-visible">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #003FBB, #0067A1, #60A5FA)"
                }}
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
              />
              {/* Glow dot riding the line */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full -translate-x-1/2"
                style={{
                  background: "#60A5FA",
                  boxShadow: "0 0 14px 5px rgba(96,165,250,0.7)"
                }}
                initial={{ left: "0%" }}
                whileInView={{ left: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.15 }}
                  className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white font-bold text-lg relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #1B3D80, #0067A1)"
                    }}
                  >
                    {step.num}
                  </div>
                  <span className="absolute top-5 right-5 font-mono text-xs text-gray-200">
                    {step.num}
                  </span>
                  <h3 className="font-bold text-heading-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body-text text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. ABOUT US
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — image mosaic */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=480&q=80",
                  alt: "Team",
                  cls: "h-56 w-full object-cover"
                },
                {
                  src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=480&q=80",
                  alt: "Office",
                  cls: "h-56 w-full object-cover mt-8"
                },
                {
                  src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=480&q=80",
                  alt: "Work",
                  cls: "h-44 w-full object-cover"
                },
                {
                  src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=480&q=80",
                  alt: "Collab",
                  cls: "h-44 w-full object-cover mt-4"
                }
              ].map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  className={`rounded-2xl ${img.cls}`}
                />
              ))}
            </motion.div>

            {/* Right — text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-4">
                Về chúng tôi
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-heading-dark mb-5 leading-tight">
                5 năm kinh nghiệm —<br />
                đối tác đáng tin cậy của bạn
              </h2>
              <p className="text-body-text leading-relaxed mb-7">
                Với hơn 5 năm kinh nghiệm, chúng tôi là đối tác đáng tin cậy
                trong lĩnh vực thiết kế web. Chúng tôi đã tích lũy sự chuyên
                nghiệp và sáng tạo để tạo ra các trải nghiệm trực tuyến đẳng
                cấp. Sự chắc chắn của chúng tôi đến từ việc tối ưu hóa trang web
                với hiệu suất cao và trải nghiệm người dùng xuất sắc.
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {[
                  "Chi phí tiết kiệm nhất",
                  "Dễ quản lý",
                  "Sáng tạo độc đáo",
                  "Công nghệ mới nhất",
                  "Hỗ trợ tận tâm",
                  "Tối ưu hóa cho mọi thị trường"
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-sm text-body-text">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. PORTFOLIO
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-page-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">
              Dự án đã thực hiện
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-heading-dark">
              Portfolio
            </h2>
          </motion.div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-7">
            <p className="text-sm text-[#676767]">
              <span className="font-bold text-[#444547]">
                {filteredPortfolio.length}
              </span>{" "}
              dự án
              {selectedCats.length > 0 && (
                <span className="ml-1.5 text-brand-blue/70">
                  · {selectedCats.join(" · ")}
                </span>
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
                      <span className="text-[10px] font-bold text-[#444547] uppercase tracking-widest">
                        Lĩnh vực
                      </span>
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
                        const count = PROJECTS.filter(
                          (p) => p.category === cat
                        ).length;
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
                            <span className="text-xs text-[#444547] flex-1 truncate">
                              {cat}
                            </span>
                            {count > 0 && (
                              <span className="text-[9px] font-bold text-[#003FBB]/50 tabular-nums">
                                {count}
                              </span>
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

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredPortfolio.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                  onClick={() => setLightboxProject(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    width={600}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                    <div>
                      <p className="text-white font-bold text-sm">
                        {item.title}
                      </p>
                      <p className="text-white/70 text-xs">{item.category}</p>
                    </div>
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxProject(null)}
          >
            <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div
              className="max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <Image
                  src={lightboxProject.image}
                  alt={lightboxProject.title}
                  className="w-full h-auto rounded-2xl"
                  width={lightboxProject.image.width}
                  height={lightboxProject.image.height}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          7. PARTNERS — infinite slider
      ══════════════════════════════════════════ */}
      <PartnersSection />

      {/* ══════════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-page-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">
              Testimonials
            </p>
            <h2 className="text-4xl font-bold text-heading-dark">
              Khách hàng nói gì về chúng tôi?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }, (_, s) => (
                    <Star
                      key={`${t.name}-star-${s}`}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-body-text text-sm leading-relaxed mb-5 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-brand-blue/10">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-heading-dark text-sm">
                      {t.name}
                    </p>
                    <p className="text-body-text text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. FAQ — accordion
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">
              FAQ
            </p>
            <h2 className="text-4xl font-bold text-heading-dark mb-4">
              Giải đáp thắc mắc khi thiết kế
              <br />
              website tại CCMARTECH
            </h2>
            <p className="text-body-text leading-relaxed">
              Dưới đây gần như là tất tần tật những gì mà khách hàng thường hỏi,
              cần hỏi và cần biết về dịch vụ thiết kế website.
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(prev => prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i])}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-page-bg transition-colors"
                >
                  <span className="font-semibold text-heading-dark pr-4 text-sm leading-snug">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq.includes(i) ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-brand-blue" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq.includes(i) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-body-text leading-relaxed text-sm">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — bottom
      ══════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #001840, #003FBB)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: "#60A5FA", filter: "blur(80px)" }}
          />
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: "#0067A1", filter: "blur(60px)" }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bắt đầu dự án website của bạn?
            </h2>
            <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết từ đội
              ngũ chuyên gia CCMARTECH.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-brand-blue rounded-xl font-semibold hover:scale-105 hover:shadow-xl transition-all"
            >
              Đăng ký tư vấn miễn phí <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
