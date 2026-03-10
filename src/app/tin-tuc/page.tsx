"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import NewsCard from "@/components/sections/NewsCard";
import newsData from "@/data/news.json";

// Abstract floating shapes
const FloatingShape = ({ delay = 0, duration = 20, size = 200, opacity = 0.1 }: any) => (
  <motion.div
    className="absolute rounded-full blur-3xl"
    style={{
      width: size,
      height: size,
      background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
    }}
    animate={{
      x: ["-20%", "120%"],
      y: ["-20%", "100%", "-20%"],
      scale: [1, 1.5, 1],
      opacity: [opacity, opacity * 0.5, opacity],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

export default function TinTucPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const morphPath = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <div className="overflow-hidden bg-[#F1F2F4]">
      {/* ─── ABSTRACT ANIMATED HERO ─────────────────────────────────── */}
      <section className="relative pt-36 pb-32 overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 60%, #003FBB 100%)",
          }}
        />
        
        {/* Abstract floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingShape delay={0} duration={25} size={300} opacity={0.08} />
          <FloatingShape delay={5} duration={30} size={200} opacity={0.06} />
          <FloatingShape delay={10} duration={20} size={250} opacity={0.07} />
        </div>

        {/* Abstract morphing SVG paths */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="abstract-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q250,50 500,100 T1000,100"
            stroke="url(#abstract-gradient)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M0,100 Q250,50 500,100 T1000,100",
                "M0,80 Q250,120 500,80 T1000,80",
                "M0,100 Q250,50 500,100 T1000,100",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="20%"
            cy="30%"
            r="4"
            fill="#ffffff"
            opacity="0.6"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="80%"
            cy="60%"
            r="6"
            fill="#ffffff"
            opacity="0.4"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </svg>

        {/* Parallax geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-10 w-64 h-64 border-2 border-white/10 rounded-3xl rotate-12"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          animate={{ rotate: [12, 25, 12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-20 w-40 h-40 border-2 border-white/10 rounded-full"
          style={{
            x: mousePosition.x * -0.5,
            y: mousePosition.y * -0.5,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm mb-8 border border-white/30 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span className="font-mono">{newsData.articles.length}+ bài viết chuyên sâu</span>
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.95]"
              style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Tin tức &
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-white">
                  Kiến thức
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </span>
            </motion.h1>
            
            <motion.p
              className="text-white/80 text-xl mb-12 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {newsData.pageDescription}
            </motion.p>

            {/* Abstract animated search bar */}
            <motion.div
              className="relative max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-xl" />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative z-10 w-full pl-14 pr-6 py-5 rounded-2xl bg-white/95 backdrop-blur-md text-[#444547] placeholder:text-gray-400 focus:ring-4 focus:ring-cyan-300/50 outline-none shadow-2xl text-base font-medium transition-all"
                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABSTRACT FILTER TABS ──────────────────────────── */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-20 backdrop-blur-lg bg-white/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 py-5 overflow-x-auto scrollbar-none">
            {newsData.categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-3 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 overflow-hidden ${
                  activeCategory === cat.id
                    ? "text-white shadow-lg shadow-[#003FBB]/30"
                    : "bg-[#F8F8F9] text-[#676767] hover:bg-[#F1F2F4] hover:text-[#444547]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABSTRACT FEATURED ARTICLE ──────────────────────── */}
      <AnimatePresence>
        {showFeaturedHero && featured && (
          <motion.section
            key="featured"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="relative py-20 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #F1F2F4 0%, #E8EAEE 100%)",
            }}
          >
            {/* Abstract background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
              <motion.div
                className="absolute top-10 right-20 w-96 h-96 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0, 63, 187, 0.1) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-64 h-64 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0, 103, 161, 0.15) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-4 mb-10"
              >
                <motion.div
                  className="h-1 flex-1 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #003FBB 0%, transparent 100%)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
                <span
                  className="text-sm font-bold uppercase tracking-widest px-6 py-2 rounded-full border-2 border-[#003FBB] text-[#003FBB]"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  Featured Article
                </span>
                <motion.div
                  className="h-1 flex-1 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, #003FBB 100%)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.div>

              <Link href={`/tin-tuc/${featured.slug}`} className="group block">
                <motion.div
                  whileHover={{ scale: 1.01, y: -5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-white/50 backdrop-blur-sm bg-white/90"
                >
                  {/* Abstract overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                    <div
                      className="absolute top-0 right-0 w-1/2 h-1/2 blur-3xl"
                      style={{
                        background: "radial-gradient(circle, rgba(0, 103, 161, 0.1) 0%, transparent 70%)",
                      }}
                    />
                  </div>

                  {/* Image with abstract geometric overlay */}
                  <div className="relative h-96 lg:h-auto min-h-[500px] overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.3) 100%)",
                      }}
                    />
                    {/* Abstract geometric shapes */}
                    <motion.div
                      className="absolute top-10 right-10 w-20 h-20 border-4 border-white/40 rounded-2xl backdrop-blur-sm"
                      animate={{ rotate: [0, 90, 0] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="absolute top-8 left-8 px-4 py-2 bg-white text-[#003FBB] text-xs font-bold rounded-xl shadow-lg" style={{ fontFamily: "Space Mono, monospace" }}>
                      {featured.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative bg-white p-12 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-5 text-sm text-[#676767] mb-6" style={{ fontFamily: "Space Mono, monospace" }}>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {featured.date}
                      </span>
                      {featured.readTime && (
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {featured.readTime}
                        </span>
                      )}
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-[#444547] mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#1B3D80] group-hover:to-[#0067A1] transition-all duration-500">
                      {featured.title}
                    </h2>
                    <p className="text-[#676767] leading-relaxed mb-10 line-clamp-3 text-lg">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)",
                          }}
                        >
                          {featured.author
                            .split(" ")
                            .map((w) => w[0])
                            .slice(-2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-[#444547]">{featured.author}</span>
                      </div>
                      <motion.div
                        className="flex items-center gap-2 text-[#003FBB] font-bold"
                        whileHover={{ gap: "0.75rem" }}
                        transition={{ duration: 0.3 }}
                      >
                        Đọc ngay <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── BENTO GRID ARTICLES ────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        {/* Abstract background */}
        <div className="absolute inset-0 bg-[#F1F2F4]" />
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="abstract-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1" fill="#003FBB" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#abstract-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {!showFeaturedHero && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-sm text-[#676767] font-mono"
            >
              {gridArticles.length > 0
                ? `// Tìm thấy ${gridArticles.length} bài viết`
                : ""}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {gridArticles.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-32"
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-[#003FBB]/20"
                  style={{
                    background: "linear-gradient(135deg, #F8F8F9 0%, #E8EAEE 100%)",
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Search className="w-10 h-10 text-[#003FBB]/40" />
                </motion.div>
                <p className="text-2xl font-bold text-[#444547] mb-3">
                  Không tìm thấy bài viết
                </p>
                <p className="text-[#676767]">
                  Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[280px] gap-4"
              >
                {gridArticles.map((article, index) => {
                  // Bento Grid pattern: tạo layout không đối xứng
                  const bentoPatterns = [
                    "md:col-span-2 md:row-span-2", // Large square
                    "md:col-span-2 md:row-span-1", // Wide
                    "md:col-span-2 md:row-span-1", // Wide
                    "md:col-span-2 md:row-span-2", // Large square
                    "md:col-span-2 md:row-span-1", // Wide
                    "md:col-span-2 md:row-span-1", // Wide
                  ];
                  
                  const lgPatterns = [
                    "lg:col-span-4 lg:row-span-2", // Extra large
                    "lg:col-span-2 lg:row-span-1", // Small
                    "lg:col-span-2 lg:row-span-1", // Small
                    "lg:col-span-2 lg:row-span-2", // Tall
                    "lg:col-span-4 lg:row-span-1", // Wide
                    "lg:col-span-3 lg:row-span-2", // Medium
                    "lg:col-span-3 lg:row-span-1", // Medium
                  ];

                  const pattern = bentoPatterns[index % bentoPatterns.length];
                  const lgPattern = lgPatterns[index % lgPatterns.length];
                  const isLarge = pattern.includes("row-span-2");

                  return (
                    <motion.div
                      key={article.id}
                      className={`${pattern} ${lgPattern}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <Link href={`/tin-tuc/${article.slug}`} className="block h-full group">
                        <motion.article
                          whileHover={{ y: -8, scale: 1.02 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 group"
                        >
                          {/* Image */}
                          <div className="absolute inset-0">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Gradient overlay */}
                            <div
                              className="absolute inset-0"
                              style={{
                                background: isLarge
                                  ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
                                  : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            {/* Top: Category badge */}
                            <div className="flex items-start justify-between">
                              <span
                                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white/90 backdrop-blur-sm shadow-lg"
                                style={{
                                  color: "#003FBB",
                                  fontFamily: "Space Mono, monospace",
                                }}
                              >
                                {article.category}
                              </span>
                              {article.readTime && isLarge && (
                                <span className="flex items-center gap-1.5 text-white/70 text-xs bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                                  <Clock className="w-3 h-3" />
                                  {article.readTime}
                                </span>
                              )}
                            </div>

                            {/* Bottom: Title & meta */}
                            <div>
                              <h3
                                className={`font-black text-white leading-tight mb-3 ${
                                  isLarge ? "text-2xl lg:text-3xl line-clamp-3" : "text-lg line-clamp-2"
                                }`}
                                style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
                              >
                                {article.title}
                              </h3>
                              
                              {isLarge && (
                                <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-4">
                                  {article.excerpt}
                                </p>
                              )}

                              <div className="flex items-center justify-between">
                                <span
                                  className="flex items-center gap-1.5 text-white/60 text-xs"
                                  style={{ fontFamily: "Space Mono, monospace" }}
                                >
                                  <Calendar className="w-3.5 h-3.5" />
                                  {article.date}
                                </span>
                                <motion.div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <ArrowRight className="w-4 h-4 text-white" />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── ABSTRACT NEWSLETTER CTA ───────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 60%, #003FBB 100%)",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Abstract floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 left-20 w-96 h-96 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Abstract geometric shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-white/20 rounded-xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-12 h-12 border-2 border-white/20 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-8 border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-mono">Newsletter</span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Đừng bỏ lỡ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200">
                kiến thức mới
              </span>
            </motion.h2>
            
            <motion.p
              className="text-white/80 text-xl mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Cập nhật xu hướng marketing, tips thực chiến và case study mới nhất — miễn phí mỗi tuần.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
                <input
                  type="email"
                  placeholder="Email của bạn..."
                  className="relative w-full px-6 py-4 rounded-xl bg-white text-[#444547] placeholder:text-gray-400 outline-none text-base font-medium shadow-2xl"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/15 hover:bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-xl"
              >
                Đăng ký ngay
              </motion.button>
            </motion.div>
            
            <motion.p
              className="text-white/50 text-sm mt-6 font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              // Không spam. Hủy đăng ký bất kỳ lúc nào.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
