import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

// ── SVG Icon helper ─────────────────────────────────────────────────────────
type IconProps = {
  d: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
};

const Icon = ({ d, size = 22, stroke = "currentColor", strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  chef:     "M3 11l19-9-9 19-2-8-8-2z",
  hall:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  camera:   "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  music:    "M9 18V5l12-2v13 M6 21a3 3 0 100-6 3 3 0 000 6z M18 19a3 3 0 100-6 3 3 0 000 6z",
  flower:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  car:      "M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2 M17 21a2 2 0 100-4 2 2 0 000 4z M7 21a2 2 0 100-4 2 2 0 000 4z",
  beauty:   "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  cake:     "M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8 M4 16s.5-1 2-1 2.5 2 4 2 1.5-1 3-1 2.5 2 4 2 1.5-1 2-1 M2 21h20 M7 8v3 M12 8v3 M17 8v3",
  sparkle:  "M12 2L9.927 9.927 2 12l7.927 2.073L12 22l2.073-7.927L22 12l-7.927-2.073L12 2z",
  headset:  "M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z",
  gift:     "M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
  check:    "M20 6L9 17l-5-5",
  close:    "M18 6L6 18M6 6l12 12",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  phone:    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.76a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  quote:    "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
};

// ── Data ──────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "chef",
    title: "Traiteur",
    desc: "Menus variés et raffinés pour ravir vos invités.",
    price: "1 200 €",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Menus personnalisés selon vos goûts",
      "Cuisine française, orientale ou fusion",
      "Service à table ou buffet",
      "Chef étoilé disponible",
      "Dégustation préalable incluse",
      "Équipe de serveurs professionnels",
    ],
    testimonial: { text: "Un festin extraordinaire, nos invités en parlent encore !", author: "Marie & Thomas, juin 2024" },
    duration: "Toute la journée",
    guests: "Jusqu'à 500 personnes",
    tag: "Le plus demandé",
  },
  {
    icon: "hall",
    title: "Salle de réception",
    desc: "Salles élégantes adaptées à votre événement.",
    price: "1 500 €",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Capacité de 50 à 600 invités",
      "Salles climatisées et chauffées",
      "Espace jardin et terrasse",
      "Parking privé sécurisé",
      "Scène et piste de danse",
      "Éclairage professionnel modulable",
    ],
    testimonial: { text: "La salle était féerique, exactement comme nous la rêvions !", author: "Sophie & Julien, mars 2024" },
    duration: "1 à 3 jours",
    guests: "50 à 600 personnes",
    tag: "Exclusif",
  },
  {
    icon: "camera",
    title: "Photographe & Vidéaste",
    desc: "Immortalisez chaque instant de votre mariage.",
    price: "800 €",
    img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Photographie HD & drone",
      "Vidéo cinématographique 4K",
      "Album photo luxe inclus",
      "Retouches professionnelles",
      "Livraison clé USB personnalisée",
      "Séance couple en extérieur",
    ],
    testimonial: { text: "Chaque photo capture parfaitement l'émotion du moment.", author: "Léa & Pierre, décembre 2024" },
    duration: "Journée complète",
    guests: "Tout format",
    tag: "Coup de cœur",
  },
  {
    icon: "music",
    title: "DJ & Animation",
    desc: "Ambiance garantie avec nos DJ et animateurs.",
    price: "600 €",
    img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "DJ professionnel toutes musiques",
      "Sonorisation haut de gamme",
      "Jeux lumières et effets scéniques",
      "Playlist personnalisée avec vous",
      "Soirée animée et jeux de foule",
      "Micro sans fil pour discours",
    ],
    testimonial: { text: "La piste de danse n'a jamais été vide, fantastique !", author: "Camille & Romain, août 2024" },
    duration: "8h à 4h du matin",
    guests: "Tout format",
    tag: "Ambiance garantie",
  },
  {
    icon: "flower",
    title: "Décoration florale",
    desc: "Décorations personnalisées selon votre thème.",
    price: "400 €",
    img: "https://images.unsplash.com/photo-1501446529957-6226b37c0501?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Fleurs fraîches de saison",
      "Arche florale sur mesure",
      "Centres de table luxueux",
      "Bouquet de mariée personnalisé",
      "Décoration d'église ou laïque",
      "Installation et démontage inclus",
    ],
    testimonial: { text: "Les fleurs étaient absolument magnifiques, un conte de fées !", author: "Amandine & Hugo, mai 2024" },
    duration: "Installation J-1",
    guests: "Tout format",
    tag: "Artisan fleuriste",
  },
  {
    icon: "car",
    title: "Transport de luxe",
    desc: "Voitures de luxe et transport de vos invités.",
    price: "300 €",
    img: "https://images.unsplash.com/photo-1562141961-b68703e1e1d9?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Limousines, Rolls-Royce, Bentley",
      "Voitures anciennes et collection",
      "Chauffeur en tenue de cérémonie",
      "Bus navette pour les invités",
      "Décoration florale du véhicule",
      "Disponible toute la journée",
    ],
    testimonial: { text: "Arriver en Rolls-Royce était un rêve devenu réalité !", author: "Isabelle & Marc, octobre 2024" },
    duration: "Journée complète",
    guests: "Sur mesure",
    tag: "Prestige",
  },
  {
    icon: "beauty",
    title: "Beauté & Stylisme",
    desc: "Coiffure et maquillage pour la mariée et ses proches.",
    price: "350 €",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Essai beauté préalable inclus",
      "Coiffure et mise en plis",
      "Maquillage longue tenue",
      "Manucure et soins des mains",
      "Extension cils et sourcils",
      "Equipe à domicile ou sur site",
    ],
    testimonial: { text: "Je me suis sentie rayonnante toute la journée, merci !", author: "Clara & Kevin, juillet 2024" },
    duration: "Matin du mariage",
    guests: "Mariée + demoiselles",
    tag: "Glam & Chic",
  },
  {
    icon: "cake",
    title: "Wedding Cake",
    desc: "Gâteaux sur mesure à votre goût.",
    price: "250 €",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Design entièrement personnalisé",
      "Saveurs au choix : chocolat, vanille…",
      "Pièce montée traditionnelle",
      "Layer cake moderne et créatif",
      "Dégustation offerte",
      "Livraison et installation sur site",
    ],
    testimonial: { text: "Un gâteau aussi beau que délicieux, nos invités ont adoré !", author: "Élodie & Maxime, novembre 2024" },
    duration: "Livraison J-0",
    guests: "Tout format",
    tag: "Artisan pâtissier",
  },
  {
    icon: "sparkle",
    title: "Animations spéciales",
    desc: "Feux d'artifice, effets spéciaux et surprises uniques.",
    price: "500 €",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=700&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&h=400&fit=crop&q=80",
    ],
    details: [
      "Feux d'artifice personnalisés",
      "Fontaines de scène et cold sparks",
      "Lâcher de ballons ou lanternes",
      "Photobooth et cabine photo",
      "Caricaturiste et artistes vivants",
      "Surprise musicale à minuit",
    ],
    testimonial: { text: "Les feux d'artifice à minuit étaient magiques, mémorable !", author: "Juliette & Nathan, septembre 2024" },
    duration: "Soirée & nuit",
    guests: "Tout format",
    tag: "Wow effect",
  },
];

const packages = [
  {
    name: "Package Essentiel",
    badge: "54 000 Ar",
    color: "#c2185b",
    gradient: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop&q=85",
    desc: "La formule idéale pour un mariage élégant et intimiste.",
    cols: [["3 jours de photographie", "Portraits", "Solo shoot", "Couple shoot", "Family shoot"]],
  },
  {
    name: "Package Prestige",
    badge: "78 000 Ar",
    color: "#8e24aa",
    gradient: "linear-gradient(135deg, #ab47bc 0%, #6a1b9a 100%)",
    img: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop&q=85",
    desc: "Le choix parfait pour un mariage mémorable avec tous les essentiels.",
    cols: [
      ["3 jours de photographie", "2 Albums luxe", "Portraits", "Family portraits", "Solo shoot"],
      ["Retouche photos HD", "Candids naturels", "Template editing"],
    ],
  },
  {
    name: "Package Royal",
    badge: "155 000 Ar",
    color: "#b71c1c",
    gradient: "linear-gradient(135deg, #e53935 0%, #880e4f 100%)",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=85",
    desc: "L'expérience ultime pour un mariage de rêve inoubliable.",
    cols: [
      ["3 jours de photo + vidéo", "3 Albums luxe", "Portraits artistiques", "Solo & couple shoots", "Outdoor shoot", "Highlights vidéo", "Wall frame OFFERT"],
      ["Couverture vidéo complète", "Family portraits", "Retouche pro", "Montage cinéma", "USB clé personnalisée", "Couple song editing", "Picture songs editing"],
    ],
    popular: true,
  },
];

const timeline = [
  { icon: "check", step: "01", title: "Consultation gratuite",   desc: "Échangez avec nos experts pour définir votre vision de rêve." },
  { icon: "check", step: "02", title: "Choix des services",      desc: "Sélectionnez les prestations qui vous correspondent le mieux." },
  { icon: "check", step: "03", title: "Personnalisation",        desc: "Nous adaptons chaque moindre détail à votre thème unique." },
  { icon: "check", step: "04", title: "Votre grand jour",        desc: "Profitez pleinement de chaque instant magique et inoubliable." },
];

const stats = [
  { num: "+1 200", label: "Mariages réalisés", emoji: "💍" },
  { num: "98%",    label: "Clients satisfaits", emoji: "⭐" },
  { num: "+50",    label: "Prestataires experts", emoji: "🏆" },
  { num: "10 ans", label: "D'expérience",       emoji: "🎊" },
];

// ── Colors ──────────────────────────────────────────────────────────────────
const PINK   = "#e91e8c";
const DARK   = "#1a0a14";
const LIGHT  = "#fdf6f9";

// ── Animation presets ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any, delay },
});

const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

// ── Section heading ──────────────────────────────────────────────────────────
function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-14">
      <motion.p
        {...fadeUp(0.05)}
        style={{
          display: "inline-block", marginBottom: 10,
          background: "rgba(233,30,140,0.1)",
          color: PINK, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", padding: "5px 16px", borderRadius: 100,
          border: "1px solid rgba(233,30,140,0.2)",
        }}
      >
        ✦ Nos prestations
      </motion.p>
      <motion.h2
        {...fadeUp(0.1)}
        style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: DARK,
          letterSpacing: "-0.03em", fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: 1.1, marginBottom: 10,
        }}
      >
        {children}
      </motion.h2>
      {sub && (
        <motion.p {...fadeUp(0.18)} style={{ fontSize: 15, color: "#888", maxWidth: 440, margin: "0 auto" }}>
          {sub}
        </motion.p>
      )}
      <motion.div {...fadeUp(0.22)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 16 }}>
        <div style={{ height: 1, width: 48, background: `linear-gradient(to right, transparent, ${PINK})` }} />
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          style={{ color: PINK, fontSize: 20 }}
        >♥</motion.span>
        <div style={{ height: 1, width: 48, background: `linear-gradient(to left, transparent, ${PINK})` }} />
      </motion.div>
    </div>
  );
}

// ── Service Modal ────────────────────────────────────────────────────────────
function ServiceModal({ svc, onClose }: { svc: typeof services[0]; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(10,0,6,0.82)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 28,
            maxWidth: 860,
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 40px 100px rgba(233,30,140,0.25), 0 8px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Header Image */}
          <div style={{ position: "relative", height: 280, overflow: "hidden", borderRadius: "28px 28px 0 0" }}>
            <motion.img
              key={imgIdx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={svc.gallery[imgIdx]}
              alt={svc.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
            }} />
            {/* Gallery thumbs */}
      
            {/* Tag badge */}
            {svc.tag && (
              <div style={{
                position: "absolute", top: 18, left: 18,
                background: "linear-gradient(135deg, #e91e8c, #f06292)",
                color: "#fff", fontSize: 12, fontWeight: 700,
                padding: "5px 14px", borderRadius: 100,
                boxShadow: "0 4px 16px rgba(233,30,140,0.5)",
              }}>
                ✦ {svc.tag}
              </div>
            )}
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 16, right: 16,
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff",
              }}
            >
              <Icon d={icons.close} size={18} stroke="#fff" />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: "32px 36px 36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg, #e91e8c, #f06292)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(233,30,140,0.4)",
                  }}>
                    <Icon d={icons[svc.icon as keyof typeof icons]} size={20} stroke="#fff" />
                  </div>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: DARK, fontFamily: "Georgia, serif", margin: 0 }}>
                    {svc.title}
                  </h2>
                </div>
                <p style={{ fontSize: 14, color: "#888", margin: 0, lineHeight: 1.5 }}>
                  {svc.desc}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 20 }}>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>À partir de</p>
                <p style={{ fontSize: 32, fontWeight: 900, color: PINK, margin: 0, lineHeight: 1 }}>
                  {svc.price}
                </p>
              </div>
            </div>

            {/* Meta info */}
            <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Durée", val: svc.duration, emoji: "⏱" },
                { label: "Invités", val: svc.guests, emoji: "👥" },
              ].map((m, i) => (
                <div key={i} style={{
                  flex: 1, background: "#fdf6f9", borderRadius: 14,
                  padding: "12px 16px", border: "1px solid #fce4ec",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ fontSize: 22 }}>{m.emoji}</span>
                  <div>
                    <p style={{ fontSize: 11, color: "#bbb", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: DARK, margin: 0 }}>{m.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Details list */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#ccc", marginBottom: 12 }}>
                Ce qui est inclus
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
                {svc.details.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "#444" }}
                  >
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(233,30,140,0.15), rgba(233,30,140,0.25))",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon d={icons.check} size={11} stroke={PINK} strokeWidth={2.5} />
                    </span>
                    {d}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div style={{
              background: "linear-gradient(135deg, #fff0f7 0%, #fce4ec 100%)",
              borderRadius: 16, padding: "18px 22px",
              borderLeft: `4px solid ${PINK}`,
              marginBottom: 24,
            }}>
              <Icon d={icons.quote} size={22} stroke={PINK} />
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: "8px 0 6px", fontStyle: "italic" }}>
                "{svc.testimonial.text}"
              </p>
              <p style={{ fontSize: 12, fontWeight: 700, color: PINK, margin: 0 }}>— {svc.testimonial.author}</p>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 12 }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 36px rgba(233,30,140,0.45)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "15px",
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  color: "#fff", fontWeight: 800, fontSize: 15,
                  border: "none", borderRadius: 100, cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(233,30,140,0.35)",
                  letterSpacing: "0.02em",
                }}
              >
                Réserver ce service →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "15px 28px",
                  background: "transparent",
                  color: PINK, fontWeight: 700, fontSize: 15,
                  border: `1.5px solid ${PINK}`, borderRadius: 100, cursor: "pointer",
                }}
              >
                Nous contacter
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ svc, onOpen }: { svc: typeof services[0]; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        borderRadius: 22,
        overflow: "hidden",
        background: "#fff",
        boxShadow: hovered
          ? "0 24px 64px rgba(233,30,140,0.2), 0 6px 24px rgba(0,0,0,0.08)"
          : "0 4px 24px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.35s ease",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 190 }}>
        <motion.img
          src={svc.img}
          alt={svc.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(to bottom, rgba(233,30,140,0.08) 0%, rgba(0,0,0,0.45) 100%)"
            : "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)",
          transition: "background 0.4s ease",
        }} />
        {/* Icon badge */}
        <motion.div
          animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            position: "absolute", top: 14, left: 14,
            width: 46, height: 46, borderRadius: "50%",
            background: "linear-gradient(135deg, #e91e8c 0%, #f06292 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 18px rgba(233,30,140,0.55)",
          }}
        >
          <Icon d={icons[svc.icon as keyof typeof icons]} size={20} stroke="#fff" />
        </motion.div>
        {/* Tag */}
        {svc.tag && (
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            color: "#fff", fontSize: 11, fontWeight: 700,
            padding: "4px 10px", borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            {svc.tag}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 22px" }}>
        <h3 style={{ fontWeight: 800, fontSize: 16, color: DARK, marginBottom: 6, letterSpacing: "-0.01em" }}>
          {svc.title}
        </h3>
        <p style={{ fontSize: 13.5, color: "#888", lineHeight: 1.6, marginBottom: 16 }}>
          {svc.desc}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 11, color: "#bbb", display: "block", textTransform: "uppercase", letterSpacing: "0.07em" }}>À partir de</span>
            <span style={{ fontWeight: 900, fontSize: 17, color: PINK }}>
              {svc.price}
            </span>
          </div>
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              background: hovered ? "linear-gradient(135deg, #e91e8c, #c2185b)" : "transparent",
              color: hovered ? "#fff" : PINK,
              border: `1.5px solid ${PINK}`,
              borderRadius: 100, padding: "7px 16px",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              transition: "all 0.3s ease",
              letterSpacing: "0.03em",
            }}
          >
            Voir détails
            <Icon d={icons.arrow} size={13} stroke={hovered ? "#fff" : PINK} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -70 : 70 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      style={{
        display: "flex",
        flexDirection: isEven ? "row" : "row-reverse",
        borderRadius: 28,
        overflow: "hidden",
        background: "#fff",
        boxShadow: pkg.popular
          ? `0 12px 56px rgba(233,30,140,0.22), 0 4px 24px rgba(0,0,0,0.1)`
          : "0 8px 40px rgba(0,0,0,0.09)",
        border: pkg.popular ? `2px solid ${PINK}` : "none",
        minHeight: 300,
        position: "relative",
      }}
    >
      {pkg.popular && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #e91e8c, #c2185b)",
          color: "#fff", fontSize: 12, fontWeight: 800, padding: "5px 20px",
          borderRadius: 100, zIndex: 10, whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(233,30,140,0.4)",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          ⭐ Le plus populaire
        </div>
      )}

      {/* Photo side */}
      <div style={{ width: "40%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <motion.img
          src={pkg.img}
          alt={pkg.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7 }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(${isEven ? "to right" : "to left"}, transparent 55%, rgba(0,0,0,0.2))`,
        }} />
        {/* Price overlay */}
        <div style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 16, padding: "10px 22px",
          border: "1px solid rgba(255,255,255,0.3)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", margin: "0 0 2px", letterSpacing: "0.08em" }}>INVESTISSEMENT</p>
          <p style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0 }}>{pkg.badge}</p>
        </div>
      </div>

      {/* Content side */}
      <div style={{ flex: 1, padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{
            width: 8, height: 48, borderRadius: 4,
            background: pkg.gradient,
          }} />
          <div>
            <h3 style={{
              fontSize: 32, fontWeight: 900, color: DARK,
              letterSpacing: "-0.03em", fontFamily: "Georgia, serif",
              margin: 0, lineHeight: 1.1,
            }}>
              {pkg.name}
            </h3>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6, marginBottom: 22 }}>{pkg.desc}</p>

        <div style={{ display: "flex", gap: 36 }}>
          {pkg.cols.map((col, ci) => (
            <ul key={ci} style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {col.map((item, ii) => (
                <motion.li
                  key={ii}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + ii * 0.05 }}
                  style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#444" }}
                >
                  <span style={{
                    width: 19, height: 19, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${pkg.color}22, ${pkg.color}44)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon d={icons.check} size={10} stroke={pkg.color} strokeWidth={2.5} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${pkg.color}50` }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 26, padding: "13px 30px", alignSelf: "flex-start",
            background: pkg.gradient,
            color: "#fff", fontWeight: 700, fontSize: 14,
            border: "none", borderRadius: 100, cursor: "pointer",
            boxShadow: `0 4px 18px ${pkg.color}40`,
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          Choisir ce package
          <Icon d={icons.arrow} size={15} stroke="#fff" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Timeline Step ─────────────────────────────────────────────────────────────
function TimelineStep({ step, index, total }: { step: typeof timeline[0]; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            position: "absolute", top: 29, left: "60%", right: "-40%",
            height: 2,
            background: `linear-gradient(to right, ${PINK}, #f8bbd0)`,
            transformOrigin: "left center",
          }}
        />
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15, type: "spring", stiffness: 280, damping: 18 }}
        style={{
          width: 58, height: 58, borderRadius: "50%",
          background: "linear-gradient(135deg, #e91e8c, #f06292)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 28px rgba(233,30,140,0.45)",
          marginBottom: 18, zIndex: 1,
        }}
      >
        <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>{step.step}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.15 + 0.22 }}
        style={{ textAlign: "center", padding: "0 8px" }}
      >
        <p style={{ fontWeight: 800, fontSize: 15, color: DARK, marginBottom: 7 }}>{step.title}</p>
        <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>{step.desc}</p>
      </motion.div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function WeddingServices() {
  const [modalSvc, setModalSvc] = useState<typeof services[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(150deg, #fff0f7 0%, #fce4ec 55%, #f8bbd0 100%)",
        minHeight: 320,
      }}>
        {/* Animated blobs */}
        {[
          { w: 380, h: 380, top: -100, left: -80, opacity: 0.15, dur: 8 },
          { w: 240, h: 240, top: 40, right: 60, opacity: 0.12, dur: 10 },
          { w: 180, h: 180, bottom: -50, left: "38%", opacity: 0.1, dur: 7 },
        ].map((b, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", width: b.w, height: b.h,
              borderRadius: "50%", background: PINK,
              opacity: b.opacity, filter: "blur(60px)",
              top: b.top, left: b.left, right: (b as any).right, bottom: (b as any).bottom,
              pointerEvents: "none",
            }}
          />
        ))}
        {/* Floating petals */}
        {["🌸", "🌹", "🌸", "💐", "🌸", "🌹", "💮"].map((p, i) => (
          <motion.span
            key={i}
            style={{
              position: "absolute", left: `${6 + i * 13}%`,
              top: `${8 + (i % 3) * 28}%`,
              fontSize: 18 + (i % 3) * 8,
              opacity: 0.22, pointerEvents: "none",
            }}
            animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
          >
            {p}
          </motion.span>
        ))}

        <div style={{
          maxWidth: 1140, margin: "0 auto", padding: "56px 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 40, position: "relative", zIndex: 1,
        }}>
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 460 }}
          >
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "inline-block", marginBottom: 14,
                background: "rgba(233,30,140,0.1)",
                color: PINK, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "5px 16px", borderRadius: 100,
                border: "1px solid rgba(233,30,140,0.22)",
              }}
            >
              ✦ Wedding Planner Premium
            </motion.span>
            <h1 style={{
              fontSize: "clamp(46px, 6vw, 68px)",
              fontWeight: 900, lineHeight: 1.0,
              color: PINK, marginBottom: 16,
              fontFamily: "Georgia, 'Times New Roman', serif",
              textShadow: "0 4px 40px rgba(233,30,140,0.18)",
              letterSpacing: "-0.03em",
            }}>
              Nos<br />Services
            </h1>
            <div style={{
              width: 90, height: 3, marginBottom: 18,
              background: `linear-gradient(to right, ${PINK}, transparent)`,
              borderRadius: 2,
            }} />
            <p style={{ fontSize: 15.5, color: "#666", lineHeight: 1.75, maxWidth: 380 }}>
              Découvrez tous les services dont vous avez besoin pour faire de votre mariage un moment absolument inoubliable.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 10px 36px rgba(233,30,140,0.5)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "14px 34px",
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  color: "#fff", fontWeight: 800, fontSize: 15,
                  border: "none", borderRadius: 100, cursor: "pointer",
                  boxShadow: "0 6px 24px rgba(233,30,140,0.38)",
                  letterSpacing: "0.02em",
                }}
              >
                Découvrir nos services →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "14px 28px",
                  background: "transparent",
                  color: PINK, fontWeight: 700, fontSize: 15,
                  border: `1.5px solid ${PINK}`, borderRadius: 100, cursor: "pointer",
                }}
              >
                Nous contacter
              </motion.button>
            </div>
          </motion.div>

          {/* Right image + badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", flexShrink: 0 }}
          >
            <div style={{
              width: 380, height: 270, borderRadius: 26, overflow: "hidden",
              boxShadow: "0 28px 80px rgba(233,30,140,0.28), 0 6px 28px rgba(0,0,0,0.14)",
            }}>
              <img
                src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop&q=90"
                alt="Wedding ceremony"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              style={{
                position: "absolute", bottom: -22, left: -32,
                background: "#fff", borderRadius: 18,
                padding: "14px 20px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.16)",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>💍</span>
              <div>
                <p style={{ fontSize: 11, color: "#bbb", margin: "0 0 1px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Mariages réalisés</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: PINK, margin: 0 }}>+1 200</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{
                position: "absolute", top: -18, right: -24,
                background: "linear-gradient(135deg, #e91e8c, #f06292)",
                borderRadius: 16, padding: "10px 16px",
                boxShadow: "0 6px 24px rgba(233,30,140,0.45)",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <span style={{ fontSize: 20 }}>⭐</span>
              <div>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", margin: "0 0 1px" }}>Satisfaction</p>
                <p style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: 0 }}>98%</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #fce4ec",
        borderTop: "1px solid #fce4ec",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 48px" }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{
                  textAlign: "center", padding: "12px 16px",
                  borderRight: i < 3 ? "1px solid #fce4ec" : "none",
                }}
              >
                <span style={{ fontSize: 26, display: "block", marginBottom: 4 }}>{s.emoji}</span>
                <p style={{ fontSize: 26, fontWeight: 900, color: PINK, margin: "0 0 2px", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "88px 48px 70px" }}>
        <SectionTitle sub="Tout ce dont vous avez besoin pour un mariage parfait">
          Tous nos services
        </SectionTitle>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} onOpen={() => setModalSvc(svc)} />
          ))}
        </motion.div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(140deg, #fff0f7 0%, #fce4ec 100%)",
        padding: "80px 48px",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle sub="Un processus simple et transparent en 4 étapes">
            Comment ça marche ?
          </SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            {timeline.map((step, i) => (
              <TimelineStep key={i} step={step} index={i} total={timeline.length} />
            ))}
          </div>
        </div>
      </div>

      {/* ── PACKAGES ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "88px 48px 70px" }}>
        <SectionTitle sub="Des formules complètes pour chaque envie et chaque budget">
          Nos Packages
        </SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {packages.map((pkg, i) => (
            <PackageCard key={i} pkg={pkg} index={i} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 48px 100px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {/* Contact card */}
          <div style={{
            background: "#fff", borderRadius: 24, padding: "36px",
            border: "1px solid #fce4ec",
            boxShadow: "0 4px 28px rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "linear-gradient(135deg, #e91e8c, #f06292)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 18px rgba(233,30,140,0.35)",
              }}>
                <Icon d={icons.headset} size={24} stroke="#fff" />
              </div>
              <div>
                <h4 style={{ fontSize: 20, fontWeight: 800, color: DARK, margin: 0 }}>Besoin d'aide ?</h4>
                <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>Notre équipe est disponible 7j/7</p>
              </div>
            </div>
            <p style={{ fontSize: 14.5, color: "#777", lineHeight: 1.7, marginBottom: 24 }}>
              Notre équipe de conseillers dédiés est à votre écoute pour vous accompagner tout au long de votre projet.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 6px 24px rgba(233,30,140,0.32)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "13px",
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  color: "#fff", fontWeight: 700, fontSize: 14,
                  border: "none", borderRadius: 100, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}
              >
                <Icon d={icons.phone} size={15} stroke="#fff" />
                Appeler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "13px",
                  background: "transparent",
                  color: PINK, fontWeight: 700, fontSize: 14,
                  border: `1.5px solid ${PINK}`, borderRadius: 100, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}
              >
                <Icon d={icons.mail} size={15} stroke={PINK} />
                Email
              </motion.button>
            </div>
          </div>

          {/* Promo card */}
          <motion.div
            style={{
              background: "linear-gradient(135deg, #e91e8c 0%, #880e4f 100%)",
              borderRadius: 24, padding: "36px",
              boxShadow: "0 12px 48px rgba(233,30,140,0.4)",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: -30, left: "25%", width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", top: 30, right: 30, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <motion.span
                  animate={{ rotate: [0, 18, -12, 0], scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                  style={{ fontSize: 34 }}
                >🎁</motion.span>
                <div>
                  <h4 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>Offre spéciale</h4>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0 }}>Durée limitée</p>
                </div>
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                borderRadius: 14, padding: "10px 20px", marginBottom: 14,
              }}>
                <span style={{ fontSize: 46, fontWeight: 900, color: "#fff", lineHeight: 1 }}>-10%</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>sur tous<br />les services</span>
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, marginBottom: 22 }}>
                Profitez de <strong>10% de réduction</strong> sur l'ensemble de nos prestations pour toute réservation avant le <strong>30 Juin 2025</strong>.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.32)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 30px",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  color: "#fff", fontWeight: 800, fontSize: 14,
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  borderRadius: 100, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                En profiter maintenant
                <Icon d={icons.arrow} size={15} stroke="#fff" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── MODAL ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalSvc && (
          <ServiceModal svc={modalSvc} onClose={() => setModalSvc(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}