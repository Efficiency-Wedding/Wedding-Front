import { type CSSProperties, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Calendar, Star } from "lucide-react";

const C = {
  gold:        "oklch(0.78 0.09 85)",
  rose:        "oklch(0.72 0.09 15)",
  roseSoft:    "oklch(0.94 0.025 15)",
  goldSoft:    "oklch(0.95 0.035 85)",
  blue:        "oklch(0.45 0.06 250)",
  blueSoft:    "oklch(0.93 0.02 250)",
  ivory:       "oklch(0.985 0.008 75)",
  muted:       "oklch(0.45 0.03 260)",
  white:       "#ffffff",
  shadowFrame: "0 10px 40px -10px rgba(180,100,100,0.28)",
};

const sans   = '"Inter", system-ui, sans-serif';

const IMG = {
  hero:   new URL("../assets/mar9.jpg",  import.meta.url).href,
  arch:   new URL("../assets/mar17.jpg", import.meta.url).href,
  bride:  new URL("../assets/mar16.jpg", import.meta.url).href,
  autumn: new URL("../assets/mar8.jpg",  import.meta.url).href,
  couple: new URL("../assets/mar14.jpg", import.meta.url).href,
  mar12:  new URL("../assets/mar12.jpg", import.meta.url).href,
  mar10:  new URL("../assets/mar10.jpg", import.meta.url).href,
  mar13:  new URL("../assets/mar13.jpg", import.meta.url).href,
};

interface ZoomImgProps {
  src: string;
  alt: string;
  wrapStyle: CSSProperties;
  imgStyle?: CSSProperties;
  className?: string;
}

function ZoomImg({ src, alt, wrapStyle, imgStyle, className }: ZoomImgProps) {
  return (
    <div style={{ overflow: "hidden", ...wrapStyle }} className={className}>
      <img
        src={src} alt={alt}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
          ...imgStyle,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>
  );
}

export default function Perfume() {
  const navigate = useNavigate();
  const revealRefs = useRef<HTMLElement[]>([]);
  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ color: C.muted }} className="page-entrance overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: "560px", backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white hero-entrance">
          <h1 className="font-serif" style={{
            fontSize: "clamp(2.8rem,6vw,4.5rem)",
            fontWeight: 300,
            letterSpacing: "14px",
            marginBottom: "1rem",
            color: C.white,
          }}>
            EFFICIENCY
          </h1>
          <p className="font-script" style={{
            fontSize: "clamp(2rem,4.5vw,2.8rem)",
            lineHeight: 1.25,
            color: C.white,
          }}>
            Every picture tells a story, every story
            <br />
            needs a picture!
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION WEDDING
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFF9F5", padding: "5rem 3rem" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
        }}>

          {/* Collage gauche */}
          <div className="reveal" ref={addReveal as any} style={{ position: "relative", height: "600px" }}>
            <ZoomImg src={IMG.arch} alt="Architecture" className="image-float"
              wrapStyle={{
                position: "absolute", top: 0, left: 0,
                width: "260px", height: "340px",
                borderRadius: "130px 130px 6px 6px",
                border: `5px solid ${C.white}`,
                boxShadow: "6px 8px 24px rgba(0,0,0,0.18)", zIndex: 1,
              }}
            />
            <ZoomImg src={IMG.bride} alt="Mariée" className="image-float"
              wrapStyle={{
                position: "absolute", top: "80px", left: "200px",
                width: "240px", height: "300px",
                borderRadius: "8px",
                border: `5px solid ${C.white}`,
                boxShadow: "6px 8px 24px rgba(0,0,0,0.18)", zIndex: 2,
              }}
            />
            <ZoomImg src={IMG.autumn} alt="Automne" className="image-float"
              wrapStyle={{
                position: "absolute", top: "300px", left: "10px",
                width: "190px", height: "210px",
                borderRadius: "6px",
                border: `5px solid ${C.white}`,
                boxShadow: "6px 8px 24px rgba(0,0,0,0.18)", zIndex: 3,
              }}
            />
            <ZoomImg src={IMG.couple} alt="Couple" className="image-float"
              wrapStyle={{
                position: "absolute", top: "340px", left: "180px",
                width: "310px", height: "250px",
                borderRadius: "8px",
                border: `5px solid ${C.white}`,
                boxShadow: "6px 8px 24px rgba(0,0,0,0.18)", zIndex: 4,
              }}
            />
          </div>

          {/* Texte droite */}
          <div className="reveal" ref={addReveal as any}>
            <h2 className="font-serif" style={{
              fontSize: "clamp(1.5rem,2.5vw,1.9rem)",
              fontWeight: 600, lineHeight: 1.3,
              color: C.blue, marginBottom: "1.5rem",
            }}>
              Votre mariage mérite des souvenirs{" "}
              <span style={{ color: C.gold }}>inoubliables</span>,
              chaleureux et parfaitement{" "}
              <span style={{ color: C.rose }}>organisés</span>
            </h2>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.9, color: C.muted, marginBottom: "1rem" }}>
              Chez <strong style={{ color: C.blue }}>Efficiency Organization Event</strong>, nous transformons vos rêves en réalité. Basée à Madagascar, notre équipe passionnée orchestre chaque détail de votre journée parfaite.
            </p>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.9, color: C.muted, marginBottom: "1rem" }}>
              De la recherche du lieu idéal à la décoration florale, en passant par la coordination des prestataires et l'animation : nous mettons notre expertise à votre service pour un mariage sans stress, élégant et inoubliable.
            </p>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.9, color: C.muted, marginBottom: "2rem" }}>
              Chaque détail compte. Chaque émotion mérite d'être capturée. Nous sommes là pour que vous puissiez vivre pleinement chaque instant de votre plus beau jour.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", marginBottom: "2rem" }}>
              {[
                { Icon: Calendar, label: "Planification sur mesure" },
                { Icon: Star,     label: "Prestataires de qualité"  },
                { Icon: Heart,    label: "Suivi personnalisé"       },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", fontWeight: 500, color: C.rose }}>
                  <Icon size={16} /><span>{label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/Travail")}
              className="button-premium button-glow"
              style={{
                backgroundColor: C.blue, color: C.white, border: "none",
                padding: "1rem 2.4rem", fontSize: "0.7rem", fontFamily: sans,
                fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                transition: "background-color 0.3s, transform 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.blue; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Travaillons ensemble
            </button>
          </div>
        </div>
      </section>

      <StorySection />

    </div>
  );
}

interface StorySectionProps { onReadStory?: () => void; }

function StorySection({ onReadStory }: StorySectionProps) {
  return (
    <section
      id="notre-histoire"
      style={{ backgroundColor: C.roseSoft, position: "relative", overflow: "hidden" }}
      className="px-6 py-24 md:px-12 lg:px-20"
    >
      {/* Blobs décoratifs */}
      <div aria-hidden style={{
        position: "absolute", left: "-80px", top: "40px",
        width: "288px", height: "288px", borderRadius: "50%",
        backgroundColor: C.goldSoft, filter: "blur(60px)", opacity: 0.55, pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", right: "-80px", bottom: "40px",
        width: "320px", height: "320px", borderRadius: "50%",
        backgroundColor: C.blueSoft, filter: "blur(60px)", opacity: 0.55, pointerEvents: "none",
      }} />

      {/* ── GRILLE : texte gauche | collage droite ── */}
      <div style={{
        position: "relative",
        maxWidth: "1200px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",   /* 50/50 — texte gauche, collage droite */
        alignItems: "center",
        gap: "3rem",
      }}>

        {/* ══ TEXTE — ordre 1, colonne gauche ══ */}
        <div className="section-entrance" style={{ order: 1 }}>
          <p className="font-script" style={{
            fontSize: "clamp(2.8rem,5vw,3.8rem)",
            color: C.gold, lineHeight: 1.1, marginBottom: "0.4rem",
          }}>
            Hey Love!
          </p>
          <h2 className="font-serif" style={{
            fontSize: "clamp(1.5rem,2.5vw,1.95rem)",
            fontWeight: 600, lineHeight: 1.3, color: C.blue,
            marginTop: "0.5rem", marginBottom: "1.6rem",
          }}>
            Merci de passer par ici — je suis votre wedding planner,{" "}
            <span style={{ color: C.rose }}>passionnée, rêveuse & organisée.</span>
          </h2>
          <div style={{ fontSize: "0.875rem", lineHeight: 1.9, color: C.muted, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <p>Basée à Madagascar, chez <strong style={{ color: C.blue }}>Efficiency Organization Event</strong>, j'accompagne les couples qui souhaitent vivre leur mariage pleinement — sans stress, sans logistique, sans compromis sur l'élégance.</p>
            <p>De la cérémonie intime à la réception grandiose, je m'occupe de tout, de A à Z. Sélection des prestataires, scénographie, coordination du jour J : vous dites <em>« oui »</em> à l'amour, nous prenons soin du reste.</p>
            <p>Mon métier, c'est transformer vos émotions en souvenirs — et chaque mariage que je conçois est une histoire unique, à votre image.</p>
          </div>

          {onReadStory ? (
            <button onClick={onReadStory} className="button-premium button-glow"
              style={{
                marginTop: "1.8rem", display: "inline-flex", alignItems: "center", gap: "0.75rem",
                backgroundColor: C.blue, color: C.white, padding: "1rem 2.2rem",
                fontSize: "0.68rem", fontFamily: sans, fontWeight: 600,
                letterSpacing: "0.28em", textTransform: "uppercase",
                border: "none", cursor: "pointer", borderRadius: "2px",
                transition: "background-color 0.3s, transform 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.blue; e.currentTarget.style.transform = "translateY(0)"; }}
            >Lire mon histoire <span aria-hidden>→</span></button>
          ) : (
            <Link to="/Histoirepage" className="button-premium button-glow"
              style={{
                marginTop: "1.8rem", display: "inline-flex", alignItems: "center", gap: "0.75rem",
                backgroundColor: C.blue, color: C.white, padding: "1rem 2.2rem",
                fontSize: "0.68rem", fontFamily: sans, fontWeight: 600,
                letterSpacing: "0.28em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: "2px",
                transition: "background-color 0.3s, transform 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.blue; e.currentTarget.style.transform = "translateY(0)"; }}
            >Lire mon histoire <span aria-hidden>→</span></Link>
          )}
        </div>

        {/* ══ COLLAGE — ordre 2, colonne droite ══
            Référence about2.jpg mesurée :
            Conteneur : ~520px large × 500px haut

            img-work (haut-gauche) :
              left:0  top:30px   w:240px  h:280px   z:1

            img-portrait (grande, toute hauteur droite) :
              right:0  top:0    w:265px  h:480px   z:2

            img-joy (bas, chevauche les deux) :
              left:30px  bottom:0  w:225px  h:210px  z:3
        ══ */}
        <div style={{ order: 2, position: "relative", height: "500px", width: "100%" }}>

          {/* img-work — haut gauche */}
          <ZoomImg
            src={IMG.mar12}
            alt="Wedding planner au travail"
            className="image-float"
            wrapStyle={{
              position: "absolute",
              left: 0, top: "30px",
              width: "240px", height: "280px",
              borderRadius: "8px",
              border: `5px solid ${C.white}`,
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              zIndex: 1,
            }}
          />

          {/* img-portrait — grande, toute la hauteur, droite */}
          <ZoomImg
            src={IMG.mar10}
            alt="Portrait de la wedding planner"
            className="image-float"
            wrapStyle={{
              position: "absolute",
              right: 0, top: 0,
              width: "265px", height: "480px",
              borderRadius: "8px",
              border: `5px solid ${C.white}`,
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              zIndex: 2,
            }}
            imgStyle={{ objectPosition: "top center" }}
          />

          {/* img-joy — bas, devant les deux */}
          <ZoomImg
            src={IMG.mar13}
            alt="Couple joyeux"
            className="image-float"
            wrapStyle={{
              position: "absolute",
              left: "30px", bottom: 0,
              width: "225px", height: "210px",
              borderRadius: "8px",
              border: `5px solid ${C.white}`,
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              zIndex: 3,
            }}
            imgStyle={{ objectPosition: "top center" }}
          />

        </div>
      </div>
    </section>
  );
}