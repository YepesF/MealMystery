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
import { useTranslation } from "react-i18next";

const getRecommend = (recipes = []) => {
  const recipesLength = recipes.length;
  let startNumber, endNumber;

  if (recipesLength <= 3) {
    startNumber = 0;
    endNumber = recipesLength;
  } else {
    startNumber = Math.floor(Math.random() * (recipesLength - 3));
    endNumber = startNumber + 3;
  }
  return recipes.slice(startNumber, endNumber);
};

const RecipePage = () => {
  const { i18n } = useTranslation();
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
          setRecommend(
            getRecommend(recipes.filter((recipe) => recipe.id !== id)),
          );
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
      setLoading(false);
    };

    fetchRecomend();
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
              <NavDetails
                recipeTitle={
                  i18n.language === "en" ? recipe.title : recipe.title_es
                }
              />
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
