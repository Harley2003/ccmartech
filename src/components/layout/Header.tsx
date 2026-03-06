"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu, X, Phone, Mail, MapPin, ChevronDown,
  Code, Megaphone, Smartphone, Target, Palette, Zap, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import siteData from "@/data/site.json";

/* ── Services list shown in the mega dropdown ── */
const SERVICES: { id: string; title: string; shortDesc: string; Icon: LucideIcon; gradient: string }[] = [
  { id: "thiet-ke-website",  title: "Thiết kế Website",       shortDesc: "Website đẹp, chuẩn SEO, tốc độ nhanh",     Icon: Code,      gradient: "from-blue-500 to-cyan-500" },
  { id: "google-ads",        title: "Google Ads",              shortDesc: "Quảng cáo Google hiệu quả, ROI cao",        Icon: Megaphone, gradient: "from-green-500 to-emerald-500" },
  { id: "tiktok-ads",        title: "TikTok Ads",              shortDesc: "Quảng cáo TikTok sáng tạo, viral nhanh",   Icon: Smartphone,gradient: "from-purple-500 to-pink-500" },
  { id: "facebook-ads",      title: "Facebook Ads",            shortDesc: "Chạy ads Facebook chuyên nghiệp",          Icon: Target,    gradient: "from-blue-600 to-indigo-600" },
  { id: "branding",          title: "Branding",                shortDesc: "Xây dựng thương hiệu mạnh mẽ",             Icon: Palette,   gradient: "from-orange-500 to-red-500" },
  { id: "tu-dong-hoa",       title: "Tự động hóa Marketing",  shortDesc: "Tự động hóa quy trình marketing",          Icon: Zap,       gradient: "from-yellow-500 to-amber-500" },
];

const NAV_LINKS_BEFORE = [
  { href: "/", label: "Trang chủ" },
];

const NAV_LINKS_AFTER = [
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isMobileServOpen, setIsMobileServOpen] = useState(false);
  const setMobileServ = setIsMobileServOpen;
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isDropOpen, setIsDropOpen]       = useState(false);
  const dropTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(globalThis.scrollY > 20);
    globalThis.addEventListener("scroll", onScroll);
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropOpen(false);
  }, [pathname]);

  const openDrop  = () => {
    if (dropTimerRef.current) clearTimeout(dropTimerRef.current);
    setIsDropOpen(true);
  };
  const closeDrop = () => {
    dropTimerRef.current = setTimeout(() => setIsDropOpen(false), 120);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">

      {/* Top Info Bar */}
      <div className={`bg-topbar-dark text-white text-sm transition-all duration-500 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"}`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href={`tel:${siteData.contact.hotline.replaceAll(" ", "")}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4" />
                <span>{siteData.contact.hotline}</span>
              </a>
              <a href={`mailto:${siteData.contact.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{siteData.contact.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4" />
              <span>Hà Nội | 9am - 6pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`transition-all duration-500 ${isScrolled ? "bg-white/85 backdrop-blur-xl border-b border-white/30 shadow-[0_4px_24px_rgba(0,63,187,0.08)]" : "bg-nav-white border-b border-transparent"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/ccmartech-logo.png" alt={siteData.companyName} width={160} height={48} className="h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">

              {/* Trang chủ */}
              {NAV_LINKS_BEFORE.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${pathname === link.href ? "text-brand-blue" : "text-heading-dark hover:text-brand-blue"}`}
                >
                  {link.label}
                  {pathname === link.href && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />}
                </Link>
              ))}

              {/* Dịch vụ — hover dropdown */}
              <nav className="relative" aria-label="Dịch vụ" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                <button
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-2 cursor-default ${isDropOpen ? "text-brand-blue" : "text-heading-dark hover:text-brand-blue"}`}
                >
                  Dịch vụ
                  <motion.span animate={{ rotate: isDropOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                  {isDropOpen && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />}
                </button>

                <AnimatePresence>
                  {isDropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-145 bg-white rounded-2xl shadow-2xl shadow-brand-blue/10 border border-gray-100 overflow-hidden"
                      onMouseEnter={openDrop}
                      onMouseLeave={closeDrop}
                    >
                      {/* Arrow tip */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100" />

                      {/* Header strip */}
                      <div className="px-5 pt-5 pb-3 border-b border-gray-50">
                        <p className="text-xs font-mono uppercase tracking-widest text-brand-blue font-semibold">Dịch vụ & Giải pháp</p>
                        <p className="text-xs text-body-text mt-0.5">Giải pháp marketing toàn diện cho doanh nghiệp</p>
                      </div>

                      {/* Services grid */}
                      <div className="grid grid-cols-2 gap-px bg-gray-50 p-1">
                        {SERVICES.map((svc) => (
                          <Link
                            key={svc.id}
                            href={`/dich-vu/${svc.id}`}
                            className="group flex items-start gap-3 p-3.5 bg-white hover:bg-[#F8F9FF] rounded-xl transition-colors duration-200"
                          >
                            <div className={`shrink-0 w-9 h-9 rounded-lg bg-linear-to-br ${svc.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                              <svc.Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-heading-dark group-hover:text-brand-blue transition-colors leading-tight">{svc.title}</p>
                              <p className="text-xs text-body-text mt-0.5 leading-snug line-clamp-1">{svc.shortDesc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer CTA */}
                      <div className="px-5 py-3 bg-[#F8F9FF] flex items-center justify-between">
                        <p className="text-xs text-body-text">Không biết chọn dịch vụ nào?</p>
                        <Link
                          href="/lien-he"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:gap-2.5 transition-all duration-200"
                        >
                          Tư vấn miễn phí <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>

              {/* Other nav links */}
              {NAV_LINKS_AFTER.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${pathname === link.href ? "text-brand-blue" : "text-heading-dark hover:text-brand-blue"}`}
                >
                  {link.label}
                  {pathname === link.href && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link href="/lien-he" className="px-6 py-3 bg-cta-gradient text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                Liên hệ báo giá
              </Link>
            </div>

            {/* Mobile burger */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-heading-dark hover:text-brand-blue" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col">

              {/* Trang chủ */}
              <Link
                href="/"
                className={`py-3 font-medium transition-colors ${pathname === "/" ? "text-brand-blue" : "text-heading-dark hover:text-brand-blue"}`}
              >
                Trang chủ
              </Link>

              {/* Dịch vụ accordion */}
              <button
                onClick={() => setMobileServ(!isMobileServOpen)}
                className="flex items-center justify-between py-3 text-heading-dark hover:text-brand-blue transition-colors font-medium"
              >
                <span>Dịch vụ</span>
                <motion.span animate={{ rotate: isMobileServOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isMobileServOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-3 pb-2 flex flex-col gap-1 border-l-2 border-brand-blue/20 ml-1">
                      {SERVICES.map((svc) => (
                        <Link
                          key={svc.id}
                          href={`/dich-vu/${svc.id}`}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[#F8F9FF] transition-colors group"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${svc.gradient} flex items-center justify-center shrink-0`}>
                            <svc.Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm text-heading-dark group-hover:text-brand-blue transition-colors">{svc.title}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Other links */}
              {NAV_LINKS_AFTER.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 font-medium transition-colors ${pathname === link.href ? "text-brand-blue" : "text-heading-dark hover:text-brand-blue"}`}
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/lien-he" className="mt-3 px-6 py-3 bg-cta-gradient text-white rounded-lg text-center font-medium hover:shadow-lg transition-all">
                Liên hệ báo giá
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
