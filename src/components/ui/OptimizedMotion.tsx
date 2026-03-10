"use client";

import { motion, MotionProps } from "motion/react";
import { useIsMobile, useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ReactNode } from "react";

interface OptimizedMotionProps {
  children: ReactNode;
  className?: string;
  skipOnMobile?: boolean;
  animate?: MotionProps["animate"];
  initial?: MotionProps["initial"];
  whileInView?: MotionProps["whileInView"];
  whileHover?: MotionProps["whileHover"];
  transition?: MotionProps["transition"];
  viewport?: MotionProps["viewport"];
  style?: React.CSSProperties;
}

/**
 * Optimized motion component that disables heavy animations on mobile
 * Use skipOnMobile=true for expensive animations like continuous loops
 */
export function OptimizedMotion({
  children,
  skipOnMobile = false,
  animate,
  initial,
  whileInView,
  whileHover,
  transition,
  viewport,
  className,
  style,
}: OptimizedMotionProps) {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  // Disable animations if user prefers reduced motion
  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  // Skip expensive animations on mobile
  if (skipOnMobile && isMobile) {
    return <div className={className} style={style}>{children}</div>;
  }

  // Simplify animations on mobile
  const mobileOptimizedTransition = isMobile
    ? { ...transition, duration: (transition?.duration as number) / 2 || 0.3 }
    : transition;

  return (
    <motion.div
      className={className}
      style={style}
      animate={animate}
      initial={initial}
      whileInView={whileInView}
      whileHover={isMobile ? undefined : whileHover}
      transition={mobileOptimizedTransition}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}
