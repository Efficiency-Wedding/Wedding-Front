import type { Image } from "@/shared/api";

export type Status = "ACTIF" | "INACTIF";
export type ArticleStatus = "BROUILLON" | "PUBLIE";

export type Service = {
  id: number;
  nom: string;
  slug: string;
  description_courte: string | null;
  description_complete: string | null;
  prix_indicatif: number | null;
  prix_formate?: string | null;
  image_principale: string | null;
  image_url: string | null;
  statut: Status;
  created_at?: string;
  updated_at?: string;
  images?: Image[];  // ← ajouter
}


export type CreateServicePayload = {
  nom: string;
  slug: string;
  statut: Status;
  images?: Image[];
  prix_indicatif: number | null;
  image_principale: string | null;
  description_courte: string | null;
  description_complete: string | null;
  prix_formate?: string | null;
  image_url: string | null;
};

export type UpdateServicePayload = Partial<CreateServicePayload>;
