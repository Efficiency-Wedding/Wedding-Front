export type Article = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "10 idées de décoration florale pour un mariage champêtre",
    excerpt:
      "Des compositions délicates en pivoines, eucalyptus et bougies pour créer une ambiance romantique et bohème inoubliable le jour J.",
    content:
      "Le mariage champêtre est devenu une référence incontournable pour les couples en quête d'authenticité. Dans cet article, nous explorons dix idées florales qui transformeront votre lieu de réception en un véritable jardin enchanté. Des arches en eucalyptus aux centres de table en pivoines et lisianthus, chaque détail compte. Pensez également à intégrer des bougies chauffe-plat dans des photophores en verre pour une lumière douce à la tombée du jour. N'hésitez pas à mélanger les textures : lin brut, dentelle ancienne et vaisselle vintage pour un rendu chaleureux et intemporel.",
    date: "12 mai 2026",
    category: "Décoration",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Comment choisir le lieu parfait pour votre cérémonie ?",
    excerpt:
      "Château, domaine viticole ou plage : nos conseils d'experte pour trouver le cadre idéal qui reflète vraiment votre histoire d'amour.",
    content:
      "Le choix du lieu est l'une des décisions les plus importantes de votre organisation. Il définit l'atmosphère générale, le style de la décoration et même le menu. Commencez par établir une liste de critères essentiels : capacité d'accueil, distance, hébergement sur place, possibilité d'une cérémonie laïque en extérieur. Visitez toujours plusieurs lieux et imaginez-y votre journée du début à la fin. Posez les bonnes questions sur les prestataires imposés, les horaires et le couvre-feu sonore.",
    date: "28 avril 2026",
    category: "Conseils",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Le mariage de Camille et Antoine : un rêve provençal",
    excerpt:
      "Retour en images sur une journée magique en Provence, entre lavande, oliviers et émotions partagées avec leurs proches.",
    content:
      "Camille et Antoine nous ont fait l'honneur de partager leur magnifique journée sous le soleil provençal. Tout a commencé par une cérémonie laïque au cœur d'une oliveraie centenaire, avec pour seul témoin le chant des cigales. La décoration mêlait lavande fraîche, branches d'olivier et nappes en lin écru. Le menu, signé par un chef étoilé local, célébrait les produits du terroir. Une soirée dansante sous les étoiles a clôturé cette journée pleine d'émotion et d'élégance simple.",
    date: "15 avril 2026",
    category: "Témoignages",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Tendances robes de mariée 2026 : élégance et modernité",
    excerpt:
      "Découvrez les coupes, tissus et détails qui feront sensation cette saison pour sublimer toutes les silhouettes le jour J.",
    content:
      "La saison 2026 célèbre une mariée à la fois romantique et moderne. Les coupes fluides en mousseline de soie côtoient les bustiers structurés en mikado. Les manches bouffantes, les dos nus délicats et les capes amovibles permettent de transformer sa silhouette tout au long de la journée. Côté couleurs, le blanc cassé et les nuances poudrées dominent. Les accessoires se font discrets : un voile cathédrale, une paire de boucles d'oreilles vintage et un bouquet champêtre suffisent à parfaire la tenue.",
    date: "2 avril 2026",
    category: "Décoration",
    image:
      "https://images.unsplash.com/photo-1594552072238-5c4a26f10bf3?auto=format&fit=crop&w=1200&q=80",
  },
];

export const categories = ["Décoration", "Conseils", "Témoignages"];