import { Routes, Route } from "react-router-dom";
import { SobelPage } from "../pages/SobelPage/SobelPage";
import { TheoryPage } from "../pages/TheoryPage/TheoryPage";

export default function App (){
  return (
    <Routes>
      <Route path="/" element={<SobelPage />} />
      <Route path="/theory" element={<TheoryPage />} />
    </Routes>
  );
};