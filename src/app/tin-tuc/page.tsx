"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Calendar, Clock } from "lucide-react";
import NewsCard from "@/components/sections/NewsCard";
import newsData from "@/data/news.json";

export default function TinTucPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const featured = newsData.articles.find((a) => a.featured);

  const filteredArticles = useMemo(() => {
    return newsData.articles
      .filter((a) => !a.featured || activeCategory !== "all" || searchQuery !== "")
      .filter((article) => {
        const matchesSearch =
          searchQuery === "" ||
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          activeCategory === "all" || article.categoryId === activeCategory;
        return matchesSearch && matchesCategory;
      });
  }, [searchQuery, activeCategory]);

  // When filtering/searching, show all matching including featured
  const showFeaturedHero =
    activeCategory === "all" && searchQuery === "" && featured;

  const gridArticles = showFeaturedHero
    ? filteredArticles
    : newsData.articles.filter((article) => {
        const matchesSearch =
          searchQuery === "" ||
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          activeCategory === "all" || article.categoryId === activeCategory;
        return matchesSearch && matchesCategory;
      });

  return (
    <div className="overflow-hidden">
      {/* ─── Hero ─────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 60%, #003FBB 100%)",
        }}
      >
        {/* Decorative geometry */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-120 h-120 rounded-full border border-white/10" />
          <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-8 w-3 h-3 rounded-full bg-cyan-400/40 animate-pulse" />
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid-news" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-news)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-6 border border-white/20">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              {newsData.articles.length}+ bài viết chuyên sâu
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              Tin tức &
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-300">
                Kiến thức
              </span>
            </h1>
            <p className="text-gray-200 text-xl mb-10 leading-relaxed">
              {newsData.pageDescription}
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-xl bg-white text-heading-dark placeholder:text-gray-400 focus:ring-4 focus:ring-white/30 outline-none shadow-xl text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Filter Tabs ──────────────────────────── */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-none">
            {newsData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105"
                    : "bg-gray-50 text-body-text hover:bg-gray-100 hover:text-heading-dark"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Article ─────────────────────── */}
      <AnimatePresence>
        {showFeaturedHero && featured && (
          <motion.section
            key="featured"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white py-16"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-linear-to-r from-brand-blue/30 to-transparent" />
                <span className="text-sm font-semibold text-brand-blue uppercase tracking-widest">
                  Bài viết nổi bật
                </span>
                <div className="h-px flex-1 bg-linear-to-l from-brand-blue/30 to-transparent" />
              </div>

              <Link href={`/tin-tuc/${featured.slug}`} className="group block">
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                >
                  {/* Image */}
                    <div className="relative h-80 lg:h-auto min-h-90 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/10" />
                    <span className="absolute top-6 left-6 px-3 py-1.5 bg-white text-brand-blue text-xs font-bold rounded-full shadow">
                      {featured.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-white p-10 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-body-text mb-5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {featured.date}
                      </span>
                      {featured.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> {featured.readTime}
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-heading-dark mb-4 leading-tight group-hover:text-brand-blue transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-body-text leading-relaxed mb-8 line-clamp-3">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-cta-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {featured.author
                            .split(" ")
                            .map((w) => w[0])
                            .slice(-2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-heading-dark">{featured.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-blue font-semibold group-hover:gap-3 transition-all">
                        Đọc ngay <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── Articles Grid ────────────────────────── */}
      <section className="py-16 bg-page-bg">
        <div className="container mx-auto px-4">
          {!showFeaturedHero && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-sm text-body-text"
            >
              {gridArticles.length > 0
                ? `Tìm thấy ${gridArticles.length} bài viết`
                : ""}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {gridArticles.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xl font-semibold text-heading-dark mb-2">
                  Không tìm thấy bài viết
                </p>
                <p className="text-body-text">
                  Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {gridArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                  >
                    <NewsCard {...article} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Newsletter CTA ───────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full border border-white/10" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Đừng bỏ lỡ kiến thức mới
            </h2>
            <p className="text-gray-200 text-xl mb-10 leading-relaxed">
              Cập nhật xu hướng marketing, tips thực chiến và case study mới nhất — miễn phí mỗi tuần.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="flex-1 px-5 py-4 rounded-xl bg-white text-heading-dark placeholder:text-gray-400 outline-none text-sm shadow-lg"
              />
              <button className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer">
                Đăng ký ngay
              </button>
            </div>
            <p className="text-white/50 text-xs mt-4">Không spam. Hủy đăng ký bất kỳ lúc nào.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
