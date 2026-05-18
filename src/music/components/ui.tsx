import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import React, { useRef, ReactNode } from "react";
import { cn } from "../lib/utils";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }
>(({ className, variant = "primary", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-full";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] px-8 py-4 text-sm shadow-[0_0_20px_rgba(255,42,95,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] hover:-translate-y-1 relative overflow-hidden group",
    ghost: "text-[var(--color-text)] hover:text-[var(--color-primary)] px-6 py-4 text-sm tracking-widest font-bold rounded-full",
    outline: "border-2 border-[var(--color-divider)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] px-8 py-4 text-sm tracking-widest font-bold",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_1.5s_infinite]" />
      )}
      <span className="relative z-10 flex items-center justify-center">{props.children}</span>
    </button>
  );
});

export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={cn("inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 w-fit shadow-[0_0_15px_rgba(0,229,255,0.15)]", className)}
  >
    {children}
  </motion.div>
);

export const Headline = ({ children, className, as: Component = "h2" }: { children: ReactNode; className?: string; as?: any }) => (
  <Component className={cn("font-display font-bold leading-tight", className)}>
    {children}
  </Component>
);

export const RevealText = ({ children, delay = 0, className = "" }: { children: string; delay?: number, className?: string }) => {
  const words = children.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%", opacity: 0, rotateZ: 5 }}
            whileInView={{ y: 0, opacity: 1, rotateZ: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.05 }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
