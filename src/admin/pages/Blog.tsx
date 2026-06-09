import { useState, useEffect } from "react";
import type { Article } from "../lib/api";
import { api } from "../lib/api";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Upload,
  BookOpen,
} from "lucide-react";
import { getErrorMessage } from "@/shared/errors";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);

  // Form state
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [titre, setTitre] = useState("");
  const [slug, setSlug] = useState("");
  const [contenu, setContenu] = useState("");
  const [statut, setStatut] = useState<"BROUILLON" | "PUBLIE">("BROUILLON");
  const [datePublication, setDatePublication] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const articlesData = await api.getArticles(true);
        setArticles(articlesData);
      } catch (error: unknown) {
        console.error(error);
        setError(
          getErrorMessage(error, "Impossible de charger les articles."),
        );
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const openCreate = () => {
    setCurrentId(null);
    setTitre("");
    setSlug("");
    setContenu("");
    setStatut("BROUILLON");
    setDatePublication(new Date().toISOString().split("T")[0]);
    setImagePreview(null);
    setModal("create");
  };

  const openEdit = (a: Article) => {
    setCurrentId(a.id);
    setTitre(a.titre);
    setSlug(a.slug || "");
    setContenu(a.contenu);
    setStatut(a.statut);

    // date_publication formatting (usually YYYY-MM-DD or YYYY-MM-DD HH:MM:SS)
    const rawDate = a.date_publication ? a.date_publication.split(" ")[0] : "";
    setDatePublication(rawDate);

    setImagePreview(a.image_url || null);
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
    if (!titre.trim() || !contenu.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      const formData = new FormData();
      formData.append("titre", titre.trim());
      formData.append(
        "slug",
        slug.trim() ||
          titre
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
      );
      formData.append("contenu", contenu.trim());
      formData.append("statut", statut);
      if (datePublication) {
        formData.append("date_publication", datePublication);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const savedArticle =
        modal === "create"
          ? await api.createArticle(formData)
          : currentId !== null
            ? await api.updateArticle(currentId, formData)
            : null;

      if (savedArticle) {
        setArticles((prev) => {
          const updated = prev.filter(
            (article) => article.id !== savedArticle.id,
          );
          return [savedArticle, ...updated];
        });
      }

      setModal(null);
    } catch (error: unknown) {
      console.error(error);
      setError(
        getErrorMessage(error, "Erreur lors de la sauvegarde de l'article."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    try {
      setSubmitting(true);
      setError(null);
      await api.deleteArticle(id);
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error: unknown) {
      console.error(error);
      setError(
        getErrorMessage(error, "Erreur lors de la suppression de l'article."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.titre.toLowerCase().includes(filter.toLowerCase()) ||
      a.contenu.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = !statusFilter || a.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#664a24]">
            Blog / Articles
          </h2>
          <p className="text-gray-500 mt-1">
            Publiez des conseils, des guides et des tendances de mariage
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl font-medium transition-colors shadow-sm text-sm"
        >
          <Plus size={18} /> Nouvel article
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
          <p className="text-sm">{error}</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
          <p className="text-sm text-gray-500">Chargement des articles...</p>
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
                placeholder="Rechercher par titre ou contenu..."
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
              <option value="PUBLIE">Publié</option>
              <option value="BROUILLON">Brouillon</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#fdfbf7] text-[#946c25]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Article</th>
                  <th className="text-left px-5 py-3 font-medium">
                    Date publication
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
                      Aucun article trouvé.
                    </td>
                  </tr>
                ) : (
                  filtered.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-[#fdfbf7]/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3 max-w-lg">
                          {a.image_url ? (
                            <img
                              src={a.image_url}
                              alt={a.titre}
                              className="w-12 h-12 min-w-12 rounded-lg object-cover border border-[#f5e8c2]"
                            />
                          ) : (
                            <div className="w-12 h-12 min-w-12 rounded-lg bg-[#fdfbf7] border border-[#f5e8c2] flex items-center justify-center text-[#d4a843]">
                              <BookOpen size={20} />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 line-clamp-1">
                              {a.titre}
                            </div>
                            <div className="text-xs text-gray-450 line-clamp-1">
                              /{a.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-xs">
                        {a.date_publication
                          ? a.date_publication.split(" ")[0]
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                            a.statut === "PUBLIE"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {a.statut === "PUBLIE" ? "Publié" : "Brouillon"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(a)}
                            className="p-2 hover:bg-[#fbf5e6] rounded-lg text-[#b88a2d] transition-colors"
                            title="Modifier"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(a.id)}
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
                {modal === "create" ? "Créer un article" : "Modifier l'article"}
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
                    Titre de l'article
                  </label>
                  <input
                    type="text"
                    required
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Slug (Auto-généré si vide)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-[#d4a843]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Date de publication
                  </label>
                  <input
                    type="date"
                    value={datePublication}
                    onChange={(e) => setDatePublication(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Contenu
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm resize-none focus:outline-none focus:border-[#d4a843]"
                  />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Image de l'article
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
                      setStatut(e.target.value as "BROUILLON" | "PUBLIE")
                    }
                    className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
                  >
                    <option value="BROUILLON">
                      Brouillon (non visible sur le site)
                    </option>
                    <option value="PUBLIE">
                      Publié (visible immédiatement)
                    </option>
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
