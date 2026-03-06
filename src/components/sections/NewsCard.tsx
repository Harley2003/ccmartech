"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { motion } from "motion/react";

const categoryColors: Record<string, string> = {
  "web-design": "bg-blue-100 text-blue-700",
  "marketing": "bg-green-100 text-green-700",
  "social-media": "bg-purple-100 text-purple-700",
  "seo": "bg-orange-100 text-orange-700",
  "branding": "bg-red-100 text-red-700",
};

interface NewsCardProps {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  date: string;
  category: string;
  categoryId: string;
  author: string;
  readTime?: string;
  featured?: boolean;
}

export default function NewsCard({
  title,
  excerpt,
  slug,
  image,
  date,
  category,
  categoryId,
  author,
  readTime,
  featured = false,
}: NewsCardProps) {
  const catColor = categoryColors[categoryId] ?? "bg-brand-blue/10 text-brand-blue";
  const initials = author
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <Link href={`/tin-tuc/${slug}`} className="block h-full">
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group h-full flex flex-col"
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? "h-72" : "h-52"} shrink-0`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Category badge */}
          <span
            className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${catColor} backdrop-blur-sm`}
          >
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col gap-3">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-body-text">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
            {readTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3
            className={`text-heading-dark font-bold group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug ${
              featured ? "text-2xl" : "text-lg"
            }`}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-body-text text-sm line-clamp-3 flex-1 leading-relaxed">{excerpt}</p>

          {/* Footer: author + read more */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-cta-gradient flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {initials || <User className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs text-body-text font-medium">{author}</span>
            </div>
            <div className="flex items-center gap-1 text-brand-blue text-sm font-medium group-hover:gap-2 transition-all duration-200">
              <span>Đọc thêm</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
