import { type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Check, Camera, Crown, Sparkles,
  MessageCircle, CalendarCheck, Image as ImageIcon, Heart,
} from "lucide-react";

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
  gold:        "oklch(0.78 0.09 85)",
  rose:        "oklch(0.72 0.09 15)",
  roseSoft:    "oklch(0.94 0.025 15)",
  goldSoft:    "oklch(0.95 0.035 85)",
  blue:        "oklch(0.45 0.06 250)",
  ivory:       "oklch(0.985 0.008 75)",
  muted:       "oklch(0.45 0.03 260)",
  white:       "#ffffff",
};

const serif  = '"Cormorant Garamond", Georgia, serif';
const script = '"Great Vibes", cursive';
const sans   = '"Inter", system-ui, sans-serif';

const FORFAITS: Forfait[] = [
  {
    icon: <Camera size={28} />,
    title: "Essentiel",
    subtitle: "Pour les moments précieux",
    price: "450", unit: "€ / session",
    features: [
      "Séance photo de 2 heures",
      "30 photos retouchées en haute définition",
      "Galerie privée en ligne",
      "1 lieu au choix",
      "Livraison sous 14 jours",
    ],
    cta: "Choisir Essentiel", featured: false, color: "rose",
  },
  {
    icon: <Crown size={28} />,
    title: "Signature",
    subtitle: "Notre formule préférée",
    price: "890", unit: "€ / journée",
    features: [
      "Séance photo de 5 heures",
      "100 photos retouchées avec soin",
      "Album numérique élégant",
      "2 lieux au choix",
      "Tirage fine art offert",
      "Livraison prioritaire sous 10 jours",
    ],
    cta: "Choisir Signature", featured: true, color: "lavande",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Prestige",
    subtitle: "L'expérience d'exception",
    price: "1 690", unit: "€ / événement complet",
    features: [
      "Couverture complète de la journée",
      "200+ photos retouchées et classées",
      "Album fine art relié main",
      "Lieux illimités",
      "Seconde photographe incluse",
      "Film souvenir de 3 minutes",
      "Conseils & repérage offerts",
    ],
    cta: "Choisir Prestige", featured: false, color: "gold",
  },
];

const STEPS = [
  { icon: <MessageCircle size={22} />, title: "Premier échange",
    text: "Une discussion chaleureuse pour comprendre votre vision, vos envies et vos attentes." },
  { icon: <CalendarCheck size={22} />, title: "Réservation",
    text: "Choix de la formule, signature du devis et planification de votre séance sur-mesure." },
  { icon: <Camera size={22} />, title: "Le jour J",
    text: "Une expérience douce, fluide et naturelle, guidée par mes conseils tout au long." },
  { icon: <ImageIcon size={22} />, title: "Livraison",
    text: "Sélection raffinée d'images retouchées, livrées dans une galerie privée élégante." },
];

function cardColors(color: string) {
  switch (color) {
    case "rose":    return { bg:"#FFF8F8", border:"rgba(232,160,160,0.3)", iconBg:"#FFF0F0", iconColor:"#E8A0A0", title:"#D47A7A", btn:"#D47A7A", btnHover:"#C06868" };
    case "lavande": return { bg:"#F8F5FF", border:"rgba(200,168,232,0.3)", iconBg:"#F0EBFF", iconColor:"#C8A8E8", title:"#A888D0", btn:"#A888D0", btnHover:"#9370C8" };
    case "gold":    return { bg:"#FFFAF5", border:"rgba(240,184,160,0.3)", iconBg:"#FFF5F0", iconColor:"#F0B8A0", title:"#D49A7A", btn:"#D49A7A", btnHover:"#C08868" };
    default:        return { bg:"#fff",    border:"#eee",                  iconBg:"#f5f5f5", iconColor:"#999",    title:"#666",    btn:"#999",    btnHover:"#777" };
  }
}

export default function Travail() {
  return (
    <div className="page-entrance min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: "#FFF8F8", color: "#5A3A3A", fontFamily: sans }}>

      {/* ══════════════════════════════════════════════
          HERO — plein écran, texte centré
      ══════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white hero-entrance"
        style={{
          minHeight: "420px", padding: "7rem 2rem",
          background: `linear-gradient(rgba(212,122,122,0.65), rgba(168,136,208,0.65)),
                       url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=80") center/cover no-repeat`,
        }}
      >
        <h1 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, letterSpacing: "10px", textTransform: "uppercase", marginBottom: "1.25rem", color: "#F5C2C2" }}>
          Travailler avec nous
        </h1>
        <p style={{ maxWidth: "640px", fontSize: "0.875rem", lineHeight: 1.85, letterSpacing: "0.05em", opacity: 0.9 }}>
          Chaque histoire mérite d'être racontée avec élégance. Découvrez nos formules pensées pour sublimer vos plus beaux instants, du quotidien intime aux célébrations d'exception.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem", color: "#F5C2C2" }}>
          <span style={{ width: "60px", height: "1px", backgroundColor: "#F5C2C2" }} />
          <Heart size={14} />
          <span style={{ width: "60px", height: "1px", backgroundColor: "#F5C2C2" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INTRO — horizontal : texte gauche | déco droite
      ══════════════════════════════════════════════ */}
      <section className="section-entrance" style={{ padding: "5rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "4rem" }}>

          {/* Gauche — texte */}
          <div>
            <p style={{ fontFamily: script, fontSize: "clamp(2.2rem,4vw,2.8rem)", color: "#E8A0A0", marginBottom: "0.5rem", lineHeight: 1 }}>
              Une collaboration unique
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 500, color: "#D47A7A", letterSpacing: "4px", textTransform: "uppercase", margin: "1rem 0 1.2rem" }}>
              Choisissez votre expérience
            </h2>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.9, color: "#8B6B6B" }}>
              Que vous rêviez d'un portrait délicat, d'un reportage de mariage inoubliable ou d'un projet éditorial sur-mesure, nos forfaits s'adaptent à vos désirs avec la même exigence artistique et le même souci du détail.
            </p>
          </div>

          {/* Droite — chiffres clés horizontaux */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              { num: "200+", label: "Mariages immortalisés" },
              { num: "98%",  label: "Clients satisfaits"   },
              { num: "5 ans", label: "D'expérience"        },
              { num: "3",    label: "Formules sur-mesure"  },
            ].map(({ num, label }) => (
              <div key={label} style={{
                backgroundColor: C.white, border: "1px solid rgba(232,160,160,0.25)",
                borderRadius: "12px", padding: "1.5rem 1.2rem", textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}>
                <p style={{ fontFamily: serif, fontSize: "2rem", fontWeight: 600, color: "#D47A7A", lineHeight: 1, marginBottom: "0.4rem" }}>{num}</p>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: "#8B6B6B", textTransform: "uppercase" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CARDS FORFAITS — 3 colonnes horizontales
      ══════════════════════════════════════════════ */}
      <section className="section-entrance" style={{ padding: "2rem 3rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: script, fontSize: "clamp(2rem,4vw,2.5rem)", color: "#E8A0A0", lineHeight: 1, marginBottom: "0.5rem" }}>Plus populaire</p>
          <div style={{ width: "50px", height: "1px", background: "linear-gradient(90deg, transparent, #E8A0A0, transparent)", margin: "0.8rem auto 0" }} />
        </div>

        {/* alignItems:start pour que le décalage vertical soit visible */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", alignItems: "start" }}>
          {FORFAITS.map((f, idx) => {
            const cc = cardColors(f.color);
            /* escalier : 0px → 40px → 80px */
            const stairOffset = idx * 40;
            const defaultShadow = f.featured
              ? "0 12px 40px rgba(0,0,0,0.1)"
              : "0 4px 20px rgba(0,0,0,0.05)";
            const hoverShadow = `0 24px 50px ${cc.border}`;
            return (
              <article
                key={f.title}
                className="card-entrance"
                style={{
                  position: "relative",
                  backgroundColor: cc.bg,
                  border: `1px solid ${cc.border}`,
                  borderRadius: "16px",
                  padding: "3rem 2rem 2.5rem",
                  textAlign: "center",
                  /* décalage escalier */
                  marginTop: `${stairOffset}px`,
                  transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.35s ease",
                  boxShadow: defaultShadow,
                  outline: f.featured ? `2px solid rgba(232,160,160,0.4)` : "none",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = `translateY(-10px)`;
                  el.style.boxShadow = hoverShadow;
                  el.style.borderColor = cc.iconColor;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = defaultShadow;
                  el.style.borderColor = cc.border;
                }}
              >
                {/* Bordure intérieure décorative */}
                <div style={{ position: "absolute", inset: "8px", border: "1px solid rgba(0,0,0,0.04)", borderRadius: "10px", pointerEvents: "none" }} />

                {/* Icône */}
                <div style={{ display: "inline-flex", width: "64px", height: "64px", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: cc.iconBg, color: cc.iconColor, marginBottom: "1rem", border: "1px solid rgba(0,0,0,0.05)" }}>
                  {f.icon}
                </div>

                <h3 style={{ fontFamily: serif, fontSize: "1.6rem", fontWeight: 600, color: cc.title, letterSpacing: "2px", marginBottom: "0.3rem" }}>{f.title}</h3>
                <p style={{ fontFamily: script, fontSize: "1.4rem", color: "#E8A0A0", marginBottom: "1.2rem" }}>{f.subtitle}</p>

                <p style={{ fontFamily: serif, fontSize: "2.6rem", color: "#5A3A3A", lineHeight: 1.1, marginBottom: "0.3rem" }}>
                  {f.price}<br />
                  <small style={{ fontSize: "0.72rem", color: "#8B6B6B", letterSpacing: "2px" }}>{f.unit}</small>
                </p>

                <ul style={{ borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "1.2rem 0", margin: "1.2rem 0", textAlign: "left", listStyle: "none" }}>
                  {f.features.map((feat) => (
                    <li key={feat} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", padding: "0.4rem 0", fontSize: "0.8rem", color: "#5A3A3A" }}>
                      <Check size={14} style={{ color: cc.iconColor, flexShrink: 0, marginTop: "2px" }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  style={{ width: "100%", padding: "0.8rem", fontSize: "0.68rem", letterSpacing: "3px", fontWeight: 600, textTransform: "uppercase", color: C.white, backgroundColor: cc.btn, border: "none", borderRadius: "999px", cursor: "pointer", transition: "background-color 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = cc.btnHover; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = cc.btn; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                >
                  {f.cta}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROCESS — 4 étapes horizontales
      ══════════════════════════════════════════════ */}
      <section className="section-entrance" style={{ backgroundColor: "#FFF0F0", padding: "5rem 3rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Titre + sous-titre côte à côte */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "1.5rem", marginBottom: "3.5rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 500, letterSpacing: "5px", color: "#D47A7A", textTransform: "uppercase", margin: 0 }}>
              Notre Processus
            </h2>
            <span style={{ width: "2px", height: "28px", backgroundColor: "rgba(232,160,160,0.4)", alignSelf: "center" }} />
            <p style={{ fontSize: "0.8rem", color: "#8B6B6B", margin: 0, maxWidth: "320px", lineHeight: 1.6 }}>
              Quatre étapes simples pour une expérience sans souci, du premier contact à la livraison.
            </p>
          </div>

          {/* 4 étapes en ligne */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", alignItems: "start" }}>
            {STEPS.map((s, i) => (
              <div key={s.title} style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                borderRadius: "16px",
                padding: "2rem 1.5rem",
                textAlign: "center",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(232,160,160,0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: serif, fontSize: "3.5rem", color: "#E8A0A0", lineHeight: 1, marginBottom: "0.5rem" }}>0{i + 1}</div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem", color: "#C8A8E8" }}>{s.icon}</div>
                <h4 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", color: "#A888D0", textTransform: "uppercase", marginBottom: "0.6rem" }}>{s.title}</h4>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: "#8B6B6B" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — horizontal : texte gauche | bouton droite
      ══════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #FFF8F8 0%, #F8F5FF 100%)", padding: "5rem 3rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "3rem" }}>

          {/* Gauche — texte */}
          <div>
            <p style={{ fontFamily: script, fontSize: "clamp(2.2rem,4vw,3rem)", color: "#E8A0A0", lineHeight: 1, marginBottom: "0.5rem" }}>
              Prêt à commencer ?
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 500, letterSpacing: "4px", color: "#A888D0", textTransform: "uppercase", margin: "0.8rem 0 1rem" }}>
              Travaillons Ensemble
            </h2>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.9, color: "#8B6B6B", maxWidth: "520px" }}>
              Contactez-nous pour discuter de votre projet. Chaque collaboration débute par une conversation, sans engagement, autour d'un café ou en visio.
            </p>
            <Link
              to="/"
              style={{ display: "inline-block", marginTop: "1.5rem", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A888D0", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = C.gold}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = "#A888D0"}
            >
              ← Retour à la page À Propos
            </Link>
          </div>

          {/* Droite — bouton */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <button
              className="button-glow"
              style={{
                background: "linear-gradient(135deg, #E8A0A0, #C8A8E8)",
                color: C.white, border: "none",
                padding: "1.2rem 3rem",
                fontSize: "0.72rem", letterSpacing: "3px", fontWeight: 600,
                textTransform: "uppercase", borderRadius: "999px",
                cursor: "pointer", boxShadow: "0 8px 30px rgba(200,168,232,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(200,168,232,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(200,168,232,0.35)"; }}
            >
              Réserver maintenant
            </button>
            <p style={{ fontSize: "0.7rem", color: "#C8A8E8", marginTop: "0.75rem", letterSpacing: "0.05em" }}>
              Sans engagement · Réponse sous 24h
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}