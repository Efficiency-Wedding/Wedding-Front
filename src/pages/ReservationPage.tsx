import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { Service } from "../lib/admin/api";
import homeHero from "@/assets/images/home/home.jpg";
import photo11 from "@/assets/images/home/photo11.jpg";
import photo16 from "@/assets/images/home/photo16.jpg";

const service: Service = {
    id: 1,
    nom: "Salle de réception",
    slug: "salle-de-reception",
    description_courte: "Salle élégante avec piste de danse et jardin privé.",
    description_complete:
        "Une salle de réception luxueuse avec une décoration personnalisée, un espace cocktail, et une prestation complète pour tous vos invités.",
    prix_indicatif: 150000,
    prix_formate: "150 000 Ar",
    image_principale: homeHero,
    image_url: null,
    statut: "ACTIF",
};

export { service as reservationService };

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
};

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
};

export default function ReservationPage() {
    const [form, setForm] = useState<ReservationForm>(initialFormState);
    const [submitted, setSubmitted] = useState(false);
    const gallery = [service.image_principale || homeHero, photo11, photo16];
    const [activeImg, setActiveImg] = useState(0);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        console.log("Réservation soumise", {
            serviceId: service.id,
            serviceName: service.nom,
            ...form,
        });
    };

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
                            alt={service.nom}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
                        <div className="absolute left-4 top-4 rounded-full bg-[#e91e8c] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg">
                            {service.statut}
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
                                    {service.nom}
                                </h2>
                                <p className="mt-3 max-w-xl text-sm leading-7 text-[#666]">
                                    {service.description_complete}
                                </p>
                            </div>
                            <div className="rounded-3xl bg-[#fdf6f9] px-5 py-4 text-right">
                                <p className="text-[11px] uppercase tracking-[0.1em] text-[#aaa]">
                                    À partir de
                                </p>
                                <p className="mt-1 text-3xl font-black text-[#e91e8c]">
                                    {service.prix_formate ?? `${service.prix_indicatif ?? 0} Ar`}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { label: "Style", value: "Élégant & chic" },
                                { label: "Invités", value: "50 à 250" },
                                { label: "Durée", value: "Journée complète" },
                                { label: "Accompagnement", value: "Planification sur mesure" },
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
                                Service sélectionné
                            </p>
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
                            {service.nom}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-[#666]">
                            Merci de nous transmettre vos informations pour que nous puissions vous
                            proposer un devis personnalisé.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { label: "Prénom", name: "prenom", type: "text" },
                            { label: "Nom", name: "nom", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Téléphone", name: "telephone", type: "tel" },
                            { label: "Date du mariage", name: "date", type: "date" },
                            { label: "Ville", name: "ville", type: "text" },
                        ].map((field) => (
                            <label key={field.name} className="block text-sm text-[#444]">
                                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#999]">
                                    {field.label}
                                </span>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={(form as any)[field.name]}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-[#eee] bg-[#fff] px-4 py-3 text-sm outline-none transition focus:border-[#e91e8c] focus:ring-2 focus:ring-[#fad1e1]"
                                    required
                                />
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
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e91e8c] to-[#c2185b] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-white transition hover:opacity-95"
                    >
                        Envoyer ma demande
                    </button>

                    {submitted && (
                        <p className="mt-4 rounded-3xl bg-[#eaf6f3] px-4 py-3 text-sm text-[#2f6c51]">
                            Votre demande a bien été prise en compte. Nous reviendrons vers vous rapidement.
                        </p>
                    )}
                </motion.form>
            </div>
        </div>
    );
}
