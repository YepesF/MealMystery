// React Router DOM
import { Routes, Route } from "react-router-dom";

// Components
import LandingPage from "./layouts/LandingPage";
import RecipePage from "./layouts/RecipePage";
import RecipesPage from "./layouts/RecipesPage";
import NewRecipe from "./layouts/NewRecipe";

import "./App.css";
import { ROUTES } from "./constants";

function App() {
  return (
    <div className="w-full font-Kanit">
      <Routes>
        <Route path={ROUTES.ROOT} element={<LandingPage />} />
        <Route path={`${ROUTES.RECIPE}/:id`} element={<RecipePage />} />
        <Route path={ROUTES.RECIPES} element={<RecipesPage />} />
        <Route path={ROUTES.NEW} element={<NewRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
