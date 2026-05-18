import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    requestAnimationFrame(animate);
  }, [onComplete]);

  const bars = 24;

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[var(--color-bg)] flex flex-col items-center justify-center gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-end gap-[3px] h-16 px-4"
      >
        {Array.from({ length: bars }).map((_, i) => {
          const barProgress = Math.max(0, Math.min(1, (progress - (i / bars) * 60) / 40));
          const maxHeight = 20 + Math.sin((i / bars) * Math.PI) * 44;
          const height = barProgress * maxHeight;

          return (
            <motion.div
              key={i}
              className="w-[3px] sm:w-1 rounded-full origin-bottom"
              style={{
                height: `${height}px`,
                background: `linear-gradient(to top, var(--color-primary), var(--color-secondary))`,
                opacity: 0.4 + barProgress * 0.6,
                boxShadow: barProgress > 0.5
                  ? `0 0 ${8 * barProgress}px rgba(255, 42, 95, ${barProgress * 0.5})`
                  : "none",
              }}
              animate={{
                scaleY: barProgress > 0.9 ? [1, 1.15, 0.9, 1.05, 1] : 1,
              }}
              transition={{
                duration: 0.8,
                repeat: barProgress > 0.9 ? Infinity : 0,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      <div className="flex flex-col items-center gap-3">
        <div className="w-48 h-[2px] bg-[var(--color-surface-dynamic)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-text-muted)] font-semibold"
        >
          Loading your stage
        </motion.p>
      </div>
    </motion.div>
  );
};
