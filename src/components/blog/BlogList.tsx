import type { Article } from "./data";

type Props = {
  articles: Article[];
  onOpen: (a: Article) => void;
};

export function BlogList({ articles, onOpen }: Props) {
  if (articles.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
        Aucun article ne correspond à votre recherche.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((a) => (
        <article
          key={a.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={a.image}
              alt={a.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
                {a.category}
              </span>
              <time>{a.date}</time>
            </div>
            <h2 className="mt-4 font-serif text-xl leading-snug text-foreground">
              {a.title}
            </h2>
            <p className="mt-3 flex-1 text-sm text-muted-foreground">
              {a.excerpt.length > 150
                ? a.excerpt.slice(0, 150) + "…"
                : a.excerpt}
            </p>
            <button
              onClick={() => onOpen(a)}
              className="mt-6 self-start border-b border-accent pb-1 text-sm font-medium uppercase tracking-widest text-foreground transition hover:text-primary"
            >
              Lire la suite →
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}