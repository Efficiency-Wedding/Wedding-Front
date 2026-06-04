import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/home";
import { BlogPage } from "@/components/blog/blog";
import Footer from "./components/layout/Footer";
import ContactPage from "@/components/contact/ContactPage";
import WeddingServices from "@/components/services/Services";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/apropos"
          element={<Home/>}
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
