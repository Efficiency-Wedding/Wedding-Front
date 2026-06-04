import { ArrowLeft } from "lucide-react";
import type { Article } from "./data";

type Props = {
  article: Article;
  onBack: () => void;
};

export function BlogPost({ article, onBack }: Props) {
  return (
    <article className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au blog
      </button>

      <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
          {article.category}
        </span>
        <time>{article.date}</time>
      </div>

      <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
        {article.title}
      </h1>

      <div className="mt-8 overflow-hidden rounded-2xl">
        <img
          src={article.image}
          alt={article.title}
          className="h-[420px] w-full object-cover"
        />
      </div>

      <div className="prose prose-lg mt-10 max-w-none font-light text-foreground">
        <p className="text-lg italic text-muted-foreground">{article.excerpt}</p>
        <p className="mt-6 leading-relaxed">{article.content}</p>
        <p className="mt-6 leading-relaxed">
          Chaque mariage est une histoire unique, tissée de détails, de regards
          et de souvenirs. Notre rôle est de vous accompagner pour faire
          émerger ce qui vous est propre, et le sublimer avec délicatesse.
          Prenez le temps de la réflexion, entourez-vous de prestataires de
          confiance et savourez chaque étape : la préparation fait partie de
          la magie.
        </p>
      </div>

      <button
        onClick={onBack}
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au blog
      </button>
    </article>
  );
}