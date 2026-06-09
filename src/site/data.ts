import mar1 from "../assets/mar1.jpg";
import mar2 from "../assets/mar2.jpg";
import mar3 from "../assets/mar3.jpg";
import mar4 from "../assets/mar4.jpg";
import mar5 from "../assets/mar5.jpg";
import mar6 from "../assets/mar6.jpg";
import mar7 from "../assets/mar7.jpg";
import mar8 from "../assets/mar8.jpg";
import mar9 from "../assets/mar9.jpg";
import mar10 from "../assets/mar10.jpg";
import mar11 from "../assets/mar11.jpg";
import mar12 from "../assets/mar12.jpg";
import mar13 from "../assets/mar13.jpg";
import mar14 from "../assets/mar14.jpg";
import mar15 from "../assets/mar15.jpg";
import mar16 from "../assets/mar16.jpg";
import mar17 from "../assets/mar17.jpg";

export const HERO_IMAGE = mar12;
export const FIELD_IMAGE_LEFT = mar2;
export const FLOWERS_IMAGE_RIGHT = mar3;

export interface GalleryItem {
  id: number;
  src: string;
  category: "ceremonie" | "reception" | "decoration" | "portraits";
  title: string;
  description: string;
  location: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: mar1,
    category: "ceremonie",
    title: "Célébration en Plein Air",
    description: "Une union magique sous un arche fleuri surplombant les collines.",
    location: "Antananarivo, Madagascar",
  },
  {
    id: 2,
    src: mar2,
    category: "portraits",
    title: "Regards Complices",
    description: "Instant volé entre les jeunes mariés lors de leur séance couple.",
    location: "Ecolodge du Lac",
  },
  {
    id: 3,
    src: mar3,
    category: "decoration",
    title: "Art Floral",
    description: "Détails délicats de roses pastel et d'eucalyptus frais.",
    location: "Salle de Bal Plume",
  },
  {
    id: 4,
    src: mar4,
    category: "reception",
    title: "Dîner sous les Étoiles",
    description: "Une ambiance lumineuse magique avec guirlandes guinguettes.",
    location: "Jardins d'Ambohimanga",
  },
  {
    id: 5,
    src: mar5,
    category: "ceremonie",
    title: "L'Échange des Vœux",
    description: "Moment solennel rempli d'émotions et de promesses éternelles.",
    location: "Cathédrale d'Andohalo",
  },
  {
    id: 6,
    src: mar6,
    category: "decoration",
    title: "Détails de Table",
    description: "Vaisselle fine, bougies dorées et menus imprimés sur papier de soie.",
    location: "Hôtel Colbert",
  },
  {
    id: 7,
    src: mar7,
    category: "portraits",
    title: "L'Arrivée Triomphante",
    description: "Sourires radieux sous une pluie de pétales de roses.",
    location: "Jardins du Palais",
  },
  {
    id: 8,
    src: mar8,
    category: "reception",
    title: "La Première Danse",
    description: "Ouverture du bal romantique sous une lumière tamisée.",
    location: "Palissandre Maison d'Hôtes",
  },
  {
    id: 9,
    src: mar9,
    category: "decoration",
    title: "L'Arche Cérémonielle",
    description: "Structure en bois flotté habillée de voilages blancs et pivoines.",
    location: "Plage d'Anakao",
  },
  {
    id: 10,
    src: mar10,
    category: "ceremonie",
    title: "Le Baiser",
    description: "Le premier baiser officiel célébré sous les applaudissements des invités.",
    location: "Nosy Be",
  },
  {
    id: 11,
    src: mar11,
    category: "portraits",
    title: "Préparatifs de la Mariée",
    description: "Derniers ajustements de la robe de mariée en dentelle fine.",
    location: "Villa Mandrose",
  },
  {
    id: 12,
    src: mar13,
    category: "reception",
    title: "La Pièce Montée",
    description: "Un gâteau de mariage élégant orné de fleurs naturelles.",
    location: "Le Grand Hôtel",
  },
  {
    id: 13,
    src: mar14,
    category: "ceremonie",
    title: "Cortège Joyeux",
    description: "Les demoiselles d'honneur accompagnant la mariée.",
    location: "Domaine de l'Ermitage",
  },
  {
    id: 14,
    src: mar15,
    category: "portraits",
    title: "Sérénade d'Amour",
    description: "Séance photo au coucher de soleil sur la plage.",
    location: "Sainte Marie",
  },
  {
    id: 15,
    src: mar16,
    category: "decoration",
    title: "Espace Lounge d'Extérieur",
    description: "Canapés en rotin et coussins en lin pour un espace de détente chic.",
    location: "Mantadia Lodge",
  },
  {
    id: 16,
    src: mar17,
    category: "reception",
    title: "Toast de Célébration",
    description: "Flûtes de champagne levées en l'honneur des nouveaux mariés.",
    location: "Royal Palissandre",
  }
];
