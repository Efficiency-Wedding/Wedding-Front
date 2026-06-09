import { useState, useEffect } from "react";
import { api } from "@/shared/api";
import type { Contact } from "@/shared/api";
import { Search, Trash2, Mail, Phone, Globe, Eye, EyeOff, Loader2 } from "lucide-react";
import { getErrorMessage } from "@/shared/errors";

export default function Contacts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.getContacts()
      .then((data) => { if (!cancelled) setContacts(data); })
      .catch((err) => { if (!cancelled) setError(getErrorMessage(err, "Impossible de charger les messages.")); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleMarkLu = async (id: number) => {
    try {
      const updated = await api.markContactLu(id);
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
      if (selected?.id === id) setSelected(updated);
    } catch (err) {
      setError(getErrorMessage(err, "Erreur lors de la mise à jour."));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      setError(getErrorMessage(err, "Erreur lors de la suppression."));
    }
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.email.toLowerCase().includes(filter.toLowerCase()) ||
      c.message.toLowerCase().includes(filter.toLowerCase()),
  );

  const unreadCount = contacts.filter((c) => !c.lu).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#664a24]">
            Messages de contact
          </h2>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 ? (
              <span className="text-[#b88a2d] font-semibold">
                {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
              </span>
            ) : (
              "Tous les messages lus"
            )}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
          <p className="text-sm text-gray-500">Chargement des messages...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-[#edd694]/20 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#edd694]/15">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[#f5e8c2] rounded-xl text-sm bg-[#fdfbf7]/30 focus:outline-none focus:border-[#d4a843]"
                />
              </div>
            </div>

            <div className="divide-y divide-[#fdfbf7] overflow-y-auto flex-1 max-h-[600px]">
              {filtered.length === 0 ? (
                <p className="text-center text-gray-400 text-xs py-10">Aucun message.</p>
              ) : (
                filtered.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelected(c);
                      if (!c.lu) handleMarkLu(c.id);
                    }}
                    className={`p-4 cursor-pointer hover:bg-[#fdfbf7]/60 transition-colors ${
                      selected?.id === c.id ? "bg-[#fdfbf7]" : ""
                    } ${!c.lu ? "border-l-4 border-l-[#d4a843]" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold truncate ${!c.lu ? "text-[#664a24]" : "text-gray-700"}`}>
                            {c.name}
                          </p>
                          {!c.lu && (
                            <span className="shrink-0 w-2 h-2 rounded-full bg-[#d4a843]" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{c.email}</p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{c.message}</p>
                      </div>
                      <p className="text-[10px] text-gray-400 shrink-0 mt-0.5">
                        {new Date(c.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Détail */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#edd694]/20 shadow-sm overflow-hidden">
            {selected ? (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-[#edd694]/15 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#664a24]">{selected.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Reçu le{" "}
                      {new Date(selected.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleMarkLu(selected.id)}
                      className="p-2 hover:bg-[#fbf5e6] rounded-lg text-[#b88a2d] transition-colors"
                      title={selected.lu ? "Marquer non lu" : "Marquer lu"}
                    >
                      {selected.lu ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center gap-3 p-3 bg-[#fdfbf7] rounded-xl border border-[#f5e8c2]/50 hover:border-[#d4a843] transition-colors group"
                    >
                      <Mail size={16} className="text-[#b88a2d] shrink-0" />
                      <span className="text-xs text-gray-700 truncate group-hover:text-[#664a24]">
                        {selected.email}
                      </span>
                    </a>
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-3 p-3 bg-[#fdfbf7] rounded-xl border border-[#f5e8c2]/50 hover:border-[#d4a843] transition-colors group"
                    >
                      <Phone size={16} className="text-[#b88a2d] shrink-0" />
                      <span className="text-xs text-gray-700 truncate group-hover:text-[#664a24]">
                        {selected.phone}
                      </span>
                    </a>
                    {selected.url && (
                      <a
                        href={selected.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[#fdfbf7] rounded-xl border border-[#f5e8c2]/50 hover:border-[#d4a843] transition-colors group"
                      >
                        <Globe size={16} className="text-[#b88a2d] shrink-0" />
                        <span className="text-xs text-gray-700 truncate group-hover:text-[#664a24]">
                          {selected.url}
                        </span>
                      </a>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Message
                    </p>
                    <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-line border border-gray-100">
                      {selected.message}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                    >
                      <Mail size={15} />
                      Répondre par email
                    </a>
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-2 px-5 py-2.5 border border-[#f5e8c2] hover:bg-[#fdfbf7] text-[#b88a2d] rounded-xl text-sm font-semibold transition-colors"
                    >
                      <Phone size={15} />
                      Appeler
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400">
                <Mail size={40} className="mb-3 opacity-30" />
                <p className="text-sm">Sélectionnez un message pour le lire</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}