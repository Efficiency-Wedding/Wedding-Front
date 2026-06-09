import { useState, useEffect } from "react";
import type { Service } from "../../lib/admin/api";
import { api } from "../../lib/admin/api";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Upload,
  Sparkles,
} from "lucide-react";

export default function Services() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);

  // Form state
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [nom, setNom] = useState("");
  const [slug, setSlug] = useState("");
  const [prixIndicatif, setPrixIndicatif] = useState("");
  const [descriptionCourte, setDescriptionCourte] = useState("");
  const [descriptionComplete, setDescriptionComplete] = useState("");
  const [statut, setStatut] = useState<"ACTIF" | "INACTIF">("ACTIF");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        const servicesData = await api.getServices();
        setServices(servicesData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Impossible de charger les services.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const openCreate = () => {
    setCurrentId(null);
    setNom("");
    setSlug("");
    setPrixIndicatif("");
    setDescriptionCourte("");
    setDescriptionComplete("");
    setStatut("ACTIF");
    setImagePreview(null);
    setModal("create");
  };

  const openEdit = (s: Service) => {
    setCurrentId(s.id);
    setNom(s.nom);
    setSlug(s.slug || "");
    setPrixIndicatif(s.prix_indicatif ? String(s.prix_indicatif) : "");
    setDescriptionCourte(s.description_courte || "");
    setDescriptionComplete(s.description_complete || "");
    setStatut(s.statut);
    setImagePreview(s.image_url || null);
    setModal("edit");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      const formData = new FormData();
      formData.append("nom", nom.trim());
      formData.append(
        "slug",
        slug.trim() ||
          nom
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
      );
      formData.append("description_courte", descriptionCourte.trim());
      formData.append("description_complete", descriptionComplete.trim());
      if (prixIndicatif) {
        formData.append("prix_indicatif", prixIndicatif);
      }
      formData.append("statut", statut);
      if (imageFile) {
        formData.append("image_principale", imageFile);
      }

      const savedService =
        modal === "create"
          ? await api.createService(formData)
          : currentId !== null
            ? await api.updateService(currentId, formData)
            : null;

      if (savedService) {
        setServices((prev) => {
          const updated = prev.filter(
            (service) => service.id !== savedService.id,
          );
          return [savedService, ...updated];
        });
      }

      setModal(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la sauvegarde du service.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce service ?")) return;
    try {
      setSubmitting(true);
      setError(null);
      await api.deleteService(id);
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la suppression du service.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.nom.toLowerCase().includes(filter.toLowerCase()) ||
      (s.description_courte &&
        s.description_courte.toLowerCase().includes(filter.toLowerCase())),
  );

  const formatMGA = (n: number | null) => {
    if (n === null) return "—";
    return new Intl.NumberFormat("fr-FR").format(n) + " MGA";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#664a24]">
            Services
          </h2>
          <p className="text-gray-500 mt-1">
            Gérez vos prestations de mariage et tarifs indicatifs
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl font-medium transition-colors shadow-sm text-sm"
        >
          <Plus size={18} /> Ajouter un service
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
          <p className="text-sm">{error}</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
          <p className="text-sm text-gray-500">Chargement des services...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#edd694]/20 shadow-sm overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-[#edd694]/15 flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-[#fdfbf7]/30 focus:outline-none focus:border-[#d4a843]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#fdfbf7] text-[#946c25]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Service</th>
                  <th className="text-left px-5 py-3 font-medium">
                    Prix indicatif
                  </th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                  <th className="text-left px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#fdfbf7]">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-gray-400 text-xs"
                    >
                      Aucun service trouvé.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-[#fdfbf7]/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {s.image_url ? (
                            <img
                              src={s.image_url}
                              alt={s.nom}
                              className="w-12 h-12 rounded-lg object-cover border border-[#f5e8c2]"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-[#fdfbf7] border border-[#f5e8c2] flex items-center justify-center text-[#d4a843]">
                              <Sparkles size={20} />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">
                              {s.nom}
                            </div>
                            <div className="text-xs text-gray-500">
                              {s.description_courte}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {formatMGA(s.prix_indicatif)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                            s.statut === "ACTIF"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {s.statut === "ACTIF" ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(s)}
                            className="p-2 hover:bg-[#fbf5e6] rounded-lg text-[#b88a2d] transition-colors"
                            title="Modifier"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
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

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-[#f5e8c2]">
            <div className="flex items-center justify-between p-6 border-b border-[#fdfbf7]">
              <h3 className="font-serif text-xl font-semibold text-[#664a24]">
                {modal === "create" ? "Nouveau service" : "Modifier le service"}
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
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Nom du service
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
                    Slug (URL amicale)
                  </label>
                  <input
                    type="text"
                    placeholder="Auto-généré si vide"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Prix indicatif (MGA)
                  </label>
                  <input
                    type="number"
                    value={prixIndicatif}
                    onChange={(e) => setPrixIndicatif(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Description courte
                  </label>
                  <input
                    type="text"
                    value={descriptionCourte}
                    onChange={(e) => setDescriptionCourte(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Description complète
                  </label>
                  <textarea
                    rows={4}
                    value={descriptionComplete}
                    onChange={(e) => setDescriptionComplete(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm resize-none focus:outline-none focus:border-[#d4a843]"
                  />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Image du service
                  </label>
                  <div className="flex gap-4 items-center">
                    <label className="flex flex-col items-center justify-center w-36 h-28 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400 text-center px-2">
                        <Upload size={20} className="mb-1" />
                        <span className="text-[10px]">Téléverser</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative w-36 h-28 border border-[#f5e8c2] rounded-xl overflow-hidden shadow-sm bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="Prévisualisation"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                          }}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Statut
                  </label>
                  <select
                    value={statut}
                    onChange={(e) =>
                      setStatut(e.target.value as "ACTIF" | "INACTIF")
                    }
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
                  >
                    <option value="ACTIF">Actif</option>
                    <option value="INACTIF">Inactif</option>
                  </select>
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
