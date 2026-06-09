import React, { useEffect, useState } from "react";
import "./ContactPage.css";
import { api } from "@/shared/api";

type ContactFormErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const Counter: React.FC<{ end: number; suffix?: string; label: string }> = ({
  end,
  suffix,
  label,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    const step = (ts: number) => {
      const progress = Math.min(1, (ts - startTime) / duration);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [end]);
  return (
    <div className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-rose font-serif mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-violet/70 uppercase tracking-wider font-light">
        {label}
      </div>
    </div>
  );
};

const HeroContact: React.FC = () => {
  return (
    <section className="relative min-h-[520px] h-[60vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt="Contact"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet/50 via-violet/30 to-violet/70"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-jaune tracking-[0.22em] sm:tracking-[0.4em] uppercase text-xs sm:text-sm mb-6 font-light">
          Contactez-nous
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl text-blanc font-serif leading-tight mb-6">
          We'd Like To Hear <span className="italic text-jaune">From You</span>
        </h1>
        <p className="text-blanc/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Votre mariage de rêve commence par une simple conversation.
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-[1px] h-16 bg-gradient-to-b from-jaune to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

const ContactInfo: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-blanc relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl img-zoom img-shimmer">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                alt="Couple"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 sm:p-8 text-blanc">
                <h3 className="text-2xl font-serif mb-2">Notre Bureau</h3>
                <p className="text-blanc/70 text-sm">
                  555 West Lane, Summerlin, CA
                </p>
              </div>
            </div>
            <div className="glass-dark rounded-2xl p-6 sm:p-8 text-blanc">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-jaune text-xs uppercase tracking-widest mb-2">
                    Horaires
                  </p>
                  <p className="text-sm text-blanc/80">Lundi — Vendredi</p>
                  <p className="text-lg">8:00 — 17:00</p>
                </div>
                <div>
                  <p className="text-jaune text-xs uppercase tracking-widest mb-2">
                    Téléphone
                  </p>
                  <p className="text-lg hover:text-jaune transition-colors cursor-pointer">
                    034 91 880 43 / 033 07 373 09
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-violet mb-4">
                Une Expérience{" "}
                <span className="text-rose italic">Exceptionnelle</span>
              </h2>
              <p className="text-violet/60 leading-relaxed">
                Depuis plus de dix ans, nous créons des mariages sur mesure pour
                les couples les plus exigeants.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg shadow-violet/5 border border-gray-200 hover:border-rose/30 transition-colors">
                <Counter end={500} suffix="+" label="Mariages organisés" />
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg shadow-violet/5 border border-gray-200 hover:border-rose/30 transition-colors">
                <Counter end={98} suffix="%" label="Satisfaction client" />
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg shadow-violet/5 border border-gray-200 hover:border-rose/30 transition-colors">
                <Counter end={10} suffix="+" label="Ans d'expérience" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    url: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: ContactFormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Veuillez entrer un email valide";
    if (!formData.phone.trim() || formData.phone.replace(/\s/g, "").length < 10)
      newErrors.phone = "Numéro de téléphone invalide";
    if (!formData.message.trim())
      newErrors.message = "Veuillez décrire votre projet";
    return newErrors;
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSubmitting(true);
      setSubmitError("");
      await api.sendContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        url: formData.url || undefined,
        message: formData.message,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof typeof formData;
    setFormData({ ...formData, [field]: e.target.value });
    if (field in errors) {
      const nextErrors = { ...errors };
      delete nextErrors[field as keyof ContactFormErrors];
      setErrors(nextErrors);
    }
  };

  if (submitted)
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-violet-dark">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-violet rounded-3xl p-6 sm:p-12 shadow-2xl border border-rose/30">
            <div className="w-20 h-20 bg-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-rose"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-serif text-blanc mb-4">
              Message envoyé avec succès !
            </h3>
            <p className="text-blanc/70 mb-8">
              Notre équipe vous contactera dans les 24 heures pour discuter de
              votre projet.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  url: "",
                  message: "",
                });
              }}
              className="text-rose hover:text-rose-light font-semibold transition-colors"
            >
              Envoyer un autre message
            </button>
          </div>
        </div>
      </section>
    );

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-violet-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="hearts-row mb-4" aria-hidden>
            <svg className="heart" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7-4.35-9.19-6.42C1.26 12.95 1 10.99 2.1 9.7 3.18 8.44 4.7 8 6 8c1.6 0 2.9.9 3.6 1.6C10.1 8.9 11.4 8 13 8c1.3 0 2.82.44 3.9 1.7 1.1 1.29.84 3.25-.71 5.88C19 16.65 12 21 12 21z" />
            </svg>
            <svg className="heart" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7-4.35-9.19-6.42C1.26 12.95 1 10.99 2.1 9.7 3.18 8.44 4.7 8 6 8c1.6 0 2.9.9 3.6 1.6C10.1 8.9 11.4 8 13 8c1.3 0 2.82.44 3.9 1.7 1.1 1.29.84 3.25-.71 5.88C19 16.65 12 21 12 21z" />
            </svg>
            <svg className="heart" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7-4.35-9.19-6.42C1.26 12.95 1 10.99 2.1 9.7 3.18 8.44 4.7 8 6 8c1.6 0 2.9.9 3.6 1.6C10.1 8.9 11.4 8 13 8c1.3 0 2.82.44 3.9 1.7 1.1 1.29.84 3.25-.71 5.88C19 16.65 12 21 12 21z" />
            </svg>
          </div>
          <p className="text-rose tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-4">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-blanc font-serif mb-4">
            Send Us a Message
          </h2>
          <p className="text-blanc/60 max-w-xl mx-auto">
            Please fill out the contact form and we will be in touch as soon as
            possible.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <div className="bg-violet rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl shadow-black/20 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-5">
                <div className="relative group">
                  <label className="block text-xs uppercase tracking-widest text-blanc/70 mb-2 font-medium">
                    Votre nom
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 pl-12 rounded-2xl bg-white/10 border-2 text-blanc placeholder-blanc/40 transition-all duration-300 ${errors.name ? "border-rose bg-rose/10" : "border-white/10 hover:border-rose/30"}`}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blanc/40">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.name && (
                    <span className="text-rose text-xs mt-2 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <label className="block text-xs uppercase tracking-widest text-blanc/70 mb-2 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      placeholder="jean@exemple.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 pl-12 rounded-2xl bg-white/10 border-2 text-blanc placeholder-blanc/40 transition-all duration-300 ${errors.email ? "border-rose bg-rose/10" : "border-white/10 hover:border-rose/30"}`}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blanc/40">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <span className="text-rose text-xs mt-2 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <label className="block text-xs uppercase tracking-widest text-blanc/70 mb-2 font-medium">
                    Téléphone
                  </label>
                  <div className="relative">
                    <input
                      name="phone"
                      placeholder="034 91 880 43"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 pl-12 rounded-2xl bg-white/10 border-2 text-blanc placeholder-blanc/40 transition-all duration-300 ${errors.phone ? "border-rose bg-rose/10" : "border-white/10 hover:border-rose/30"}`}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blanc/40">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.phone && (
                    <span className="text-rose text-xs mt-2 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <label className="block text-xs uppercase tracking-widest text-blanc/70 mb-2 font-medium">
                    Site web (optionnel)
                  </label>
                  <div className="relative">
                    <input
                      name="url"
                      placeholder="https://votre-site.com"
                      value={formData.url}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 pl-12 rounded-2xl bg-white/10 border-2 text-blanc placeholder-blanc/40 transition-all duration-300 border-white/10`}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blanc/40">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs uppercase tracking-widest text-blanc/70 mb-2 font-medium">
                    Votre message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Décrivez votre projet de mariage, vos rêves, vos envies..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 pl-12 rounded-2xl bg-white/10 border-2 text-blanc placeholder-blanc/40 resize-none transition-all duration-300 ${errors.message ? "border-rose bg-rose/10" : "border-white/10 hover:border-rose/30"}`}
                    />
                    <div className="absolute left-4 top-4 text-blanc/40">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.message && (
                    <span className="text-rose text-xs mt-2 block">
                      {errors.message}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-jaune text-violet py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shine flex items-center justify-center gap-3 shadow-lg shadow-jaune/30 disabled:opacity-70"
              >
                {submitting ? "Envoi en cours..." : "Demander un devis gratuit"}
              </button>
              {submitError && <p className="text-rose text-sm text-center">{submitError}</p>}

              <p className="text-center text-xs text-blanc/40 mt-4">
                Vos informations sont sécurisées et confidentielles
              </p>
            </form>
          </div>

          <div className="form-image relative hidden lg:block">
            <div className="bound-hearts-container relative w-full h-[650px]">
              <div className="bound-hearts-main absolute top-0 left-0 w-[58%] h-[70%] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                  alt="Couple"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bound-float-img absolute bottom-0 right-0 w-[55%] h-[55%] rounded-2xl border-4 border-violet-dark">
                <img
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80"
                  alt="Couple trinquant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bound-float-img absolute bottom-[8%] left-[5%] w-[35%] h-[30%] rounded-xl border-2 border-jaune/30 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80"
                  alt="Décoration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bound-text-overlay absolute top-[15%] right-[5%] text-right">
                <h3 className="text-4xl text-blanc font-serif tracking-wide">
                  <span className="block text-2xl tracking-[0.2em] uppercase not-italic font-light text-blanc/80">
                    Efficiency
                  </span>
                  <span className="block text-5xl mt-1">Organization</span>
                  <span className="block text-3xl italic text-jaune mt-2">
                    Event
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* CTA removed as requested */

export default function ContactPage() {
  return (
    <div className="contact-root bg-blanc text-violet">
      <HeroContact />
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
