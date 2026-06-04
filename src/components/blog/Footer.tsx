import mariage from "@/assets/images/blog/blog1.jpeg";

export function BlogFooter() {
  return (
    <>
      {/* Cinematic banner */}
      <section className="relative mt-24 h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={mariage}
          alt="Couple de mariés marchant dans un verger"
          className="absolute inset-0 h-full w-full object-cover blur-[1.5px]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="font-serif text-[10px] uppercase tracking-[0.6em] text-white/80">
            Efficiency · Wedding Studio
          </span>
          <div className="mt-5 flex items-center gap-4">
            <span className="h-px w-12 bg-white/60" />
            <span className="font-serif text-xs italic text-white/90">depuis 2018</span>
            <span className="h-px w-12 bg-white/60" />
          </div>
          <h2 className="mt-6 font-serif text-5xl font-light italic leading-tight md:text-7xl">
            Le mariage qui<br />vous ressemble
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">
            De la première inspiration au dernier slow, nous orchestrons chaque
            détail avec délicatesse et précision.
          </p>
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-3 border border-white/70 px-8 py-3 font-serif text-[11px] uppercase tracking-[0.4em] text-white transition-colors hover:bg-white hover:text-foreground"
          >
            Prendre rendez-vous
          </a>
        </div>
      </section>
    </>
  );
}