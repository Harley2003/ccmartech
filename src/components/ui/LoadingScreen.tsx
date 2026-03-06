"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
          className="fixed inset-0 z-9999 flex items-center justify-center select-none bg-white"
        >
          {/* GIF logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
            className="relative z-10 flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/loading-ccmartech.gif"
              alt="Đang tải CCMARTECH…"
              width={420}
              height={420}
              className="object-contain mix-blend-multiply w-[420px] max-w-[80vw]"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
