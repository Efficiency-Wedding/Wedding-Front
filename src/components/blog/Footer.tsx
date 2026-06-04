export function BlogFooter() {
  return (
    <>
      {/* Cinematic banner */}
      <section className="relative mt-24 h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2400&q=80"
          alt="Couple de mariés marchant dans un verger"
          className="absolute inset-0 h-full w-full object-cover"
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

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl italic text-primary">Efficiency</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Wedding planner & créatrice d'expériences sur-mesure.
              Paris · Provence · Worldwide.
            </p>
          </div>
          <div>
            <p className="font-serif text-[10px] uppercase tracking-[0.4em] text-foreground">
              Navigation
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Le Journal</a></li>
              <li><a href="#" className="hover:text-primary">Services</a></li>
              <li><a href="#" className="hover:text-primary">Portfolio</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-serif text-[10px] uppercase tracking-[0.4em] text-foreground">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>hello@efficiency.fr</li>
              <li>+33 1 23 45 67 89</li>
              <li>Antananarivo, Madagascar</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Efficiency — Tous droits réservés.</p>
            <nav className="flex gap-6">
              <a href="#" className="hover:text-primary">Mentions légales</a>
              <a href="#" className="hover:text-primary">Confidentialité</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}