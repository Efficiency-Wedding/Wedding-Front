import { useState, useEffect } from "react";
import { motion } from "motion/react";
import type { Reservation, Pack, Service } from "../lib/api";
import { api } from "../lib/api";
import { getErrorMessage } from "@/shared/errors";
import { assetUrl } from "@/shared/api";

// SVG Icon Helper & paths
type IconProps = {
  d: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
};

const Icon = ({ d, size = 22, stroke = "currentColor", strokeWidth = 1.8 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
);

const icons = {
  chef:     "M3 11l19-9-9 19-2-8-8-2z",
  hall:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  camera:   "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  music:    "M9 18V5l12-2v13 M6 21a3 3 0 100-6 3 3 0 000 6z M18 19a3 3 0 100-6 3 3 0 000 6z",
  flower:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  close:    "M18 6L6 18M6 6l12 12",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  check:    "M20 6L9 17l-5-5",
  user:     "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2",
  calendar: "M8 2v4M16 2v4M3 10h18",
  mapPin:   "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
  users:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  wallet:   "M21 12V7H5a2 2 0 010-4h14v4 M3 5v14a2 2 0 002 2h16v-5",
  package:  "M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  edit:     "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:    "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  search:   "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  loader:   "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  EN_ATTENTE:   { label: "En attente",    bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400" },
  CONTACTE:     { label: "Contacté",      bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400" },
  DEVIS_ENVOYE: { label: "Devis envoyé",  bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400" },
  CONFIRME:     { label: "Confirmé",      bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  ANNULE:       { label: "Annulé",        bg: "bg-red-50",     text: "text-red-600",     dot: "bg-red-400" },
  TERMINE:      { label: "Terminé",       bg: "bg-gray-100",   text: "text-gray-600",    dot: "bg-gray-400" },
};

const formatMGA = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " MGA";

const cfg = (s: string) => STATUS_CONFIG[s] ?? { label: s, bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };

// Helper pour obtenir l'icône d'un service
const getServiceIcon = (serviceName: string) => {
  const name = serviceName.toLowerCase();
  if (name.includes("traiteur") || name.includes("cuisine")) return "chef";
  if (name.includes("salle") || name.includes("reception") || name.includes("lieu")) return "hall";
  if (name.includes("photo") || name.includes("video") || name.includes("photographe") || name.includes("caméra")) return "camera";
  if (name.includes("musique") || name.includes("dj") || name.includes("animation")) return "music";
  if (name.includes("decor") || name.includes("fleur") || name.includes("florale")) return "flower";
  return "chef";
};

const PACK_MARIAGE_PRIX: Record<string, Record<string, string>> = {
  "50": { "servis": "10 500 000 Ar", "semi_buffet": "11 750 000 Ar", "buffet": "12 500 000 Ar" },
  "100": { "servis": "14 000 000 Ar", "semi_buffet": "15 500 000 Ar", "buffet": "17 500 000 Ar" },
  "150": { "servis": "17 500 000 Ar", "semi_buffet": "19 000 000 Ar", "buffet": "20 000 000 Ar" },
  "200": { "servis": "20 000 000 Ar", "semi_buffet": "25 000 000 Ar", "buffet": "28 000 000 Ar" },
  "250": { "servis": "25 000 000 Ar", "semi_buffet": "30 000 000 Ar", "buffet": "35 000 000 Ar" },
  "300": { "servis": "30 500 000 Ar", "semi_buffet": "35 500 000 Ar", "buffet": "38 000 000 Ar" },
  "350": { "servis": "30 500 000 Ar", "semi_buffet": "35 500 000 Ar", "buffet": "38 000 000 Ar" },
  "400": { "servis": "35 000 000 Ar", "semi_buffet": "40 000 000 Ar", "buffet": "45 000 000 Ar" },
  "500": { "servis": "40 000 000 Ar", "semi_buffet": "45 000 000 Ar", "buffet": "48 000 000 Ar" },
};

const PACK_VODIONDRY_PRIX: Record<string, Record<string, string>> = {
  "50": { "servis": "8 800 000 Ar", "semi_buffet": "10 500 000 Ar", "buffet": "11 000 000 Ar" },
  "80": { "servis": "11 500 000 Ar", "semi_buffet": "12 500 000 Ar", "buffet": "12 900 000 Ar" },
  "90": { "servis": "11 900 000 Ar", "semi_buffet": "13 000 000 Ar", "buffet": "13 500 000 Ar" },
  "100": { "servis": "12 500 000 Ar", "semi_buffet": "13 500 000 Ar", "buffet": "14 500 000 Ar" },
  "150": { "servis": "16 500 000 Ar", "semi_buffet": "17 500 000 Ar", "buffet": "18 900 000 Ar" },
  "200": { "servis": "18 500 000 Ar", "semi_buffet": "22 000 000 Ar", "buffet": "25 000 000 Ar" },
};

function guessTypeService(nombre: number | string, budget: string, packNom: string = "") {
  const isVodiondry = packNom.toUpperCase().includes("VODIONDRY");
  const isMariage = !isVodiondry; // Fallback par defaut
  const grid = isVodiondry ? PACK_VODIONDRY_PRIX : PACK_MARIAGE_PRIX;
  const prices = grid[String(nombre)];
  if (!prices) return "";
  const entry = Object.entries(prices).find(([_, val]) => val === budget);
  return entry ? entry[0] : "";
}

export default function Reservations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modal, setModal] = useState<"edit" | null>(null);
  const [detailModal, setDetailModal] = useState<Reservation | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [dateMariage, setDateMariage] = useState("");
  const [ville, setVille] = useState("");
  const [nombreInvites, setNombreInvites] = useState("");
  const [budgetEstime, setBudgetEstime] = useState("");
  const [themeMariage, setThemeMariage] = useState("");
  const [couleursPrincipales, setCouleursPrincipales] = useState("");
  const [lieuDejaReserve, setLieuDejaReserve] = useState(false);
  const [nomLieu, setNomLieu] = useState("");
  const [packId, setPackId] = useState<number | "">("");
  const [descriptionProjet, setDescriptionProjet] = useState("");
  const [statut, setStatut] = useState<Reservation["statut"]>("EN_ATTENTE");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [typeService, setTypeService] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [reservationsData, packsData, servicesData] = await Promise.all([
          api.getReservations(),
          api.getPacks(),
          api.getServices(),
        ]);
        setReservations(reservationsData);
        setPacks(packsData);
        setServices(servicesData);
      } catch (err) {
        setError(getErrorMessage(err, "Impossible de charger les réservations."));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openEdit = (r: Reservation) => {
    setCurrentId(r.id);
    setNom(r.client.nom);
    setPrenom(r.client.prenom);
    setTelephone(r.client.telephone);
    setEmail(r.client.email);
    setDateMariage(r.details_mariage.date);
    setVille(r.details_mariage.ville);
    setNombreInvites(String(r.details_mariage.nombre_invites));
    setBudgetEstime(r.details_mariage.budget);
    setThemeMariage(r.details_mariage.theme || "");
    setCouleursPrincipales(r.details_mariage.couleurs || "");
    setLieuDejaReserve(r.lieu.deja_reserve);
    setNomLieu(r.lieu.nom || "");
    setPackId(r.pack ? r.pack.id : "");
    setDescriptionProjet(r.description_projet || "");
    setStatut(r.statut);
    setSelectedServices(r.services ? r.services.map((s) => s.id) : []);
    setTypeService(guessTypeService(r.details_mariage.nombre_invites, r.details_mariage.budget, r.pack?.nom || ""));
    setModal("edit");
  };

  const handleTypeServiceChange = (val: string) => {
    setTypeService(val);
    if (val && nombreInvites) {
      const isVodiondry = packs.find(p => p.id === packId)?.nom?.toUpperCase().includes("VODIONDRY");
      const grid = isVodiondry ? PACK_VODIONDRY_PRIX : PACK_MARIAGE_PRIX;
      if (grid[nombreInvites] && grid[nombreInvites][val]) {
        setBudgetEstime(grid[nombreInvites][val]);
      }
    }
  };

  const handleNombreInvitesChange = (val: string) => {
    setNombreInvites(val);
    if (typeService && val) {
      const isVodiondry = packs.find(p => p.id === packId)?.nom?.toUpperCase().includes("VODIONDRY");
      const grid = isVodiondry ? PACK_VODIONDRY_PRIX : PACK_MARIAGE_PRIX;
      if (grid[val] && grid[val][typeService]) {
        setBudgetEstime(grid[val][typeService]);
      }
    }
  };

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentId === null) return;
    try {
      setSubmitting(true);
      setError(null);
      const payload = {
        nom: nom.trim(), prenom: prenom.trim(), telephone: telephone.trim(),
        email: email.trim(), date_mariage: dateMariage, ville: ville.trim(),
        nombre_invites: Number(nombreInvites) || 1, budget_estime: budgetEstime,
        theme_mariage: themeMariage || null, couleurs_principales: couleursPrincipales || null,
        lieu_deja_reserve: lieuDejaReserve, nom_lieu: lieuDejaReserve ? nomLieu.trim() || null : null,
        pack_id: packId || null, service_ids: selectedServices,
        description_projet: descriptionProjet || null, statut,
      };
      const updated = await api.updateReservation(currentId, payload);
      setReservations((prev) => prev.map((r) => (r.id === currentId ? updated : r)));
      setModal(null);
      setDetailModal(updated);
      alert("Réservation mise à jour avec succès !");
    } catch (err) {
      setError(getErrorMessage(err, "Erreur lors de la mise à jour."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette réservation ?")) return;
    try {
      await api.deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(getErrorMessage(err, "Erreur lors de la suppression."));
    }
  };

  const quickStatus = async (id: number, newStatut: Reservation["statut"]) => {
    try {
      const updated = await api.updateReservationStatut(id, newStatut);
      setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (err) {
      setError(getErrorMessage(err, "Erreur lors de la mise à jour du statut."));
    }
  };

  const filtered = reservations.filter((r) => {
    const s = `${r.client.nom} ${r.client.prenom} ${r.client.email} ${r.details_mariage.ville}`.toLowerCase();
    return s.includes(filter.toLowerCase()) && (!statusFilter || r.statut === statusFilter);
  });

  return (
      <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#b73f68]">
              Backoffice
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Réservations
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#555] md:text-base">
              {reservations.length} demande{reservations.length > 1 ? "s" : ""} au total
            </p>
          </div>
        </div>

        {error && (
            <div className="mb-6 rounded-3xl bg-red-50 px-6 py-4 text-sm text-red-700 border border-red-100">
              {error}
            </div>
        )}

        {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
              <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#e91e8c" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <path d={icons.loader} />
              </svg>
              <p className="text-sm text-gray-500">Chargement des réservations...</p>
            </div>
        ) : (
            <>
              {/* Filters */}
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[260px] max-w-md">
                  <Icon d={icons.search} size={16} stroke="#aaa" strokeWidth={2} />
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <path d={icons.search} />
                  </svg>
                  <input
                      type="text"
                      placeholder="Rechercher par client, ville..."
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full rounded-3xl border border-[#eee] bg-white pl-12 pr-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                  />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                >
                  <option value="">Tous les statuts</option>
                  {Object.entries(STATUS_CONFIG).map(([val, c]) => (
                      <option key={val} value={val}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Cards */}
              {filtered.length === 0 ? (
                  <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-gray-400">
                    <div className="rounded-full bg-gray-50 p-6 mb-4">
                      <Icon d={icons.search} size={32} stroke="#ccc" />
                    </div>
                    <p className="text-sm font-medium">Aucune réservation trouvée</p>
                    <p className="text-xs text-gray-400 mt-1">Essayez de modifier vos filtres</p>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((r) => {
                      const sc = cfg(r.statut);
                      return (
                          <motion.div
                              key={r.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="group overflow-hidden rounded-[28px] bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-[#fce4ec]/40"
                          >
                            {/* Card Header */}
                            <div className="p-5 border-b border-[#fce4ec]/30 flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-serif text-lg font-black text-[#1a0a14] truncate">
                                  {r.client.prenom} {r.client.nom}
                                </p>
                                <p className="text-xs text-gray-500 truncate mt-0.5">{r.client.email}</p>
                                <p className="text-xs text-gray-400">{r.client.telephone}</p>
                              </div>
                              <span className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase ${sc.bg} ${sc.text} border border-current/20`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                {sc.label}
                                            </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1 grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2">
                                <Icon d={icons.calendar} size={14} stroke="#e91e8c" />
                                <div>
                                  <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Date</p>
                                  <p className="text-xs font-medium text-gray-700">{r.details_mariage.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon d={icons.mapPin} size={14} stroke="#e91e8c" />
                                <div>
                                  <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Ville</p>
                                  <p className="text-xs font-medium text-gray-700 truncate">{r.details_mariage.ville}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon d={icons.users} size={14} stroke="#e91e8c" />
                                <div>
                                  <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Invités</p>
                                  <p className="text-xs font-medium text-gray-700">{r.details_mariage.nombre_invites}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon d={icons.wallet} size={14} stroke="#e91e8c" />
                                <div>
                                  <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Budget</p>
                                  <p className="text-xs font-medium text-gray-700">
                                    {formatMGA(parseFloat(r.details_mariage.budget) || 0)}
                                  </p>
                                </div>
                              </div>
                              {r.pack && (
                                  <div className="col-span-2 flex items-center gap-2">
                                    <Icon d={icons.package} size={14} stroke="#e91e8c" />
                                    <div>
                                      <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Pack</p>
                                      <p className="text-xs font-medium text-gray-700 truncate">{r.pack.nom}</p>
                                    </div>
                                  </div>
                              )}
                              {r.services && r.services.length > 0 && (
                                  <div className="col-span-2">
                                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider mb-2">Services demandés</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {r.services.map((s) => (
                                          <span key={s.id} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#fdf6f9] text-[#b73f68] text-[10px] font-medium rounded-full border border-[#fce4ec]/50">
                                                                <Icon d={icons[getServiceIcon(s.nom) as keyof typeof icons] || icons.chef} size={10} stroke="#b73f68" />
                                            {s.nom}
                                                            </span>
                                      ))}
                                    </div>
                                  </div>
                              )}
                            </div>

                            {/* Quick status buttons */}
                            <div className="px-5 pb-2 flex flex-wrap gap-1.5">
                              {r.statut === "EN_ATTENTE" && (
                                  <button onClick={() => quickStatus(r.id, "CONTACTE")}
                                          className="px-3 py-1.5 text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors">
                                    Contacter
                                  </button>
                              )}
                              {r.statut === "CONTACTE" && (
                                  <button onClick={() => quickStatus(r.id, "DEVIS_ENVOYE")}
                                          className="px-3 py-1.5 text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-full hover:bg-purple-100 transition-colors">
                                    Devis envoyé
                                  </button>
                              )}
                              {r.statut === "DEVIS_ENVOYE" && (
                                  <button onClick={() => quickStatus(r.id, "CONFIRME")}
                                          className="px-3 py-1.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full hover:bg-emerald-100 transition-colors">
                                    ✓ Confirmer
                                  </button>
                              )}
                              {r.statut === "CONFIRME" && (
                                  <button onClick={() => quickStatus(r.id, "TERMINE")}
                                          className="px-3 py-1.5 text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors">
                                    Terminer
                                  </button>
                              )}
                              {r.statut !== "ANNULE" && r.statut !== "TERMINE" && (
                                  <button onClick={() => quickStatus(r.id, "ANNULE")}
                                          className="px-3 py-1.5 text-[10px] font-semibold bg-red-50 text-red-600 border border-red-200 rounded-full hover:bg-red-100 transition-colors">
                                    Annuler
                                  </button>
                              )}
                            </div>

                            {/* Card Footer — actions */}
                            <div className="px-5 pb-5 flex items-center gap-2 border-t border-[#fce4ec]/30 pt-3">
                              <button
                                  onClick={() => setDetailModal(r)}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#fdf6f9] hover:bg-[#fce4ec] border border-[#fce4ec] rounded-full text-xs font-bold text-[#b73f68] transition-colors"
                              >
                                <Icon d={icons.eye} size={13} stroke="#b73f68" />
                                Voir détail
                              </button>
                              <button
                                  onClick={() => openEdit(r)}
                                  className="flex h-10 w-10 items-center justify-center hover:bg-[#fdf6f9] rounded-full text-[#b73f68] transition-colors border border-[#fce4ec]/30"
                                  title="Modifier"
                              >
                                <Icon d={icons.edit} size={15} stroke="#b73f68" />
                              </button>
                              <button
                                  onClick={() => handleDelete(r.id)}
                                  className="flex h-10 w-10 items-center justify-center hover:bg-red-50 rounded-full text-red-400 transition-colors border border-red-100"
                                  title="Supprimer"
                              >
                                <Icon d={icons.trash} size={15} stroke="#f87171" />
                              </button>
                            </div>
                          </motion.div>
                      );
                    })}
                  </div>
              )}
            </>
        )}

        {/* Detail Modal */}
        {detailModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#fce4ec]/30"
              >
                <div className="flex items-center justify-between p-6 border-b border-[#fce4ec]/30">
                  <h3 className="font-serif text-xl font-black text-[#1a0a14]">
                    {detailModal.client.prenom} {detailModal.client.nom}
                  </h3>
                  <button onClick={() => setDetailModal(null)} className="flex h-10 w-10 items-center justify-center hover:bg-[#fdf6f9] rounded-full text-gray-400 transition-colors">
                    <Icon d={icons.close} size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-3 bg-[#fdf6f9] border border-[#fce4ec]/50 p-5 rounded-3xl">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#b73f68] block mb-1">Statut</span>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase ${cfg(detailModal.statut).bg} ${cfg(detailModal.statut).text} border border-current/20`}>
                                        {cfg(detailModal.statut).label}
                                    </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#b73f68] block mb-1">Date création</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {new Date(detailModal.created_at).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-serif text-sm font-bold text-[#1a0a14] border-b border-gray-100 pb-1.5">Client</h4>
                      <div className="text-sm space-y-2">
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.user} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800">{detailModal.client.prenom} {detailModal.client.nom}</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.user} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800">{detailModal.client.email}</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.user} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800">{detailModal.client.telephone}</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.mapPin} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800">{detailModal.details_mariage.ville}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-serif text-sm font-bold text-[#1a0a14] border-b border-gray-100 pb-1.5">Événement</h4>
                      <div className="text-sm space-y-2">
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.calendar} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800">{detailModal.details_mariage.date}</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.chef} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800">
                            {guessTypeService(detailModal.details_mariage.nombre_invites, detailModal.details_mariage.budget, detailModal.pack?.nom) || "Non spécifié"}
                          </span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.users} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800">{detailModal.details_mariage.nombre_invites} personnes</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <Icon d={icons.wallet} size={14} stroke="#aaa" />
                          <span className="font-medium text-gray-800 font-bold text-[#e91e8c]">{detailModal.details_mariage.budget}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1a0a14] border-b border-gray-100 pb-1.5 mb-2">Thème & Couleurs</h4>
                      <div className="text-sm space-y-2">
                        <p className="text-gray-500 flex items-center gap-2">
                          <span className="font-medium text-gray-800">Thème : </span> {detailModal.details_mariage.theme || "—"}
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <span className="font-medium text-gray-800">Couleurs : </span> {detailModal.details_mariage.couleurs || "—"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1a0a14] border-b border-gray-100 pb-1.5 mb-2">Lieu</h4>
                      <p className="text-sm text-gray-700">
                        {detailModal.lieu.deja_reserve
                            ? <span>Déjà réservé : <strong className="text-[#b73f68]">{detailModal.lieu.nom}</strong></span>
                            : <span className="text-gray-500 italic">Recherche à la charge de l'agence.</span>}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1a0a14] border-b border-gray-100 pb-1.5 mb-2">Pack choisi</h4>
                      {detailModal.pack ? (
                          <div className="bg-[#fdf6f9] p-4 rounded-3xl border border-[#fce4ec]/50 text-sm">
                            <p className="font-semibold text-gray-800">{detailModal.pack.nom}</p>
                          </div>
                      ) : (
                          <p className="text-xs text-gray-400 italic">Aucun forfait choisi.</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1a0a14] border-b border-gray-100 pb-1.5 mb-2">Prestations</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {detailModal.services && detailModal.services.length > 0
                            ? detailModal.services.map((s) => (
                                <span key={s.id} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#fdf6f9] text-[#b73f68] text-xs rounded-full border border-[#fce4ec]/50">
                                                    <Icon d={icons[getServiceIcon(s.nom) as keyof typeof icons] || icons.chef} size={10} stroke="#b73f68" />
                                  {s.nom}
                                                </span>
                            ))
                            : <span className="text-xs text-gray-400 italic">Aucune prestation.</span>}
                      </div>
                    </div>
                  </div>

                  {detailModal.description_projet && (
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#1a0a14] border-b border-gray-100 pb-1.5 mb-2">Description du projet</h4>
                        <p className="text-sm text-gray-700 bg-[#fdf6f9] p-5 rounded-3xl italic whitespace-pre-line leading-relaxed border border-[#fce4ec]/30">
                          "{detailModal.description_projet}"
                        </p>
                      </div>
                  )}
                </div>

                <div className="flex justify-between p-6 border-t border-[#fce4ec]/30">
                  <button onClick={() => {
                      setDetailModal(null);
                      openEdit(detailModal);
                    }}
                          className="rounded-full bg-white border border-[#e91e8c] px-8 py-3 text-sm font-bold text-[#e91e8c] transition hover:bg-[#fdf6f9]">
                    Modifier
                  </button>
                  <button onClick={() => setDetailModal(null)}
                          className="rounded-full bg-gradient-to-r from-[#e91e8c] to-[#c2185b] px-8 py-3 text-sm font-bold text-white transition hover:opacity-95">
                    Fermer
                  </button>
                </div>
              </motion.div>
            </div>
        )}

        {/* Edit Modal */}
        {modal === "edit" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-[#fce4ec]/30"
              >
                <div className="flex items-center justify-between p-6 border-b border-[#fce4ec]/30">
                  <h3 className="font-serif text-xl font-black text-[#1a0a14]">Modifier la réservation #{currentId}</h3>
                  <button onClick={() => setModal(null)} className="flex h-10 w-10 items-center justify-center hover:bg-[#fdf6f9] rounded-full text-gray-400 transition-colors">
                    <Icon d={icons.close} size={20} />
                  </button>
                </div>

                <form onSubmit={save} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Nom", value: nom, set: setNom, required: true },
                      { label: "Prénom", value: prenom, set: setPrenom, required: true },
                      { label: "Téléphone", value: telephone, set: setTelephone, required: true },
                      { label: "Email", value: email, set: setEmail, required: true, type: "email" },
                      { label: "Ville", value: ville, set: setVille, required: true },
                      { label: "Budget estimé", value: budgetEstime, set: setBudgetEstime, required: true },
                      { label: "Thème du mariage", value: themeMariage, set: setThemeMariage },
                      { label: "Couleurs principales", value: couleursPrincipales, set: setCouleursPrincipales },
                    ].map(({ label, value, set, required, type }) => (
                        <div key={label}>
                          <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-1.5">{label}</label>
                          <input
                              type={type || "text"}
                              required={required}
                              value={value}
                              onChange={(e) => set(e.target.value)}
                              className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                          />
                        </div>
                    ))}

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-1.5">Date du mariage</label>
                      <input
                          type="date"
                          required
                          value={dateMariage}
                          onChange={(e) => setDateMariage(e.target.value)}
                          className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-1.5">Type de service</label>
                      <select
                          value={typeService}
                          onChange={(e) => handleTypeServiceChange(e.target.value)}
                          className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                      >
                        <option value="">(Non défini)</option>
                        <option value="servis">Service à table</option>
                        <option value="semi_buffet">Semi-buffet</option>
                        <option value="buffet">Buffet complet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-1.5">Nombre d'invités</label>
                      <select
                          required
                          value={nombreInvites}
                          onChange={(e) => handleNombreInvitesChange(e.target.value)}
                          className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                      >
                        <option value="">Sélectionner</option>
                        <option value="50">50 personnes</option>
                        <option value="80">80 personnes</option>
                        <option value="90">90 personnes</option>
                        <option value="100">100 personnes</option>
                        <option value="150">150 personnes</option>
                        <option value="200">200 personnes</option>
                        <option value="250">250 personnes</option>
                        <option value="300">300 personnes</option>
                        <option value="350">350 personnes</option>
                        <option value="400">400 personnes</option>
                        <option value="500">500 personnes</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold cursor-pointer">
                        <input
                            type="checkbox"
                            checked={lieuDejaReserve}
                            onChange={(e) => setLieuDejaReserve(e.target.checked)}
                            className="w-4 h-4 rounded border-[#eee] text-[#e91e8c] focus:ring-[#fad1e1]"
                        />
                        Lieu déjà réservé ?
                      </label>
                      {lieuDejaReserve && (
                          <input
                              type="text"
                              placeholder="Nom du lieu"
                              required
                              value={nomLieu}
                              onChange={(e) => setNomLieu(e.target.value)}
                              className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                          />
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-1.5">Pack</label>
                      <select
                          value={packId}
                          onChange={(e) => setPackId(e.target.value ? Number(e.target.value) : "")}
                          className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                      >
                        <option value="">Aucun pack</option>
                        {packs.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-1.5">Statut</label>
                      <select
                          value={statut}
                          onChange={(e) => setStatut(e.target.value as Reservation["statut"])}
                          className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                      >
                        {Object.entries(STATUS_CONFIG).map(([val, c]) => (
                            <option key={val} value={val}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-1.5">Description du projet</label>
                      <textarea
                          rows={3}
                          value={descriptionProjet}
                          onChange={(e) => setDescriptionProjet(e.target.value)}
                          className="w-full rounded-3xl border border-[#eee] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1] resize-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#999] font-semibold mb-2">Prestations additionnelles</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-4 bg-[#fdf6f9] rounded-3xl border border-[#fce4ec]/50">
                        {services.filter((s) => s.statut === "ACTIF").map((s) => {
                          const checked = selectedServices.includes(s.id);
                          return (
                              <label key={s.id} className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors border ${checked ? "bg-[#fce4ec] border-[#e91e8c]" : "bg-white border-transparent hover:border-[#fce4ec]"}`}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleService(s.id)}
                                    className="w-4 h-4 rounded border-[#eee] text-[#e91e8c] focus:ring-[#fad1e1]"
                                />
                                <span className="text-xs text-gray-700 truncate">{s.nom}</span>
                              </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#fce4ec]/30">
                    <button
                        type="button"
                        onClick={() => setModal(null)}
                        className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e91e8c] to-[#c2185b] px-8 py-2.5 text-sm font-bold text-white transition hover:opacity-95 disabled:opacity-50"
                    >
                      {submitting && (
                          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                            <path d={icons.loader} />
                          </svg>
                      )}
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
        )}
      </div>
  );
}