import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/home";

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
          element={<Home/>}
        />
        <Route
          path="/contact"
          element={<Home/>}
        />
      </Routes>
    </>
  );
}

export default App;
