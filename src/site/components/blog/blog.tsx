import { useEffect, useMemo, useState } from "react";
import { BlogHeader } from "@/site/components/blog/Header";
import { BlogList } from "@/site/components/blog/BlogList";
import { BlogPost } from "@/site/components/blog/BlogPost";
import { articles as fallbackArticles, type Article } from "@/site/components/blog/data";
import { Sidebar } from "@/site/components/blog/Sidebar";
import { BlogFooter } from "@/site/components/blog/Footer";
import { api, assetUrl } from "@/shared/api";
import type { Article as ApiArticle } from "@/shared/api";

function toBlogArticle(article: ApiArticle): Article {
  const content = article.contenu || "";
  const fallbackImage = fallbackArticles[0]?.image ?? "";
  const date = article.date_publication || article.created_at || "";

  return {
    id: article.id,
    title: article.titre,
    excerpt: content.length > 170 ? `${content.slice(0, 170)}...` : content,
    content,
    date: date ? new Date(date.replace(" ", "T")).toLocaleDateString("fr-FR") : "",
    category: "Blog",
    image: assetUrl(article.image_url || article.image) || fallbackImage,
    gallery: [assetUrl(article.image_url || article.image) || fallbackImage],
  };
}

export function BlogPage() {
  const [selected, setSelected] = useState<Article | null>(null);
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    api
      .getArticles()
      .then((data) => {
        if (!ignore && data.length > 0) {
          setArticles(data.map(toBlogArticle));
        }
      })
      .catch((error) => {
        console.warn("Articles API indisponibles, fallback statique utilisé.", error);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
  }, [search, articles]);

  const handleOpen = (a: Article) => {
    setSelected(a);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {!selected && <BlogHeader />}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        {selected ? (
          <BlogPost article={selected} onBack={handleBack} />
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <BlogList articles={filtered} onOpen={handleOpen} />
            <Sidebar search={search} onSearchChange={setSearch} loading={loading} />
          </div>
        )}
      </main>
      {!selected && <BlogFooter />}
    </div>
  );
}
