import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Service, Pack, Reservation, Article } from "../../lib/admin/api";
import { api } from "../../lib/admin/api";
import {
  CalendarCheck,
  Sparkles,
  Package,
  PenTool,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [servicesData, packsData, reservationsData, articlesData] =
          await Promise.all([
            api.getServices(),
            api.getPacks(),
            api.getReservations(),
            api.getArticles(true),
          ]);
        setServices(servicesData);
        setPacks(packsData);
        setReservations(reservationsData);
        setArticles(articlesData);
      } catch (err: any) {
        console.error(err);
        setError(
          err.message || "Impossible de charger les données du dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const formatMGA = (n: number) =>
    new Intl.NumberFormat("fr-FR").format(n) + " MGA";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
        <p className="text-sm text-gray-500">
          Chargement du tableau de bord...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
        <h3 className="font-semibold text-lg mb-1">Erreur de connexion</h3>
        <p className="text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const activeServices = services.filter((s) => s.statut === "ACTIF").length;
  const activePacks = packs.filter((p) => p.statut === "ACTIF").length;
  const publishedArticles = articles.filter(
    (a) => a.statut === "PUBLIE",
  ).length;

  const stats = [
    {
      label: "Réservations",
      value: reservations.length,
      icon: CalendarCheck,
      color: "bg-[#fdfbf7] text-[#946c25] border-[#f5e8c2]/50",
      trend: "Total des demandes",
    },
    {
      label: "Services actifs",
      value: activeServices,
      icon: Sparkles,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      trend: `${services.length} au total`,
    },
    {
      label: "Packs disponibles",
      value: activePacks,
      icon: Package,
      color: "bg-blue-50 text-blue-700 border-blue-100",
      trend: `${packs.length} au total`,
    },
    {
      label: "Articles publiés",
      value: publishedArticles,
      icon: PenTool,
      color: "bg-purple-50 text-purple-700 border-purple-100",
      trend: `${articles.length} au total`,
    },
  ];

  const recentReservations = [...reservations].slice(0, 5);

  const revenue = reservations
    .filter((r) => r.statut === "CONFIRME" || r.statut === "TERMINE")
    .reduce((sum, r) => {
      const budgetVal = parseFloat(
        r.details_mariage.budget?.replace(/[^0-9.]/g, "") || "0",
      );
      return sum + (isNaN(budgetVal) ? 0 : budgetVal);
    }, 0);

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
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-[#664a24]">
          Tableau de bord
        </h2>
        <p className="text-gray-500 mt-1">
          Vue d'ensemble de votre agence de mariage
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-[#edd694]/20 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.trend}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lists & Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reservations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#edd694]/20 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#edd694]/15 flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-[#664a24]">
              Réservations récentes
            </h3>
            <Link
              to="/admin/reservations"
              className="text-xs font-semibold text-[#b88a2d] hover:text-[#946c25] flex items-center gap-1"
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead className="bg-[#fdfbf7] text-[#946c25]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Client</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Ville</th>
                  <th className="text-left px-5 py-3 font-medium">Budget</th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#fdfbf7]">
                {recentReservations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-gray-400 text-xs"
                    >
                      Aucune réservation pour le moment.
                    </td>
                  </tr>
                ) : (
                  recentReservations.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-[#fdfbf7]/40 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="font-medium text-gray-900">
                          {r.client.prenom} {r.client.nom}
                        </div>
                        <div className="text-xs text-gray-500">
                          {r.client.email}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {r.details_mariage.date}
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {r.details_mariage.ville}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {formatMGA(parseFloat(r.details_mariage.budget) || 0)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${getStatusColor(r.statut)}`}
                        >
                          {getStatusLabel(r.statut)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-2xl border border-[#edd694]/20 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#664a24] mb-4">
              Chiffre d'affaires
            </h3>
            <div className="text-center py-6 border-b border-[#edd694]/15">
              <p className="text-xs text-gray-500 mb-1">
                Total confirmé & terminé
              </p>
              <p className="text-2xl font-bold text-[#b88a2d]">
                {formatMGA(revenue)}
              </p>
              <p className="text-[10px] text-gray-400 mt-2">
                {
                  reservations.filter(
                    (r) => r.statut === "CONFIRME" || r.statut === "TERMINE",
                  ).length
                }{" "}
                réservation(s) validée(s)
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">En attente</span>
              <span className="font-semibold text-gray-700">
                {reservations.filter((r) => r.statut === "EN_ATTENTE").length}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Devis envoyés</span>
              <span className="font-semibold text-gray-700">
                {reservations.filter((r) => r.statut === "DEVIS_ENVOYE").length}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Confirmés</span>
              <span className="font-semibold text-emerald-600">
                {reservations.filter((r) => r.statut === "CONFIRME").length}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Terminés</span>
              <span className="font-semibold text-gray-700">
                {reservations.filter((r) => r.statut === "TERMINE").length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
