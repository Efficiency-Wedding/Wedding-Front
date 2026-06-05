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
  border:      "oklch(0.9 0.015 75)",
  shadowSoft:  "0 20px 60px -20px rgba(60,80,130,0.18)",
  shadowFrame: "0 10px 40px -10px rgba(180,100,100,0.28)",
};

const IMG = {
  hero:   new URL("../../assets/mar9.jpg", import.meta.url).href,
  arch:   new URL("../../assets/mar17.jpg", import.meta.url).href,
  bride:  new URL("../../assets/mar16.jpg", import.meta.url).href,
  autumn: new URL("../../assets/mar8.jpg", import.meta.url).href,
  couple: new URL("../../assets/mar14.jpg", import.meta.url).href,
  mar12:  new URL("../../assets/mar12.jpg", import.meta.url).href,
  mar10:  new URL("../../assets/mar10.jpg", import.meta.url).href,
  mar13:  new URL("../../assets/mar13.jpg", import.meta.url).href,
};

interface ZoomImgProps {
  src: string;
  alt: string;
  wrapStyle: CSSProperties;
  imgStyle?: CSSProperties;
  className?: string;
}

/* Zoom intérieur sans agrandissement du conteneur */
function ZoomImg({ src, alt, wrapStyle, imgStyle, className }: ZoomImgProps) {
  return (
    <div style={{ overflow: "hidden", ...wrapStyle }} className={className}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.5s ease",
          ...imgStyle,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
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
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: C.ivory, color: C.muted }} className="about-page page-entrance overflow-x-hidden">

      {/* ══ HERO — fond original #FFF9F5 avec image bg ══ */}
      <section
        className="relative flex items-center justify-center"
        style={{
          height: "560px",
          backgroundImage: `url(${IMG.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif" style={{
            fontSize: "clamp(2.5rem,6vw,4rem)",
            fontWeight: 300,
            letterSpacing: "12px",
            marginBottom: "1.25rem",
            color: C.white,
          }}>
            EFFICIENCY
          </h1>
          <p className="font-script" style={{
            fontSize: "clamp(1.8rem,4vw,2.25rem)",
            lineHeight: 1.15,
            color: C.white,
          }}>
            Every picture tells a story, every story
            <br />
            needs a picture!
          </p>
        </div>
      </section>

      {/* ══ SECTION WEDDING ══ */}
      <section style={{ backgroundColor: "#FFF9F5", padding: "5rem 2.5rem" }}>
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Collage — formes originales + zoom intérieur */}
          <div className="about-collage relative reveal" ref={addReveal} style={{ height: "620px" }}>

            {/* arch — arche arrondie en haut */}
            <ZoomImg
              src={IMG.arch} alt="Architecture"
              className="image-float"
              wrapStyle={{
                position: "absolute", top: 0, left: 0,
                width: "260px", height: "340px",
                borderRadius: "130px 130px 8px 8px",
                border: `4px solid ${C.white}`,
                boxShadow: C.shadowFrame,
                zIndex: 1,
              }}
            />

            {/* bride — arrondie */}
            <ZoomImg
              src={IMG.bride} alt="Mariée"
              className="image-float"
              wrapStyle={{
                position: "absolute", top: "110px", left: "220px",
                width: "240px", height: "300px",
                borderRadius: "16px",
                border: `4px solid ${C.white}`,
                boxShadow: C.shadowFrame,
                zIndex: 2,
              }}
            />

            {/* autumn — cercle */}
            <ZoomImg
              src={IMG.autumn} alt="Automne"
              className="image-float"
              wrapStyle={{
                position: "absolute", top: "320px", left: "30px",
                width: "200px", height: "200px",
                borderRadius: "50%",
                border: `4px solid ${C.white}`,
                boxShadow: C.shadowFrame,
                zIndex: 3,
              }}
            />

            {/* couple — grands arrondis, devant tout */}
            <ZoomImg
              src={IMG.couple} alt="Couple"
              className="image-float"
              wrapStyle={{
                position: "absolute", top: "360px", left: "200px",
                width: "320px", height: "260px",
                borderRadius: "24px",
                border: `4px solid ${C.white}`,
                boxShadow: C.shadowFrame,
                zIndex: 4,
              }}
            />

            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(circle, color-mix(in oklab, ${C.rose} 8%, transparent) 0%, transparent 70%)`,
            }} />
          </div>

          {/* Texte */}
          <div className="reveal" ref={addReveal}>
            <span style={{
              display: "inline-block",
              backgroundColor: `color-mix(in oklab, ${C.rose} 15%, transparent)`,
              color: C.rose,
              padding: "0.25rem 0.85rem",
              borderRadius: "999px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              marginBottom: "1.25rem",
            }}>
              ✦ Notre promesse ✦
            </span>

            <h2 className="font-serif" style={{
              fontSize: "clamp(1.6rem,3vw,2rem)",
              fontWeight: 600,
              lineHeight: 1.25,
              color: C.blue,
              marginBottom: "1.5rem",
            }}>
              Votre mariage mérite des souvenirs{" "}
              <span style={{ color: C.gold }}>inoubliables</span>, chaleureux
              <br />et parfaitement{" "}
              <span style={{ color: C.rose }}>organisés</span>
            </h2>

            <p style={{ fontSize: "0.875rem", lineHeight: 1.85, color: C.muted, marginBottom: "1rem" }}>
              Chez <strong style={{ color: C.blue }}>Efficiency Organization Event</strong>, nous transformons
              vos rêves en réalité. Basée à Madagascar, notre équipe passionnée orchestre chaque détail
              de votre journée parfaite.
            </p>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.85, color: C.muted, marginBottom: "1.5rem" }}>
              De la recherche du lieu idéal à la décoration florale, en passant par la coordination
              des prestataires et l'animation : nous mettons notre expertise à votre service pour un
              mariage sans stress, élégant et inoubliable.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", margin: "1.5rem 0" }}>
              {[
                { Icon: Calendar, label: "Planification sur mesure" },
                { Icon: Star,     label: "Prestataires de qualité"  },
                { Icon: Heart,    label: "Suivi personnalisé"       },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: C.rose }}>
                  <Icon size={18} /><span>{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/travail")}
              style={{
                marginTop: "0.5rem",
                backgroundColor: "transparent",
                border: `2px solid ${C.blue}`,
                color: C.blue,
                padding: "0.85rem 2rem",
                borderRadius: "2px",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background-color 0.25s, color 0.25s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.blue; e.currentTarget.style.color = C.ivory; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.blue; e.currentTarget.style.transform = "translateY(0)"; }}
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


interface StorySectionProps {
  onReadStory?: () => void;
}

/* ── StorySection ─────────────────────────────────────────── */
function StorySection({ onReadStory }: StorySectionProps) {
  return (
    <section
      id="notre-histoire"
      style={{ backgroundColor: "oklch(0.94 0.025 15)" }}
      className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20"
    >
      <div aria-hidden style={{ backgroundColor: "oklch(0.95 0.035 85)" }}
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl opacity-60" />
      <div aria-hidden style={{ backgroundColor: "oklch(0.93 0.02 250)" }}
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full blur-3xl opacity-60" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

        <div className="order-2 lg:order-1">
          <p className="font-script" style={{ fontSize: "clamp(3rem,6vw,4rem)", color: "oklch(0.78 0.09 85)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Bonjour&nbsp;!
          </p>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.75rem,3vw,2.25rem)", fontWeight: 600, lineHeight: 1.3, color: "oklch(0.45 0.06 250)", marginTop: "0.75rem", marginBottom: "2rem" }}>
            Merci de passer par ici — je suis votre wedding planner,{" "}
            <span style={{ color: "oklch(0.72 0.09 15)" }}>passionnée, rêveuse & organisée.</span>
          </h2>
          <div style={{ fontSize: "0.9375rem", lineHeight: 1.85, color: "oklch(0.45 0.03 260)", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <p>Basée à Madagascar, chez <strong style={{ color: "oklch(0.45 0.06 250)", fontWeight: 600 }}>Efficiency Organization Event</strong>, j'accompagne les couples qui souhaitent vivre leur mariage pleinement — sans stress, sans logistique, sans compromis sur l'élégance.</p>
            <p>De la cérémonie intime à la réception grandiose, je m'occupe de tout, de A à Z. Sélection des prestataires, scénographie, coordination du jour J : vous dites <em>« oui »</em> à l'amour, nous prenons soin du reste.</p>
            <p>Mon métier, c'est transformer vos émotions en souvenirs — et chaque mariage que je conçois est une histoire unique, à votre image.</p>
          </div>

          {onReadStory ? (
            <button onClick={onReadStory}
              style={{ marginTop:"2.5rem", display:"inline-flex", alignItems:"center", gap:"0.75rem", backgroundColor:"oklch(0.45 0.06 250)", color:"oklch(0.985 0.008 75)", padding:"1rem 2rem", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", border:"none", cursor:"pointer", borderRadius:"2px", transition:"background-color 0.25s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor="oklch(0.72 0.09 15)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor="oklch(0.45 0.06 250)"; e.currentTarget.style.transform="translateY(0)"; }}
            >Lire mon histoire <span aria-hidden>→</span></button>
          ) : (
            <Link to="/histoire"
              style={{ marginTop:"2.5rem", display:"inline-flex", alignItems:"center", gap:"0.75rem", backgroundColor:"oklch(0.45 0.06 250)", color:"oklch(0.985 0.008 75)", padding:"1rem 2rem", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", textDecoration:"none", borderRadius:"2px", transition:"background-color 0.25s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor="oklch(0.72 0.09 15)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor="oklch(0.45 0.06 250)"; e.currentTarget.style.transform="translateY(0)"; }}
            >Lire mon histoire <span aria-hidden>→</span></Link>
          )}
        </div>

        {/* COLLAGE StorySection — zoom intérieur */}
        <div className="order-1 lg:order-2 mx-auto" style={{ position:"relative", width:"520px", height:"500px", maxWidth:"100%", flexShrink:0 }}>

          <ZoomImg src={IMG.mar12}
            alt="Wedding planner au travail"
            className="image-float"
            wrapStyle={{ position:"absolute", left:0, top:"30px", width:"240px", height:"280px", borderRadius:"16px", border:"5px solid white", boxShadow:"0 8px 30px rgba(0,0,0,0.15)", zIndex:1 }}
          />
          <ZoomImg src={IMG.mar10}
            alt="Portrait de la wedding planner"
            className="image-float"
            wrapStyle={{ position:"absolute", right:0, top:0, width:"265px", height:"480px", borderRadius:"16px", border:"5px solid white", boxShadow:"0 8px 30px rgba(0,0,0,0.15)", zIndex:2 }}
            imgStyle={{ objectPosition:"top center" }}
          />
          <ZoomImg src={IMG.mar13}
            alt="Couple joyeux dans un champ de fleurs"
            className="image-float"
            wrapStyle={{ position:"absolute", left:"30px", bottom:0, width:"225px", height:"210px", borderRadius:"16px", border:"5px solid white", boxShadow:"0 8px 30px rgba(0,0,0,0.15)", zIndex:3 }}
            imgStyle={{ objectPosition:"top center" }}
          />
        </div>

      </div>
    </section>
  );
}
