import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eyebrow } from "../components/ui";

const metrics = [
  { value: 317, suffix: "%", label: "Organic traffic increase after 90-day SEO campaign" },
  { value: 2.4, suffix: "x", label: "Average merch revenue lift in first 6 months" },
  { value: 48, suffix: " hrs", label: "Average time from brief to delivered website strategy" },
  { value: 100, suffix: "%", label: "Of artists who launched kept their retainer" },
];

const testimonials = [
  {
    quote: "I was embarrassed to send people to my old Shopify store. Now I send my website link in every DM and every venue inquiry. It books me shows.",
    author: "[Artist Name]",
    genre: "Hip-Hop / Atlanta",
    image: "https://picsum.photos/seed/artist1/200/200",
    large: true
  },
  {
    quote: "I had no idea what AEO even was. Six months in, a music blogger cited my bio in an article they got from an AI search result. My name is showing up places I never marketed to.",
    author: "[Artist Name]",
    genre: "Indie Pop / Chicago",
    image: "https://picsum.photos/seed/artist2/200/200",
    large: false
  },
  {
    quote: "The artist dashboard alone was worth it. For the first time I can see exactly where my fans are, what they're buying, and when to drop merch.",
    author: "[Artist Name]",
    genre: "R&B / Detroit",
    image: "https://picsum.photos/seed/artist3/200/200",
    large: false
  }
];

const AnimatedCounter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentVal = start + (value - start) * (1 - Math.pow(1 - progress, 3)); // easeOutCubic
        
        // Handle decimals
        setCount(Number.isInteger(value) ? Math.floor(currentVal) : Number(currentVal.toFixed(1)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}


export const Results = () => {
  return (
    <section id="results" className="py-24 sm:py-32 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[var(--color-primary)]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <Eyebrow>Don't Take Our Word For It</Eyebrow>
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)]">
            Artists who made <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-bold">the switch. Results they got.</span>
          </h2>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center sm:text-left border-l-2 border-[var(--color-primary)]/30 pl-6 py-2 relative"
            >
              <div className="absolute top-0 left-[-2px] w-[2px] h-1/3 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
              <h3 className="font-display font-medium text-[3rem] leading-none mb-3 text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-text)] to-[var(--color-primary)]">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-snug max-w-[200px] mx-auto sm:mx-0">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 bg-[var(--color-surface-dynamic)] backdrop-blur-xl border border-[var(--color-border)] rounded-3xl p-8 sm:p-12 pb-14 shadow-xl hover:bg-[var(--color-surface-dynamic)] transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-primary)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            <p className="font-display italic text-2xl sm:text-4xl text-[var(--color-text)] leading-tight mb-10 max-w-[900px] relative z-10">
              "{testimonials[0].quote}"
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <img src={testimonials[0].image} alt="Artist" className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 opacity-80 transition-all duration-500 border border-[var(--color-primary)]/30" />
              <div>
                <p className="text-[var(--color-text)] font-bold">{testimonials[0].author}</p>
                <p className="text-[var(--color-primary)] text-sm">{testimonials[0].genre}</p>
              </div>
            </div>
            <div className="absolute top-10 right-10 opacity-[0.05] pointer-events-none text-[var(--color-primary)]">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
          </motion.div>

          {testimonials.slice(1).map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 + (i * 0.2) }}
              className="bg-[var(--color-surface-dynamic)] backdrop-blur-xl border border-[var(--color-border)] rounded-3xl p-8 sm:p-10 shadow-lg hover:bg-[var(--color-surface-dynamic)] transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[var(--color-secondary)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--color-primary)]/10 transition-colors duration-700 pointer-events-none" />
              <p className="text-[var(--color-text)] text-lg leading-relaxed mb-8 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <img src={testimonial.image} alt="Artist" className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 opacity-80 transition-all duration-500 border border-[var(--color-primary)]/20" />
                <div>
                  <p className="text-[var(--color-text)] font-bold">{testimonial.author}</p>
                  <p className="text-[var(--color-primary)] text-sm">{testimonial.genre}</p>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};
