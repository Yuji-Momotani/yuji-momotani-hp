export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 text-white sm:px-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 84% 18%, rgba(255,255,255,0.28) 0 4px, transparent 5px), radial-gradient(circle at 16% 82%, rgba(255,255,255,0.22) 0 3px, transparent 4px), linear-gradient(135deg, #ff4f88 0%, #e72f71 46%, #be1456 100%)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-bold leading-none text-white/10"
        style={{
          right: "-0.09em",
          bottom: "-0.34em",
          fontSize: "clamp(20rem, 60vw, 45rem)",
        }}
      >
        桃
      </span>

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-8 flex size-16 flex-col items-center justify-center rounded-full border border-white/70 font-sans text-base font-bold leading-none sm:size-20 sm:text-lg">
          <span>Y</span>
          <span className="-mt-0.5">M</span>
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
          Freelance Engineer
        </p>
        <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          桃谷優寿
        </h1>
        <p className="mt-3 text-base text-white/90 sm:text-xl">
          Yuji Momotani
        </p>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
          Designing calm, reliable web systems.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-accent shadow-lg shadow-black/10 transition-opacity hover:opacity-90"
          >
            お仕事のご相談
          </a>
          <a
            href="#services"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/60 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            解決できる課題を見る
          </a>
        </div>
      </div>
    </section>
  );
}
