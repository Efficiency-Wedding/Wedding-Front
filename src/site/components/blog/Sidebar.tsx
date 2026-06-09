import { useState } from "react";
import { articles, categories } from "./data";
import { Search } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  loading?: boolean;
};

const socialLinks = [
  { Icon: FaFacebookF, href: "https://www.facebook.com" },
  { Icon: FaInstagram, href: "https://www.instagram.com" },
  { Icon: FaTwitter, href: "https://x.com" },
];

export function Sidebar({ search, onSearchChange }: Props) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const counts = categories.map((c) => ({
    name: c,
    count: articles.filter((a) => a.category === c).length,
  }));

  return (
    <aside className="space-y-8">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="font-serif text-xl text-foreground">Rechercher</h3>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Un mot-clé..."
            className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            aria-label="Rechercher"
            className="rounded-full bg-primary px-4 text-primary-foreground transition hover:opacity-90"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-serif text-xl text-foreground">Catégories</h3>
        <ul className="mt-4 space-y-2">
          {counts.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between border-b border-border/60 pb-2 text-sm text-foreground"
            >
              <span>{c.name}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                {c.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-primary/95 p-6 text-primary-foreground shadow-sm">
        <h3 className="font-serif text-xl">Newsletter</h3>
        <p className="mt-2 text-sm opacity-90">
          Recevez nos inspirations directement dans votre boîte mail.
        </p>
        {subscribed ? (
          <p className="mt-4 rounded-lg bg-primary-foreground/10 p-3 text-sm">
            Merci ! Vous êtes inscrit·e.
          </p>
        ) : (
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-sm placeholder:text-primary-foreground/60 outline-none focus:border-primary-foreground"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
            >
              S'inscrire
            </button>
          </form>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-serif text-xl text-foreground">Suivez-nous</h3>
        <div className="mt-4 flex gap-3">
          {socialLinks.map(({ Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
