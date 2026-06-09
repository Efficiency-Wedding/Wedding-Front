import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Heart, Lock, Mail } from "lucide-react";
import { api, isAdminAuthenticated, setAdminSession } from "@/shared/api";

const ADMIN_EMAIL = "admin@mariage.mg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const session = await api.adminLogin({
        email,
        password,
      });

      setAdminSession(session);
      navigate("/admin", { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Email ou mot de passe incorrect.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f2] text-gray-800 flex items-center justify-center px-4 py-8">
      <section className="w-full max-w-md bg-white border border-[#edd694]/40 shadow-xl shadow-[#d4a843]/10 rounded-lg p-7 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-lg bg-[#f5e8c2] text-[#946c25] flex items-center justify-center border border-[#d4a843]/20">
            <Heart size={22} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#664a24] leading-tight">
              Connexion admin
            </h1>
            <p className="text-sm text-gray-500">Acces au backoffice Mariage MG</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <span className="mt-2 flex items-center gap-3 rounded-md border border-[#edd694]/70 bg-[#fdfbf7] px-3 py-2.5 focus-within:border-[#d4a843] focus-within:ring-2 focus-within:ring-[#d4a843]/15">
              <Mail size={18} className="text-[#946c25]" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                placeholder="admin@mariage.mg"
                autoComplete="email"
                required
              />
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Mot de passe</span>
            <span className="mt-2 flex items-center gap-3 rounded-md border border-[#edd694]/70 bg-[#fdfbf7] px-3 py-2.5 focus-within:border-[#d4a843] focus-within:ring-2 focus-within:ring-[#d4a843]/15">
              <Lock size={18} className="text-[#946c25]" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                required
              />
            </span>
          </label>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#946c25] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7a5826] focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </section>
    </main>
  );
}
