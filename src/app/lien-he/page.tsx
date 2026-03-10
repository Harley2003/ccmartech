"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import siteData from "@/data/site.json";

export default function LienHePage() {
  return (
    <div className="overflow-hidden bg-white">
      {/* ─── MINIMALIST HERO WITH CONSULTANT IMAGE ─────────── */}
      <section className="relative pt-24 pb-0 overflow-hidden bg-[#F1F2F4]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-6rem)]">
            {/* Left: Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="py-12 lg:py-20"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#003FBB] text-sm mb-8 shadow-sm border border-[#003FBB]/10"
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold" style={{ fontFamily: "Space Mono, monospace" }}>Tư vấn miễn phí 24/7</span>
              </motion.div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#444547] mb-6 leading-[1.1]">
                Bắt đầu<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3D80] to-[#0067A1]">
                  ngay hôm nay
                </span>
              </h1>

              <p className="text-xl text-[#676767] mb-10 leading-relaxed max-w-lg">
                Đội ngũ chuyên gia CCMARTECH sẵn sàng đồng hành cùng doanh nghiệp của bạn
              </p>

              {/* Trust Indicators */}
              <div className="space-y-4 mb-12">
                {[
                  "Phản hồi trong vòng 2 giờ",
                  "Tư vấn miễn phí không ràng buộc",
                  "Giải pháp phù hợp với ngân sách",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#444547] font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact Info - Minimalist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-[#676767] mb-2">
                    <Phone className="w-4 h-4 text-[#003FBB]" />
                    <span className="text-sm font-mono">Hotline</span>
                  </div>
                  <a href={`tel:${siteData.contact.hotline}`} className="text-lg font-bold text-[#444547] hover:text-[#003FBB] transition-colors">
                    {siteData.contact.hotline}
                  </a>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#676767] mb-2">
                    <Mail className="w-4 h-4 text-[#003FBB]" />
                    <span className="text-sm font-mono">Email</span>
                  </div>
                  <a href={`mailto:${siteData.contact.email}`} className="text-lg font-bold text-[#444547] hover:text-[#003FBB] transition-colors">
                    {siteData.contact.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Consultant Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[600px] lg:h-[800px] -mb-0 lg:-mr-4"
            >
              {/* Abstract background shape */}
              <div className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #003FBB 0%, transparent 70%)" }} />
              
              {/* Consultant Image */}
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                  alt="Marketing Consultant"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#003FBB]/20 to-transparent" />
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}>
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[#676767] font-mono mb-1">Liên hệ ngay</p>
                      <p className="text-xl font-black text-[#444547]">{siteData.contact.hotline}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONVERSION-FOCUSED FORM SECTION ─────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-[#F1F2F4] rounded-full text-[#003FBB] text-sm font-bold mb-4" style={{ fontFamily: "Space Mono, monospace" }}>
                {/* Đăng ký tư vấn */}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#444547] mb-4">
                Gửi thông tin của bạn
              </h2>
              <p className="text-lg text-[#676767] max-w-xl mx-auto">
                Chúng tôi sẽ phản hồi trong vòng <span className="font-bold text-[#003FBB]">2 giờ</span> làm việc
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#F8F8F9] rounded-3xl p-8 md:p-12 shadow-sm"
            >
              <ContactForm />
            </motion.div>

            {/* Privacy Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center text-sm text-[#676767] mt-6 font-mono"
            >
              {/* Thông tin của bạn được bảo mật tuyệt đối */}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── MINIMALIST OFFICE INFO ─────────── */}
      <section className="py-20 bg-[#F1F2F4]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.473098906413!2d105.81918!3d21.04735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3ceb45a237%3A0xa63e2e72c91a73e3!2zMjUzIFRo4buleSBLaHXDqiwgVMOieSBI4buTLCBIw6AgTuG7mWk!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CCMARTECH Location"
                />
              </div>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-black text-[#444547] mb-3">Văn phòng</h2>
                <p className="text-lg text-[#676767]">Ghé thăm chúng tôi để trò chuyện trực tiếp</p>
              </div>

              {/* Address */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#676767] mb-1 font-mono">Địa chỉ</p>
                    <p className="text-lg font-bold text-[#444547]">{siteData.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}>
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#676767] mb-1 font-mono">Giờ làm việc</p>
                    <p className="text-lg font-bold text-[#444547]">{siteData.workingHours[0]}</p>
                    <p className="text-base text-[#676767]">{siteData.workingHours[1]}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
