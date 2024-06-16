import database from "../database/index.js";
import { v4 as uuidv4 } from "uuid";
import {
  getAllRecipesQuery,
  getRecipeQuery,
  insertRecipeQuery,
  deleteRecipeQuery,
  updateRecipeQuery,
} from "../queries/recipesQueries.js";

const allRecipes = async () => {
  try {
    const { rows } = await database.query(getAllRecipesQuery);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const oneRecipe = async (id) => {
  try {
    const { rows } = await database.query(getRecipeQuery, [id]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const newRecipe = async (recipeData) => {
  try {
    const {
      title,
      ready_in_minutes,
      image,
      summary,
      diets,
      health_score,
      spoonacular_score,
    } = recipeData;
    const { rows } = await database.query(insertRecipeQuery, [
      uuidv4(),
      title,
      ready_in_minutes,
      image,
      summary,
      diets,
      health_score,
      spoonacular_score,
    ]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const updateRecipe = async (id, recipeData) => {
  try {
    const {
      title,
      ready_in_minutes,
      image,
      summary,
      diets,
      health_score,
      spoonacular_score,
    } = recipeData;
    const { rows } = await database.query(updateRecipeQuery, [
      title,
      ready_in_minutes,
      image,
      summary,
      diets,
      health_score,
      spoonacular_score,
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const deleteRecipe = async (id) => {
  try {
    const { rows } = await database.query(deleteRecipeQuery, [id]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

export {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
};
