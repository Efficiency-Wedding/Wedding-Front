import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BlogHeader } from "@/components/blog/Header";
import { BlogList } from "@/components/blog/BlogList";
import { BlogPost } from "@/components/blog/BlogPost";
import { articles, type Article } from "@/components/blog/data";
import { Sidebar } from "@/components/blog/Sidebar";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Le blog de Maison Lumière — Inspirations mariage" },
      { name: "description", content: "Conseils, déco et témoignages pour organiser un mariage élégant et romantique." },
      { property: "og:title", content: "Le blog de Maison Lumière" },
      { property: "og:description", content: "Conseils, déco et témoignages pour organiser un mariage élégant et romantique." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [selected, setSelected] = useState<Article | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
  }, [search]);

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
      <main className="mx-auto max-w-7xl px-6 py-16">
        {selected ? (
          <BlogPost article={selected} onBack={handleBack} />
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            <BlogList articles={filtered} onOpen={handleOpen} />
            <Sidebar search={search} onSearchChange={setSearch} />
          </div>
        )}
      </main>
    </div>
  );
}
