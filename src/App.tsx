import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/home";
import { BlogPage } from "@/components/blog/blog";
import Footer from "./components/layout/Footer";
import ContactPage from "@/components/contact/ContactPage";
import WeddingServices from "@/components/services/Services";
import Perfume from "@/components/about/Apropos";
import HistoirePage from "./components/about/HistoirePage";
import Travail from "./components/about/Travail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/apropos"
          element={<Perfume/>}
        />
        <Route
          path="/histoire"
          element={<HistoirePage/>}
        />
        <Route
          path="/travail"
          element={<Travail/>}
        />
        <Route
          path="/apropos"
          element={<Perfume/>}
        />
        <Route
          path="/services"
          element={<WeddingServices/>}
        />
        <Route
          path="/gallery"
          element={<Home/>}
        />
        <Route
          path="/blog"
          element={<BlogPage/>}
        />
        <Route
          path="/contact"
          element={<ContactPage/>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
