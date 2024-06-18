import { randomUUID } from "crypto";
import database from "../database/index.js";
import {
  getAllRecipesQuery,
  getRecipeQuery,
  insertRecipeQuery,
  deleteRecipeQuery,
  updateRecipeQuery,
  searchRecipesQuery,
  getAllRecipesSortQuery,
  totalRecipesQuery,
  totalSearchRecipesQuery,
  getSearchRecipesSortQuery,
  getRecipesByDietQuery,
  getRecipesByReadyInMinutesQuery,
  getRecipesByHealthScoreQuery,
} from "../queries/recipesQueries.js";
import { validateSort } from "../utils/validations/sort.js";

const allRecipes = async (page, limit, column, sortType) => {
  try {
    const countResult = await database.query(totalRecipesQuery);
    const totalRecipes = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRecipes / limit);
    page = page > totalPages ? totalPages : page;
    const offset = (page - 1) * limit;
    const params = [parseInt(limit), parseInt(offset)];
    const isValidSort = validateSort(column, sortType);
    if (isValidSort) {
      const { rows } = await database.query(getAllRecipesSortQuery(column, sortType), params);
      return rows;
    }
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
      Math.round(ready_in_minutes),
      image,
      summary,
      JSON.stringify(diets),
      Math.round(health_score),
      Math.round(spoonacular_score),
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
      Math.round(ready_in_minutes),
      image,
      summary,
      JSON.stringify(diets),
      Math.round(health_score),
      Math.round(spoonacular_score),
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

const searchRecipes = async (title, page, limit, column, sortType) => {
  try {
    const countResult = await database.query(totalSearchRecipesQuery, [`%${title}%`]);
    const totalRecipes = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRecipes / limit);
    page = page > totalPages ? totalPages : page;
    const offset = (page - 1) * limit;
    const params = [`%${title}%`, parseInt(limit), parseInt(offset)];
    const isValidSort = validateSort(column, sortType);
    if (isValidSort) {
      const { rows } = await database.query(getSearchRecipesSortQuery(column, sortType), params);
      return rows;
    }
    const { rows } = await database.query(searchRecipesQuery, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recipesByDiet = async (dietType) => {
  try {
    const { rows } = await database.query(getRecipesByDietQuery, [dietType]);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recipesByReadyInMinutes = async (minutes) => {
  try {
    const { rows } = await database.query(getRecipesByReadyInMinutesQuery, [minutes]);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recipesByHealthScore = async (score) => {
  try {
    const { rows } = await database.query(getRecipesByHealthScoreQuery, [score]);
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
  recipesByDiet,
  recipesByReadyInMinutes,
  recipesByHealthScore,
};
