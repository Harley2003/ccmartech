"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide once window fully loaded OR after 2.2 s max
    const hide = () => {
      setTimeout(() => setVisible(false), 300); // small buffer after load
    };

    if (document.readyState === "complete") {
      setTimeout(() => setVisible(false), 1900);
    } else {
      globalThis.addEventListener("load", hide, { once: true });
      const fallback = setTimeout(() => setVisible(false), 3500);
      return () => {
        globalThis.removeEventListener("load", hide);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ccm-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center select-none bg-white overflow-hidden"
          style={{
            minHeight: "100vh",
            minHeight: "100dvh", // Dynamic viewport height for mobile
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          {/* Full background overlay to ensure coverage */}
          <div className="absolute inset-0 bg-white -z-10" />
          
          {/* GIF logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
            className="relative z-10 flex items-center justify-center px-4"
          >
            <Image
              src="/loading-ccmartech.gif"
              alt="Đang tải CCMARTECH…"
              width={420}
              height={420}
              className="object-contain w-[420px] max-w-[80vw] h-auto brightness-105 contrast-[1.08]"
              draggable={false}
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
