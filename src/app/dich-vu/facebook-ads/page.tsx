"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Target, Users, DollarSign, Activity, MessageSquare, TrendingUp, Share2, Bot } from "lucide-react";
import Footer from "@/components/layout/Footer";

// ==================== DATA CONSTANTS ====================

const HERO_ORBS = [
  { color: "#1877F2", size: 400, blur: 90, x: "10%", y: "20%", delay: 0 },
  { color: "#003FBB", size: 350, blur: 85, x: "80%", y: "60%", delay: 0.5 },
  { color: "#0067A1", size: 300, blur: 80, x: "50%", y: "80%", delay: 1 },
  { color: "#1B3D80", size: 280, blur: 85, x: "20%", y: "70%", delay: 1.5 },
  { color: "#2A4D7C", size: 320, blur: 90, x: "70%", y: "30%", delay: 2 },
];

const SERVICE_FEATURES = [
  "Đối tác chính thức của Facebook tại Việt Nam",
  "Ngân sách tiết kiệm nhất",
  "Triển khai nhanh chóng, toàn diện",
  "Bùng nổ doanh số từ Facebook",
];

const AD_TYPES = [
  {
    id: 1,
    title: "Click to Website",
    items: [
      "Tăng hiệu quả bán hàng trực tiếp trên website",
      "Tăng lượng traffic của website và sự tương tác giữa Fanpage với website của bạn",
      "Giảm các chi phí cho việc SEO web và chạy quảng cáo trên Website",
    ],
  },
  {
    id: 2,
    title: "Facebook - Messenger",
    items: [
      "Kết nối trực tiếp với khách hàng qua Messenger",
      "Tăng tỷ lệ chuyển đổi với cuộc trò chuyện cá nhân hóa",
      "Xây dựng mối quan hệ bền vững với khách hàng tiềm năng",
    ],
  },
  {
    id: 3,
    title: "Engagement",
    items: [
      "Tăng tương tác và nhận diện thương hiệu",
      "Mở rộng phạm vi tiếp cận tự nhiên của fanpage",
      "Xây dựng cộng đồng người theo dõi trung thành",
    ],
  },
  {
    id: 4,
    title: "Lead Ads",
    items: [
      "Thu thập thông tin khách hàng tiềm năng hiệu quả",
      "Form tích hợp sẵn giúp tăng tỷ lệ điền thông tin",
      "Tối ưu hóa chiến dịch với dữ liệu khách hàng chất lượng",
    ],
  },
];

const FANPAGE_SERVICES = [
  {
    icon: Target,
    title: "Lập kế hoạch Marketing",
    description: "Nghiên cứu sản phẩm, đưa ra các mục tiêu, phương án làm việc hiệu quả.",
  },
  {
    icon: Bot,
    title: "Set Up Chatbot Chuyên Nghiệp",
    description: "Dựa trên kiến thức nghiên cứu để chủ động thiết kế botchat.",
  },
  {
    icon: Share2,
    title: "Thiết kế hình ảnh chuyên nghiệp",
    description: "Thiết kế hình ảnh sản phẩm chuyên nghiệp, thay đổi bộ mặt sản phẩm, tăng uy tín.",
  },
  {
    icon: TrendingUp,
    title: "Seeding Tương tác Bài viết",
    description: "CCMartech sẽ seeding tăng tương tác bài viết bằng account thật, tạo tương tác thật cho Fanpage.",
  },
];

const BENEFITS_ITEMS = [
  {
    icon: Target,
    title: "Tiếp cận đúng đối tượng mục tiêu",
    description: "Facebook Ads cho phép doanh nghiệp nhắm mục tiêu theo độ tuổi, giới tính, vị trí địa lý, sở thích và hành vi, giúp tối ưu hóa hiệu quả quảng cáo.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop",
  },
  {
    icon: Users,
    title: "Tăng tương tác và nhận diện",
    description: "Quảng cáo trên Facebook giúp doanh nghiệp xây dựng hình ảnh thương hiệu và duy trì sự hiện diện trong tâm trí khách hàng thông qua nội dung thu hút và đa dạng.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
  },
  {
    icon: DollarSign,
    title: "Chi phí linh hoạt và hiệu quả",
    description: "Facebook Ads cho phép bạn kiểm soát chi phí quảng cáo bằng cách thiết lập ngân sách phù hợp, chỉ trả tiền cho những hành động cụ thể như lượt nhấp chuột, lượt xem hoặc lượt chuyển đổi.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
  },
  {
    icon: Activity,
    title: "Công cụ đo lường mạnh mẽ",
    description: "Facebook cung cấp các công cụ phân tích chi tiết để bạn theo dõi hiệu suất chiến dịch, điều chỉnh kịp thời và tối ưu hóa lợi nhuận.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
];

const NETWORK_NODES = [
  { x: 10, y: 15 }, { x: 25, y: 25 }, { x: 40, y: 10 }, { x: 55, y: 30 },
  { x: 70, y: 20 }, { x: 85, y: 35 }, { x: 15, y: 50 }, { x: 30, y: 60 },
  { x: 45, y: 55 }, { x: 60, y: 65 }, { x: 75, y: 70 }, { x: 90, y: 60 },
  { x: 20, y: 85 }, { x: 35, y: 90 }, { x: 50, y: 80 }, { x: 65, y: 95 },
  { x: 80, y: 85 }, { x: 5, y: 40 }, { x: 95, y: 45 }, { x: 50, y: 40 },
];

const NETWORK_LINES = [
  { x1: 10, y1: 15, x2: 25, y2: 25 }, { x1: 25, y1: 25, x2: 40, y2: 10 },
  { x1: 40, y1: 10, x2: 55, y2: 30 }, { x1: 55, y1: 30, x2: 70, y2: 20 },
  { x1: 70, y1: 20, x2: 85, y2: 35 }, { x1: 15, y1: 50, x2: 30, y2: 60 },
  { x1: 30, y1: 60, x2: 45, y2: 55 }, { x1: 45, y1: 55, x2: 60, y2: 65 },
  { x1: 60, y1: 65, x2: 75, y2: 70 }, { x1: 75, y1: 70, x2: 90, y2: 60 },
  { x1: 20, y1: 85, x2: 35, y2: 90 }, { x1: 35, y1: 90, x2: 50, y2: 80 },
  { x1: 50, y1: 80, x2: 65, y2: 95 }, { x1: 65, y1: 95, x2: 80, y2: 85 },
  { x1: 10, y1: 15, x2: 15, y2: 50 }, { x1: 85, y1: 35, x2: 90, y2: 60 },
  { x1: 25, y1: 25, x2: 30, y2: 60 }, { x1: 55, y1: 30, x2: 60, y2: 65 },
  { x1: 40, y1: 10, x2: 45, y2: 55 }, { x1: 70, y1: 20, x2: 75, y2: 70 },
];

// ==================== MAIN COMPONENT ====================

export default function FacebookAdsPage() {
  const [openAccordion, setOpenAccordion] = useState<number[]>([1]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", company: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAccordionToggle = (id: number) => {
    setOpenAccordion(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== HERO BANNER ==================== */}
      <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-[#000814] to-[#001840] flex items-center justify-center">
        {/* Animated Orbs */}
        {HERO_ORBS.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full opacity-30"
            style={{
              width: orb.size,
              height: orb.size,
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
              left: orb.x,
              top: orb.y,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: orb.delay,
            }}
          />
        ))}

        {/* SVG Network Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003FBB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1877F2" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {NETWORK_LINES.map((line, i) => (
            <motion.line
              key={i}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
          {NETWORK_NODES.map((node, i) => (
            <motion.circle
              key={i}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="#1877F2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </svg>

        {/* Scanning Line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent"
          animate={{ y: [0, "100vh", 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbit Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute w-[600px] h-[600px] border border-[#003FBB]/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[800px] h-[800px] border-2 border-dashed border-[#1877F2]/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[#1877F2]/50" />
        <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-[#1877F2]/50" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-[#1877F2]/50" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[#1877F2]/50" />

        {/* Data Dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#1877F2] rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-[#0067A1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            FACEBOOK ADS
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Chiến dịch quảng cáo chuyên nghiệp - Tối ưu chi phí - Tăng trưởng bền vững
          </motion.p>
        </div>
      </section>

      {/* ==================== SERVICE OVERVIEW ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#444547] mb-6">
                QUẢNG CÁO FACEBOOK ADS CHUYÊN NGHIỆP TẠI CCMARTECH
              </h2>
              <p className="text-lg text-[#676767] mb-8">
                CCMartech cung cấp dịch vụ quảng cáo Facebook Ads chuyên nghiệp, giúp doanh nghiệp tiếp cận chính xác đối tượng khách hàng với các chiến dịch được thiết kế và tối ưu hóa theo mục tiêu cụ thể. Với kinh nghiệm chuyên sâu, CCMartech cam kết mang lại hiệu quả cao và tối đa hóa lợi nhuận từ ngân sách quảng cáo của bạn.
              </p>

              <div className="space-y-4 mb-8">
                {SERVICE_FEATURES.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#1877F2] flex-shrink-0" />
                    <span className="text-[#676767]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <button className="px-8 py-4 bg-gradient-to-r from-[#1B3D80] to-[#0067A1] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all">
                Đăng ký ngay
              </button>
            </motion.div>

            {/* Right: Icon Mockup */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1877F2]/20 to-[#003FBB]/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#1877F2] to-[#003FBB] p-12 rounded-3xl shadow-2xl">
                  <MessageSquare className="w-48 h-48 text-white/90" />
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-white">2.5M+</div>
                      <div className="text-sm text-white/70">Reach</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">4.2%</div>
                      <div className="text-sm text-white/70">CTR</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">350%</div>
                      <div className="text-sm text-white/70">ROAS</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== AD TYPES ACCORDION ==================== */}
      <section className="py-20 bg-gradient-to-b from-[#F1F2F4] to-[#E8EAEE]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-[#444547] mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            CUNG CẤP MỌI LOẠI HÌNH QUẢNG CÁO FACEBOOK
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {AD_TYPES.map((type, index) => (
              <motion.div
                key={type.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleAccordionToggle(type.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl font-bold text-[#444547]">{type.title}</span>
                  <motion.div
                    animate={{ rotate: openAccordion.includes(type.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-[#003FBB]" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openAccordion.includes(type.id) ? "auto" : 0,
                    opacity: openAccordion.includes(type.id) ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <ul className="space-y-3">
                      {type.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#1877F2] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-[#676767]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FANPAGE MANAGEMENT ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-[#444547] mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            CCMARTECH GIÚP BẠN QUẢN TRỊ FANPAGE DOANH NGHIỆP
          </motion.h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {FANPAGE_SERVICES.map((service, index) => {
                const IconComponent = service.icon;
                const isLastRow = index >= 2;
                const isRightColumn = index % 2 === 1;

                return (
                  <motion.div
                    key={index}
                    className={`p-8 border-gray-200 ${
                      !isLastRow ? "border-b" : ""
                    } ${
                      !isRightColumn ? "md:border-r" : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#1877F2] to-[#003FBB] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#444547] mb-2">{service.title}</h3>
                        <p className="text-[#676767]">{service.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS GRID ==================== */}
      <section className="py-20 bg-gradient-to-b from-[#F1F2F4] to-[#E8EAEE]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-[#444547] mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            VÌ SAO NÊN SỬ DỤNG DỊCH VỤ FACEBOOK ADS CHO DOANH NGHIỆP CỦA BẠN?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {BENEFITS_ITEMS.map((benefit, index) => {
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Top: Image */}
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Bottom: Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#444547] mb-4">{benefit.title}</h3>
                    <p className="text-[#676767] leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== REGISTRATION FORM ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#444547] mb-4 text-center">
                Đăng ký dịch vụ ngay hôm nay
              </h2>
              <p className="text-[#676767] text-center mb-8">
                Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí
              </p>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#444547] mb-2">Đăng ký thành công!</h3>
                  <p className="text-[#676767]">Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#444547] mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#444547] mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#444547] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#444547] mb-2">
                      Công ty
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#444547] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Tên công ty của bạn"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#1B3D80] to-[#0067A1] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Gửi thông tin
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#001840] to-[#003566]">
        <div className="absolute inset-0 opacity-20">
          {HERO_ORBS.slice(0, 3).map((orb, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                width: orb.size * 0.6,
                height: orb.size * 0.6,
                background: orb.color,
                filter: `blur(${orb.blur}px)`,
                left: orb.x,
                top: orb.y,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: orb.delay,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sẵn sàng bắt đầu chiến dịch của bạn?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Hãy để CCMartech đồng hành cùng bạn trên hành trình phát triển thương hiệu
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-[#1877F2] to-[#0067A1] text-white text-lg font-bold rounded-lg shadow-2xl hover:shadow-3xl transition-all">
            Liên hệ ngay
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
