import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/layout/Navbar";
import PageTransition from "./components/layout/PageTransition";
import Footer from "./components/layout/Footer";

const Home = lazy(() => import("./components/sections/home"));
const BlogPage = lazy(() => import("@/site/components/blog/blog").then((module) => ({ default: module.BlogPage })));
const ContactPage = lazy(() => import("@/site/components/contact/ContactPage"));
const WeddingServices = lazy(() => import("@/site/components/services/Services"));
const Perfume = lazy(() => import("@/site/components/about/Apropos"));
const HistoirePage = lazy(() => import("./components/about/HistoirePage"));
const Travail = lazy(() => import("./components/about/Travail"));
const GalleryPage = lazy(() => import("./components/gallery/page"));
const ReservationPage = lazy(() => import("./pages/ReservationPage"));
const AdminLayout = lazy(() => import("@/admin/pages/AdminLayout"));
const AdminLogin = lazy(() => import("@/admin/pages/AdminLogin"));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-sm text-gray-500">
      Chargement...
    </div>
  );
}

function LegalPage({ title }: { title: string }) {
  return (
    <PageTransition>
      <main className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Informations</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-6 text-gray-600">
          Cette page sera complétée prochainement. Pour toute question, contactez-nous directement.
        </p>
      </main>
    </PageTransition>
  );
}

function App() {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route
              path="/apropos"
              element={<PageTransition><Perfume /></PageTransition>}
            />
            <Route
              path="/histoire"
              element={<PageTransition><HistoirePage /></PageTransition>}
            />
            <Route
              path="/travail"
              element={<PageTransition><Travail /></PageTransition>}
            />
            <Route
              path="/services"
              element={<PageTransition><WeddingServices /></PageTransition>}
            />
            <Route
              path="/gallery"
              element={<PageTransition><GalleryPage /></PageTransition>}
            />
            <Route
              path="/blog"
              element={<PageTransition><BlogPage /></PageTransition>}
            />
            <Route
              path="/contact"
              element={<PageTransition><ContactPage /></PageTransition>}
            />
            <Route
              path="/reservation"
              element={<PageTransition><ReservationPage /></PageTransition>}
            />
            <Route
              path="/politique-confidentialite"
              element={<LegalPage title="Politique de confidentialité" />}
            />
            <Route
              path="/conditions"
              element={<LegalPage title="Conditions" />}
            />
            <Route
              path="/cookies"
              element={<LegalPage title="Cookies" />}
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
