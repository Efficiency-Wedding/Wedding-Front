import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apropos from "./about/Apropos";
import HistoirePage from "./about/HistoirePage";
import Travail from "./about/Travail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apropos />} />
        <Route path="/Histoirepage" element={<HistoirePage />} />
        <Route path="/Travail" element={<Travail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;