// React Router DOM
import { Routes, Route } from "react-router-dom";

// Components
import LandingPage from "./layouts/LandingPage";
import RecipePage from "./layouts/recipe";

import "./App.css";

function App() {
  return (
    <div className="w-screen font-Kanit">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
}

export default App;
