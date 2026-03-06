"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PARTNERS, type Partner } from "@/data/partners";

const ROW1 = PARTNERS.slice(0, 24);          // 24 logos — top row LTR
const ROW2 = PARTNERS.slice(24).reverse();   // 23 logos — bottom row RTL

/* Logo — no frame, uniform size, full color */
function LogoPill({ name, logo }: Partner) {
  return (
    <div className="shrink-0 mx-8 inline-flex items-center justify-center w-31 h-20.5">
      <Image
        src={logo}
        alt={name}
        width={124}
        height={82}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="py-20 bg-[#F8F8F9] overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-brand-blue text-sm font-semibold uppercase tracking-widest block mb-3">
            Đối tác &amp; Khách hàng
          </span>
          <h2
            className="font-black text-heading-dark leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
          >
            Tin tưởng bởi các thương hiệu hàng đầu
          </h2>
        </motion.div>
      </div>

      {/* ── Row 1: slides LEFT → ── */}
      <div className="relative partners-track">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#F8F8F9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#F8F8F9] to-transparent z-10 pointer-events-none" />
        <div className="overflow-hidden py-2 flex">
          <div className="animate-partners-ltr flex shrink-0 items-center">
            {ROW1.map((p) => (
              <LogoPill key={`r1a-${p.name}`} name={p.name} logo={p.logo} />
            ))}
          </div>
          <div className="animate-partners-ltr flex shrink-0 items-center" aria-hidden="true">
            {ROW1.map((p) => (
              <LogoPill key={`r1b-${p.name}`} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: slides ← (slower, reversed order) ── */}
      <div className="relative mt-4 partners-track">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#F8F8F9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#F8F8F9] to-transparent z-10 pointer-events-none" />
        <div className="overflow-hidden py-2 flex">
          <div className="animate-partners-rtl flex shrink-0 items-center">
            {ROW2.map((p) => (
              <LogoPill key={`r2a-${p.name}`} name={p.name} logo={p.logo} />
            ))}
          </div>
          <div className="animate-partners-rtl flex shrink-0 items-center" aria-hidden="true">
            {ROW2.map((p) => (
              <LogoPill key={`r2b-${p.name}`} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
