"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight, CheckCircle, Users, Share2, Star, Handshake,
  Lightbulb, BarChart3, Sparkles, Target, Video, TrendingUp,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const SERVICE_FEATURES = [
  "Đối tác chính thức của TikTok tại Việt Nam",
  "Ngân sách tiết kiệm nhất",
  "Triển khai nhanh chóng, toàn diện",
  "Bùng nổ doanh số từ TikTok",
];

const IMPORTANCE_ITEMS = [
  {
    icon: Users,
    title: "Tiếp cận đối tượng rộng lớn",
    desc: "TikTok có hàng tỷ người dùng toàn cầu, giúp các thương hiệu dễ dàng tiếp cận nhiều đối tượng khác nhau.",
  },
  {
    icon: Share2,
    title: "Tính lan tỏa mạnh mẽ",
    desc: "Nội dung trên TikTok có khả năng viral cao, giúp thông điệp của thương hiệu nhanh chóng được chia sẻ rộng rãi.",
  },
  {
    icon: Star,
    title: "Tăng cường nhận diện thương hiệu",
    desc: "Các video ngắn gọn, sáng tạo giúp các thương hiệu dễ dàng tạo dấu ấn và thu hút sự chú ý của người dùng.",
  },
  {
    icon: Handshake,
    title: "Tạo kết nối chân thực",
    desc: "TikTok cho phép thương hiệu xây dựng nội dung gần gũi, tương tác trực tiếp với người dùng, giúp tạo dựng lòng tin và sự gắn kết.",
  },
];

const VALUE_PROPS = [
  {
    icon: Lightbulb,
    title: "Đội ngũ giàu kinh nghiệm",
    desc: "CCMartech có đội ngũ giàu chuyên môn và am hiểu sâu về nền tảng TikTok, giúp bạn xây dựng chiến dịch tối ưu và hiệu quả nhất.",
  },
  {
    icon: Sparkles,
    title: "Chiến lược sáng tạo và tùy chỉnh",
    desc: "CCMartech không chỉ triển khai quảng cáo mà còn thiết kế nội dung sáng tạo, bắt trend, phù hợp với đối tượng mục tiêu, đảm bảo sự tương tác cao và tiếp cận mạnh mẽ.",
  },
  {
    icon: BarChart3,
    title: "Chiến lược tối ưu - chuyên sâu",
    desc: "CCMartech theo dõi sát sao, phân tích dữ liệu và điều chỉnh chiến lược trong suốt quá trình chạy quảng cáo để đảm bảo đạt hiệu quả tối đa và tối ưu hóa chi phí.",
  },
  {
    icon: TrendingUp,
    title: "Minh chứng thành công",
    desc: "Nhiều chiến dịch thành công với kết quả vượt trội đã giúp CCMartech khẳng định vị thế là đối tác quảng cáo tin cậy trên TikTok.",
  },
];

const SERVICE_CATEGORIES = [
  {
    icon: Target,
    title: "Phân tích và nghiên cứu thị trường",
    desc: "CCMartech đảm bảo chiến dịch được xây dựng dựa trên hiểu biết sâu sắc về thị trường và đối tượng mục tiêu, giúp chiến dịch tiếp cận chính xác khách hàng tiềm năng.",
  },
  {
    icon: Video,
    title: "Sáng tạo nội dung video",
    desc: "CCMartech thiết kế và sản xuất các video độc đáo, thu hút, bắt kịp xu hướng TikTok, tạo ra nội dung nổi bật và hấp dẫn người xem.",
  },
  {
    icon: TrendingUp,
    title: "Triển khai và tối ưu hóa chiến dịch",
    desc: "CCMartech triển khai chiến dịch quảng cáo chuyên nghiệp và liên tục theo dõi, điều chỉnh để tối ưu hiệu quả, giúp chiến dịch đạt được kết quả tốt nhất.",
  },
];

// ─────────────────────────────────────────────────────────
// HERO ORBS
// ─────────────────────────────────────────────────────────
interface OrbConfig {
  w: number; h: number; color: string; delay: number;
  top?: string; left?: string; right?: string; bottom?: string;
}
const HERO_ORBS: OrbConfig[] = [
  { w: 420, h: 420, color: "#00F2EA", delay: 0, top: "-8%",  left: "-6%" },   // TikTok cyan
  { w: 380, h: 380, color: "#003FBB", delay: 1.5, top: "15%",   right: "-10%" }, // Brand blue
  { w: 320, h: 320, color: "#EE1D52", delay: 3, bottom: "8%", left: "25%" },   // TikTok magenta
  { w: 280, h: 280, color: "#0067A1", delay: 0.8, top: "55%",   left: "8%" },  // Secondary blue
  { w: 240, h: 240, color: "#69C9D0", delay: 2.2, bottom: "18%",right: "18%" },// Light cyan
];

// ─────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────
export default function TikTokAdsPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="overflow-hidden">

      {/* ══════════════════════════════════════════
          1. HERO BANNER
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center pt-40 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #000814 0%, #001D3D 50%, #003566 100%)" }}
      >
        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Orbs */}
          {HERO_ORBS.map((orb, i) => (
            <motion.div
              key={`orb-${orb.color}-${orb.delay}`}
              className="absolute rounded-full"
              style={{
                width: orb.w, height: orb.h,
                background: orb.color,
                filter: "blur(85px)",
                opacity: 0.22,
                top: orb.top, left: orb.left,
                right: orb.right, bottom: orb.bottom,
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 7 + i, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
            />
          ))}

          {/* SVG node network */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            {([[120,100,300,180],[300,180,480,140],[480,140,650,280],[300,180,320,360],[650,280,780,180],[320,360,520,400],[520,400,780,180]] as [number,number,number,number][]).map(([x1,y1,x2,y2], i) => (
              <motion.line key={`line-${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00F2EA" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.22, ease: "easeOut" }}
              />
            ))}
            {([[120,100],[300,180],[480,140],[650,280],[320,360],[520,400],[780,180]] as [number,number][]).map(([cx,cy], i) => (
              <motion.circle key={`node-${cx}-${cy}`} cx={cx} cy={cy} r={5} fill="#00F2EA"
                animate={{ r: [4, 6.5, 4], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.35 }}
              />
            ))}
          </svg>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, #69C9D0 50%, transparent 100%)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbit rings */}
          <div className="absolute top-1/3 right-20 -translate-y-1/2">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-72 h-72 rounded-full border border-[#00F2EA]/15"
              style={{ borderStyle: "dashed" }}
            />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-full border border-pink-400/10"
              style={{ borderStyle: "dashed" }}
            />
          </div>

          {/* Corner brackets */}
          {(["top-20 left-8 border-t border-l", "top-20 right-8 border-t border-r", "bottom-8 left-8 border-b border-l", "bottom-8 right-8 border-b border-r"] as string[]).map((cls) => (
            <div key={cls} className={`absolute ${cls} w-10 h-10 border-cyan-300/25`} />
          ))}

          {/* Data dots */}
          {([[60, 30], [85, 75], [40, 60], [90, 20]] as [number, number][]).map(([l, t]) => (
            <motion.div
              key={`dot-${l}-${t}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-pink-400"
              style={{ left: `${l}%`, top: `${t}%` }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        {/* ── Hero content ── */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-cyan-300/30 text-cyan-200 text-sm font-mono tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#00F2EA] animate-pulse" />{" "}
              DỊCH VỤ QUẢNG CÁO
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
              style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
            >
              TIKTOK{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #00F2EA, #EE1D52)" }}>
                ADS
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            >
              Chiến dịch quảng cáo TikTok chuyên nghiệp — tiếp cận Gen Z hiệu quả, nội dung viral, tăng doanh số nhanh chóng.
              Hãy để CCMARTECH đồng hành cùng bạn chinh phục thị trường trẻ.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
            >
              <a
                href="#dang-ky"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-white font-bold text-base hover:shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #00F2EA, #0067A1)" }}
              >
                Đăng ký nhận báo giá <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. SERVICE OVERVIEW — split layout
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-[#00F2EA] mb-3">DỊCH VỤ QUẢNG CÁO</p>
              <h2 className="text-4xl md:text-5xl font-bold text-heading-dark mb-6 leading-tight">
                TIKTOK ADS CỦA<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #003FBB, #00F2EA)" }}>
                  CCMARTECH
                </span>
              </h2>
              <p className="text-body-text leading-relaxed mb-8">
                CCMartech cung cấp dịch vụ quảng cáo TikTok Ads chuyên nghiệp, giúp doanh nghiệp tiếp cận chính xác đối tượng
                khách hàng với các chiến dịch được thiết kế và tối ưu hóa theo mục tiêu cụ thể. Với kinh nghiệm chuyên sâu,
                CCMartech cam kết mang lại hiệu quả cao và tối đa hóa lợi nhuận từ ngân sách quảng cáo của bạn.
              </p>

              <ul className="space-y-3 mb-10">
                {SERVICE_FEATURES.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#E0F7FA] flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-[#00BCD4]" />
                    </div>
                    <span className="text-body-text font-medium">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#dang-ky"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                style={{ background: "linear-gradient(135deg, #1B3D80, #0067A1)" }}
              >
                Đăng ký nhận báo giá <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Right — 3D mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Floating card with abstract orb */}
              <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#001D3D] to-[#003566] p-12 shadow-2xl">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 pointer-events-none" style={{ background: "#00F2EA", filter: "blur(70px)" }} />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: "#EE1D52", filter: "blur(60px)" }} />

                <div className="relative text-center">
                  {/* TikTok icon mockup */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #00F2EA, #EE1D52)" }}>
                    <Video className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">10M+ Lượt xem</h3>
                  <p className="text-white/70">Tiếp cận khách hàng tiềm năng mọi lúc mọi nơi</p>

                  {/* Stats mini cards */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[
                      { label: "CTR trung bình", value: "3.5%" },
                      { label: "Tăng trưởng", value: "5x" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. IMPORTANCE GRID — 2×2
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-page-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">Tại sao TikTok?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-heading-dark mb-4 max-w-4xl mx-auto leading-tight">
              TẦM QUAN TRỌNG CỦA TIKTOK<br />TRONG CHIẾN LƯỢC MARKETING HIỆN ĐẠI
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {IMPORTANCE_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E0F7FA] flex items-center justify-center mb-6 group-hover:bg-[#00BCD4] transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-[#00BCD4] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-heading-dark mb-3">{item.title}</h3>
                <p className="text-body-text leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. VALUE PROPOSITION — 2×2 cards
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">Vì sao chọn chúng tôi</p>
            <h2 className="text-4xl md:text-5xl font-bold text-heading-dark mb-4 max-w-4xl mx-auto leading-tight">
              VÌ SAO NÊN SỬ DỤNG DỊCH VỤ<br />TIKTOK ADS CHO DOANH NGHIỆP CỦA BẠN?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {VALUE_PROPS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group relative rounded-3xl p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300"
                style={{ background: "linear-gradient(150deg, #FAFAFA 0%, #F0F4F8 100%)" }}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: "linear-gradient(90deg, #00F2EA, #EE1D52)" }} />

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "linear-gradient(135deg, #00F2EA, #003FBB)" }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading-dark mb-4">{item.title}</h3>
                <p className="text-body-text leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. SERVICE CATEGORIES — 3 columns
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-page-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-3">Dịch vụ của chúng tôi</p>
            <h2 className="text-4xl md:text-5xl font-bold text-heading-dark mb-4">
              DANH MỤC DỊCH VỤ TIKTOK ADS<br />TẠI CCMARTECH
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "linear-gradient(135deg, #1B3D80, #00F2EA)" }}
                >
                  <cat.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading-dark mb-4 text-center">{cat.title}</h3>
                <p className="text-body-text leading-relaxed text-center">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT / REGISTRATION FORM
      ══════════════════════════════════════════ */}
      <section id="dang-ky" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-heading-dark mb-4">Sẵn sàng bùng nổ doanh số với TikTok?</h2>
            <p className="text-body-text text-lg">Điền thông tin để nhận tư vấn và báo giá chi tiết từ CCMARTECH</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bg-page-bg rounded-3xl p-10 border border-gray-100"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-5" />
                <p className="text-2xl font-bold text-heading-dark mb-2">Đã gửi thành công!</p>
                <p className="text-body-text">Chúng tôi sẽ liên hệ bạn trong vòng 24 giờ.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-heading-dark mb-2">Họ và tên *</label>
                    <input
                      id="name" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#00BCD4] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-heading-dark mb-2">Số điện thoại *</label>
                    <input
                      id="phone" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#00BCD4] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-heading-dark mb-2">Email</label>
                  <input
                    id="email" type="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#00BCD4] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-heading-dark mb-2">Công ty / Doanh nghiệp</label>
                  <input
                    id="company" value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ABC Co., Ltd."
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#00BCD4] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 rounded-xl text-white font-bold text-base hover:shadow-xl hover:scale-[1.02] transition-all"
                  style={{ background: "linear-gradient(135deg, #00F2EA, #0067A1)" }}
                >
                  Gửi yêu cầu tư vấn
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #001D3D, #003566)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ background: "#00F2EA", filter: "blur(90px)" }} />
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10" style={{ background: "#EE1D52", filter: "blur(70px)" }} />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bắt đầu chiến dịch TikTok Ads<br />của bạn ngay hôm nay
            </h2>
            <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto">
              CCMARTECH — đối tác tin cậy cho mọi chiến dịch quảng cáo TikTok thành công
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-12 py-5 bg-white text-brand-blue rounded-2xl font-bold hover:scale-105 hover:shadow-2xl transition-all"
            >
              Liên hệ ngay <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
