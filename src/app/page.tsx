"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  Megaphone,
  Smartphone,
  Palette,
  Zap,
  ChevronRight,
  Target
} from "lucide-react";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import VisionMission from "@/components/sections/VisionMission";
import PartnersSection from "@/components/sections/PartnersSection";
import ProcessSection from "@/components/sections/ProcessSection";
import NewsBentoSection from "@/components/sections/NewsBentoSection";
import siteData from "@/data/site.json";
import servicesData from "@/data/services.json";

/* ── Capabilities marquee items ── */
const capabilities = [
  "Sáng tạo",
  "Bứt phá",
  "Dẫn đầu xu hướng",
  "Google Ads",
  "Facebook Ads",
  "TikTok Ads",
  "Thiết kế Website",
  "SEO Content",
  "Branding"
];
const marqueeItems = [
  ...capabilities.map((t, i) => ({ text: t, id: `a${i}` })),
  ...capabilities.map((t, i) => ({ text: t, id: `b${i}` }))
];

/* ── Icon mapping ── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code: Code2,
  Megaphone,
  Smartphone,
  Target,
  Palette,
  Zap
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <div className="bg-brand-blue py-3.5 overflow-hidden">
        <div className="flex items-center">
          <div className="animate-marquee flex items-center gap-0 whitespace-nowrap">
            {marqueeItems.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-5 px-5"
              >
                <span className="text-white font-medium tracking-wide text-sm">
                  {item.text}
                </span>
                <span className="text-white/30 text-base">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <AboutSection />
      <section className="py-24 bg-[#F1F2F4]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
          >
            <div>
              <span className="text-brand-blue text-sm font-semibold uppercase tracking-widest block mb-3">
                Dịch vụ &amp; Giải pháp
              </span>
              <h2
                className="font-black text-heading-dark leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                Giải pháp toàn diện cho{" "}
                <span className="gradient-text">doanh nghiệp</span>
              </h2>
            </div>
            <Link
              href="/dich-vu"
              className="inline-flex items-center gap-2 text-brand-blue font-medium text-sm hover:gap-3 transition-all duration-300 shrink-0"
            >
              Xem tất cả dịch vụ <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.services.map((s, i) => {
              const Icon = iconMap[s.icon] || Code2;
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link
                    href={`/dich-vu/${s.id}`}
                    className="group flex flex-col h-full rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-400 overflow-hidden"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full border-2 border-white/70 flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 text-[11px] font-bold text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {num}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-brand-blue/8 flex items-center justify-center group-hover:bg-brand-blue/14 transition-colors">
                          <Icon className="w-4 h-4 text-brand-blue" />
                        </div>
                        <h3 className="text-base font-bold text-heading-dark">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-body-text text-sm leading-relaxed flex-1">
                        {s.shortDesc}
                      </p>
                      <div className="inline-flex items-center gap-1 text-brand-blue text-sm font-medium mt-4 group-hover:gap-2 transition-all duration-300">
                        Tìm hiểu thêm <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <PortfolioSection />
      <VisionMission />
      <PartnersSection />
      <ProcessSection />
      <NewsBentoSection />
      <section className="py-28 bg-brand-blue relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-125 bg-white/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{" "}
              Sẵn sàng hợp tác
            </span>
            <h2
              className="font-black text-white mb-6 leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Sẵn sàng tăng trưởng{" "}
              <span className="text-white underline decoration-white/30">
                đột phá?
              </span>
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí và
              proposal chi tiết cho dự án của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue rounded-xl font-bold text-sm hover:bg-[#F1F2F4] transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                Đăng ký tư vấn miễn phí
              </Link>
              <a
                href={`tel:${siteData.contact.hotline.replaceAll(" ", "")}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-xl font-medium text-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Gọi ngay: {siteData.contact.hotline}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
