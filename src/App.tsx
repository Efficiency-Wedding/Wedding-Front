import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/layout/Navbar";
import PageTransition from "./components/layout/PageTransition";
import Home from "./components/sections/home";
import { BlogPage } from "@/components/blog/blog";
import Footer from "./components/layout/Footer";
import ContactPage from "@/components/contact/ContactPage";
import WeddingServices from "@/components/services/Services";
import Perfume from "@/components/about/Apropos";
import HistoirePage from "./components/about/HistoirePage";
import Travail from "./components/about/Travail";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
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
            element={<PageTransition><Home /></PageTransition>}
          />
          <Route
            path="/blog"
            element={<PageTransition><BlogPage /></PageTransition>}
          />
          <Route
            path="/contact"
            element={<PageTransition><ContactPage /></PageTransition>}
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
