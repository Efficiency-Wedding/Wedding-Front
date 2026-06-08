import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import type { Screen } from "../../types";
import { HERO_IMAGE, GALLERY_ITEMS } from "../../data";
import type { GalleryItem } from "../../data";
import { Camera, MapPin, Heart, ChevronLeft, ChevronRight, X, ArrowRight, Sparkles, SlidersHorizontal } from "lucide-react";

// HomeProps type left for backward compatibility or signature satisfaction if imported elsewhere
interface HomeProps {
  setScreen?: (screen: Screen) => void;
}

export default function GalleryPage({}: HomeProps = {}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Filter items
  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  // Open Lightbox
  const openLightbox = (item: GalleryItem) => {
    const index = filteredItems.findIndex(fi => fi.id === item.id);
    setSelectedIndex(index !== -1 ? index : 0);
    setSelectedImage(item);
  };

  // Lightbox Navigation
  const handleNext = () => {
    if (filteredItems.length === 0) return;
    const nextIndex = (selectedIndex + 1) % filteredItems.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    const prevIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex]);
  };

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedIndex, filteredItems]);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: "all", label: "Tous" },
    { id: "ceremonie", label: "Cérémonie" },
    { id: "reception", label: "Réception" },
    { id: "decoration", label: "Décoration" },
    { id: "portraits", label: "Portraits" }
  ];

  return (
    <div className="bg-background min-h-screen text-foreground pt-20">
      {/* 1. HERO HEADER */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden group">
        <div className="absolute inset-0 transition-transform duration-[8000ms] ease-out scale-100 group-hover:scale-105">
          <img
            src={HERO_IMAGE}
            alt="Galerie de mariage d'exception"
            className="w-full h-full object-cover object-center brightness-90 animate-fadeIn"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/45 to-black/35"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-[10px] font-sans tracking-[0.3em] text-white uppercase font-bold">Nos plus belles histoires</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-white tracking-[0.12em] uppercase leading-tight max-w-5xl">
            Galerie d'Art
            <span className="block font-script text-4xl sm:text-5xl md:text-7xl tracking-normal text-accent normal-case mt-3">
              & Émotions Partagées
            </span>
          </h1>
          <div className="w-16 h-[1.5px] bg-accent/70 mx-auto my-6"></div>
          <p className="text-sm sm:text-base md:text-lg tracking-wide text-white/90 font-serif italic max-w-2xl">
            Chaque image raconte une histoire singulière, chaque sourire capture un instant d'éternité.
          </p>
        </div>
      </section>

      {/* 2. INTRO & FILTER CONTAINER */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-8 mb-12">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-secondary uppercase font-bold block mb-2">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-serif font-light tracking-wide">
              Souvenirs d'Élégance
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              Explorez nos réalisations classées par catégories. Laissez-vous inspirer par nos créations uniques et raffinées pour concevoir votre propre univers.
            </p>
          </div>

          {/* Elegant Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2 font-medium tracking-wider uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtrer:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs font-sans tracking-widest uppercase rounded-full transition-all duration-500 cursor-pointer ${
                  activeCategory === cat.id
                    ? "text-secondary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-secondary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. DYNAMIC MASONRY/GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // Custom spanning logic to create a more dynamic and organic Pinterest-style layout
              let spanClass = "col-span-1";
              let aspectClass = "aspect-[3/4]"; // standard portrait

              // Pattern for variety
              if (idx % 5 === 1) {
                aspectClass = "aspect-square"; // square
              } else if (idx % 5 === 3) {
                spanClass = "col-span-1 md:col-span-2";
                aspectClass = "aspect-[16/10]"; // landscape wide
              }

              const isLiked = likedItems.includes(item.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  key={item.id}
                  className={`${spanClass} group relative overflow-hidden rounded-2xl bg-card border border-border shadow-xs hover:shadow-2xl transition-all duration-700 cursor-pointer`}
                  onClick={() => openLightbox(item)}
                >
                  {/* Image Container */}
                  <div className={`w-full ${aspectClass} overflow-hidden bg-muted`}>
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      {/* Category Badge */}
                      <span className="text-[10px] tracking-widest text-accent uppercase font-bold mb-2 inline-block">
                        {categories.find(c => c.id === item.category)?.label}
                      </span>
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-serif text-white tracking-wide leading-tight mb-2">
                        {item.title}
                      </h3>
                      {/* Metadata Row */}
                      <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/20">
                        <div className="flex items-center gap-1 text-[11px] text-white/85 font-sans tracking-wide">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleLike(item.id, e)}
                            className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-xs text-white transition-all cursor-pointer"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 transition-colors duration-300 ${
                                isLiked ? "fill-red-500 text-red-500" : "text-white"
                              }`}
                            />
                          </button>
                          <div className="p-1.5 rounded-full bg-accent hover:bg-accent/80 text-secondary-foreground transition-all">
                            <Camera className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile details (when overlay is hidden or on touch screen) */}
                  <div className="p-4 block group-hover:hidden md:hidden bg-card border-t border-border/40">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] tracking-widest text-rose uppercase font-bold block mb-1">
                          {categories.find(c => c.id === item.category)?.label}
                        </span>
                        <h4 className="text-sm font-serif font-semibold text-foreground tracking-wide line-clamp-1">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-sans">
                        <MapPin className="w-3 h-3 text-rose" />
                        <span>{item.location.split(",")[0]}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border mt-6">
            <Camera className="w-12 h-12 text-muted-foreground/60 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-medium text-muted-foreground">Aucune image trouvée</h3>
            <p className="text-xs text-muted-foreground/80 mt-1">Nous ajouterons bientôt de superbes souvenirs dans cette catégorie.</p>
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-md border border-white/10"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main content container */}
            <div
              className="relative max-w-5xl w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image box */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl">
                <motion.img
                  key={selectedImage.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                />

                {/* Left/Right controls (Overlay on image desktop, simple bottom bar on mobile) */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all cursor-pointer border border-white/5 backdrop-blur-xs hover:scale-105"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all cursor-pointer border border-white/5 backdrop-blur-xs hover:scale-105"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Description Panel */}
              <motion.div
                key={`desc-${selectedImage.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="w-full max-w-3xl mt-4 px-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
                    <span className="text-[10px] tracking-widest text-accent uppercase font-extrabold bg-accent/20 px-2.5 py-0.5 rounded-full">
                      {categories.find(c => c.id === selectedImage.category)?.label}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-white/75 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{selectedImage.location}</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif tracking-wide text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-1 font-sans font-light max-w-xl">
                    {selectedImage.description}
                  </p>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0">
                  <button
                    onClick={(e) => toggleLike(selectedImage.id, e)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-sm"
                  >
                    <Heart
                      className={`w-4.5 h-4.5 transition-colors duration-300 ${
                        likedItems.includes(selectedImage.id) ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                    <span>{likedItems.includes(selectedImage.id) ? "Aimé" : "J'aime"}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. CALL TO ACTION */}
      <section className="bg-primary-light/50 py-20 text-center border-t border-border mt-16">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <div className="w-12 h-12 rounded-full bg-rose-soft flex items-center justify-center mx-auto text-rose animate-pulse">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide uppercase">
            Écrivons Votre Prochaine Histoire
          </h3>
          <p className="font-serif italic text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Vous rêvez d'un mariage qui dépasse vos espérances ? Confiez-nous vos projets, et créons ensemble des moments inoubliables.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="bg-secondary hover:bg-rose-light text-secondary-foreground px-10 py-4 text-xs tracking-[0.25em] font-sans uppercase font-medium transition-all duration-300 inline-flex items-center gap-2.5 rounded-full shadow-lg shadow-rose/10 hover:shadow-xl hover:shadow-rose/20 cursor-pointer group"
            >
              <span>Demander une Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
