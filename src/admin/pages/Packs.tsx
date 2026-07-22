import { useState, useEffect } from "react";
import type { Pack, Service } from "../lib/api";
import { api, assetUrl } from "../lib/api";
import { Plus, Pencil, Trash2, X, Loader2, Upload } from "lucide-react";
import { getErrorMessage } from "@/shared/errors";
import ImageUploader from "@/admin/components/ImageUploader";

export default function Packs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);

  // Form state
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Pricing Form State
  const [pricingRows, setPricingRows] = useState<any[]>([
    {
      id: 1,
      persons: 50,
      servi: 10500000,
      semi: 11750000,
      buffet: 12500000,
    },
    {
      id: 2,
      persons: 100,
      servi: 14000000,
      semi: 15500000,
      buffet: 17500000,
    },
  ]);

  const handlePricingChange = (id: number, field: string, value: string) => {
    setPricingRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: Number(value),
            }
          : row
      )
    );
  };

  const addPricingRow = () => {
    setPricingRows([
      ...pricingRows,
      {
        id: Date.now(),
        persons: "",
        servi: "",
        semi: "",
        buffet: "",
      },
    ]);
  };

  const removePricingRow = (id: number) => {
    setPricingRows(pricingRows.filter((row) => row.id !== id));
  };

  useEffect(() => {
    async function loadPacksAndServices() {
      try {
        setLoading(true);
        const [packsData, servicesData] = await Promise.all([
          api.getPacks(),
          api.getServices(),
        ]);
        setPacks(packsData);
        setServices(servicesData);
      } catch (error: unknown) {
        console.error(error);
        setError(
          getErrorMessage(
            error,
            "Impossible de charger les packs et services.",
          ),
        );
      } finally {
        setLoading(false);
      }
    }

    loadPacksAndServices();
  }, []);

  const openCreate = () => {
    setCurrentId(null);
    setNom("");
    setDescription("");
    setSelectedServices([]);
    setImageFile(null);
    setImagePreview(null);
    setPricingRows([
      { id: 1, persons: "", servi: "", semi: "", buffet: "" }
    ]);
    setModal("create");
  };

  const openEdit = (p: Pack) => {
    setCurrentId(p.id);
    setNom(p.nom);
    setDescription(p.description || "");
    setSelectedServices(p.services ? p.services.map((s) => s.id) : []);
    setImageFile(null);
    setImagePreview(
      p.image_url || assetUrl(p.image_principale),
    );
    
    if (p.tarifs && Object.keys(p.tarifs).length > 0) {
      const parsedRows = Object.entries(p.tarifs).map(([persons, prices], index) => ({
        id: index + 1,
        persons: Number(persons),
        servi: prices.servi || "",
        semi: prices.semi || "",
        buffet: prices.buffet || "",
      }));
      setPricingRows(parsedRows);
    } else {
      setPricingRows([{ id: 1, persons: "", servi: "", semi: "", buffet: "" }]);
    }
    
    setModal("edit");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      const formData = new FormData();
      formData.append("nom", nom.trim());
      formData.append("description", description.trim());
      formData.append("prix", "0"); // Hardcoded since field was removed in favor of tarifs

      selectedServices.forEach((serviceId) => {
        formData.append("services[]", String(serviceId));
      });

      pricingRows.forEach((row) => {
        if (row.persons) {
          if (row.servi) formData.append(`tarifs[${row.persons}][servi]`, String(row.servi));
          if (row.semi) formData.append(`tarifs[${row.persons}][semi]`, String(row.semi));
          if (row.buffet) formData.append(`tarifs[${row.persons}][buffet]`, String(row.buffet));
        }
      });

      if (imageFile) {
        formData.append("image_principale", imageFile);
      }

      const savedPack =
        modal === "create"
          ? await api.createPack(formData)
          : currentId !== null
            ? await api.updatePack(currentId, formData)
            : null;

      if (savedPack) {
        setPacks((prev) => {
          const updated = prev.filter((pack) => pack.id !== savedPack.id);
          return [savedPack, ...updated];
        });
      }

      setModal(null);
    } catch (error: unknown) {
      console.error(error);
      setError(getErrorMessage(error, "Erreur lors de la sauvegarde du pack."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce pack ?")) return;
    try {
      setSubmitting(true);
      setError(null);
      await api.deletePack(id);
      setPacks((prev) => prev.filter((pack) => pack.id !== id));
    } catch (error: unknown) {
      console.error(error);
      setError(getErrorMessage(error, "Erreur lors de la suppression du pack."));
    } finally {
      setSubmitting(false);
    }
  };

  const formatMGA = (n: number) =>
    new Intl.NumberFormat("fr-FR").format(n) + " MGA";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#edd694]/30">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#664a24]">
            Packs 
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Forfaits mariage combinant plusieurs services à prix avantageux.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl font-semibold transition-colors shadow-sm text-sm w-full sm:w-auto"
        >
          <Plus size={16} />
          Nouveau pack
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
          <p className="text-sm">{error}</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
          <p className="text-sm text-gray-500">Chargement des packs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packs.length === 0 ? (
            <div className="col-span-full bg-white p-8 text-center text-gray-400 text-sm border border-[#edd694]/25 rounded-2xl">
              Aucun pack configuré.
            </div>
          ) : (
            packs.map((p) => {
              const imageUrl =
                p.image_url ||
                assetUrl(p.image_principale) ||
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=400";

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#edd694]/20 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={imageUrl}
                        alt={p.nom}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                            p.statut === "ACTIF"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          {p.statut === "ACTIF" ? "Actif" : "Inactif"}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-serif text-lg font-semibold text-[#664a24]">
                        {p.nom}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {p.description}
                      </p>
                      <p className="text-lg font-bold text-[#b88a2d]">
                        {formatMGA(p.prix)}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.services && p.services.length > 0 ? (
                          p.services.slice(0, 3).map((s) => (
                            <span
                              key={s.id}
                              className="px-2 py-0.5 bg-[#fdfbf7] text-[#946c25] text-[10px] rounded-lg border border-[#edd694]/30"
                            >
                              {s.nom}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">
                            Aucun service inclus
                          </span>
                        )}
                        {p.services && p.services.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded-lg border border-gray-100">
                            +{p.services.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-5 border-t border-[#fdfbf7]">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#b88a2d] hover:bg-[#fdfbf7] rounded-lg border border-[#edd694]/30 transition-colors"
                    >
                      <Pencil size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-transparent transition-colors"
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-[#f5e8c2]">
            <div className="flex items-center justify-between p-6 border-b border-[#fdfbf7]">
              <h3 className="font-serif text-xl font-semibold text-[#664a24]">
                {modal === "create" ? "Nouveau pack" : "Modifier le pack"}
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
                    Nom du pack
                  </label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm resize-none focus:outline-none focus:border-[#d4a843]"
                  />
                </div>

                {/* Image principale */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Image de couverture du pack
                  </label>
                  <div className="flex gap-4 items-center">
                    <label className="flex flex-col items-center justify-center w-36 h-28 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400 text-center px-2">
                        <Upload size={20} className="mb-1" />
                        <span className="text-[10px]">Téléverser</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-36 h-28 border border-[#f5e8c2] rounded-xl overflow-hidden shadow-sm bg-gray-50">
                        <img src={imagePreview} alt="Prévisualisation" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setImageFile(null); setImagePreview(null); }}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photos supplémentaires — uniquement en mode édition */}
                {modal === "edit" && currentId !== null && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Photos supplémentaires
                    </label>
                    <ImageUploader
                      type="pack"
                      id={currentId}
                      initialImages={packs.find((p) => p.id === currentId)?.images ?? []}
                    />
                  </div>
                )}

                {/* Services Checkboxes */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Services inclus
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

                {/* Pricing Table */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-xl border border-[#f5e8c2] p-4 sm:p-6 shadow-sm mt-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                      <h2 className="text-lg font-semibold text-[#664a24]">
                        Tarifs par nombre de personnes
                      </h2>

                      <button
                        type="button"
                        onClick={addPricingRow}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-sm whitespace-nowrap"
                      >
                        ➕ Ajouter une ligne
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-100">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#fdfbf7]">
                          <tr>
                            <th className="p-3 border-b border-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Nb personnes</th>
                            <th className="p-3 border-b border-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Servi</th>
                            <th className="p-3 border-b border-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Semi-buffet</th>
                            <th className="p-3 border-b border-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Buffet</th>
                            <th className="p-3 border-b border-gray-100 w-24 text-center text-xs font-semibold text-gray-600 uppercase">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {pricingRows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="p-2 border-b border-gray-100">
                                <input
                                  type="number"
                                  value={row.persons}
                                  onChange={(e) =>
                                    handlePricingChange(row.id, "persons", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-[#f5e8c2] rounded-lg text-sm focus:outline-none focus:border-[#d4a843]"
                                />
                              </td>

                              <td className="p-2 border-b border-gray-100">
                                <input
                                  type="number"
                                  value={row.servi}
                                  onChange={(e) =>
                                    handlePricingChange(row.id, "servi", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-[#f5e8c2] rounded-lg text-sm focus:outline-none focus:border-[#d4a843]"
                                />
                              </td>

                              <td className="p-2 border-b border-gray-100">
                                <input
                                  type="number"
                                  value={row.semi}
                                  onChange={(e) =>
                                    handlePricingChange(row.id, "semi", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-[#f5e8c2] rounded-lg text-sm focus:outline-none focus:border-[#d4a843]"
                                />
                              </td>

                              <td className="p-2 border-b border-gray-100">
                                <input
                                  type="number"
                                  value={row.buffet}
                                  onChange={(e) =>
                                    handlePricingChange(row.id, "buffet", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-[#f5e8c2] rounded-lg text-sm focus:outline-none focus:border-[#d4a843]"
                                />
                              </td>

                              <td className="p-2 border-b border-gray-100 text-center">
                                <button
                                  type="button"
                                  onClick={() => removePricingRow(row.id)}
                                  className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-colors border border-red-100 hover:border-transparent"
                                  title="Supprimer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
