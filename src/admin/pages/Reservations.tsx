import { useState, useEffect } from "react";
import type { Reservation, Pack, Service } from "../lib/api";
import { api } from "../lib/api";
import { Search, Pencil, Trash2, Eye, X, Loader2, CalendarDays, MapPin, Users, Wallet, Package } from "lucide-react";
import { getErrorMessage } from "@/shared/errors";

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
    setModal("edit");
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

  const formatMGA = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " MGA";

  const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    EN_ATTENTE:   { label: "En attente",    bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400" },
    CONTACTE:     { label: "Contacté",      bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400" },
    DEVIS_ENVOYE: { label: "Devis envoyé",  bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400" },
    CONFIRME:     { label: "Confirmé",      bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
    ANNULE:       { label: "Annulé",        bg: "bg-red-50",     text: "text-red-600",     dot: "bg-red-400" },
    TERMINE:      { label: "Terminé",       bg: "bg-gray-100",   text: "text-gray-600",    dot: "bg-gray-400" },
  };

  const cfg = (s: string) => STATUS_CONFIG[s] ?? { label: s, bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-3xl font-bold text-[#664a24]">Réservations</h2>
        <p className="text-gray-500 mt-1">
          {reservations.length} demande{reservations.length > 1 ? "s" : ""} au total
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
          <p className="text-sm text-gray-500">Chargement des réservations...</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[260px] max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par client, ville..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
            >
              <option value="">Tous les statuts</option>
              {Object.entries(STATUS_CONFIG).map(([val, c]) => (
                <option key={val} value={val}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">Aucune réservation trouvée.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((r) => {
                const sc = cfg(r.statut);
                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-2xl border border-[#edd694]/25 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Card Header */}
                    <div className="p-5 border-b border-[#fdfbf7] flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-base truncate">
                          {r.client.prenom} {r.client.nom}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{r.client.email}</p>
                        <p className="text-xs text-gray-400">{r.client.telephone}</p>
                      </div>
                      <span className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${sc.bg} ${sc.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={14} className="text-[#b88a2d] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Date</p>
                          <p className="text-xs font-medium text-gray-700">{r.details_mariage.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#b88a2d] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Ville</p>
                          <p className="text-xs font-medium text-gray-700 truncate">{r.details_mariage.ville}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-[#b88a2d] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Invités</p>
                          <p className="text-xs font-medium text-gray-700">{r.details_mariage.nombre_invites}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet size={14} className="text-[#b88a2d] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Budget</p>
                          <p className="text-xs font-medium text-gray-700">
                            {formatMGA(parseFloat(r.details_mariage.budget) || 0)}
                          </p>
                        </div>
                      </div>
                      {r.pack && (
                        <div className="col-span-2 flex items-center gap-2">
                          <Package size={14} className="text-[#b88a2d] shrink-0" />
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Pack</p>
                            <p className="text-xs font-medium text-gray-700 truncate">{r.pack.nom}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick status buttons */}
                    <div className="px-5 pb-3 flex flex-wrap gap-1.5">
                      {r.statut === "EN_ATTENTE" && (
                        <button onClick={() => quickStatus(r.id, "CONTACTE")}
                          className="px-2.5 py-1 text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                          Contacter
                        </button>
                      )}
                      {r.statut === "CONTACTE" && (
                        <button onClick={() => quickStatus(r.id, "DEVIS_ENVOYE")}
                          className="px-2.5 py-1 text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                          Devis envoyé
                        </button>
                      )}
                      {r.statut === "DEVIS_ENVOYE" && (
                        <button onClick={() => quickStatus(r.id, "CONFIRME")}
                          className="px-2.5 py-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
                          ✓ Confirmer
                        </button>
                      )}
                      {r.statut === "CONFIRME" && (
                        <button onClick={() => quickStatus(r.id, "TERMINE")}
                          className="px-2.5 py-1 text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors">
                          Terminer
                        </button>
                      )}
                      {r.statut !== "ANNULE" && r.statut !== "TERMINE" && (
                        <button onClick={() => quickStatus(r.id, "ANNULE")}
                          className="px-2.5 py-1 text-[10px] font-semibold bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                          Annuler
                        </button>
                      )}
                    </div>

                    {/* Card Footer — actions */}
                    <div className="px-5 pb-5 flex items-center gap-2 border-t border-[#fdfbf7] pt-3">
                      <button
                        onClick={() => setDetailModal(r)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#fdfbf7] hover:bg-[#f5e8c2]/40 border border-[#edd694]/30 rounded-xl text-xs font-semibold text-[#946c25] transition-colors"
                      >
                        <Eye size={13} />
                        Voir détail
                      </button>
                      <button
                        onClick={() => openEdit(r)}
                        className="p-2 hover:bg-[#fbf5e6] rounded-xl text-[#b88a2d] transition-colors border border-[#edd694]/20"
                        title="Modifier"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-2 hover:bg-red-50 rounded-xl text-red-400 transition-colors border border-red-100"
                        title="Supprimer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#f5e8c2]">
            <div className="flex items-center justify-between p-6 border-b border-[#fdfbf7]">
              <h3 className="font-serif text-xl font-bold text-[#664a24]">
                {detailModal.client.prenom} {detailModal.client.nom}
              </h3>
              <button onClick={() => setDetailModal(null)} className="p-2 hover:bg-[#fdfbf7] rounded-lg text-gray-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 bg-[#fdfbf7] border border-[#f5e8c2]/50 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#946c25] block mb-1">Statut</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${cfg(detailModal.statut).bg} ${cfg(detailModal.statut).text}`}>
                    {cfg(detailModal.statut).label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#946c25] block mb-1">Date célébration</span>
                  <span className="text-sm font-semibold text-gray-800">{detailModal.details_mariage.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5">Contact</h4>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-500">Téléphone : <span className="font-medium text-gray-800">{detailModal.client.telephone}</span></p>
                    <p className="text-gray-500">Email : <span className="font-medium text-gray-800">{detailModal.client.email}</span></p>
                    <p className="text-gray-500">Ville : <span className="font-medium text-gray-800">{detailModal.details_mariage.ville}</span></p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5">Détails</h4>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-500">Invités : <span className="font-medium text-gray-800">{detailModal.details_mariage.nombre_invites} personnes</span></p>
                    <p className="text-gray-500">Budget : <span className="font-medium text-gray-800">{formatMGA(parseFloat(detailModal.details_mariage.budget) || 0)}</span></p>
                    <p className="text-gray-500">Thème : <span className="font-medium text-gray-800">{detailModal.details_mariage.theme || "—"}</span></p>
                    <p className="text-gray-500">Couleurs : <span className="font-medium text-gray-800">{detailModal.details_mariage.couleurs || "—"}</span></p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5 mb-2">Lieu</h4>
                <p className="text-sm text-gray-700">
                  {detailModal.lieu.deja_reserve
                    ? <span>Déjà réservé : <strong className="text-[#664a24]">{detailModal.lieu.nom}</strong></span>
                    : <span className="text-gray-500 italic">Recherche à la charge de l'agence.</span>}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5 mb-2">Pack choisi</h4>
                  {detailModal.pack ? (
                    <div className="bg-[#fdfbf7] p-3 rounded-lg border border-[#f5e8c2]/50 text-sm">
                      <p className="font-semibold text-gray-800">{detailModal.pack.nom}</p>
                      <p className="text-[#b88a2d] font-bold text-xs mt-1">{formatMGA(detailModal.pack.prix)}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Aucun forfait choisi.</p>
                  )}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5 mb-2">Prestations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {detailModal.services && detailModal.services.length > 0
                      ? detailModal.services.map((s) => (
                          <span key={s.id} className="px-2.5 py-1 bg-[#fdfbf7] text-[#946c25] text-xs rounded-lg border border-[#edd694]/30">{s.nom}</span>
                        ))
                      : <span className="text-xs text-gray-400 italic">Aucune prestation.</span>}
                  </div>
                </div>
              </div>

              {detailModal.description_projet && (
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5 mb-2">Description du projet</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl italic whitespace-pre-line leading-relaxed">
                    "{detailModal.description_projet}"
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end p-6 border-t border-gray-100">
              <button onClick={() => setDetailModal(null)}
                className="px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl text-sm font-semibold transition-colors">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {modal === "edit" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-[#f5e8c2]">
            <div className="flex items-center justify-between p-6 border-b border-[#fdfbf7]">
              <h3 className="font-serif text-xl font-semibold text-[#664a24]">Modifier la réservation #{currentId}</h3>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-[#fdfbf7] rounded-lg text-gray-400"><X size={20} /></button>
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
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">{label}</label>
                    <input type={type || "text"} required={required} value={value}
                      onChange={(e) => set(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]" />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Date du mariage</label>
                  <input type="date" required value={dateMariage} onChange={(e) => setDateMariage(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Nombre d'invités</label>
                  <input type="number" required value={nombreInvites} onChange={(e) => setNombreInvites(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                    <input type="checkbox" checked={lieuDejaReserve} onChange={(e) => setLieuDejaReserve(e.target.checked)}
                      className="w-4 h-4 rounded text-[#b88a2d] border-[#f5e8c2]" />
                    Lieu déjà réservé ?
                  </label>
                  {lieuDejaReserve && (
                    <input type="text" placeholder="Nom du lieu" required value={nomLieu} onChange={(e) => setNomLieu(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]" />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Pack</label>
                  <select value={packId} onChange={(e) => setPackId(e.target.value ? Number(e.target.value) : "")}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]">
                    <option value="">Aucun pack</option>
                    {packs.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Statut</label>
                  <select value={statut} onChange={(e) => setStatut(e.target.value as Reservation["statut"])}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]">
                    {Object.entries(STATUS_CONFIG).map(([val, c]) => (
                      <option key={val} value={val}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Description du projet</label>
                  <textarea rows={3} value={descriptionProjet} onChange={(e) => setDescriptionProjet(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm resize-none focus:outline-none focus:border-[#d4a843]" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Prestations additionnelles</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-[#fdfbf7]/50 rounded-xl border border-[#f5e8c2]/50">
                    {services.filter((s) => s.statut === "ACTIF").map((s) => {
                      const checked = selectedServices.includes(s.id);
                      return (
                        <label key={s.id} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border ${checked ? "bg-[#f5e8c2]/30 border-[#d4a843]" : "bg-white border-transparent hover:border-[#edd694]/30"}`}>
                          <input type="checkbox" checked={checked} onChange={() => toggleService(s.id)}
                            className="w-4 h-4 rounded text-[#b88a2d] border-[#f5e8c2]" />
                          <span className="text-xs text-gray-700 truncate">{s.nom}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setModal(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm disabled:opacity-50">
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}