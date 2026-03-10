"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Star, Target, DollarSign, TrendingUp, BarChart3, Lightbulb, Users, FileText, Headphones } from "lucide-react";

// ==================== DATA CONSTANTS ====================

const HERO_ORBS = [
  { color: "#003FBB", size: 400, blur: 90, x: "10%", y: "20%", delay: 0 },
  { color: "#0067A1", size: 350, blur: 85, x: "80%", y: "60%", delay: 0.2 },
  { color: "#1B3D80", size: 300, blur: 80, x: "70%", y: "10%", delay: 0.4 },
  { color: "#1E5A8E", size: 320, blur: 85, x: "20%", y: "70%", delay: 0.6 },
  { color: "#2A4D7C", size: 280, blur: 80, x: "50%", y: "50%", delay: 0.8 },
];

const SERVICE_FEATURES = [
  "Tăng cường mức độ nhận diện thương hiệu",
  "Nâng cao tỷ lệ chuyển đổi khách hàng",
  "Thúc đẩy và phát huy các lợi thế cạnh tranh",
  "Thu thập dữ liệu khách hàng mục tiêu",
];

const BENEFITS_ITEMS = [
  {
    icon: Target,
    title: "Tiếp cận đúng đối tượng mục tiêu",
    description: "Google Ads nhắm mục tiêu chi tiết theo từ khóa, địa điểm và sở thích, tối ưu hóa hiệu quả tiếp cận.",
  },
  {
    icon: DollarSign,
    title: "Kiểm soát chi phí",
    description: "Google Ads cho phép bạn kiểm soát ngân sách linh hoạt, chỉ trả tiền khi người dùng click vào quảng cáo của bạn.",
  },
  {
    icon: TrendingUp,
    title: "Linh hoạt và đa dạng",
    description: "Đa dạng hình thức quảng cáo từ Search, Display, Video đến Shopping, phù hợp với mọi mục tiêu kinh doanh.",
  },
  {
    icon: Star,
    title: "Tăng nhận diện thương hiệu",
    description: "Hiển thị trên Google và mạng lưới đối tác giúp thương hiệu của bạn được nhìn thấy bởi hàng triệu người dùng.",
  },
];

const STATISTICS = [
  {
    value: 63,
    suffix: "%",
    label: "Người dùng",
    description: "Có xu hướng nhấp vào quảng cáo Google khi tìm kiếm thông tin sản phẩm hoặc dịch vụ.",
  },
  {
    value: 75,
    suffix: "+",
    label: "Doanh nghiệp",
    description: "Báo cáo rằng Google Ads giúp họ tăng doanh thu và cải thiện kết quả kinh doanh rõ rệt.",
  },
  {
    value: 90,
    suffix: "%",
    label: "Người dùng Internet",
    description: "Nhìn thấy quảng cáo Google, mở rộng khả năng tiếp cận đối tượng khách hàng.",
  },
];

const WHY_CHOOSE_CARDS = [
  {
    icon: Lightbulb,
    title: "Chiến lược tối ưu - chuyên sâu",
    description: "CCMartech xây dựng chiến lược quảng cáo tùy chỉnh, phù hợp với từng ngành nghề và mục tiêu kinh doanh, đảm bảo chiến dịch tiếp cận đúng đối tượng và tăng tỷ lệ chuyển đổi.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    icon: Users,
    title: "Đội ngũ giàu kinh nghiệm",
    description: "Đội ngũ chuyên viên của CCMartech có nhiều năm kinh nghiệm trong việc quản lý và tối ưu chiến dịch Google Ads, giúp bạn đạt được kết quả tốt nhất với chi phí hợp lý.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
  },
  {
    icon: FileText,
    title: "Báo cáo chi tiết và minh bạch",
    description: "CCMartech cung cấp báo cáo đầy đủ, dễ hiểu về hiệu suất quảng cáo, giúp bạn nắm bắt tiến độ và điều chỉnh chiến lược kịp thời để tối đa hóa hiệu quả đầu tư.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ liên tục và tư vấn tận tâm",
    description: "Đội ngũ CCMartech luôn sẵn sàng hỗ trợ 24/7, tư vấn và giải đáp mọi thắc mắc trong suốt quá trình triển khai và vận hành chiến dịch quảng cáo.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
  },
];

// SVG Network nodes
const NETWORK_NODES = [
  { x: 100, y: 100 }, { x: 200, y: 150 }, { x: 300, y: 100 }, { x: 400, y: 200 },
  { x: 500, y: 150 }, { x: 600, y: 100 }, { x: 700, y: 180 }, { x: 150, y: 250 },
  { x: 250, y: 300 }, { x: 350, y: 280 }, { x: 450, y: 320 }, { x: 550, y: 280 },
  { x: 650, y: 250 }, { x: 100, y: 400 }, { x: 200, y: 450 }, { x: 300, y: 420 },
  { x: 400, y: 480 }, { x: 500, y: 440 }, { x: 600, y: 400 }, { x: 700, y: 460 },
];

const NETWORK_LINES = [
  { x1: 100, y1: 100, x2: 200, y2: 150 }, { x1: 200, y1: 150, x2: 300, y2: 100 },
  { x1: 300, y1: 100, x2: 400, y2: 200 }, { x1: 400, y1: 200, x2: 500, y2: 150 },
  { x1: 500, y1: 150, x2: 600, y2: 100 }, { x1: 600, y1: 100, x2: 700, y2: 180 },
  { x1: 150, y1: 250, x2: 250, y2: 300 }, { x1: 250, y1: 300, x2: 350, y2: 280 },
  { x1: 350, y1: 280, x2: 450, y2: 320 }, { x1: 450, y1: 320, x2: 550, y2: 280 },
  { x1: 550, y1: 280, x2: 650, y2: 250 }, { x1: 100, y1: 400, x2: 200, y2: 450 },
  { x1: 200, y1: 450, x2: 300, y2: 420 }, { x1: 300, y1: 420, x2: 400, y2: 480 },
  { x1: 400, y1: 480, x2: 500, y2: 440 }, { x1: 500, y1: 440, x2: 600, y2: 400 },
  { x1: 600, y1: 400, x2: 700, y2: 460 }, { x1: 100, y1: 100, x2: 150, y2: 250 },
  { x1: 200, y1: 150, x2: 250, y2: 300 }, { x1: 300, y1: 100, x2: 350, y2: 280 },
];

// ==================== COMPONENTS ====================

// Counter Component with count-up animation
const CounterStat = ({ value, suffix, label, description }: { value: number; suffix: string; label: string; description: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-[#0067A1] to-[#003FBB] bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-xl font-semibold text-[#444547] mb-2">{label}</div>
      <p className="text-[#676767] max-w-xs mx-auto">{description}</p>
    </motion.div>
  );
};

// ==================== MAIN PAGE ====================

export default function GoogleAdsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setFormData({ name: "", phone: "", email: "", company: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F1F2F4]">
      {/* ==================== HERO BANNER ==================== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#000814] to-[#001840] text-white">
        {/* Abstract Animation Elements */}
        
        {/* Animated Orbs */}
        {HERO_ORBS.map((orb) => (
          <motion.div
            key={`orb-${orb.color}-${orb.delay}`}
            className="absolute rounded-full opacity-30"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: `blur(${orb.blur}px)`,
              left: orb.x,
              top: orb.y,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* SVG Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {NETWORK_LINES.map((line, index) => (
            <motion.line
              key={`line-${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#0067A1"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: index * 0.05 }}
            />
          ))}
          {NETWORK_NODES.map((node, index) => (
            <motion.circle
              key={`node-${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r="4"
              fill="#003FBB"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          ))}
        </svg>

        {/* Scanning Line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0067A1] to-transparent"
          animate={{ y: [0, 600, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbit Rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 border-2 border-[#003FBB] rounded-full opacity-20"
          style={{ transform: "translate(-50%, -50%)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-dashed border-[#0067A1] rounded-full opacity-15"
          style={{ transform: "translate(-50%, -50%)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Corner Brackets */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#0067A1] opacity-40" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#0067A1] opacity-40" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#0067A1] opacity-40" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#0067A1] opacity-40" />

        {/* Data Dots */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`data-dot-pos-${10 + i * 12}-${20 + (i % 3) * 20}`}
            className="absolute w-1 h-1 bg-[#0067A1] rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#0067A1] via-[#003FBB] to-[#1B3D80] bg-clip-text text-transparent"
          >
            GOOGLE ADS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Quảng cáo Google Ads chuyên nghiệp - Tiếp cận khách hàng hiệu quả
          </motion.p>
        </div>
      </section>

      {/* ==================== SERVICE OVERVIEW ==================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-mono text-[#0067A1] mb-2 uppercase tracking-wider">DỊCH VỤ QUẢNG CÁO</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mb-6">
                QUẢNG CÁO GOOGLE ADS CHUYÊN NGHIỆP TẠI CCMARTECH
              </h2>
              <p className="text-[#676767] mb-8 leading-relaxed">
                CCMartech cung cấp dịch vụ quảng cáo Google Ads chuyên nghiệp, giúp doanh nghiệp tiếp cận nhanh chóng và hiệu quả đến khách hàng tiềm năng. Với chiến lược tối ưu từ khóa và ngân sách, CCMartech đảm bảo chiến dịch quảng cáo của bạn đạt hiệu quả tối đa, tăng cường khả năng hiển thị và tỷ lệ chuyển đổi.
              </p>

              <ul className="space-y-4 mb-8">
                {SERVICE_FEATURES.map((feature) => (
                  <motion.li
                    key={`feature-${feature.substring(0, 20)}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#0067A1] shrink-0 mt-0.5" />
                    <span className="text-[#676767]">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#1B3D80] to-[#0067A1] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Đăng ký nhận báo giá
              </motion.button>
            </motion.div>

            {/* Right: 3D Mockup Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#003FBB] to-[#0067A1] rounded-2xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="w-full h-64 rounded-lg mb-6 flex items-center justify-center bg-white/5">
                    <BarChart3 className="w-32 h-32 text-white/80" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "CTR", value: "12.5%" },
                      { label: "CPC", value: "₫5,200" },
                      { label: "ROAS", value: "450%" },
                    ].map((stat) => (
                      <div key={`stat-${stat.label}`} className="text-center">
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS GRID ==================== */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F1F2F4] to-[#E8EAEE]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#444547] mb-16"
          >
            VÌ SAO NÊN SỬ DỤNG DỊCH VỤ GOOGLE ADS CHO DOANH NGHIỆP CỦA BẠN?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {BENEFITS_ITEMS.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={`benefit-${item.title.substring(0, 15)}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003FBB] to-[#0067A1] flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#444547] mb-3">{item.title}</h3>
                    <p className="text-[#676767] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== STATISTICS COUNTERS ==================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#444547] mb-16"
          >
            GOOGLE ADS
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {STATISTICS.map((stat) => (
              <CounterStat
                key={`stat-${stat.label}`}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US - IMAGE CARDS ==================== */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F1F2F4] to-[#E8EAEE]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[#444547] mb-16"
          >
            LÝ DO NÊN CHỌN DỊCH VỤ QUẢNG CÁO GOOGLE ADS CỦA CCMARTECH
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {WHY_CHOOSE_CARDS.map((card) => {
              return (
                <motion.div
                  key={`card-${card.title.substring(0, 20)}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                >
                  {/* Top Half: Image */}
                  <div className="h-64 relative overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Bottom Half: Content */}
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-[#444547] mb-3">{card.title}</h3>
                    <p className="text-[#676767] leading-relaxed">{card.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== REGISTRATION FORM ==================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#444547] mb-4">
              Đăng ký nhận tư vấn Google Ads
            </h2>
            <p className="text-center text-[#676767] mb-8">
              Để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ tư vấn miễn phí
            </p>

            {formSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#003FBB] to-[#0067A1] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#444547] mb-2">Gửi thành công!</h3>
                <p className="text-[#676767]">Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#444547] mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:ring-2 focus:ring-[#0067A1] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#444547] mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:ring-2 focus:ring-[#0067A1] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#444547] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:ring-2 focus:ring-[#0067A1] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-[#444547] mb-2">
                    Công ty
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:ring-2 focus:ring-[#0067A1] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#1B3D80] to-[#0067A1] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Gửi yêu cầu tư vấn
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#001840] to-[#003566] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Sẵn sàng tăng trưởng với Google Ads?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8"
          >
            Hãy để CCMartech giúp bạn xây dựng chiến dịch quảng cáo hiệu quả và tối ưu chi phí
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-[#003FBB] to-[#0067A1] text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Liên hệ ngay
          </motion.button>
        </div>
      </section>
    </div>
  );
}
