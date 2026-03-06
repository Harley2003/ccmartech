"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const services = [
  "Thiết kế Website",
  "Google Ads",
  "TikTok Ads",
  "Facebook Ads",
  "Branding",
  "Tự động hóa Marketing",
  "Khác",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h2 className="text-3xl text-heading-dark mb-6 font-medium">
        Gửi yêu cầu tư vấn
      </h2>

      {isSubmitted ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl text-heading-dark mb-2 font-medium">
            Gửi thành công!
          </h3>
          <p className="text-body-text">
            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-heading-dark mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-nav-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-heading-dark mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-nav-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-heading-dark mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-nav-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                placeholder="0923 250 327"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-heading-dark mb-2">
              Tên công ty
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-nav-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
              placeholder="Công ty ABC"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-heading-dark mb-2">
              Dịch vụ quan tâm <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-nav-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
            >
              <option value="">Chọn dịch vụ</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-heading-dark mb-2">
              Nội dung yêu cầu <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-nav-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all resize-none"
              placeholder="Mô tả chi tiết yêu cầu của bạn..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-cta-gradient text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium"
          >
            <Send className="w-5 h-5" />
            Gửi yêu cầu
          </button>
        </form>
      )}
    </div>
  );
}
