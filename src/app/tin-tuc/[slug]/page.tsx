"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";
import NewsCard from "@/components/sections/NewsCard";
import newsData from "@/data/news.json";

const categoryColors: Record<string, string> = {
  "web-design": "bg-blue-100 text-blue-700",
  marketing: "bg-green-100 text-green-700",
  "social-media": "bg-purple-100 text-purple-700",
  seo: "bg-orange-100 text-orange-700",
  branding: "bg-red-100 text-red-700",
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = newsData.articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold text-heading-dark mb-4">Bài viết không tồn tại</h1>
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-2 text-brand-blue hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại tin tức
        </Link>
      </div>
    );
  }

  const relatedArticles = newsData.articles
    .filter((a) => a.categoryId === article.categoryId && a.slug !== slug)
    .slice(0, 3);

  const moreRelated =
    relatedArticles.length < 3
      ? newsData.articles
          .filter((a) => a.slug !== slug && !relatedArticles.some((r) => r.id === a.id))
          .slice(0, 3 - relatedArticles.length)
      : [];

  const allRelated = [...relatedArticles, ...moreRelated].slice(0, 3);

  const catColor = categoryColors[article.categoryId] ?? "bg-brand-blue/10 text-brand-blue";
  const initials = article.author
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div className="overflow-hidden">
      {/* ─── Hero (full-bleed image with overlay) ─ */}
      <section className="relative h-[70vh] min-h-125 max-h-175 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20" />

        {/* Back link */}
        <div className="absolute top-28 left-0 right-0 container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại Tin tức
            </Link>
          </motion.div>
        </div>

        {/* Article meta overlay (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className={`inline-block px-3 py-1.5 text-xs font-bold rounded-full mb-4 ${catColor}`}>
              {article.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <span>{article.author}</span>
              </div>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {article.date}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Article Content ──────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {article.content.map((block, idx) => {
                const key = `${block.type}-${idx}`;
                if (block.type === "lead") {
                  return (
                    <p key={key} className="text-xl text-heading-dark leading-relaxed font-medium border-l-4 border-brand-blue pl-5">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "heading") {
                  return (
                    <h2 key={key} className="text-2xl md:text-3xl font-bold text-heading-dark mt-10 mb-2">
                      {block.text}
                    </h2>
                  );
                }
                return (
                  <p key={key} className="text-body-text leading-relaxed text-lg">
                    {block.text}
                  </p>
                );
              })}
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-gray-100"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-body-text shrink-0" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-page-bg rounded-full text-sm text-body-text font-medium hover:bg-brand-blue hover:text-white transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-7 bg-page-bg rounded-2xl border border-gray-100 flex items-start gap-5"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md" style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}>
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs text-body-text mb-1">Tác giả</div>
                <h3 className="text-lg font-bold text-heading-dark mb-1">{article.author}</h3>
                <p className="text-body-text text-sm leading-relaxed">
                  Chuyên gia {article.category} tại CCMARTECH với nhiều năm kinh nghiệm thực chiến trong lĩnh vực digital marketing và tư vấn chiến lược cho doanh nghiệp.
                </p>
              </div>
            </motion.div>

            {/* Inline CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-8 rounded-2xl text-white text-center"
              style={{ background: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)" }}
            >
              <h3 className="text-2xl font-bold mb-2">Bạn muốn áp dụng cho doanh nghiệp?</h3>
              <p className="text-gray-200 mb-6 text-sm">
                Đội ngũ CCMARTECH sẵn sàng tư vấn miễn phí giải pháp phù hợp nhất cho bạn.
              </p>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-brand-blue rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all hover:scale-105"
              >
                Liên hệ tư vấn ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Related Articles ─────────────────────── */}
      {allRelated.length > 0 && (
        <section className="py-16 bg-page-bg">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
            >
              <div>
                <h2 className="text-3xl font-bold text-heading-dark mb-1">Bài viết liên quan</h2>
                <p className="text-body-text">Khám phá thêm nội dung hữu ích từ CCMARTECH</p>
              </div>
              <Link
                href="/tin-tuc"
                className="inline-flex items-center gap-2 text-brand-blue font-medium hover:gap-3 transition-all"
              >
                Xem tất cả bài viết <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allRelated.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <NewsCard {...post} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

