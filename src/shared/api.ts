// ---------- Types de base ----------
export type Status = "ACTIF" | "INACTIF";
export type ArticleStatus = "BROUILLON" | "PUBLIE";
export type ReservationStatus =
  | "EN_ATTENTE"
  | "CONTACTE"
  | "DEVIS_ENVOYE"
  | "CONFIRME"
  | "ANNULE"
  | "TERMINE";

export interface Image {
  id: number;
  url: string;
  alt: string | null;
  ordre: number;
  imageable_id: number;
  imageable_type: string;
}

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
  statut: Status;
  created_at?: string;
  updated_at?: string;
  images?: Image[];
}

export interface Pack {
  id: number;
  nom: string;
  description: string | null;
  prix: number;
  image_principale: string | null;
  image_url?: string | null;
  statut: Status;
  services?: Service[];
  created_at?: string;
  updated_at?: string;
  images?: Image[];
  has_dynamic_pricing?: boolean;
  options?: {
    nombres_invites: number[];
    types_service: string[];
  };
  tarifs?: Record<string, Record<string, number>>;
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
  statut: ReservationStatus;
  type_service?: string | null;
  prix_calcule?: number | null;
  created_at: string;
}

export interface ReservationPayload {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  date_mariage: string;
  ville: string;
  nombre_invites: number;
  budget_estime: string;
  theme_mariage?: string | null;
  couleurs_principales?: string | null;
  lieu_deja_reserve?: boolean;
  nom_lieu?: string | null;
  pack_id?: number | null;
  service_ids?: number[];
  description_projet?: string | null;
  statut?: ReservationStatus;
  type_service?: string | null;
}

export interface Article {
  id: number;
  titre: string;
  slug: string;
  image: string | null;
  image_url: string | null;
  contenu: string;
  statut: ArticleStatus;
  date_publication: string | null;
  created_at: string;
  updated_at: string;
  images?: Image[];
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  url: string | null;
  message: string;
  lu: boolean;
  created_at: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export interface AdminLoginResponse {
  token: string;
  token_type: string;
  user: AdminUser;
}

// ---------- Configuration & helpers ----------
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";
const ADMIN_TOKEN_STORAGE_KEY = "mariage_admin_token";
const ADMIN_USER_STORAGE_KEY = "mariage_admin_user";

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function getAdminUser() {
  const rawUser = localStorage.getItem(ADMIN_USER_STORAGE_KEY);
  if (!rawUser) return null;
  try {
    return JSON.parse(rawUser) as AdminUser;
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminLoginResponse) {
  localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, session.token);
  localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(session.user));
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}

export function assetUrl(path?: string | null) {
  if (!path) return null;
  if (/^(https?:|blob:|data:)/.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/storage/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
}

// ---------- Gestion des erreurs ----------
export class ApiError extends Error {
  status: number;
  validationErrors?: Record<string, string[]>;

  constructor(message: string, status: number, validationErrors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.validationErrors = validationErrors;
  }
}

function resolveApiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ---------- Type pour les options de requête (adapté à fetch) ----------
type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  data?: any; // Peut être un objet, FormData, ou null
};

// ---------- Client HTTP avec fetch ----------
async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = options.headers ? { ...options.headers } : {};
  if (!headers["Accept"]) headers["Accept"] = "application/json";

  const adminToken = getAdminToken();
  if (adminToken && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${adminToken}`;
  }

  let body: BodyInit | undefined;
  const isFormData = options.data instanceof FormData;

  if (isFormData) {
    // Pour FormData, ne pas définir Content-Type (fetch le fera avec le bon boundary)
    body = options.data;
    // Supprimer Content-Type s'il a été défini automatiquement
    delete headers["Content-Type"];
  } else if (options.data && typeof options.data === "object") {
    // Objet JSON
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.data);
  } else if (typeof options.data === "string") {
    body = options.data;
  } else {
    body = options.data;
  }

  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers,
    body,
  };

  try {
    const response = await fetch(resolveApiUrl(url), fetchOptions);

    if (response.status === 204) {
      return null as T;
    }

    const contentType = response.headers.get("content-type") || "";
    let responseData: any;
    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      // fallback: texte
      responseData = await response.text();
    }

    if (!response.ok) {
      // Gestion d'erreur
      const validationErrors = responseData?.errors || "";
      const message = responseData?.message || (typeof responseData === "string" ? responseData.trim() : "");

      const validationMessage =
        validationErrors && typeof validationErrors === "object"
          ? Object.values(validationErrors).flat().join(" ")
          : "";

      throw new ApiError(
        message || validationMessage || `Erreur API (${response.status})`,
        response.status,
        validationErrors && typeof validationErrors === "object" ? validationErrors : undefined
      );
    }

    // Si la réponse est enveloppée dans { data: ... }, on la déballé
    return (responseData && typeof responseData === "object" && "data" in responseData
      ? responseData.data
      : responseData) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    // Réseau ou autre erreur
    throw new ApiError(
      error instanceof Error ? error.message : "Erreur réseau",
      0
    );
  }
}

// ---------- API publique ----------
export const api = {
  // Admin
  adminLogin: (credentials: { email: string; password: string }) =>
    apiRequest<AdminLoginResponse>("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: credentials,
    }),
  adminMe: () => apiRequest<{ user: AdminUser }>("/api/admin/me"),
  adminLogout: () =>
    apiRequest<{ message: string }>("/api/admin/logout", {
      method: "POST",
    }),

  // Services
  getServices: () => apiRequest<Service[]>("/api/services"),
  getActiveServices: async () =>
    (await api.getServices()).filter((service) => service.statut === "ACTIF"),
  getService: (id: number) => apiRequest<Service>(`/api/services/${id}`),
  createService: (formData: FormData) =>
    apiRequest<Service>("/api/services", {
      method: "POST",
      data: formData,
    }),
  updateService: (id: number, formData: FormData) => {
    if (!formData.has("_method")) formData.append("_method", "PUT");
    return apiRequest<Service>(`/api/services/${id}`, {
      method: "POST",
      data: formData,
    });
  },
  deleteService: (id: number) =>
    apiRequest<void>(`/api/services/${id}`, {
      method: "DELETE",
    }),

  // Packs
  getPacks: () => apiRequest<Pack[]>("/api/packs"),
  getActivePacks: async () =>
    (await api.getPacks()).filter((pack) => pack.statut === "ACTIF"),
  getPack: (id: number) => apiRequest<Pack>(`/api/packs/${id}`),
  getPackPrices: (packId: number) => apiRequest<Pack>(`/api/packs/${packId}/prices`),
  updatePackPrices: (packId: number, tarifs: Record<string, Record<string, number>>) =>
    apiRequest<Pack>(`/api/packs/${packId}/prices`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: { tarifs },
    }),
  calculatePackPrice: (packId: number, invites: number, serviceType: string) =>
    apiRequest<{ price: number }>(`/api/packs/${packId}/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { invites, service_type: serviceType },
    }),
  createPack: (formData: FormData) =>
    apiRequest<Pack>("/api/packs", {
      method: "POST",
      data: formData,
    }),
  updatePack: (id: number, formData: FormData) => {
    if (!formData.has("_method")) formData.append("_method", "PUT");
    return apiRequest<Pack>(`/api/packs/${id}`, {
      method: "POST",
      data: formData,
    });
  },
  deletePack: (id: number) =>
    apiRequest<void>(`/api/packs/${id}`, {
      method: "DELETE",
    }),

  // Réservations
  getReservations: () => apiRequest<Reservation[]>("/api/reservations"),
  getReservation: (id: number) => apiRequest<Reservation>(`/api/reservations/${id}`),
  createReservation: (data: ReservationPayload) =>
    apiRequest<Reservation>("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    }),
  updateReservation: (id: number, data: Partial<ReservationPayload>) =>
    apiRequest<Reservation>(`/api/reservations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data,
    }),
  updateReservationStatut: (id: number, statut: ReservationStatus) =>
    apiRequest<Reservation>(`/api/reservations/${id}/statut`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: { statut },
    }),
  deleteReservation: (id: number) =>
    apiRequest<void>(`/api/reservations/${id}`, {
      method: "DELETE",
    }),

  // Articles
  getArticles: (all = false) => apiRequest<Article[]>(`/api/articles${all ? "?all=1" : ""}`),
  getArticleBySlug: (slug: string) => apiRequest<Article>(`/api/articles/${slug}`),
  createArticle: (formData: FormData) =>
    apiRequest<Article>("/api/articles", {
      method: "POST",
      data: formData,
    }),
  updateArticle: (id: number, formData: FormData) => {
    if (!formData.has("_method")) formData.append("_method", "PUT");
    return apiRequest<Article>(`/api/articles/${id}`, {
      method: "POST",
      data: formData,
    });
  },
  deleteArticle: (id: number) =>
    apiRequest<void>(`/api/articles/${id}`, {
      method: "DELETE",
    }),

  // Images multiples
  uploadImages: (type: "service" | "pack" | "article", id: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("images[]", f));
    return apiRequest<Image[]>(`/api/admin/${type}/${id}/images`, {
      method: "POST",
      data: formData,
    });
  },
  deleteImage: (id: number) =>
    apiRequest<void>(`/api/admin/images/${id}`, {
      method: "DELETE",
    }),
  reorderImages: (ids: number[]) =>
    apiRequest<void>("/api/admin/images/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { ids },
    }),

  // Contact
  sendContact: (data: { name: string; email: string; phone: string; url?: string; message: string }) =>
    apiRequest<Contact>("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    }),
  getContacts: () => apiRequest<Contact[]>("/api/admin/contacts"),
  markContactLu: (id: number) =>
    apiRequest<Contact>(`/api/admin/contacts/${id}/lu`, { method: "PATCH" }),
  deleteContact: (id: number) =>
    apiRequest<void>(`/api/admin/contacts/${id}`, { method: "DELETE" }),
};