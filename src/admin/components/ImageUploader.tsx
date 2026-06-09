import { useState } from "react";
import { type Image } from "@/shared/api";
import { api, assetUrl } from "@/shared/api";

interface Props {
  type: "service" | "pack" | "article";
  id: number;
  initialImages?: Image[];
  onChange?: (images: Image[]) => void;
}

export default function ImageUploader({ type, id, initialImages = [], onChange }: Props) {
  const [images, setImages] = useState<Image[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (next: Image[]) => {
    setImages(next);
    onChange?.(next);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    // Validation taille côté client
    const oversized = files.filter((f) => f.size > 2 * 1024 * 1024);
    if (oversized.length) {
      setError(`${oversized.length} fichier(s) dépassent 2 Mo`);
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const data = await api.uploadImages(type, id, files);
      update(data);
    } catch (err: any) {
      setError(err.message ?? "Erreur lors de l'upload");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm("Supprimer cette image ?")) return;
    try {
      await api.deleteImage(imageId);
      update(images.filter((img) => img.id !== imageId));
    } catch (err: any) {
      setError(err.message ?? "Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      {/* Grille des images */}
      <div className="flex flex-wrap gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative group w-28 h-20">
            <img
              src={assetUrl(img.url) ?? ""}
              alt={img.alt ?? ""}
              className="w-full h-full object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full
                         w-5 h-5 text-xs leading-none opacity-0 group-hover:opacity-100
                         transition-opacity cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}

        {/* Zone d'ajout */}
        <label className="w-28 h-20 flex flex-col items-center justify-center
                          border-2 border-dashed border-gray-300 rounded-lg
                          cursor-pointer hover:border-gray-400 hover:bg-gray-50
                          transition-colors text-gray-400 text-xs text-center">
          {uploading ? (
            <span>Envoi…</span>
          ) : (
            <>
              <span className="text-2xl leading-none mb-1">+</span>
              <span>Ajouter</span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <p className="text-xs text-gray-400">
        {images.length} photo(s) — max 2 Mo par fichier
      </p>
    </div>
  );
}