import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../PageLayout";
import { Spinner } from "@material-tailwind/react";

import { getRecipeById } from "../../api/recepies";

import RecipeHero from "./components/RecipeHero";
import NavDetails from "./components/NavDetails";
import Equipament from "./components/Equipament";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  window.scrollTo(0, 0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipeById(id);
        console.log(recipeData);
        setRecipe(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <PageLayout>
      {!recipe ? (
        <Spinner color="red" className="h-16 w-16 text-accent" />
      ) : (
        <div className="w-full h-auto py-2">
          <RecipeHero {...recipe} />
          <NavDetails recipeTitle={recipe.title} />
          <Equipament equipment={recipe.equipment_details} />
        </div>
      )}
    </PageLayout>
  );
};

export default RecipePage;
