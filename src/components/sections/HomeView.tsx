/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Screen } from '../../types';
import { HERO_IMAGE, FIELD_IMAGE_LEFT, FLOWERS_IMAGE_RIGHT } from '../../data';
import { Heart, Stars, ArrowRight, Award, Flame } from 'lucide-react';

interface HomeProps {
  setScreen: (screen: Screen) => void;
}

export default function HomeView({ setScreen }: HomeProps) {
  // Select specific elements for grid from data
  const gridImages = [
    {
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800',
      alt: 'Couple se tenant la main dans un champ de blé ensoleillé',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
      alt: 'Table de réception de mariage élégante avec compositions florales',
    },
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      alt: 'Autel de cérémonie de mariage romantique avec fleurs blanches',
    },
    {
      src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
      alt: 'Portrait de mariée avec bouquet',
    }
  ];

  return (
    <div className="bg-[#fcfaf7] text-[#4a4238]">
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[60vh] md:h-[82vh] overflow-hidden group">
        {/* Background Image with elegant fade-in-zoom */}
        <div className="absolute inset-0 transition-transform duration-[8000ms] ease-out scale-100 group-hover:scale-105">
          <img
            src={HERO_IMAGE}
            alt="Organisation de mariage et design romantique"
            className="w-full h-full object-cover object-center brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Subtle warm overlay to mimic authentic camera film shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>

        {/* Floating Titles */}
        <div className="absolute inset-0 flex flex-col justify-end items-center text-center pb-12 md:pb-24 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-extralight text-white tracking-[0.16em] uppercase leading-tight max-w-5xl animate-fadeIn">
            ORGANISATION DE MARIAGE
            <span className="block italic font-light text-3xl sm:text-4.5xl md:text-6xl tracking-[0.12em] normal-case mt-2">
              & Design d'Événement
            </span>
          </h2>
          <div className="w-16 h-[1.5px] bg-white/60 mx-auto my-6"></div>
          <p className="text-xs sm:text-sm tracking-[0.35em] text-white/90 font-sans uppercase font-medium">
            MADAGASCAR · INTERNATIONAL
          </p>
        </div>
      </section>

      {/* 2. EFFICIENCY CURATION INTRO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
        <h3 className="text-2xl md:text-3.5xl font-serif italic text-[#8c8273] tracking-[0.15em] mb-3">
          Efficiency
        </h3>
        <h4 className="text-xl sm:text-2xl md:text-3.5xl font-serif font-light text-[#4a4238] tracking-[0.22em] uppercase leading-relaxed max-w-4xl mx-auto mb-5">
          CRÉATEUR DE VOS PLUS BEAUX SOUVENIRS
        </h4>
        <p className="text-[10px] sm:text-xs tracking-[0.25em] text-[#b09688] font-sans uppercase font-semibold mb-6">
          PLANIFIONS UN MARIAGE QUI VOUS RESSEMBLE
        </p>
        <div className="w-20 h-[1.5px] bg-[#e6dfd5] mx-auto mb-16"></div>

        {/* Dynamic split row: Field image on the Left, Typography blocks on the Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center text-left">
          {/* Image Left */}
          <div className="md:col-span-6 overflow-hidden shadow-sm aspect-[4/5] bg-[#f5ede4]">
            <img
              src={FIELD_IMAGE_LEFT}
              alt="Couple romantique marchant main dans la main dans un champ"
              className="w-full h-full object-cover hover:scale-103 transition-transform duration-[3000ms]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Copywrite Right */}
          <div className="md:col-span-6 flex flex-col justify-center space-y-7">
            {/* Elegant Quotation block inside custom borders */}
            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#b09688] leading-relaxed relative pl-4 border-l-2 border-[#b09688]/40">
              “Votre mariage est le jour où vous exprimez votre amour avec un style inoubliable !”
            </blockquote>

            <div className="space-y-4 text-sm md:text-[14.5px] leading-relaxed text-[#6b6050] font-sans font-normal font-light">
              <p>
                En tant qu'agence d'organisation de mariages et d'événements, nous aimons créer des expériences sur mesure axées sur les détails personnels. Ces détails rendent votre mariage unique et personnalisé à votre image.
              </p>
              <h5 className="font-sans font-semibold tracking-[0.15em] text-[#4a4238] text-xs pt-4 uppercase">
                UNE GRANDE VISION ? NOUS SOMMES LÀ !
              </h5>
              <p>
                Nous adorons accompagner les couples qui ont une grande vision et un amour profond l'un pour l'autre. Nous pensons que votre mariage doit être sans stress, digne de Pinterest et rester gravé dans les mémoires pendant des années !
              </p>
            </div>

            {/* Dusty Rose block button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setScreen('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#b3998d] hover:bg-[#a28475] text-[#fcfaf7] px-8 py-3.5 text-[11px] tracking-[0.25em] font-sans uppercase font-medium transition-all duration-300 shadow-sm inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>NOS SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WEDDINGWIRE / THE KNOT AS SEEN IN BADGE STRIP */}
      <section className="relative w-full py-16 md:py-20 bg-gradient-to-b from-[#fdfbf9] to-[#f5eee4] border-y border-[#e6dfd5]/40 overflow-hidden">
        {/* Decorative subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Subtle Elegant Header */}
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.35em] text-[#b09688] font-sans uppercase font-bold block mb-2">
              Reconnaissances & Excellence
            </span>
            <div className="w-8 h-[1px] bg-[#c5a880]/50 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center justify-center">
            {/* Badge 1: WeddingWire */}
            <div className="group flex flex-col items-center text-center p-6 bg-[#fcfaf7]/50 backdrop-blur-xs border border-[#e6dfd5]/40 hover:border-[#c5a880]/40 rounded-xl transition-all duration-500 hover:shadow-lg hover:shadow-[#c5a880]/5 hover:-translate-y-1">
              {/* Badge Crest */}
              <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#c5a880]/30 group-hover:rotate-45 transition-transform duration-1000"></div>
                {/* Inner Ring */}
                <div className="absolute inset-1.5 rounded-full border border-[#c5a880]/20"></div>
                {/* Subtle Gold Fill */}
                <div className="absolute inset-2 bg-gradient-to-br from-[#c5a880]/5 to-transparent rounded-full"></div>
                {/* Icon */}
                <Award className="w-7 h-7 text-[#c5a880] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-xs tracking-[0.25em] font-sans uppercase font-bold text-[#4a4238] group-hover:text-[#b09688] transition-colors duration-300">
                WEDDINGWIRE
              </h4>
              <p className="text-[9px] tracking-[0.15em] text-[#8c8273] font-sans uppercase font-medium mt-1">
                Couples' Choice Awards
              </p>
              {/* Subtle accent line */}
              <div className="w-6 h-[1px] bg-[#c5a880]/30 mt-3 group-hover:w-10 transition-all duration-500"></div>
            </div>

            {/* Badge 2: The Knot */}
            <div className="group flex flex-col items-center text-center p-6 bg-[#fcfaf7]/50 backdrop-blur-xs border border-[#e6dfd5]/40 hover:border-[#c5a880]/40 rounded-xl transition-all duration-500 hover:shadow-lg hover:shadow-[#c5a880]/5 hover:-translate-y-1">
              {/* Badge Crest */}
              <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-[#c5a880]/30 group-hover:scale-105 transition-all duration-500"></div>
                {/* Laurel Leaves SVG in background */}
                <svg className="absolute w-16 h-16 text-[#c5a880]/35 group-hover:text-[#c5a880]/50 group-hover:rotate-12 transition-all duration-1000" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" />
                  <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" />
                  <path d="M12 2v4M2 12h4M12 22v-4M22 12h-4" />
                </svg>
                {/* Icon */}
                <Stars className="w-7 h-7 text-[#c5a880] group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <h4 className="text-xs tracking-[0.25em] font-sans uppercase font-bold text-[#4a4238] group-hover:text-[#b09688] transition-colors duration-300">
                THE KNOT
              </h4>
              <p className="text-[9px] tracking-[0.15em] text-[#8c8273] font-sans uppercase font-medium mt-1">
                Best of Weddings
              </p>
              <div className="w-6 h-[1px] bg-[#c5a880]/30 mt-3 group-hover:w-10 transition-all duration-500"></div>
            </div>

            {/* Badge 3: Best of 2026 */}
            <div className="group flex flex-col items-center text-center p-6 bg-[#fcfaf7]/50 backdrop-blur-xs border border-[#e6dfd5]/40 hover:border-[#c5a880]/40 rounded-xl transition-all duration-500 hover:shadow-lg hover:shadow-[#c5a880]/5 hover:-translate-y-1">
              {/* Badge Crest */}
              <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#c5a880]/30 group-hover:rotate-[-45deg] transition-transform duration-1000"></div>
                {/* Octagonal decorative border SVG */}
                <svg className="absolute w-14 h-14 text-[#c5a880]/25 group-hover:scale-110 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
                </svg>
                {/* Icon */}
                <Flame className="w-7 h-7 text-[#c5a880] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-xs tracking-[0.25em] font-sans uppercase font-bold text-[#4a4238] group-hover:text-[#b09688] transition-colors duration-300">
                BEST OF 2026
              </h4>
              <p className="text-[9px] tracking-[0.15em] text-[#8c8273] font-sans uppercase font-medium mt-1">
                Prestige & Excellence
              </p>
              <div className="w-6 h-[1px] bg-[#c5a880]/30 mt-3 group-hover:w-10 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. FOUR GRAPH GRID SECTION */}
      <section className="w-full py-8 md:py-12 bg-[#fcfaf7]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 max-w-7xl mx-auto">
          {gridImages.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] overflow-hidden group shadow-sm bg-[#f5ede4] cursor-pointer"
              onClick={() => {
                setScreen('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-104 grayscale-[20%] group-hover:grayscale-0 group-hover:brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#4a4238]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                <span className="text-white text-[10px] tracking-[0.3em] uppercase bg-black/40 backdrop-blur-xs px-3 py-1.5 font-sans">
                  VOIR L'HISTOIRE
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHO WE ARE & ACCENT ROSES PORTRAIT */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Main Info Left */}
          <div className="md:col-span-6 flex flex-col space-y-6">
            <h3 className="text-3xl sm:text-4.5xl font-serif font-light text-[#4a4238] tracking-[0.2em] uppercase">
              QUI SOMMES-NOUS
            </h3>
            <p className="text-[10px] tracking-[0.25em] text-[#b09688] font-sans uppercase font-bold">
              SPÉCIALISÉS DANS LES DÉTAILS UNIQUES,
            </p>
            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#6b6050] leading-relaxed relative pl-4 border-l-2 border-[#e3dacd]">
              “une réflexion hors des sentiers battus, féerique, audacieuse et un design qui vous est propre.”
            </blockquote>

            <div className="space-y-4 text-sm md:text-[14.5px] leading-relaxed text-[#6b6050] font-sans font-light">
              <p>
                Efficiency est là pour transformer votre vision en une réalité de rêve. Une réalité qui vous est personnelle et possède ces éléments spéciaux qui feront de votre journée un moment d'exception.
              </p>
              <p>
                Nous combinons notre expertise en planification et notre passion pour le design afin de concevoir des mariages avec un effet "WAOUH".
              </p>
              <p>
                Dirigée par une équipe de professionnels chevronnés avec plus de 10 ans d'expérience dans l'industrie, notre équipe talentueuse est prête à vous guider à chaque étape du chemin.
              </p>
            </div>

            {/* Dusty Rose block button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setScreen('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#b3998d] hover:bg-[#a28475] text-[#fcfaf7] px-8 py-3.5 text-[11px] tracking-[0.25em] font-sans uppercase font-medium transition-all duration-300 shadow-sm inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>À PROPOS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Gorgeous flowers on the Right */}
          <div className="md:col-span-6 overflow-hidden shadow-md aspect-[4/5] bg-[#f5ede4]">
            <img
              src={FLOWERS_IMAGE_RIGHT}
              alt="Magnifique bouquet de roses de mariage roses et crème"
              className="w-full h-full object-cover hover:scale-103 transition-transform duration-[3500ms]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION INTERACTIVE INVITATION */}
      <section className="bg-[#f0eae1] py-16 text-center border-t border-[#e2dbch]/40">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <Heart className="w-6 h-6 text-[#b09688] mx-auto animate-pulse" />
          <h4 className="text-2xl sm:text-3xl font-serif text-[#4a4238] tracking-[0.15em] uppercase">
            Organisons Votre Célébration
          </h4>
          <p className="font-serif italic text-base text-[#6b6050] max-w-xl mx-auto">
            Que vous imaginiez un mariage intime au bord de l'eau, un grand gala dans une salle de bal historique ou une célébration industrielle féerique, nous avons hâte de rendre ce moment serein et mémorable.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setScreen('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#4a4238] hover:bg-[#6b6050] text-[#fcfaf7] px-10 py-4 text-xs tracking-[0.25em] font-sans uppercase font-medium transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              DEMANDER UNE CONSULTATION
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
