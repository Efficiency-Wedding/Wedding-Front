import blog2 from "@/assets/images/blog/blog2.jpeg";
import blog7 from "@/assets/images/blog/blog (7).jpeg";

export function BlogHeader() {
  return (
    <header className="relative bg-[oklch(0.97_0.012_300)]">
      {/* Hero editorial — split layout inspired by wedding invitation */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-16 lg:grid-cols-2 lg:gap-20">
        {/* Left: text + small round portrait */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:tracking-[0.55em]">
            Le journal des mariés
          </span>

          <h1 className="mt-6 font-serif text-5xl font-light italic leading-[0.95] text-primary sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Inspirations
            <span className="mx-3 align-middle text-3xl not-italic text-accent md:text-4xl">&amp;</span>
            <br />
            Mariage
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <span className="h-px w-10 bg-accent/60" />
            <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:tracking-[0.5em]">
              Édition {new Date().getFullYear()}
            </span>
            <span className="h-px w-10 bg-accent/60" />
          </div>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Conseils d'organisatrice, témoignages de mariés et idées déco pour
            composer le mariage qui vous ressemble — délicat, sincère,
            inoubliable.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-accent/40 shadow-sm">
              <img
                src={blog2}
                alt="Détail de mariage"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start font-serif">
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Par</span>
              <span className="text-base italic text-primary">Maison Lumière</span>
            </div>
          </div>
        </div>

        {/* Right: framed photo */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-0 translate-x-4 translate-y-4 border border-accent/40" aria-hidden />
          <div className="relative overflow-hidden border border-border bg-card p-3 shadow-sm">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={blog7}
                alt="Couple de mariés élégant"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-categories */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-5 font-serif text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:px-6 sm:tracking-[0.5em]">
          <span>Déco</span><span className="text-accent">◆</span>
          <span>Lieux</span><span className="text-accent">◆</span>
          <span>Témoignages</span><span className="text-accent">◆</span>
          <span>Tendances</span>
        </div>
      </div>
    </header>
  );
}
