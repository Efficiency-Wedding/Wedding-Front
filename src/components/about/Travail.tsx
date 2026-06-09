import { type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

interface Forfait {
  icon: ReactNode;
  title: string;
  subtitle: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  featured: boolean;
  color: string;
  badge?: string;
}

const C = {
  gold: "oklch(0.78 0.09 85)",
  rose: "oklch(0.72 0.09 15)",
  roseSoft: "oklch(0.94 0.025 15)",
  goldSoft: "oklch(0.95 0.035 85)",
  blue: "oklch(0.45 0.06 250)",
  blueSoft: "oklch(0.93 0.02 250)",
  ivory: "oklch(0.985 0.008 75)",
  muted: "oklch(0.45 0.03 260)",
  white: "#ffffff",
  border: "oklch(0.9 0.015 75)",
  shadowSoft: "0 20px 60px -20px rgba(60,80,130,0.18)",
  shadowFrame: "0 10px 40px -10px rgba(180,100,100,0.28)",
};

import {
  Check,
  Camera,
  Crown,
  Sparkles,
  MessageCircle,
  CalendarCheck,
  Image as ImageIcon,
  Heart,
} from "lucide-react";

const FORFAITS: Forfait[] = [
  {
    icon: <Camera size={28} />,

    title: "Essentiel",

    subtitle: "Pour les moments précieux",

    price: "450",

    unit: "€ / session",

    features: [
      "Séance photo de 2 heures",

      "30 photos retouchées en haute définition",

      "Galerie privée en ligne",

      "1 lieu au choix",

      "Livraison sous 14 jours",
    ],

    cta: "Choisir Essentiel",

    featured: false,

    color: "rose",
  },

  {
    icon: <Crown size={28} />,

    title: "Signature",

    subtitle: "Notre formule préférée",

    price: "890",

    unit: "€ / journée",

    features: [
      "Séance photo de 5 heures",

      "100 photos retouchées avec soin",

      "Album numérique élégant",

      "2 lieux au choix",

      "Tirage fine art offert",

      "Livraison prioritaire sous 10 jours",
    ],

    cta: "Choisir Signature",

    featured: true,

    color: "lavande",
  },

  {
    icon: <Sparkles size={28} />,

    title: "Prestige",

    subtitle: "L'expérience d'exception",

    price: "1 690",

    unit: "€ / événement complet",

    features: [
      "Couverture complète de la journée",

      "200+ photos retouchées et classées",

      "Album fine art relié main",

      "Lieux illimités",

      "Seconde photographe incluse",

      "Film souvenir de 3 minutes",

      "Conseils & repérage offerts",
    ],

    cta: "Choisir Prestige",

    featured: false,

    color: "gold",
  },
];

const STEPS = [
  {
    icon: <MessageCircle size={22} />,

    title: "Premier échange",

    text: "Une discussion chaleureuse pour comprendre votre vision, vos envies et vos attentes.",
  },

  {
    icon: <CalendarCheck size={22} />,

    title: "Réservation",

    text: "Choix de la formule, signature du devis et planification de votre séance sur-mesure.",
  },

  {
    icon: <Camera size={22} />,

    title: "Le jour J",

    text: "Une expérience douce, fluide et naturelle, guidée par mes conseils tout au long.",
  },

  {
    icon: <ImageIcon size={22} />,

    title: "Livraison",

    text: "Sélection raffinée d'images retouchées, livrées dans une galerie privée élégante.",
  },
];

export default function Travail() {
  const sectionMotion = {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  } as const;

  const getCardColor = (color: string) => {
    switch (color) {
      case "rose":
        return {
          bg: "bg-rose-soft/70",

          border: "border-rose/25",

          iconBg: "bg-rose-soft",

          iconColor: "text-rose",

          title: "text-rose",

          badge: "bg-rose",

          button: "bg-rose hover:bg-rose-light",

          accent: "#E8A0A0",
        };

      case "lavande":
        return {
          bg: "bg-violet-soft/70",

          border: "border-violet/25",

          iconBg: "bg-violet-soft",

          iconColor: "text-violet",

          title: "text-violet",

          badge: "bg-violet",

          button: "bg-violet hover:bg-violet-dark",

          accent: "#C8A8E8",
        };

      case "gold":
        return {
          bg: "bg-champagne-soft/80",

          border: "border-champagne/30",

          iconBg: "bg-champagne-soft",

          iconColor: "text-champagne",

          title: "text-champagne",

          badge: "bg-champagne",

          button: "bg-champagne hover:bg-rose",

          accent: "#F0B8A0",
        };

      default:
        return {
          bg: "bg-white",

          border: "border-gray-200",

          iconBg: "bg-gray-100",

          iconColor: "text-gray-500",

          title: "text-gray-700",

          badge: "bg-gray-500",

          button: "bg-gray-500 hover:bg-gray-600",

          accent: "#E8A0A0",
        };
    }
  };

  return (
    <div className="page-entrance min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* HERO */}

      <section
        className="relative text-center text-white py-[140px] px-6 md:px-12 hero-entrance"
        style={{
          background: `linear-gradient(color-mix(in oklab, var(--color-rose) 68%, transparent), color-mix(in oklab, var(--color-violet) 70%, transparent)), url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=80") center/cover no-repeat`,
        }}
      >
        <h1 className="font-serif text-champagne-soft text-[60px] font-light tracking-[10px] uppercase mb-5 md:text-[44px] md:tracking-[6px] sm:text-[30px] sm:tracking-[4px]">
          Travailler avec nous
        </h1>

        <p className="max-w-[640px] mx-auto text-sm leading-relaxed tracking-[1px] opacity-90">
          Chaque histoire mérite d'être racontée avec élégance. Découvrez nos
          formules pensées pour sublimer vos plus beaux instants, du quotidien
          intime aux célébrations d'exception.
        </p>

        <div className="flex items-center justify-center gap-4 mt-7 text-champagne-soft">
          <span className="w-[60px] h-px bg-champagne-soft" />

          <Heart size={14} />

          <span className="w-[60px] h-px bg-champagne-soft" />
        </div>
      </section>

      {/* INTRO */}

      <motion.section
        {...sectionMotion}
        className="section-entrance max-w-[880px] mx-auto text-center px-6 py-24 md:px-12"
      >
        <p className="font-script text-[44px] text-rose mb-2">
          Une collaboration unique
        </p>

        <h2 className="font-serif text-[38px] font-medium text-violet tracking-[4px] uppercase mt-4 mb-5 md:text-[26px] md:tracking-[3px]">
          Choisissez votre expérience
        </h2>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Que vous rêviez d'un portrait délicat, d'un reportage de mariage
          inoubliable ou d'un projet éditorial sur-mesure, nos forfaits
          s'adaptent à vos désirs avec la même exigence artistique et le même
          souci du détail.
        </p>
      </motion.section>

      {/* CARDS */}

      <motion.section
        {...sectionMotion}
        className="section-entrance max-w-[1200px] mx-auto px-6 py-10 md:px-12"
      >
        <h1 className="font-script text-[40px] text-rose mb-2 text-center">
          Plus populaire
        </h1>
        <div className="grid gap-8 md:grid-cols-3 max-w-[520px] mx-auto md:max-w-none section-entrance">
          {FORFAITS.map((f) => {
            const cardColors = getCardColor(f.color);

            return (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative ${cardColors.bg} border ${cardColors.border} p-[50px_32px_40px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] overflow-hidden rounded-2xl

                  ${f.featured ? "shadow-lg ring-2 ring-rose/30" : ""}`}
              >
                <div className="absolute inset-[8px] border border-[rgba(0,0,0,0.05)] pointer-events-none rounded-2xl"></div>

                {f.badge && (
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${cardColors.badge} text-white text-[10px] tracking-[3px] px-4 py-2 uppercase rounded-full`}
                  >
                    {f.badge}
                  </div>
                )}

                <div
                  className={`inline-flex w-16 h-16 items-center justify-center rounded-full ${cardColors.iconBg} ${cardColors.iconColor} mb-4 border border-[rgba(0,0,0,0.05)]`}
                >
                  {f.icon}
                </div>

                <h3
                  className={`font-serif text-[26px] font-semibold ${cardColors.title} mb-1 tracking-[2px]`}
                >
                  {f.title}
                </h3>

                <p className="font-script text-[22px] text-rose mb-5">
                  {f.subtitle}
                </p>

                <p className="font-serif text-[44px] text-foreground mb-1 sm:text-[36px]">
                  {f.price}

                  <br />

                  <small className="text-xs text-muted-foreground tracking-[2px]">
                    {f.unit}
                  </small>
                </p>

                <ul className="border-y border-[rgba(0,0,0,0.05)] py-6 my-5 text-left">
                  {f.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex gap-2 items-start py-2 text-sm text-foreground"
                    >
                      <Check
                        size={16}
                        className={`${cardColors.iconColor} shrink-0 mt-0.5`}
                      />

                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 text-[11px] tracking-[3px] font-semibold uppercase transition-all duration-200 text-white rounded-full ${cardColors.button}`}
                >
                  {f.cta}
                </button>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* PROCESS */}

      <section className="section-entrance bg-[#FFF0F0] text-center px-6 py-24 md:px-12">
        <h2 className="font-serif text-[36px] font-medium tracking-[5px] text-[#D47A7A] uppercase mb-16 md:text-[26px] md:tracking-[3px]">
          Notre Processus
        </h2>

        <div className="max-w-[1100px] mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="p-5 bg-white/50 rounded-2xl backdrop-blur-sm"
            >
              <div className="font-serif text-[60px] text-[#E8A0A0] leading-none mb-2">
                0{i + 1}
              </div>

              <div className="flex justify-center my-2 text-[#C8A8E8]">
                {s.icon}
              </div>

              <h4 className="text-sm font-bold tracking-[2px] text-[#A888D0] uppercase mb-2">
                {s.title}
              </h4>

              <p className="text-sm leading-relaxed text-[#8B6B6B]">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="text-center px-6 py-28 bg-gradient-to-r from-[#FFF8F8] to-[#F8F5FF] md:px-12">
        <p className="font-script text-[52px] text-[#E8A0A0] mb-2">
          Prêt à commencer ?
        </p>

        <h2 className="font-serif text-[40px] font-medium tracking-[4px] text-[#A888D0] uppercase mt-4 mb-5 md:text-[26px] md:tracking-[3px]">
          Travaillons Ensemble
        </h2>

        <p className="max-w-[580px] mx-auto text-sm leading-relaxed text-[#8B6B6B] mb-8">
          Contactez-nous pour discuter de votre projet. Chaque collaboration
          débute par une conversation, sans engagement, autour d'un café ou en
          visio.
        </p>

        <Link
          to="/reservation"
          className="button-glow inline-flex bg-gradient-to-r from-[#E8A0A0] to-[#C8A8E8] text-white px-8 py-3 text-[11px] tracking-[3px] font-semibold uppercase transition-all duration-200 hover:scale-105 rounded-full shadow-md"
        >
          Réserver
        </Link>
        <Link
          to="/"
          style={{
            display: "block",
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#A888D0",
            textDecoration: "none",
            transition: "color 0.2s",
            position: "relative",
            marginTop: "20px",
          }}
          onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) =>
            (e.currentTarget.style.color = C.gold)
          }
          onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) =>
            (e.currentTarget.style.color = "#A888D0")
          }
        >
          ← Retour à la page À Propos
        </Link>
      </section>
    </div>
  );
}
