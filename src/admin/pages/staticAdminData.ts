import type { Article, Pack, Reservation, Service } from "../lib/api";

export const staticServices: Service[] = [
  {
    id: 1,
    nom: "Coordination du Jour J",
    slug: "coordination-jour-j",
    description_courte:
      "Gestion complète du planning et des prestataires le jour de l'événement.",
    description_complete:
      "Accompagnement personnalisé le jour J, coordination des prestataires, accueil des invités et gestion des imprévus.",
    prix_indicatif: 450000,
    prix_formate: "450 000 MGA",
    image_principale: null,
    image_url:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    statut: "ACTIF",
    created_at: "2026-06-01T10:00:00Z",
    updated_at: "2026-06-01T10:00:00Z",
  },
  {
    id: 2,
    nom: "Décoration sur-mesure",
    slug: "decoration-sur-mesure",
    description_courte: "Création d'une ambiance unique selon votre thème.",
    description_complete:
      "Conception et réalisation de la décoration, coordination de couleurs, fleurs et ambiances lumineuses.",
    prix_indicatif: 320000,
    prix_formate: "320 000 MGA",
    image_principale: null,
    image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    statut: "ACTIF",
    created_at: "2026-06-02T09:00:00Z",
    updated_at: "2026-06-02T09:00:00Z",
  },
  {
    id: 3,
    nom: "Animation & musique",
    slug: "animation-musique",
    description_courte: "Animation DJ ou live band pour ambiancer la soirée.",
    description_complete:
      "Sélection musicale sur mesure, animation de la soirée et coordination avec les artistes.",
    prix_indicatif: 280000,
    prix_formate: "280 000 MGA",
    image_principale: null,
    image_url:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    statut: "INACTIF",
    created_at: "2026-06-02T12:00:00Z",
    updated_at: "2026-06-02T12:00:00Z",
  },
];

export const staticPacks: Pack[] = [
  {
    id: 1,
    nom: "Pack Classique",
    description:
      "Décoration, coordination et accueil des invités pour une cérémonie fluide.",
    prix: 950000,
    image_principale: null,
    statut: "ACTIF",
    services: [staticServices[0], staticServices[1]],
    created_at: "2026-06-03T08:00:00Z",
    updated_at: "2026-06-03T08:00:00Z",
  },
  {
    id: 2,
    nom: "Pack Luxe",
    description:
      "Organisation premium avec décoration exclusive et animations haut de gamme.",
    prix: 1850000,
    image_principale: null,
    statut: "ACTIF",
    services: [staticServices[0], staticServices[1], staticServices[2]],
    created_at: "2026-06-03T09:00:00Z",
    updated_at: "2026-06-03T09:00:00Z",
  },
];

export const staticArticles: Article[] = [
  {
    id: 1,
    titre: "Top 5 des thèmes de mariage 2026",
    slug: "top-5-themes-mariage-2026",
    image: null,
    image_url:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80",
    contenu:
      "Découvrez les thèmes les plus demandés pour les mariages de 2026 : bohème, chic minimaliste, tropical, vintage et festif.",
    statut: "PUBLIE",
    date_publication: "2026-05-28",
    created_at: "2026-05-20T07:00:00Z",
    updated_at: "2026-05-25T11:30:00Z",
  },
  {
    id: 2,
    titre: "Comment choisir le bon lieu de réception",
    slug: "choisir-lieu-reception",
    image: null,
    image_url:
      "https://images.unsplash.com/photo-1508610048659-a06a9f9d3d52?auto=format&fit=crop&w=800&q=80",
    contenu:
      "Apprenez à sélectionner un lieu adapté au nombre d'invités, à la météo et au style de votre événement.",
    statut: "BROUILLON",
    date_publication: "2026-06-04",
    created_at: "2026-06-01T14:00:00Z",
    updated_at: "2026-06-04T10:20:00Z",
  },
];

export const staticReservations: Reservation[] = [
  {
    id: 1,
    client: {
      nom: "Rakoto",
      prenom: "Miora",
      telephone: "0341234567",
      email: "miora@example.com",
    },
    details_mariage: {
      date: "2026-10-10",
      ville: "Antananarivo",
      nombre_invites: 120,
      budget: "8 500 000 MGA",
      theme: "Boho-chic",
      couleurs: "Rose, doré",
    },
    lieu: {
      deja_reserve: true,
      nom: "Jardin d'Ambohijatovo",
    },
    pack: staticPacks[0],
    services: [staticServices[0]],
    description_projet:
      "Cérémonie en plein air avec décoration florale et ambiance chaleureuse.",
    statut: "EN_ATTENTE",
    created_at: "2026-06-01T11:00:00Z",
  },
  {
    id: 2,
    client: {
      nom: "Rasoanaivo",
      prenom: "Hery",
      telephone: "0339876543",
      email: "hery@example.com",
    },
    details_mariage: {
      date: "2026-11-05",
      ville: "Toamasina",
      nombre_invites: 180,
      budget: "12 000 000 MGA",
      theme: "Élégance marine",
      couleurs: "Bleu, blanc",
    },
    lieu: {
      deja_reserve: false,
      nom: null,
    },
    pack: staticPacks[1],
    services: [staticServices[1], staticServices[2]],
    description_projet: "Réception en bord de mer avec DJ et décor lumineux.",
    statut: "CONTACTE",
    created_at: "2026-06-04T16:20:00Z",
  },
];
