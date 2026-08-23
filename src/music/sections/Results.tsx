import { Eyebrow } from "../components/ui";

export const Results = () => {
  return (
    <section id="results" className="py-24 sm:py-32 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[var(--color-primary)]/5 rounded-full blur-[60px] lg:blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <Eyebrow>What the stack is built for</Eyebrow>
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-text)]">
            What should an artist expect from a full-stack site?
          </h2>
        </div>
        <p className="text-[var(--color-text-muted)] text-lg max-w-[70ch] mx-auto text-center leading-relaxed">
          A custom artist site, merch checkout, copyright record, and AEO markup so ChatGPT, Perplexity, and Google AI Overviews can cite the artist. Unsourced percentage lifts are omitted until a public case study exists.
        </p>
      </div>
    </section>
  );
};
