import { Eyebrow } from "../components/ui";
import { CrawlerSafeCounter } from "../../components/seo/CrawlerSafeCounter";

const metrics = [
  { value: 317, suffix: "%", label: "Organic traffic increase after 90-day SEO campaign" },
  { value: 2.4, suffix: "x", label: "Average merch revenue lift in first 6 months" },
  { value: 48, suffix: " hrs", label: "Average time from brief to delivered website strategy" },
  { value: 100, suffix: "%", label: "Of artists who launched kept their retainer" },
];

export const Results = () => {
  return (
    <section id="results" className="py-24 sm:py-32 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[var(--color-primary)]/5 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <Eyebrow>Don't Take Our Word For It</Eyebrow>
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)]">
            What should an artist expect from a full-stack site?
          </h2>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="text-center sm:text-left border-l-2 border-[var(--color-primary)]/30 pl-6 py-2 relative"
            >
              <div className="absolute top-0 left-[-2px] w-[2px] h-1/3 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
              <p className="font-display font-medium text-[3rem] leading-none mb-3 text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-text)] to-[var(--color-primary)]">
                <CrawlerSafeCounter target={m.value} suffix={m.suffix} />
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-snug max-w-[200px] mx-auto sm:mx-0">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
