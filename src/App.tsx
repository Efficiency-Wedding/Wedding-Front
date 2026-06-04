import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/sections/home";
import HomeView from "./components/sections/HomeView";
import type { Screen } from "./types";

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || "#home");
  const [, setScreen] = useState<Screen>('home');

  useEffect(() => {
    const handleHashChange = () => {
      console.log("Hash changed to:", window.location.hash);
      setCurrentHash(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  console.log("Rendering App, currentHash:", currentHash);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {currentHash === "#home1" ? (
          <HomeView setScreen={setScreen} />
        ) : (
          <Home />
        )}
      </main>
    </div>
  );
}

export default App;
