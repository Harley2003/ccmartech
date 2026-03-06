"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube, Send } from "lucide-react";
import { useState } from "react";
import siteData from "@/data/site.json";
import navLinks from "@/data/navigation.json";

const footerServices = [
  { name: "Thiết kế Website", path: "/dich-vu/thiet-ke-website" },
  { name: "TikTok Ads", path: "/dich-vu/tiktok-ads" },
  { name: "Google Ads", path: "/dich-vu/google-ads" },
  { name: "Facebook Ads", path: "/dich-vu/facebook-ads" },
  { name: "Branding", path: "/dich-vu/branding" },
  { name: "Tự động hóa", path: "/dich-vu/tu-dong-hoa" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã đăng ký nhận tin!");
    setEmail("");
  };

  return (
    <footer className="bg-footer-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/footer-logo.png"
                alt={siteData.companyName}
                width={160}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-body-text mb-4 text-sm">{siteData.description}</p>
            <div className="flex gap-3">
              <a
                href={siteData.social.facebook}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteData.social.linkedin}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={siteData.social.youtube}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-heading-dark mb-4 font-medium">Dịch vụ</h3>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service.path}>
                  <Link
                    href={service.path}
                    className="text-body-text hover:text-brand-blue transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-heading-dark mb-4 font-medium">Liên kết</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-text hover:text-brand-blue transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-heading-dark mb-4 font-medium">Liên hệ</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-brand-blue mt-1 flex-shrink-0" />
                <span className="text-body-text">{siteData.contact.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a
                  href={`tel:${siteData.contact.hotline.replaceAll(" ", "")}`}
                  className="text-body-text hover:text-brand-blue"
                >
                  {siteData.contact.hotline}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 text-brand-blue mt-1 flex-shrink-0" />
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="text-body-text hover:text-brand-blue break-all"
                >
                  {siteData.contact.email}
                </a>
              </li>
            </ul>

            <div>
              <h4 className="text-heading-dark text-sm mb-2 font-medium">
                Đăng ký nhận tin
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  required
                />
                <button
                  type="submit"
                  className="p-2 bg-brand-blue text-white rounded-lg hover:bg-secondary transition-colors"
                  aria-label="Đăng ký"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-copyright-bar text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-300">{siteData.copyright}</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
