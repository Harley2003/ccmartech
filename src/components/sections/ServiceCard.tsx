"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Code, Megaphone, Target, Smartphone, Palette, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Megaphone,
  Target,
  Smartphone,
  Palette,
  Zap,
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  gradient: string;
  features?: string[];
}

export default function ServiceCard({
  icon,
  title,
  description,
  link,
  gradient,
  features = [],
}: ServiceCardProps) {
  const Icon = iconMap[icon] || Code;

  return (
    <Link href={link} className="block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden group border border-gray-100"
      >
        {/* Gradient top accent bar */}
        <div className={`h-1 bg-linear-to-r ${gradient} w-full`} />

        {/* Abstract orb glow — appears on hover */}
        <motion.div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "radial-gradient(circle, #003FBB22 0%, transparent 70%)", filter: "blur(24px)" }}
        />

        {/* Animated corner bracket on hover */}
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-brand-blue/0 group-hover:border-brand-blue/30 transition-all duration-300 rounded-tr-sm" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-brand-blue/0 group-hover:border-brand-blue/30 transition-all duration-300 rounded-bl-sm" />

        <div className="p-8 flex flex-col flex-1">
          {/* Icon */}
          <div
            className={`w-14 h-14 bg-linear-to-br ${gradient} rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          {/* Title + desc */}
          <h3 className="text-xl font-bold text-heading-dark mb-2 group-hover:text-brand-blue transition-colors duration-200">
            {title}
          </h3>
          <p className="text-body-text text-sm leading-relaxed mb-5">{description}</p>

          {/* Feature pills */}
          {features.length > 0 && (
            <ul className="space-y-2 mb-6 flex-1">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-body-text">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* CTA link */}
          <div className="flex items-center gap-2 text-brand-blue font-medium text-sm mt-auto pt-4 border-t border-gray-100 group-hover:gap-3 transition-all duration-200">
            <span>Tìm hiểu thêm</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
