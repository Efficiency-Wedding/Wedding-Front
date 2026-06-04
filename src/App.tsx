import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/home";
import { BlogPage } from "@/components/blog/blog";
import Footer from "./components/layout/Footer";

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
          element={<Home/>}
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
          element={<Home/>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;