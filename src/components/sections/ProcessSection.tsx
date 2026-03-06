"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  MessageSquare,
  ClipboardList,
  Inbox,
  Cpu,
  CheckSquare,
  PackageCheck,
} from "lucide-react";
import homeData from "@/data/home.json";

const STEP_ICONS = [MessageSquare, ClipboardList, Inbox, Cpu, CheckSquare, PackageCheck];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const steps = homeData.processSteps;

  return (
    <section className="py-24 bg-[#F1F2F4] relative overflow-hidden">
      {/* Decorative cross grid */}
      <div className="absolute inset-0 cross-bg-light opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-brand-blue text-sm font-semibold uppercase tracking-widest block mb-4">
            Quy trình làm việc
          </span>
          <h2
            className="font-black text-heading-dark leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            6 bước đến thành công
          </h2>
          <p className="text-body-text text-[15px] leading-relaxed">
            Quy trình chuyên nghiệp, minh bạch từ tư vấn đến bàn giao và hỗ trợ lâu dài.
          </p>
        </motion.div>

        {/* Steps wrapper */}
        <div ref={sectionRef} className="relative">

          {/* ── Glowing connector line (desktop only) ──
              A track div (gray) + animated fill div (brand blue with glow).
              The fill width animates from 0 → 100% when section enters viewport. */}
          <div className="hidden lg:block absolute top-10 left-[8.33%] right-[8.33%] h-px bg-gray-200 z-0">
            <motion.div
              className="h-full bg-brand-blue origin-left"
              style={{
                boxShadow: "0 0 8px 2px #003FBB, 0 0 20px 4px rgba(0,63,187,0.4)",
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 2.4, delay: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-3 relative z-10">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const delay = 0.4 + i * 0.25; // stagger each step node lighting up

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step node — glows as the line passes it */}
                  <motion.div
                    initial={{ scale: 0.7, borderColor: "#E5E7EB", backgroundColor: "#ffffff" }}
                    animate={
                      isInView
                        ? {
                            scale: 1,
                            borderColor: "#003FBB",
                            backgroundColor: "#003FBB",
                          }
                        : {}
                    }
                    transition={{ duration: 0.5, delay }}
                    className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center mb-5 relative shadow-sm"
                    style={{
                      // Conditional glow applied via inline style during animation
                    }}
                  >
                    {/* Glow ring — fades in with delay */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: [0, 0.6, 0] } : {}}
                      transition={{ duration: 1.2, delay: delay + 0.1, repeat: 2, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-2xl border-2 border-brand-blue"
                      style={{ boxShadow: "0 0 16px 4px rgba(0,63,187,0.5)" }}
                    />
                    <motion.div
                      initial={{ color: "#9CA3AF" }}
                      animate={isInView ? { color: "#ffffff" } : {}}
                      transition={{ duration: 0.4, delay }}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                  </motion.div>

                  {/* Step number */}
                  <span className="text-[11px] font-bold text-brand-blue/50 uppercase tracking-widest mb-1">
                    Bước {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-heading-dark text-sm mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body-text text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Vertical glowing line for mobile/tablet ── */}
          <div className="lg:hidden absolute left-6 top-10 bottom-10 w-px bg-gray-200 z-0 ml-[-1.5rem] sm:hidden">
            <motion.div
              className="w-full bg-brand-blue origin-top"
              style={{ boxShadow: "2px 0 8px 2px rgba(0,63,187,0.4)" }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2.4, delay: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
