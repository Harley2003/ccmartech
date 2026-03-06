"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import newsData from "@/data/news.json";

const catColors: Record<string, string> = {
  "web-design": "bg-blue-100 text-blue-700",
  marketing: "bg-green-100 text-green-700",
  "social-media": "bg-purple-100 text-purple-700",
  seo: "bg-orange-100 text-orange-700",
  branding: "bg-red-100 text-red-700",
};

export default function NewsBentoSection() {
  const [hero, a2, a3, a4] = newsData.articles.slice(0, 4);

  return (
    <section className="py-24 bg-[#F1F2F4] relative overflow-hidden">
      <div className="absolute inset-0 cross-bg-light opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-[#003FBB] text-sm font-semibold uppercase tracking-widest block mb-3">
            Tin tức &amp; Blog
          </span>
          <h2
            className="font-black text-[#444547] leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Kiến thức &amp; Xu hướng
          </h2>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[260px] gap-3.5">

          {/* ── Hero card: 2col × 2row ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group min-h-85"
          >
            <Link href={`/tin-tuc/${hero.slug}`} className="block h-full">
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Deep gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#001234]/92 via-[#001234]/35 to-transparent" />

              {/* Top badge row */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span
                  className={`px-3 py-1 text-[11px] font-semibold rounded-full backdrop-blur-sm ${catColors[hero.categoryId] ?? "bg-white/20 text-white"}`}
                >
                  {hero.category}
                </span>
                {hero.readTime && (
                  <span className="flex items-center gap-1.5 text-white/60 text-[11px] bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {hero.readTime}
                  </span>
                )}
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h3 className="font-black text-white text-xl lg:text-2xl leading-snug mb-2 line-clamp-2">
                  {hero.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed line-clamp-2 mb-5 max-w-lg">
                  {hero.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {hero.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 group-hover:bg-white/25 transition-colors backdrop-blur-sm px-4 py-2 rounded-full">
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── Card 2: 1×1 ── */}
          {a2 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <Link href={`/tin-tuc/${a2.slug}`} className="flex flex-col h-full">
                <div className="relative h-36 overflow-hidden shrink-0">
                  <Image
                    src={a2.image}
                    alt={a2.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${catColors[a2.categoryId] ?? "bg-[#003FBB]/10 text-[#003FBB]"}`}
                  >
                    {a2.category}
                  </span>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between gap-2">
                  <h3 className="font-bold text-[#444547] text-sm leading-snug line-clamp-2">
                    {a2.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-[#676767]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {a2.date}
                    </span>
                    {a2.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {a2.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── Card 3: 1×1 ── */}
          {a3 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <Link href={`/tin-tuc/${a3.slug}`} className="flex flex-col h-full">
                <div className="relative h-36 overflow-hidden shrink-0">
                  <Image
                    src={a3.image}
                    alt={a3.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${catColors[a3.categoryId] ?? "bg-[#003FBB]/10 text-[#003FBB]"}`}
                  >
                    {a3.category}
                  </span>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between gap-2">
                  <h3 className="font-bold text-[#444547] text-sm leading-snug line-clamp-2">
                    {a3.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-[#676767]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {a3.date}
                    </span>
                    {a3.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {a3.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── Card 4: 2col × 1row — horizontal ── */}
          {a4 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 group min-h-45"
            >
              <Link href={`/tin-tuc/${a4.slug}`} className="flex flex-col md:flex-row h-full">
                {/* Image */}
                <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden shrink-0 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
                  <Image
                    src={a4.image}
                    alt={a4.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Text */}
                <div className="flex-1 p-6 flex flex-col justify-center gap-2.5">
                  <span
                    className={`self-start px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${catColors[a4.categoryId] ?? "bg-[#003FBB]/10 text-[#003FBB]"}`}
                  >
                    {a4.category}
                  </span>
                  <h3 className="font-bold text-[#444547] text-base leading-snug line-clamp-2">
                    {a4.title}
                  </h3>
                  <p className="text-[#676767] text-sm leading-relaxed line-clamp-2">
                    {a4.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#676767]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {a4.date}
                    </span>
                    {a4.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {a4.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── View All CTA tile: 1×1 ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-3xl overflow-hidden min-h-45"
            style={{
              background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)"
            }}
          >
            <Link
              href="/tin-tuc"
              className="relative flex flex-col justify-between h-full p-7 group"
            >
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/25" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/25" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/25" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/25" />

              <div>
                <span className="text-white/55 text-[10px] font-semibold uppercase tracking-widest">
                  Tin tức &amp; Blog
                </span>
                <h3 className="font-black text-white text-xl mt-2 leading-snug">
                  Xem tất cả
                  <br />
                  bài viết
                </h3>
              </div>

              <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                Khám phá ngay
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
