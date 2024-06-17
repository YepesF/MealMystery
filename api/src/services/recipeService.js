import { randomUUID } from "crypto";
import database from "../database/index.js";
import {
  getAllRecipesQuery,
  getRecipeQuery,
  insertRecipeQuery,
  deleteRecipeQuery,
  updateRecipeQuery,
  searchRecipesQuery,
} from "../queries/recipesQueries.js";

const allRecipes = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const params = [parseInt(limit), parseInt(offset)];
    const { rows } = await database.query(getAllRecipesQuery, params);
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
      randomUUID(),
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

const searchRecipes = async (title, page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const params = [`%${title}%`, parseInt(limit), parseInt(offset)];
    const { rows } = await database.query(searchRecipesQuery, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
};
