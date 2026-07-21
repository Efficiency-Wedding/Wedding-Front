export type Status = "ACTIF" | "INACTIF";
export type ArticleStatus = "BROUILLON" | "PUBLIE";

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
  images?: Image[];  // ← ajouter
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
  images?: Image[];  // ← ajouter
  has_dynamic_pricing?: boolean;
  options?: {
    nombres_invites: number[];
    types_service: string[];
  };
  tarifs?: Record<string, Record<string, number>>;
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
  statut?: Reservation["statut"];
  type_service?: string | null;
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
  type_service?: string | null;
  prix_calcule?: number | null;
  created_at: string;
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
  images?: Image[];  // ← ajouter
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

type ApiEnvelope<T> = T | { data: T; message?: string; errors?: Record<string, string[]> };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";
const ADMIN_TOKEN_STORAGE_KEY = "mariage_admin_token";
const ADMIN_USER_STORAGE_KEY = "mariage_admin_user";

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

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function getAdminUser() {
  const rawUser = localStorage.getItem(ADMIN_USER_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

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

async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const adminToken = getAdminToken();

  if (adminToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${adminToken}`);
  }

  const response = await fetch(resolveApiUrl(url), {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const responseBody = await response.text();
  const responseData = (responseBody && contentType.includes("application/json")
    ? JSON.parse(responseBody)
    : responseBody) as ApiEnvelope<T> | string | null;

  if (!response.ok) {
    const validationErrors =
      responseData && typeof responseData === "object" && "errors" in responseData
        ? responseData.errors
        : "";
    const message =
      responseData && typeof responseData === "object" && "message" in responseData
        ? responseData.message
        : typeof responseData === "string" && responseData.trim()
          ? responseData.trim()
        : "";
    const validationMessage =
      validationErrors && typeof validationErrors === "object"
        ? Object.values(validationErrors).flat().join(" ")
        : "";

    throw new ApiError(
      message || validationMessage || `Erreur API (${response.status})`,
      response.status,
      validationErrors && typeof validationErrors === "object" ? validationErrors : undefined,
    );
  }

  return (
    responseData && typeof responseData === "object" && "data" in responseData
      ? responseData.data
      : responseData
  ) as T;
}

export const api = {
  adminLogin: (credentials: { email: string; password: string }) =>
    apiRequest<AdminLoginResponse>("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }),
  adminMe: () => apiRequest<{ user: AdminUser }>("/api/admin/me"),
  adminLogout: () =>
    apiRequest<{ message: string }>("/api/admin/logout", {
      method: "POST",
    }),

  getServices: () => apiRequest<Service[]>("/api/services"),
  getActiveServices: async () =>
    (await apiRequest<Service[]>("/api/services")).filter((service) => service.statut === "ACTIF"),
  getService: (id: number) => apiRequest<Service>(`/api/services/${id}`),
  createService: (formData: FormData) =>
    apiRequest<Service>("/api/services", {
      method: "POST",
      body: formData,
    }),
  updateService: (id: number, formData: FormData) => {
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

  getPacks: () => apiRequest<Pack[]>("/api/packs"),
  getActivePacks: async () =>
    (await apiRequest<Pack[]>("/api/packs")).filter((pack) => pack.statut === "ACTIF"),
  getPack: (id: number) => apiRequest<Pack>(`/api/packs/${id}`),
  getPackPrices: (packId: number) => apiRequest<Pack>(`/api/packs/${packId}/prices`),
  updatePackPrices: (packId: number, tarifs: Record<string, Record<string, number>>) =>
    apiRequest<Pack>(`/api/packs/${packId}/prices`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tarifs }),
    }),
  calculatePackPrice: (packId: number, invites: number, serviceType: string) =>
    apiRequest<{ price: number }>(`/api/packs/${packId}/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invites, service_type: serviceType }),
    }),
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

  getReservations: () => apiRequest<Reservation[]>("/api/reservations"),
  getReservation: (id: number) => apiRequest<Reservation>(`/api/reservations/${id}`),
  createReservation: (data: ReservationPayload) =>
    apiRequest<Reservation>("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  updateReservation: (id: number, data: Partial<ReservationPayload>) =>
    apiRequest<Reservation>(`/api/reservations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
    updateReservationStatut: (id: number, statut: Reservation["statut"]) =>
    apiRequest<Reservation>(`/api/reservations/${id}/statut`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    }),

  deleteReservation: (id: number) =>
    apiRequest<void>(`/api/reservations/${id}`, {
      method: "DELETE",
    }),

  getArticles: (all = false) => apiRequest<Article[]>(`/api/articles${all ? "?all=1" : ""}`),
  getArticleBySlug: (slug: string) => apiRequest<Article>(`/api/articles/${slug}`),
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

    // Images multiples
  uploadImages: (type: "service" | "pack" | "article", id: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("images[]", f));
    return apiRequest<Image[]>(`/api/admin/${type}/${id}/images`, {
      method: "POST",
      body: formData,
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
      body: JSON.stringify({ ids }),
    }),

    sendContact: (data: { name: string; email: string; phone: string; url?: string; message: string }) =>
  apiRequest<Contact>('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
getContacts: () => apiRequest<Contact[]>('/api/admin/contacts'),
markContactLu: (id: number) =>
  apiRequest<Contact>(`/api/admin/contacts/${id}/lu`, { method: 'PATCH' }),
deleteContact: (id: number) =>
  apiRequest<void>(`/api/admin/contacts/${id}`, { method: 'DELETE' }),
};

// Après les interfaces existantes (Article, Pack, etc.)

export interface Image {
  id: number;
  url: string;
  alt: string | null;
  ordre: number;
  imageable_id: number;
  imageable_type: string;
}
