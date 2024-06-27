// React Router DOM
import { Routes, Route } from "react-router-dom";

// Components
import LandingPage from "./layouts/LandingPage";
import RecipePage from "./layouts/recipe";
import RecipesPage from "./layouts/RecipesPage";

import "./App.css";

function App() {
  return (
    <div className="w-full font-Kanit">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
    </div>
  );
}

export default App;
