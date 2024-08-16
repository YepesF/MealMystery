import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../PageLayout";
import { Spinner } from "@material-tailwind/react";

import { getAllRecipes, getRecipeById } from "../../api/recepies";

import RecipeHero from "./components/RecipeHero";
import NavDetails from "./components/NavDetails";
import Equipment from "./components/Equipment";
import Ingredients from "./components/Ingredients";
import Instructions from "./components/Instructions";
import Recommend from "./components/Recommend";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [loading, setLoading] = useState(null);
  window.scrollTo(0, 0);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const fetchRecomend = async () => {
      setLoading(true);
      try {
        if (recipe) {
          const { diets } = recipe;
          const { recipes } = await getAllRecipes(1, null, [
            diets[0] || "dairy free",
          ]);
          setRecommend(recipes.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
      setLoading(false);
    };

    fetchRecomend();
    console.log(recipe);
  }, [recipe]);

  return (
    <PageLayout>
      <div className="flex h-full min-h-screen w-full items-center justify-center">
        {loading ? (
          <Spinner color="red" className="h-16 w-16 text-accent" />
        ) : (
          recipe &&
          recommend && (
            <div className="h-auto w-full py-2">
              <RecipeHero {...recipe} />
              <NavDetails recipeTitle={recipe.title} />
              <Instructions instructions={recipe.steps} />
              <Equipment equipment={recipe.equipment} />
              <Ingredients ingredients={recipe.ingredients} />
              <Recommend loading={loading} recipes={recommend} />
            </div>
          )
        )}
      </div>
    </PageLayout>
  );
};

export default RecipePage;
