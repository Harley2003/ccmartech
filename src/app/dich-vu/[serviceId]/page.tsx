"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Code,
  Megaphone,
  Target,
  Smartphone,
  Palette,
  Zap,
  Sparkles,
} from "lucide-react";
import servicesData from "@/data/services.json";
import ServiceCard from "@/components/sections/ServiceCard";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Megaphone,
  Target,
  Smartphone,
  Palette,
  Zap,
  Sparkles,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const service = servicesData.services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold text-heading-dark mb-4">Dịch vụ không tồn tại</h1>
        <Link
          href="/dich-vu"
          className="inline-flex items-center gap-2 text-brand-blue hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách dịch vụ
        </Link>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Code;

  // 3 related services from the same or other categories
  const related = servicesData.services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* ─── Hero ─────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 60%, #003FBB 100%)",
        }}
      >
        {/* Decorative geometry */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-120 h-120 rounded-full border border-white/10" />
          <div className="absolute -top-8 -right-8 w-75 h-75 rounded-full border border-white/10" />
          <div className="absolute bottom-10 left-1/3 w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" />
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid-sd" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-sd)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/dich-vu"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại dịch vụ
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Icon + title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-black/20`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
                    Dịch vụ chuyên nghiệp
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {service.title}
                </h1>
                <p className="text-gray-200 text-lg leading-relaxed max-w-xl">
                  {service.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {service.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-1">
                    {service.features.length}
                  </div>
                  <div className="text-gray-300 text-sm">Tính năng nổi bật</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-1">
                    {service.process.length}
                  </div>
                  <div className="text-gray-300 text-sm">Bước triển khai</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Features + Image ─────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image with floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl shadow-2xl w-full h-115 object-cover"
              />
              {/* Floating trust badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                <div
                  className={`w-10 h-10 bg-linear-to-br ${service.gradient} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-heading-dark text-sm">{service.title}</div>
                  <div className="text-xs text-body-text">Chuyên nghiệp & Hiệu quả</div>
                </div>
              </div>
            </motion.div>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-heading-dark mb-3">
                Tính năng nổi bật
              </h2>
              <p className="text-body-text mb-8 leading-relaxed">
                Những gì bạn nhận được khi sử dụng dịch vụ{" "}
                <span className="text-brand-blue font-medium">{service.title}</span> của chúng
                tôi.
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.07 }}
                    className="flex items-center gap-3 p-4 bg-page-bg rounded-xl group hover:bg-green-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors">
                      <CheckCircle className="w-4 h-4 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-body-text font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Process ──────────────────────────────── */}
      <section className="py-24 bg-page-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading-dark mb-4">
              Quy trình triển khai
            </h2>
            <p className="text-xl text-body-text max-w-2xl mx-auto">
              Cách chúng tôi thực hiện dịch vụ {service.title} — minh bạch và hiệu quả
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-brand-blue/25 to-transparent" />

            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow relative"
              >
                <div className="w-16 h-16 bg-cta-gradient rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-brand-blue/20 relative z-10">
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-heading-dark mb-3">{step.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Services ─────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-heading-dark mb-2">
                Dịch vụ liên quan
              </h2>
              <p className="text-body-text">
                Khám phá thêm các giải pháp khác của chúng tôi
              </p>
            </div>
            <Link
              href="/dich-vu"
              className="inline-flex items-center gap-2 text-brand-blue font-medium hover:gap-3 transition-all"
            >
              Xem tất cả dịch vụ
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((rel, index) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={rel.title}
                  description={rel.shortDesc}
                  icon={rel.icon}
                  gradient={rel.gradient}
                  features={rel.features.slice(0, 3)}
                  link={`/dich-vu/${rel.id}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-24 -right-24 w-125 h-125 rounded-full border border-white/10" />
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full border border-white/10" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bắt đầu với {service.title}?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed">
              Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết từ đội ngũ chuyên gia của
              chúng tôi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-brand-blue rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-semibold shadow-xl"
              >
                Đăng ký tư vấn miễn phí
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dich-vu"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 text-white rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Xem dịch vụ khác
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
