import { useState } from "react";
import { User, Mail, Phone, MapPin, Globe, Shield, Save, CheckCircle } from "lucide-react";

type SettingsTab = "general" | "contact" | "security";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saved, setSaved] = useState(false);

  // General state
  const [agencyName, setAgencyName] = useState("Mariage Madagascar");
  const [tagline, setTagline] = useState("L'agence de prestige pour des mariages d'exception");
  const [currency, setCurrency] = useState("MGA");
  const [timezone, setTimezone] = useState("Indian/Antananarivo");

  // Contact state
  const [email, setEmail] = useState("contact@mariage.mg");
  const [phone, setPhone] = useState("+261 34 12 345 67");
  const [address, setAddress] = useState("Enceinte Colbert, Antaninarenina, Antananarivo");
  const [website, setWebsite] = useState("www.mariage.mg");

  // Security state
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionLimit, setSessionLimit] = useState("24h");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "Général", icon: User },
    { id: "contact", label: "Coordonnées", icon: Mail },
    { id: "security", label: "Sécurité & Accès", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#664a24]">Paramètres</h2>
          <p className="text-gray-500 mt-1">Configurez les options générales de votre backoffice</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Tabs */}
        <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1 bg-white p-2 rounded-2xl border border-[#edd694]/20 shadow-sm md:h-fit overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  active
                    ? "bg-[#d4a843]/10 text-[#946c25]"
                    : "text-gray-650 hover:bg-[#fdfbf7]"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents Card */}
        <div className="flex-1 bg-white rounded-2xl border border-[#edd694]/20 shadow-sm p-6">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "general" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#664a24] border-b border-gray-100 pb-2">
                  Paramètres Généraux
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                      Nom de l'agence
                    </label>
                    <input
                      type="text"
                      value={agencyName}
                      onChange={e => setAgencyName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                      Slogan de l'agence
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={e => setTagline(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        Devise par défaut
                      </label>
                      <select
                        value={currency}
                        onChange={e => setCurrency(e.target.value)}
                        className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
                      >
                        <option value="MGA">MGA (Ariary Malgache)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="USD">USD (Dollar US)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        Fuseau horaire
                      </label>
                      <select
                        value={timezone}
                        onChange={e => setTimezone(e.target.value)}
                        className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
                      >
                        <option value="Indian/Antananarivo">Antananarivo (UTC+3)</option>
                        <option value="Europe/Paris">Paris (UTC+1)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#664a24] border-b border-gray-100 pb-2">
                  Coordonnées de l'Agence
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Mail size={12} /> Email de contact
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Phone size={12} /> Téléphone de contact
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MapPin size={12} /> Adresse physique
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Globe size={12} /> Site internet
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm focus:outline-none focus:border-[#d4a843]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#664a24] border-b border-gray-100 pb-2">
                  Sécurité & Accès
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-150">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Double authentification (2FA)</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Exiger un code de vérification à la connexion.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactor}
                        onChange={e => setTwoFactor(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b88a2d]"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                      Durée max de session
                    </label>
                    <select
                      value={sessionLimit}
                      onChange={e => setSessionLimit(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#f5e8c2] rounded-xl text-sm bg-white focus:outline-none focus:border-[#d4a843]"
                    >
                      <option value="2h">2 heures</option>
                      <option value="8h">8 heures</option>
                      <option value="24h">24 heures (1 jour)</option>
                      <option value="7d">7 jours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Footer buttons with success alert */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-3">
              {saved && (
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold animate-fade-in bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-150">
                  <CheckCircle size={14} />
                  Modifications enregistrées avec succès !
                </div>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#b88a2d] hover:bg-[#946c25] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  <Save size={16} />
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
