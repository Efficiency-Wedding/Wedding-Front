// API Admin client for Wedding agency backoffice

export interface Service {
  id: number;
  nom: string;
  slug: string;
  description_courte: string | null;
  description_complete: string | null;
  prix_indicatif: number | null;
  prix_formate?: string | null;
  image_principale: string | null;
  image_url: string | null;
  statut: "ACTIF" | "INACTIF";
  created_at?: string;
  updated_at?: string;
}

export interface Pack {
  id: number;
  nom: string;
  description: string | null;
  prix: number;
  image_principale: string | null;
  statut: "ACTIF" | "INACTIF"; // backend has enum default ACTIF
  services?: Service[];
  created_at?: string;
  updated_at?: string;
}

export interface Reservation {
  id: number;
  client: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
  };
  details_mariage: {
    date: string;
    ville: string;
    nombre_invites: number;
    budget: string;
    theme: string | null;
    couleurs: string | null;
  };
  lieu: {
    deja_reserve: boolean;
    nom: string | null;
  };
  pack: Pack | null;
  services: Service[];
  description_projet: string | null;
  statut:
    | "EN_ATTENTE"
    | "CONTACTE"
    | "DEVIS_ENVOYE"
    | "CONFIRME"
    | "ANNULE"
    | "TERMINE";
  created_at: string;
}

export interface Article {
  id: number;
  titre: string;
  slug: string;
  image: string | null;
  image_url: string | null;
  contenu: string;
  statut: "BROUILLON" | "PUBLIE";
  date_publication: string | null;
  created_at: string;
  updated_at: string;
}

// Helper fetch wrapper
async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, options);

  if (response.status === 204) {
    return null as unknown as T;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }

  const responseData = await response.json();
  // Laravel resources typically wrap data in a 'data' envelope
  return (
    responseData && "data" in responseData ? responseData.data : responseData
  ) as T;
}

export const api = {
  // --- SERVICES ---
  getServices: () => apiRequest<Service[]>("/api/services"),

  getService: (id: number) => apiRequest<Service>(`/api/services/${id}`),

  createService: (formData: FormData) =>
    apiRequest<Service>("/api/services", {
      method: "POST",
      body: formData,
    }),

  updateService: (id: number, formData: FormData) => {
    // For PHP/Laravel PUT requests with multipart/form-data, we must use POST and append _method=PUT
    if (!formData.has("_method")) {
      formData.append("_method", "PUT");
    }
    return apiRequest<Service>(`/api/services/${id}`, {
      method: "POST",
      body: formData,
    });
  },

  deleteService: (id: number) =>
    apiRequest<void>(`/api/services/${id}`, {
      method: "DELETE",
    }),

  // --- PACKS ---
  getPacks: () => apiRequest<Pack[]>("/api/packs"),

  getPack: (id: number) => apiRequest<Pack>(`/api/packs/${id}`),

  createPack: (formData: FormData) =>
    apiRequest<Pack>("/api/packs", {
      method: "POST",
      body: formData,
    }),

  updatePack: (id: number, formData: FormData) => {
    if (!formData.has("_method")) {
      formData.append("_method", "PUT");
    }
    return apiRequest<Pack>(`/api/packs/${id}`, {
      method: "POST",
      body: formData,
    });
  },

  deletePack: (id: number) =>
    apiRequest<void>(`/api/packs/${id}`, {
      method: "DELETE",
    }),

  // --- RESERVATIONS ---
  getReservations: () => apiRequest<Reservation[]>("/api/reservations"),

  getReservation: (id: number) =>
    apiRequest<Reservation>(`/api/reservations/${id}`),

  createReservation: (data: any) =>
    apiRequest<Reservation>("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  updateReservation: (id: number, data: any) =>
    apiRequest<Reservation>(`/api/reservations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  deleteReservation: (id: number) =>
    apiRequest<void>(`/api/reservations/${id}`, {
      method: "DELETE",
    }),

  // --- BLOG / ARTICLES ---
  getArticles: (all = false) =>
    apiRequest<Article[]>(`/api/articles${all ? "?all=1" : ""}`),

  getArticleBySlug: (slug: string) =>
    apiRequest<Article>(`/api/articles/${slug}`),

  createArticle: (formData: FormData) =>
    apiRequest<Article>("/api/articles", {
      method: "POST",
      body: formData,
    }),

  updateArticle: (id: number, formData: FormData) => {
    if (!formData.has("_method")) {
      formData.append("_method", "PUT");
    }
    return apiRequest<Article>(`/api/articles/${id}`, {
      method: "POST",
      body: formData,
    });
  },

  deleteArticle: (id: number) =>
    apiRequest<void>(`/api/articles/${id}`, {
      method: "DELETE",
    }),
};
