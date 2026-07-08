import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiError, api, assetUrl } from "@/shared/api";
import type { ReservationPayload, Service, Pack } from "@/shared/api";
import homeHero from "@/assets/images/home/home.jpg";
import photo11 from "@/assets/images/home/photo11.jpg";
import photo16 from "@/assets/images/home/photo16.jpg";
import verre from "@/assets/images/home/verre.jpg";
import photo8 from "@/assets/images/home/photo8.jpg";
import bouquet from "@/assets/images/home/bouquet.jpg";
import blog9 from "@/assets/images/blog/blog (9).jpeg";

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
};

type ReservationForm = {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    date: string;
    ville: string;
    nombre_invites: string;
    budget: string;
    theme: string;
    couleurs: string;
    deja_reserve: "oui" | "non";
    lieu_nom: string;
    description_projet: string;
    type_service: string;
    prix_package: string;
    nombre_personnes: string;
};

type ReservationFieldName =
    | "prenom"
    | "nom"
    | "email"
    | "telephone"
    | "date"
    | "ville"
    | "nombre_invites";

type ReservationField = {
    label: string;
    name: ReservationFieldName;
    type: "text" | "email" | "tel" | "date" | "number";
};

type FieldErrors = Partial<Record<ReservationFieldName | "budget" | "theme" | "couleurs" | "deja_reserve" | "lieu_nom" | "description_projet" | "type_service" | "prix_package" | "nombre_personnes", string>>;

const reservationFields: ReservationField[] = [
    { label: "Prénom", name: "prenom", type: "text" },
    { label: "Nom", name: "nom", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Téléphone", name: "telephone", type: "tel" },
    { label: "Date du mariage", name: "date", type: "date" },
    { label: "Ville", name: "ville", type: "text" },
    { label: "Nombre d'invités", name: "nombre_invites", type: "number" },
];

const initialFormState: ReservationForm = {
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    date: "",
    ville: "",
    nombre_invites: "",
    budget: "",
    theme: "",
    couleurs: "",
    deja_reserve: "non",
    lieu_nom: "",
    description_projet: "",
    type_service: "",
    prix_package: "",
    nombre_personnes: "",
};

// Static fallback data for services and packs (if API calls fail)
const staticServices: (Service & { icon?: string; tag?: string })[] = [
    {
        id: 991,
        nom: "Traiteur",
        slug: "traiteur",
        description_courte: "Menus variés et raffinés pour ravir vos invités.",
        description_complete: "Menus personnalisés, buffet ou service à table",
        prix_indicatif: 1200000,
        prix_formate: "1 200 €",
        image_principale: null,
        image_url: verre,
        icon: "chef",
        tag: "Le plus demandé",
        statut: "ACTIF",
    },
    {
        id: 992,
        nom: "Salle de réception",
        slug: "salle-de-reception",
        description_courte: "Salles élégantes adaptées à votre événement.",
        description_complete: "Capacité de 50 à 600 invités, parking privé",
        prix_indicatif: 1500000,
        prix_formate: "1 500 €",
        image_principale: null,
        image_url: homeHero,
        icon: "hall",
        tag: "Exclusif",
        statut: "ACTIF",
    },
    {
        id: 993,
        nom: "Photographe & Vidéaste",
        slug: "photographe-videaste",
        description_courte: "Immortalisez chaque instant de votre mariage.",
        description_complete: "Photos HD, drone, album de luxe",
        prix_indicatif: 800000,
        prix_formate: "800 €",
        image_principale: null,
        image_url: photo8,
        icon: "camera",
        tag: "Coup de cœur",
        statut: "ACTIF",
    },
    {
        id: 994,
        nom: "DJ & Animation",
        slug: "dj-animation",
        description_courte: "Ambiance garantie avec nos DJ et animateurs.",
        description_complete: "Sonorisation, jeux de lumières, playlist sur mesure",
        prix_indicatif: 600000,
        prix_formate: "600 €",
        image_principale: null,
        image_url: blog9,
        icon: "music",
        tag: "Ambiance garantie",
        statut: "ACTIF",
    },
    {
        id: 995,
        nom: "Décoration florale",
        slug: "decoration-florale",
        description_courte: "Décorations personnalisées selon votre thème.",
        description_complete: "Fleurs fraîches de saison, arches, centres de table",
        prix_indicatif: 400000,
        prix_formate: "400 €",
        image_principale: null,
        image_url: bouquet,
        icon: "flower",
        tag: "Artisan fleuriste",
        statut: "ACTIF",
    }
];

const staticPacks: Pack[] = [
    {
        id: 881,
        nom: "Package Prestige",
        description: "Le package complet pour votre mariage",
        prix: 5000000,
        image_principale: null,
        image_url: null,
        statut: "ACTIF",
        services: [staticServices[0], staticServices[1], staticServices[2]] // Exemple: le pack contient 3 services
    },
];

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return <span className="mt-1 block text-xs text-red-600">{message}</span>;
}

function formatLocalDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function ReservationPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<ReservationForm>(initialFormState);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [activeImg, setActiveImg] = useState(0);

    const [services, setServices] = useState<(Service & { icon?: string; tag?: string })[]>(staticServices);
    const [packs, setPacks] = useState<Pack[]>(staticPacks);
    const [loading, setLoading] = useState(true);

    const [selectedExtraServices, setSelectedExtraServices] = useState<number[]>([]);
    const [showExtraServicesModal, setShowExtraServicesModal] = useState(false);

    const location = useLocation();
    const state = location.state as { serviceId?: number; packId?: number; type?: "service" | "pack"; prix?: string } | null;

    const [reservationType, setReservationType] = useState<"service" | "pack">("service");
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const [minimumWeddingDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return formatLocalDate(tomorrow);
    });

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch dynamic services and packages from the database
                const [activeServices, activePacks] = await Promise.all([
                    api.getActiveServices(),
                    api.getActivePacks()
                ]);

                let finalServices = staticServices;
                let finalPacks = staticPacks;

                if (activeServices && activeServices.length > 0) {
                    finalServices = activeServices.map(s => {
                        let icon = "chef";
                        if (s.slug.includes("salle") || s.slug.includes("reception")) icon = "hall";
                        else if (s.slug.includes("photo") || s.slug.includes("video") || s.slug.includes("photographe")) icon = "camera";
                        else if (s.slug.includes("musique") || s.slug.includes("dj")) icon = "music";
                        else if (s.slug.includes("decor") || s.slug.includes("fleur")) icon = "flower";

                        let tag = undefined;
                        if (s.slug === "traiteur") tag = "Le plus demandé";
                        else if (s.slug.includes("salle")) tag = "Exclusif";
                        else if (s.slug.includes("photo")) tag = "Coup de cœur";
                        else if (s.slug.includes("dj")) tag = "Ambiance garantie";
                        else if (s.slug.includes("decor")) tag = "Artisan fleuriste";

                        return {
                            ...s,
                            icon,
                            tag,
                            image_url: assetUrl(s.image_url || s.image_principale) || null
                        };
                    });
                }

                if (activePacks && activePacks.length > 0) {
                    finalPacks = activePacks;
                }

                setServices(finalServices);
                setPacks(finalPacks);

                // Determine selection based on location state or default
                if (state && state.type === "pack" && state.packId) {
                    setReservationType("pack");
                    setSelectedItemId(state.packId);
                } else if (state && state.type === "service" && state.serviceId) {
                    setReservationType("service");
                    setSelectedItemId(state.serviceId);
                } else {
                    if (finalServices.length > 0) {
                        setReservationType("service");
                        setSelectedItemId(finalServices[0].id);
                    } else if (finalPacks.length > 0) {
                        setReservationType("pack");
                        setSelectedItemId(finalPacks[0].id);
                    }
                }
            } catch (err) {
                console.error("Erreur lors du chargement des données depuis l'API, utilisation du fallback statique.", err);
                // Fallback selected item configuration
                if (state && state.type === "pack" && state.packId) {
                    setReservationType("pack");
                    setSelectedItemId(state.packId);
                } else if (state && state.type === "service" && state.serviceId) {
                    setReservationType("service");
                    setSelectedItemId(state.serviceId);
                } else {
                    if (staticServices.length > 0) {
                        setReservationType("service");
                        setSelectedItemId(staticServices[0].id);
                    } else if (staticPacks.length > 0) {
                        setReservationType("pack");
                        setSelectedItemId(staticPacks[0].id);
                    }
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [state]);

    // Pre-fill prix_package from navigation state
    useEffect(() => {
        if (state?.prix) {
            setForm((prev) => ({ ...prev, prix_package: state.prix! }));
        }
    }, [state]);

    useEffect(() => {
        setActiveImg(0);
        setSelectedExtraServices([]);
    }, [selectedItemId, reservationType]);

    const selectedService = reservationType === "service" ? services.find(s => s.id === selectedItemId) : null;
    const selectedPack = reservationType === "pack" ? packs.find(p => p.id === selectedItemId) : null;

    // Récupérer les IDs des services déjà inclus dans le pack sélectionné
    const serviceIdsInSelectedPack = selectedPack?.services?.map(s => s.id) || [];

    // Filtrer les services disponibles pour les services supplémentaires
    // Exclure les services déjà dans le pack et ceux déjà sélectionnés
    const getAvailableExtraServices = () => {
        return services.filter(service =>
            !serviceIdsInSelectedPack.includes(service.id) &&
            !selectedExtraServices.includes(service.id)
        );
    };

    const availableExtraServices = getAvailableExtraServices();

    const currentItemName = selectedService ? selectedService.nom : (selectedPack ? selectedPack.nom : "");
    const currentItemDescription = selectedService
        ? (selectedService.description_complete || selectedService.description_courte || "")
        : (selectedPack ? (selectedPack.description || "") : "");

    const currentItemPrice = selectedService
        ? (selectedService.prix_formate || (selectedService.prix_indicatif ? new Intl.NumberFormat("fr-FR").format(selectedService.prix_indicatif) + " Ar" : "Sur devis"))
        : (selectedPack ? (new Intl.NumberFormat("fr-FR").format(selectedPack.prix) + " Ar") : "Sur devis");

    // Resolve images
    const currentItemImage = selectedService
        ? (assetUrl(selectedService.image_url || selectedService.image_principale) || homeHero)
        : (selectedPack ? (assetUrl(selectedPack.image_url || selectedPack.image_principale) || homeHero) : homeHero);

    const extraImages = selectedService
        ? (selectedService.images ?? []).map(img => assetUrl(img.url) ?? "").filter(Boolean)
        : (selectedPack ? (selectedPack.images ?? []).map(img => assetUrl(img.url) ?? "").filter(Boolean) : []);

    const gallery = [currentItemImage, ...extraImages, photo11, photo16].filter(Boolean) as string[];

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setSubmitted(false);
        setError("");
        setFieldErrors({});

        if (!form.date || form.date < minimumWeddingDate) {
            setFieldErrors({ date: "La date du mariage doit être au minimum à partir de demain." });
            setError("La date du mariage est invalide.");
            setSubmitting(false);
            return;
        }

        if (!selectedItemId) {
            setError("Veuillez sélectionner un service ou un package.");
            setSubmitting(false);
            return;
        }

        // Vérifier que les services supplémentaires ne sont pas déjà dans le pack
        if (reservationType === "pack") {
            const invalidServices = selectedExtraServices.filter(id => serviceIdsInSelectedPack.includes(id));
            if (invalidServices.length > 0) {
                setError("Certains services supplémentaires sont déjà inclus dans le pack.");
                setSubmitting(false);
                return;
            }
        }

        const payload: ReservationPayload = {
            nom: form.nom.trim(),
            prenom: form.prenom.trim(),
            telephone: form.telephone.trim(),
            email: form.email.trim(),
            date_mariage: form.date,
            ville: form.ville.trim(),
            nombre_invites: Number(form.nombre_invites),
            budget_estime: form.budget.trim(),
            theme_mariage: form.theme.trim() || null,
            couleurs_principales: form.couleurs.trim() || null,
            lieu_deja_reserve: form.deja_reserve === "oui",
            nom_lieu: form.deja_reserve === "oui" ? form.lieu_nom.trim() || null : null,
            description_projet: form.description_projet.trim() || null,
            ...(reservationType === "service"
                ? { service_ids: [selectedItemId, ...selectedExtraServices] }
                : { pack_id: selectedItemId, service_ids: selectedExtraServices.length > 0 ? selectedExtraServices : undefined }),
        };

        try {
            await api.createReservation(payload);
            setForm(initialFormState);
            setSubmitted(true);
            // Redirect to the backoffice reservation page
            navigate("/admin/reservations");
        } catch (error: unknown) {
            if (error instanceof ApiError && error.validationErrors) {
                const mappedErrors: FieldErrors = {};

                for (const [key, messages] of Object.entries(error.validationErrors)) {
                    const firstMessage = messages?.[0];

                    if (!firstMessage) {
                        continue;
                    }

                    if (key === "nom") mappedErrors.nom = firstMessage;
                    if (key === "prenom") mappedErrors.prenom = firstMessage;
                    if (key === "telephone") mappedErrors.telephone = firstMessage;
                    if (key === "email") mappedErrors.email = firstMessage;
                    if (key === "date_mariage") mappedErrors.date = firstMessage;
                    if (key === "ville") mappedErrors.ville = firstMessage;
                    if (key === "nombre_invites") mappedErrors.nombre_invites = firstMessage;
                    if (key === "budget_estime") mappedErrors.budget = firstMessage;
                    if (key === "theme_mariage") mappedErrors.theme = firstMessage;
                    if (key === "couleurs_principales") mappedErrors.couleurs = firstMessage;
                    if (key === "lieu_deja_reserve") mappedErrors.deja_reserve = firstMessage;
                    if (key === "nom_lieu") mappedErrors.lieu_nom = firstMessage;
                    if (key === "description_projet") mappedErrors.description_projet = firstMessage;
                }

                setFieldErrors(mappedErrors);
                setError(error.message || "Veuillez corriger les champs indiqués.");
            } else {
                setError(error instanceof Error ? error.message : "Impossible d'envoyer la demande.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-gray-500">
                Chargement...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#b73f68]">
                        Réservation
                    </p>
                    <h1 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
                        Réservez votre service
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#555] md:text-base">
                        Découvrez le service sélectionné et remplissez le formulaire à côté pour
                        nous envoyer votre demande de réservation.
                    </p>
                </div>
                <Link
                    to="/services"
                    className="inline-flex items-center justify-center rounded-full border border-[#e91e8c] px-5 py-3 text-sm font-bold text-[#e91e8c] transition hover:bg-[#e91e8c] hover:text-white"
                >
                    Retour aux services
                </Link>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.25fr_0.95fr]">
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="overflow-hidden rounded-[28px] bg-white shadow-2xl"
                >
                    <div className="relative h-[300px] overflow-hidden sm:h-[360px]">
                        <img
                            src={gallery[activeImg]}
                            alt={currentItemName}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
                        <div className="absolute left-4 top-4 rounded-full bg-[#e91e8c] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg">
                            ACTIF
                        </div>
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                            {gallery.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveImg(index)}
                                    className={`h-2 rounded-full transition-all ${index === activeImg ? "w-10 bg-white" : "w-3 bg-white/40"
                                    }`}
                                    aria-label={`Voir l'image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <h2 className="text-3xl font-black leading-tight text-[#111] md:text-[34px]">
                                    {currentItemName}
                                </h2>
                                <p className="mt-3 max-w-xl text-sm leading-7 text-[#666]">
                                    {currentItemDescription}
                                </p>
                            </div>
                            <div className="rounded-3xl bg-[#fdf6f9] px-5 py-4 text-right">
                                <p className="text-[11px] uppercase tracking-[0.1em] text-[#aaa]">
                                    À partir de
                                </p>
                                <p className="mt-1 text-3xl font-black text-[#e91e8c]">
                                    {currentItemPrice}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { label: "Style", value: reservationType === "pack" ? "Complet & prestigieux" : "Sur mesure" },
                                { label: "Invités", value: reservationType === "pack" ? "Tout format" : "Adapté à vos besoins" },
                                { label: "Durée", value: reservationType === "pack" ? "Durée de l'événement" : "Journée ou soirée" },
                                { label: "Accompagnement", value: reservationType === "pack" ? "Prise en charge totale" : "Coordination dédiée" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-3xl border border-[#fce4ec] bg-[#fff0f6] px-4 py-4"
                                >
                                    <p className="text-[11px] uppercase tracking-[0.1em] text-[#999]">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-[#333]">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-3xl border-l-4 border-[#e91e8c] bg-[#fff0f7] p-5">
                            <p className="text-sm italic leading-7 text-[#555]">
                                "Nous mettons tout en œuvre pour que votre réception soit raffinée,
                                fluide et inoubliable."
                            </p>
                            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#e91e8c]">
                                {reservationType === "service" ? "Service sélectionné" : "Package sélectionné"}
                            </p>
                        </div>

                        <div className="mt-6 rounded-3xl border border-[#fce4ec] bg-[#fff0f6] p-5">
                            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                <div>
                                    <h3 className="text-sm font-bold text-[#111]">Services supplémentaires</h3>
                                    <p className="text-xs text-[#666]">
                                        {reservationType === "pack"
                                            ? `Ajoutez des services à votre pack (${serviceIdsInSelectedPack.length} services déjà inclus)`
                                            : "Ajoutez des services supplémentaires"}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowExtraServicesModal(true)}
                                    className="inline-flex items-center justify-center rounded-full bg-[#e91e8c] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#c2185b]"
                                >
                                    {reservationType === "pack" ? "Ajouter des services" : "Ajouter des services"}
                                </button>
                            </div>

                            {selectedExtraServices.length > 0 && (
                                <ul className="mt-3 flex flex-col gap-2">
                                    {selectedExtraServices.map(serviceId => {
                                        const svc = services.find(s => s.id === serviceId);
                                        return svc ? (
                                            <li key={serviceId} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm shadow-sm border border-[#fce4ec]">
                                                <span className="font-semibold text-[#333]">{svc.nom}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedExtraServices(prev => prev.filter(id => id !== serviceId))}
                                                    className="text-xs font-bold text-red-500 hover:text-red-700"
                                                >
                                                    Retirer
                                                </button>
                                            </li>
                                        ) : null;
                                    })}
                                </ul>
                            )}

                            {reservationType === "pack" && serviceIdsInSelectedPack.length > 0 && (
                                <div className="mt-3 rounded-xl bg-[#f0f7ff] p-3">
                                    <p className="text-xs text-[#555]">
                                        <span className="font-semibold">Services inclus dans le pack :</span>{' '}
                                        {serviceIdsInSelectedPack.map(id => {
                                            const svc = services.find(s => s.id === id);
                                            return svc ? svc.nom : '';
                                        }).filter(Boolean).join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    className="rounded-[28px] border border-[#f1d7e4] bg-white p-6 shadow-lg md:p-8"
                >
                    <div className="mb-6 rounded-3xl bg-[#fdf6f9] px-5 py-4">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#999]">
                            Formulaire de réservation
                        </p>
                        <h2 className="mt-3 text-xl font-black text-[#111]">
                            {currentItemName}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-[#666]">
                            Merci de nous transmettre vos informations pour que nous puissions vous
                            proposer un devis personnalisé.
                        </p>
                    </div>



                    <div className="mb-6 grid items-end gap-4 sm:grid-cols-3">
                        <label className="block text-sm text-[#444]">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                Type de service
                            </span>
                            <select
                                name="type_service"
                                value={form.type_service}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                required
                            >
                                <option value="" disabled>-- Choisir le type --</option>
                                <option value="servis">Servis</option>
                                <option value="semi_buffet">Semi-Buffet</option>
                                <option value="buffet">Buffet</option>
                            </select>
                            <FieldError message={fieldErrors.type_service} />
                        </label>
                        <label className="block text-sm text-[#444]">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                Prix
                            </span>
                            <input
                                type="text"
                                name="prix_package"
                                value={form.prix_package}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                placeholder="Ex: 54 000 Ar"
                                required
                            />
                            <FieldError message={fieldErrors.prix_package} />
                        </label>
                        <label className="block text-sm text-[#444]">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                Nombre de personnes
                            </span>
                            <input
                                type="number"
                                name="nombre_personnes"
                                value={form.nombre_personnes}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                placeholder="Ex: 150"
                                min={1}
                                required
                            />
                            <FieldError message={fieldErrors.nombre_personnes} />
                        </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {reservationFields.map((field) => (
                            <label key={field.name} className="block text-sm text-[#444]">
                                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                    {field.label}
                                </span>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                    min={
                                        field.name === "nombre_invites"
                                            ? 1
                                            : field.name === "date"
                                                ? minimumWeddingDate
                                                : undefined
                                    }
                                    required
                                />
                                <FieldError message={fieldErrors[field.name]} />
                            </label>
                        ))}
                    </div>

                    <div className="mt-4 grid gap-4">
                        <label className="block text-sm text-[#444]">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                Budget estimé
                            </span>
                            <input
                                type="text"
                                name="budget"
                                value={form.budget}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                placeholder="Ex: 1 500 000 Ar"
                                required
                            />
                            <FieldError message={fieldErrors.budget} />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm text-[#444]">
                                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                    Thème
                                </span>
                                <input
                                    type="text"
                                    name="theme"
                                    value={form.theme}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                    placeholder="Ex: Bohème, Glamour"
                                />
                                <FieldError message={fieldErrors.theme} />
                            </label>
                            <label className="block text-sm text-[#444]">
                                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                    Couleurs
                                </span>
                                <input
                                    type="text"
                                    name="couleurs"
                                    value={form.couleurs}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                    placeholder="Ex: Rose, ivoire"
                                />
                                <FieldError message={fieldErrors.couleurs} />
                            </label>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm text-[#444]">
                                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                    Lieu déjà réservé ?
                                </span>
                                <select
                                    name="deja_reserve"
                                    value={form.deja_reserve}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                >
                                    <option value="non">Non</option>
                                    <option value="oui">Oui</option>
                                </select>
                                <FieldError message={fieldErrors.deja_reserve} />
                            </label>
                            <label className="block text-sm text-[#444]">
                                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                    Nom du lieu
                                </span>
                                <input
                                    type="text"
                                    name="lieu_nom"
                                    value={form.lieu_nom}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                    placeholder="Nom du lieu ou domaine"
                                />
                                <FieldError message={fieldErrors.lieu_nom} />
                            </label>
                        </div>

                        <label className="block text-sm text-[#444]">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                Description du projet
                            </span>
                            <textarea
                                name="description_projet"
                                value={form.description_projet}
                                onChange={handleChange}
                                rows={5}
                                className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                placeholder="Racontez-nous vos envies, votre ambiance et vos priorités."
                            />
                            <FieldError message={fieldErrors.description_projet} />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e91e8c] to-[#c2185b] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-white transition hover:opacity-95"
                    >
                        {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </button>

                    {error && (
                        <p className="mt-4 rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    {submitted && (
                        <p className="mt-4 rounded-3xl bg-[#eaf6f3] px-4 py-3 text-sm text-[#2f6c51]">
                            Votre demande a bien été prise en compte. Nous reviendrons vers vous rapidement.
                        </p>
                    )}
                </motion.form>
            </div>

            {/* Modal for Extra Services */}
            {showExtraServicesModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl bg-white p-6 shadow-2xl"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-black text-[#111]">
                                {reservationType === "pack"
                                    ? `Services supplémentaires (${availableExtraServices.length} disponibles)`
                                    : "Tous nos services"}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setShowExtraServicesModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {reservationType === "pack" && serviceIdsInSelectedPack.length > 0 && (
                            <div className="mb-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
                                <span className="font-bold">ℹ️</span> Les services déjà inclus dans ce pack ne sont pas affichés :{' '}
                                {serviceIdsInSelectedPack.map(id => {
                                    const svc = services.find(s => s.id === id);
                                    return svc ? svc.nom : '';
                                }).filter(Boolean).join(', ')}
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto pr-2 pb-4">
                            {availableExtraServices.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-sm text-gray-500">
                                        {reservationType === "pack"
                                            ? "Aucun service supplémentaire disponible. Tous les services sont déjà inclus dans ce pack."
                                            : "Aucun service disponible pour le moment."}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {availableExtraServices.map(service => {
                                        const isSelected = selectedExtraServices.includes(service.id);
                                        return (
                                            <div
                                                key={service.id}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setSelectedExtraServices(prev => prev.filter(id => id !== service.id));
                                                    } else {
                                                        setSelectedExtraServices(prev => [...prev, service.id]);
                                                    }
                                                }}
                                                className="group relative cursor-pointer overflow-hidden rounded-[22px] bg-white transition-all duration-300"
                                                style={{
                                                    boxShadow: isSelected
                                                        ? "0 20px 48px rgba(233, 30, 140, 0.25), 0 6px 20px rgba(0,0,0,0.08)"
                                                        : "0 4px 20px rgba(0,0,0,0.07)",
                                                    border: isSelected ? "2.5px solid #e91e8c" : "2.5px solid transparent",
                                                }}
                                            >
                                                {/* Image inside card */}
                                                <div className="relative h-[160px] overflow-hidden bg-gray-100">
                                                    <img
                                                        src={service.image_url || verre}
                                                        alt={service.nom}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                                                    {/* Pink circular icon badge */}
                                                    <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e91e8c] to-[#f06292] shadow-md shadow-[#e91e8c]/40">
                                                        <Icon d={icons[service.icon as keyof typeof icons] || icons.chef} size={18} stroke="#fff" />
                                                    </div>

                                                    {/* Selection pill */}
                                                    <div className={`absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md transition-all duration-200 ${
                                                        isSelected ? "bg-[#e91e8c]" : "bg-black/40 backdrop-blur-sm"
                                                    }`}>
                                                        {isSelected ? "✓" : ""}
                                                    </div>

                                                    {/* Tag Badge */}
                                                    {service.tag && (
                                                        <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                                            {service.tag}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Card body */}
                                                <div className="p-4">
                                                    <h3 className="font-serif text-base font-black text-[#1a0a14] mb-1">
                                                        {service.nom}
                                                    </h3>
                                                    <p className="text-xs leading-relaxed text-[#888] mb-3 line-clamp-2 h-[34px]">
                                                        {service.description_courte}
                                                    </p>
                                                    <div className="flex items-center justify-between border-t border-[#fce4ec]/40 pt-3">
                                                        <div>
                                                            <span className="block text-[9px] uppercase tracking-wider text-[#bbb]">À partir de</span>
                                                            <span className="text-sm font-black text-[#e91e8c]">
                                                                {service.prix_formate || (service.prix_indicatif ? new Intl.NumberFormat("fr-FR").format(service.prix_indicatif) + " Ar" : "Sur devis")}
                                                            </span>
                                                        </div>
                                                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold transition-all ${
                                                            isSelected
                                                                ? "bg-[#fff0f7] text-[#e91e8c] border border-[#fce4ec]"
                                                                : "bg-gray-50 text-gray-500 border border-gray-100"
                                                        }`}>
                                                            {isSelected ? "Sélectionné" : "Ajouter"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setShowExtraServicesModal(false)}
                                className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                            >
                                Fermer
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowExtraServicesModal(false)}
                                className="rounded-full bg-[#e91e8c] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#c2185b]"
                            >
                                Valider ({selectedExtraServices.length})
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}