import { useState, useEffect } from "react";
import type { Reservation, Pack, Service } from "../../lib/admin/api";
import { api } from "../../lib/admin/api";
import { Search, Pencil, Trash2, Eye, X, Loader2 } from "lucide-react";

export default function Reservations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modals state
  const [modal, setModal] = useState<"edit" | null>(null);
  const [detailModal, setDetailModal] = useState<Reservation | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);

  // Form fields
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
    async function loadReservationsData() {
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
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Impossible de charger les réservations.");
      } finally {
        setLoading(false);
      }
    }

    loadReservationsData();
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentId === null) return;

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        nom: nom.trim(),
        prenom: prenom.trim(),
        telephone: telephone.trim(),
        email: email.trim(),
        date_mariage: dateMariage,
        ville: ville.trim(),
        nombre_invites: Number(nombreInvites) || 1,
        budget_estime: budgetEstime,
        theme_mariage: themeMariage || null,
        couleurs_principales: couleursPrincipales || null,
        lieu_deja_reserve: lieuDejaReserve,
        nom_lieu: lieuDejaReserve ? nomLieu.trim() || null : null,
        pack_id: packId || null,
        service_ids: selectedServices,
        description_projet: descriptionProjet || null,
        statut,
      };

      const updatedReservation = await api.updateReservation(
        currentId,
        payload,
      );
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === currentId ? updatedReservation : reservation,
        ),
      );
      setModal(null);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Erreur lors de la mise à jour de la réservation.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;
    try {
      setSubmitting(true);
      setError(null);
      await api.deleteReservation(id);
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id),
      );
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Erreur lors de la suppression de la réservation.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = reservations.filter((r) => {
    const searchString =
      `${r.client.nom} ${r.client.prenom} ${r.client.email} ${r.details_mariage.ville}`.toLowerCase();
    const matchesSearch = searchString.includes(filter.toLowerCase());
    const matchesStatus = !statusFilter || r.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatMGA = (n: number) =>
    new Intl.NumberFormat("fr-FR").format(n) + " MGA";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "EN_ATTENTE":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "CONTACTE":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "DEVIS_ENVOYE":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "CONFIRME":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "ANNULE":
        return "bg-red-50 text-red-700 border border-red-200";
      case "TERMINE":
        return "bg-gray-100 text-gray-600 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "EN_ATTENTE":
        return "En attente";
      case "CONTACTE":
        return "Contacté";
      case "DEVIS_ENVOYE":
        return "Devis envoyé";
      case "CONFIRME":
        return "Confirmé";
      case "ANNULE":
        return "Annulé";
      case "TERMINE":
        return "Terminé";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#664a24]">
            Réservations
          </h2>
          <p className="text-gray-500 mt-1">
            Gérez et suivez les demandes d'organisation de mariage
          </p>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
          <p className="text-sm">{error}</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
          <p className="text-sm text-gray-500">
            Chargement des réservations...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#edd694]/20 shadow-sm overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b border-[#edd694]/15 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[280px] max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher par client, email, ville..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-[#fdfbf7]/30 focus:outline-none focus:border-[#d4a843]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
            >
              <option value="">Tous les statuts</option>
              <option value="EN_ATTENTE">En attente</option>
              <option value="CONTACTE">Contacté</option>
              <option value="DEVIS_ENVOYE">Devis envoyé</option>
              <option value="CONFIRME">Confirmé</option>
              <option value="ANNULE">Annulé</option>
              <option value="TERMINE">Terminé</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#fdfbf7] text-[#946c25]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Client</th>
                  <th className="text-left px-5 py-3 font-medium">
                    Date mariage
                  </th>
                  <th className="text-left px-5 py-3 font-medium">
                    Ville / Invités
                  </th>
                  <th className="text-left px-5 py-3 font-medium">Pack</th>
                  <th className="text-left px-5 py-3 font-medium">Budget</th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                  <th className="text-left px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#fdfbf7]">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-gray-400 text-xs"
                    >
                      Aucune réservation trouvée.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-[#fdfbf7]/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">
                          {r.client.prenom} {r.client.nom}
                        </div>
                        <div className="text-xs text-gray-500">
                          {r.client.telephone}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {r.details_mariage.date}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-gray-900 font-medium">
                          {r.details_mariage.ville}
                        </div>
                        <div className="text-xs text-gray-500">
                          {r.details_mariage.nombre_invites} invités
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {r.pack ? r.pack.nom : "—"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {formatMGA(parseFloat(r.details_mariage.budget) || 0)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${getStatusColor(
                            r.statut,
                          )}`}
                        >
                          {getStatusLabel(r.statut)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setDetailModal(r)}
                            className="p-1.5 hover:bg-[#fbf5e6] rounded-lg text-[#b88a2d] transition-colors"
                            title="Consulter"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => openEdit(r)}
                            className="p-1.5 hover:bg-[#fbf5e6] rounded-lg text-[#b88a2d] transition-colors"
                            title="Modifier"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#f5e8c2]">
            <div className="flex items-center justify-between p-6 border-b border-[#fdfbf7]">
              <h3 className="font-serif text-xl font-bold text-[#664a24]">
                Projet de mariage de {detailModal.client.prenom}{" "}
                {detailModal.client.nom}
              </h3>
              <button
                onClick={() => setDetailModal(null)}
                className="p-2 hover:bg-[#fdfbf7] rounded-lg transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status & Date bar */}
              <div className="flex items-center justify-between flex-wrap gap-3 bg-[#fdfbf7] border border-[#f5e8c2]/50 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#946c25] block mb-1">
                    Statut actuel
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(detailModal.statut)}`}
                  >
                    {getStatusLabel(detailModal.statut)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#946c25] block mb-1">
                    Date célébration
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {detailModal.details_mariage.date}
                  </span>
                </div>
              </div>

              {/* Grid Client & Wedding detail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5">
                    Informations de contact
                  </h4>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-500">
                      Téléphone:{" "}
                      <span className="font-medium text-gray-800">
                        {detailModal.client.telephone}
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Email:{" "}
                      <span className="font-medium text-gray-800">
                        {detailModal.client.email}
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Ville:{" "}
                      <span className="font-medium text-gray-800">
                        {detailModal.details_mariage.ville}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5">
                    Détails de la fête
                  </h4>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-500">
                      Invités:{" "}
                      <span className="font-medium text-gray-800">
                        {detailModal.details_mariage.nombre_invites} personnes
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Budget estimé:{" "}
                      <span className="font-medium text-gray-850">
                        {formatMGA(
                          parseFloat(detailModal.details_mariage.budget) || 0,
                        )}
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Thème:{" "}
                      <span className="font-medium text-gray-800">
                        {detailModal.details_mariage.theme || "—"}
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Couleurs:{" "}
                      <span className="font-medium text-gray-800">
                        {detailModal.details_mariage.couleurs || "—"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Lieu / Venue Info */}
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5">
                  Lieu de réception
                </h4>
                <p className="text-sm text-gray-700">
                  {detailModal.lieu.deja_reserve ? (
                    <span>
                      Lieu déjà réservé :{" "}
                      <strong className="text-[#664a24]">
                        {detailModal.lieu.nom}
                      </strong>
                    </span>
                  ) : (
                    <span className="text-gray-500 italic">
                      Recherche d'un lieu à la charge de l'agence.
                    </span>
                  )}
                </p>
              </div>

              {/* Chosen Services and Pack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5 mb-2">
                    Forfait (Pack) choisi
                  </h4>
                  {detailModal.pack ? (
                    <div className="bg-[#fdfbf7] p-3 rounded-lg border border-[#f5e8c2]/50 text-sm">
                      <p className="font-semibold text-gray-800">
                        {detailModal.pack.nom}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {detailModal.pack.description}
                      </p>
                      <p className="text-[#b88a2d] font-bold text-xs mt-1">
                        {formatMGA(detailModal.pack.prix)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      Aucun forfait global choisi.
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5 mb-2">
                    Prestations additionnelles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {detailModal.services && detailModal.services.length > 0 ? (
                      detailModal.services.map((s) => (
                        <span
                          key={s.id}
                          className="px-2.5 py-1 bg-[#fdfbf7] text-[#946c25] text-xs rounded-lg border border-[#edd694]/30"
                        >
                          {s.nom}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Aucune prestation additionnelle.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Project description text */}
              {detailModal.description_projet && (
                <div className="space-y-2">
                  <h4 className="font-serif text-sm font-bold text-[#664a24] border-b border-gray-100 pb-1.5">
                    Description du projet par le client
                  </h4>
                  <p className="text-sm text-gray-650 bg-gray-50 p-4 rounded-xl italic whitespace-pre-line leading-relaxed">
                    "{detailModal.description_projet}"
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end p-6 border-t border-gray-100">
              <button
                onClick={() => setDetailModal(null)}
                className="px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
              >
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
              <h3 className="font-serif text-xl font-semibold text-[#664a24]">
                Modifier la réservation #{currentId}
              </h3>
              <button
                onClick={() => setModal(null)}
                className="p-2 hover:bg-[#fdfbf7] rounded-lg transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={save} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Date du mariage
                  </label>
                  <input
                    type="date"
                    required
                    value={dateMariage}
                    onChange={(e) => setDateMariage(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    required
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Nombre d'invités
                  </label>
                  <input
                    type="number"
                    required
                    value={nombreInvites}
                    onChange={(e) => setNombreInvites(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Budget estimé (MGA ou format libre)
                  </label>
                  <input
                    type="text"
                    required
                    value={budgetEstime}
                    onChange={(e) => setBudgetEstime(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Thème du mariage
                  </label>
                  <input
                    type="text"
                    value={themeMariage}
                    onChange={(e) => setThemeMariage(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Couleurs principales
                  </label>
                  <input
                    type="text"
                    value={couleursPrincipales}
                    onChange={(e) => setCouleursPrincipales(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>

                {/* Lieu / Venue checkbox & input */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lieuDejaReserve}
                      onChange={(e) => setLieuDejaReserve(e.target.checked)}
                      className="w-4 h-4 rounded text-[#b88a2d] focus:ring-[#d4a843] border-[#f5e8c2]"
                    />
                    Lieu déjà réservé ?
                  </label>
                  {lieuDejaReserve && (
                    <input
                      type="text"
                      placeholder="Nom du lieu"
                      required={lieuDejaReserve}
                      value={nomLieu}
                      onChange={(e) => setNomLieu(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                    />
                  )}
                </div>

                {/* Pack Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Forfait (Pack) choisi
                  </label>
                  <select
                    value={packId}
                    onChange={(e) =>
                      setPackId(e.target.value ? Number(e.target.value) : "")
                    }
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
                  >
                    <option value="">Aucun pack</option>
                    {packs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Statut de la demande
                  </label>
                  <select
                    value={statut}
                    onChange={(e) =>
                      setStatut(e.target.value as Reservation["statut"])
                    }
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
                  >
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="CONTACTE">Contacté</option>
                    <option value="DEVIS_ENVOYE">Devis envoyé</option>
                    <option value="CONFIRME">Confirmé</option>
                    <option value="ANNULE">Annulé</option>
                    <option value="TERMINE">Terminé</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Description du projet
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionProjet}
                    onChange={(e) => setDescriptionProjet(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm resize-none focus:outline-none focus:border-[#d4a843]"
                  />
                </div>

                {/* Services Checkboxes */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Prestations additionnelles choisies
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-[#fdfbf7]/50 rounded-xl border border-[#f5e8c2]/50">
                    {services
                      .filter((s) => s.statut === "ACTIF")
                      .map((s) => {
                        const checked = selectedServices.includes(s.id);
                        return (
                          <label
                            key={s.id}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border ${
                              checked
                                ? "bg-[#f5e8c2]/30 border-[#d4a843]"
                                : "bg-white border-transparent hover:border-[#edd694]/30"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleService(s.id)}
                              className="w-4 h-4 rounded text-[#b88a2d] focus:ring-[#d4a843] border-[#f5e8c2]"
                            />
                            <div className="flex items-center gap-2 overflow-hidden">
                              {s.image_url && (
                                <img
                                  src={s.image_url}
                                  alt=""
                                  className="w-7 h-7 rounded object-cover"
                                />
                              )}
                              <span className="text-xs text-gray-700 truncate">
                                {s.nom}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm disabled:opacity-50"
                >
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
