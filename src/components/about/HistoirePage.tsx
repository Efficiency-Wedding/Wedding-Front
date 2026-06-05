import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const portrait = new URL("../../assets/mar4.jpg", import.meta.url).href;
const work = new URL("../../assets/mar3.jpg", import.meta.url).href;
const joy = new URL("../../assets/mar2.jpg", import.meta.url).href;

/* ── Valeurs oklch identiques à StorySection ──────────────────
   or (gold)          : oklch(0.78 0.09 85)
   rose               : oklch(0.72 0.09 15)
   rose-soft (fond)   : oklch(0.94 0.025 15)
   bleu (blue)        : oklch(0.45 0.06 250)
   ivoire (background): oklch(0.985 0.008 75)
   muted-foreground   : oklch(0.45 0.03 260)
   shadow-soft        : 0 20px 60px -20px rgba(60,80,130,0.18)
   shadow-frame       : 0 10px 40px -10px rgba(180,100,100,0.28)
─────────────────────────────────────────────────────────────── */

const C = {
  gold:       "oklch(0.78 0.09 85)",
  rose:       "oklch(0.72 0.09 15)",
  roseSoft:   "oklch(0.94 0.025 15)",
  blue:       "oklch(0.45 0.06 250)",
  ivory:      "oklch(0.985 0.008 75)",
  white:      "#ffffff",
  muted:      "oklch(0.45 0.03 260)",
  cardBg:     "#ffffff",
  border:     "oklch(0.9 0.015 75)",
  shadowSoft: "0 20px 60px -20px rgba(60,80,130,0.18)",
  shadowFrame:"0 10px 40px -10px rgba(180,100,100,0.28)",
};

export default function HistoirePage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-entrance" style={{ minHeight: "100vh", backgroundColor: C.ivory, color: C.blue }}>

      {/* ── HERO ── */}
      <section className="reveal" ref={addReveal} style={{ position: "relative", height: "60vh", minHeight: "450px", overflow: "hidden" }}>
        <img
          className="image-floating"
          src={portrait}
          alt="Wedding planner"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 1s ease-out",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "oklch(0.45 0.06 250 / 60%)" }} />
        <div style={{
          position: "relative", zIndex: 10,
          height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 1.5rem",
          color: C.white,
        }}>
          <p className="font-script" style={{ fontSize: "clamp(2.8rem,5vw,3.8rem)", color: C.gold, lineHeight: 1 }}>
            Notre Histoire
          </p>
          <h1 className="font-serif" style={{
            fontSize: "clamp(2rem,5vw,3.5rem)",
            fontWeight: 600,
            letterSpacing: "0.2em",
            marginTop: "1rem",
            color: C.white,
          }}>
            DERRIÈRE CHAQUE MARIAGE
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
            Passion • Élégance • Excellence
          </p>
        </div>
      </section>

      {/* ── CHAPITRE I ── */}
      <section className="reveal" ref={addReveal} style={{ padding: "6rem 1.5rem" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "center",
          gap: "3.5rem",
        }}>
          <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.35em", color: C.gold, fontWeight: 400 }}>
              Chapitre I
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, color: C.rose, lineHeight: 1.25, marginTop: "1rem", marginBottom: "1.5rem" }}>
              Une passion née sous le ciel de Madagascar
            </h2>
            <div style={{ fontSize: "0.9rem", lineHeight: 1.9, color: C.muted, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p>Tout commence à Antananarivo, avec une conviction simple : chaque histoire d'amour mérite une célébration à la hauteur de son importance.</p>
              <p>C'est de cette vision qu'est née{" "}
                <strong style={{ color: C.blue, fontWeight: 600 }}>Efficiency Organization Event</strong>
                , une agence spécialisée dans l'organisation de mariages élégants, raffinés et entièrement personnalisés.</p>
              <p>Fondée par{" "}
                <strong style={{ color: C.blue, fontWeight: 600 }}>Andoniaina Van Der Andrianarivo</strong>
                , l'agence accompagne les futurs mariés dans chaque étape de leur aventure avec passion et professionnalisme.</p>
            </div>
          </div>
          <img
            className="image-float"
            src={work}
            alt="Préparation mariage"
            style={{
              maxWidth: "440px", width: "100%",
              height: "460px", objectFit: "cover",
              margin: "0 auto", display: "block",
              border: "4px solid white",
              borderRadius: "2px",
              boxShadow: C.shadowFrame,
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03) translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 50px -10px rgba(180,100,100,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = C.shadowFrame; }}
          />
        </div>
      </section>

      {/* ── CHAPITRE II ── */}
      <section className="reveal" ref={addReveal} style={{ backgroundColor: C.roseSoft, padding: "6rem 1.5rem" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "center",
          gap: "3.5rem",
        }}>
          <img
            className="image-float"
            src={joy}
            alt="Couple heureux"
            style={{
              maxWidth: "440px", width: "100%",
              height: "460px", objectFit: "cover",
              margin: "0 auto", display: "block",
              border: "4px solid white",
              borderRadius: "2px",
              boxShadow: C.shadowSoft,
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03) translateY(-4px)"; e.currentTarget.style.boxShadow = "0 30px 60px -15px rgba(60,80,130,0.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = C.shadowSoft; }}
          />
          <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.35em", color: C.gold, fontWeight: 400 }}>
              Chapitre II
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, color: C.blue, lineHeight: 1.25, marginTop: "1rem", marginBottom: "1.5rem" }}>
              Un mariage clé en main, du premier « oui » au dernier slow
            </h2>
            <div style={{ fontSize: "0.9rem", lineHeight: 1.9, color: C.muted, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p>Pour répondre aux envies de chaque couple, nous avons conçu plusieurs formules adaptées à différents styles de célébration.</p>
              <p>De la recherche du lieu idéal à la coordination du jour J, en passant par la décoration, la restauration, la mise en beauté et la photographie, nous prenons en charge chaque détail.</p>
              <p>Notre objectif est de créer une journée unique, fidèle à votre histoire et aux émotions que vous souhaitez partager avec vos proches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPITRE III — VALEURS ── */}
      <section className="reveal" ref={addReveal} style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.35em", color: C.gold, fontWeight: 400 }}>
            Chapitre III
          </p>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, color: C.rose, lineHeight: 1.25, marginTop: "1rem", marginBottom: "1rem" }}>
            Ce qui nous anime
          </h2>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: C.muted, maxWidth: "640px", margin: "0 auto 3.5rem" }}>
            Trois valeurs guident chacune de nos décisions, du premier rendez-vous jusqu'au dernier instant de votre célébration.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {[
              { title: "Élégance", desc: "Une esthétique raffinée et entièrement personnalisée." },
              { title: "Exigence", desc: "Une sélection rigoureuse des meilleurs partenaires." },
              { title: "Émotion",  desc: "Créer des souvenirs inoubliables pour toute une vie." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: C.cardBg,
                  border: `1px solid ${C.border}`,
                  padding: "2rem 1.75rem",
                  textAlign: "left",
                  borderRadius: "2px",
                  boxShadow: C.shadowSoft,
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = C.shadowFrame; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = C.shadowSoft; }}
              >
                <p className="font-script" style={{ fontSize: "2rem", color: C.gold, lineHeight: 1, marginBottom: "0.75rem" }}>
                  {item.title}
                </p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: C.muted }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="reveal" ref={addReveal} style={{
        backgroundColor: C.blue,
        padding: "5rem 1.5rem",
        textAlign: "center",
        color: C.white,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* blobs décoratifs */}
        <div style={{ position:"absolute", top:"-80px", left:"-80px", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle, rgba(242,215,224,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-60px", right:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"radial-gradient(circle, rgba(245,230,200,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />

        <p className="font-script" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", color: C.gold, lineHeight: 1, marginBottom: "1rem", position:"relative" }}>
          Et votre histoire ?
        </p>
        <h3 className="font-serif" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 600, color: C.white, maxWidth: "640px", margin: "0 auto 2.5rem", lineHeight: 1.35, position:"relative" }}>
          Réservons ensemble la date qui changera votre vie.
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem", position:"relative" }}>
          <a
            href="tel:+261349188043"
            style={{
              backgroundColor: C.rose,
              color: C.white,
              padding: "1rem 2rem",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = C.gold}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = C.rose}
          >
            +261 34 91 880 43
          </a>
          <a
            href="mailto:efficiencyevent@gmail.com"
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${C.gold}`,
              color: C.gold,
              padding: "1rem 2rem",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
              transition: "background-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.gold; e.currentTarget.style.color = C.blue; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.gold; }}
          >
            efficiencyevent@gmail.com
          </a>
        </div>

        <Link
          to="/"
          style={{
            display: "block",
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            textDecoration: "none",
            transition: "color 0.2s",
            position: "relative",
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.gold}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
        >
          ← Retour à la page À Propos
        </Link>
      </section>

    </main>
  );
}
