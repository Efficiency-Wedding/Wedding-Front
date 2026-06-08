import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import type { Screen } from "../../types";
import { HERO_IMAGE, GALLERY_ITEMS } from "../../data";
import type { GalleryItem } from "../../data";
import { Camera, MapPin, Heart, ChevronLeft, ChevronRight, X, Sparkles, SlidersHorizontal } from "lucide-react";
import Button from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa";

// Strong ease-out curve for high-end UI feel
const EASE_OUT = [0.23, 1, 0.32, 1];

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
    <div className="bg-background min-h-screen text-gray-900">
      {/* 1. HERO HEADER - Bolder, integrated look */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: EASE_OUT }}
            src={HERO_IMAGE}
            alt="Galerie de mariage"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="space-y-4"
          >
            <span className="text-xs font-bold tracking-[0.4em] text-white uppercase bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              Portfolio d'exception
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Galerie <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">D'Émotions</span>
            </h1>
            <p className="text-white/80 font-medium tracking-wide max-w-xl mx-auto text-sm md:text-base">
              Capturer l'invisible, immortaliser l'éphémère. Découvrez nos plus belles réalisations à Madagascar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER & INTRO - Matching Home section pattern */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center text-sm font-semibold text-primary mb-6">
                <span>02</span>
                <span className="mx-3 w-32 md:w-64 border-b border-dotted border-primary/40" />
                <span>Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Souvenirs Élégants & <br />Instants de Grâce
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 active:scale-[0.96] cursor-pointer ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-900 bg-gray-100/50"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gray-900 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. EDITORIAL GRID - Integrated look, no card borders */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // High-end editorial grid spans
              const spans = [
                "md:col-span-4 aspect-[3/4]",
                "md:col-span-8 aspect-[16/9]",
                "md:col-span-6 aspect-square",
                "md:col-span-6 aspect-[4/5]",
                "md:col-span-8 aspect-[16/10]",
                "md:col-span-4 aspect-[3/4]",
              ];
              const spanClass = spans[idx % spans.length] || "md:col-span-4 aspect-square";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: EASE_OUT,
                    delay: idx % 6 * 0.05 // Subtle stagger
                  }}
                  key={item.id}
                  className={`${spanClass} col-span-2 group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer active:scale-[0.98] transition-transform duration-300`}
                  onClick={() => openLightbox(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle Elegant Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="space-y-2"
                    >
                      <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase font-bold">
                        {categories.find(c => c.id === item.category)?.label}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
            <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Aucune image trouvée</h3>
            <p className="text-gray-500 mt-2">Nous préparons de nouveaux souvenirs pour cette catégorie.</p>
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX MODAL - Minimalist and high-end */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 z-55 p-4 rounded-full bg-gray-900 text-white hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 group">
                <motion.img
                  key={selectedImage.id}
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain rounded-3xl shadow-2xl"
                />
                
                <div className="absolute inset-y-0 -left-6 md:-left-12 flex items-center">
                  <button onClick={handlePrev} className="p-4 rounded-full bg-white shadow-lg hover:scale-110 active:scale-90 transition-all text-gray-900">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute inset-y-0 -right-6 md:-right-12 flex items-center">
                  <button onClick={handleNext} className="p-4 rounded-full bg-white shadow-lg hover:scale-110 active:scale-90 transition-all text-gray-900">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-full md:w-80 space-y-6"
              >
                <div>
                  <span className="text-[10px] tracking-[0.4em] text-primary uppercase font-bold block mb-2">
                    {categories.find(c => c.id === selectedImage.category)?.label}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {selectedImage.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{selectedImage.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-sm italic">
                  "{selectedImage.description}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => toggleLike(selectedImage.id, e)}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 transition-all group font-bold text-xs uppercase tracking-widest"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        likedItems.includes(selectedImage.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                    />
                    <span>{likedItems.includes(selectedImage.id) ? "Ajouté" : "Coup de cœur"}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. CALL TO ACTION - Using shared Button component */}
      <section className="bg-primary-light py-24 md:py-32 text-center mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm">
              <Heart className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter uppercase leading-[0.9]">
              Votre Histoire <br />
              <span className="text-primary">Commence Ici</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-xl mx-auto font-medium">
              Confiez-nous l'organisation de votre mariage et laissez-vous porter par la magie de l'instant.
            </p>
            <div className="pt-6">
              <Link to="/contact">
                <Button 
                  text="Réserver votre Date" 
                  icon={FaArrowRight}
                  className="px-12 py-5 text-sm tracking-[0.2em] uppercase"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
