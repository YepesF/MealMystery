// React Router DOM
import { Routes, Route } from "react-router-dom";

// Components
import LandingPage from "./layouts/LandingPage";
import RecipePage from "./layouts/RecipePage";
import RecipesPage from "./layouts/RecipesPage";
import Diets from "./layouts/Diets";
import NewRecipe from "./layouts/NewRecipe";

import "./App.css";

function App() {
  return (
    <div className="w-full font-Kanit">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/diets" element={<Diets />} />
        <Route path="/new" element={<NewRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
