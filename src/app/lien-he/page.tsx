"use client";

import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import siteData from "@/data/site.json";

export default function LienHePage() {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="pt-32 pb-16 bg-cta-gradient text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Liên hệ</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giải pháp phù hợp
              nhất cho doanh nghiệp của bạn
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24">
            {[
              {
                icon: MapPin,
                title: "Địa chỉ",
                content: siteData.contact.address,
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Phone,
                title: "Hotline",
                content: siteData.contact.hotline,
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Mail,
                title: "Email",
                content: siteData.contact.email,
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Clock,
                title: "Giờ làm việc",
                content: siteData.workingHours[0],
                color: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-heading-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-body-text">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-16 bg-nav-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-heading-dark mb-2">
                Gửi yêu cầu tư vấn
              </h2>
              <p className="text-body-text mb-8">
                Điền thông tin bên dưới, đội ngũ chuyên gia sẽ liên hệ tư vấn
                miễn phí trong 24h
              </p>
              <ContactForm />
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-heading-dark mb-2">
                Văn phòng chính
              </h2>
              <p className="text-body-text mb-8">{siteData.contact.address}</p>
              <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
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
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-heading-dark mb-4">
              Hệ thống chi nhánh
            </h2>
            <p className="text-xl text-body-text">
              Mạng lưới văn phòng trên toàn thành phố
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.branches.map((branch, index) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-nav-white rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-cta-gradient rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading-dark mb-3">
                  {branch.name}
                </h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-body-text">
                    <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    {branch.address}
                  </p>
                  <p className="flex items-center gap-2 text-body-text">
                    <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    {branch.phone}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
