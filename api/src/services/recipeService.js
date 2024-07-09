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
  getRecipesBySpoonacularScoreQuery,
  getRecipesByDietSortQuery,
  totalRecipesByDietQuery,
  TotalRecipeByReadyInMinutesQuery,
  TotalRecipesByHealthScoreQuery,
  TotalRecipesBySpoonacularScoreQuery,
  getRecipesByReadyInMinutesSortQuery,
  getRecipesByHealthScoreSortQuery,
  getRecipesBySpoonacularScoreSortQuery,
  getAllDietsQuery,
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

    const query = isValidSort ? getAllRecipesSortQuery(column, sortType) : getAllRecipesQuery;
    const { rows } = await database.query(query, params);

    return {
      recipes: rows,
      currentPage: page,
      totalPages,
    };
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
    const parseTotal = parseInt(countResult.rows[0].count);
    if (parseTotal) {
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
    }
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllDiets = async () => {
  try {
    const { rows } = await database.query(getAllDietsQuery);
    return rows.map(row => row.diet);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching diets");
  }
};

const recipesByDiet = async (diet, page, limit, column, sortType) => {
  try {
    const countResult = await database.query(totalRecipesByDietQuery, [diet]);
    const totalRecipes = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRecipes / limit);
    page = page > totalPages ? totalPages : page;
    const offset = (page - 1) * limit;
    const params = [diet, parseInt(limit), parseInt(offset)];
    const isValidSort = validateSort(column, sortType);
    if (isValidSort) {
      const { rows } = await database.query(getRecipesByDietSortQuery(column, sortType), params);
      return rows;
    }
    const { rows } = await database.query(getRecipesByDietQuery, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recipesByReadyInMinutes = async (minutes, page, limit, column, sortType) => {
  try {
    const countResult = await database.query(TotalRecipeByReadyInMinutesQuery, [minutes]);
    const totalRecipes = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRecipes / limit);
    page = page > totalPages ? totalPages : page;
    const offset = (page - 1) * limit;
    const params = [minutes, parseInt(limit), parseInt(offset)];
    const isValidSort = validateSort(column, sortType);
    if (isValidSort) {
      const { rows } = await database.query(getRecipesByReadyInMinutesSortQuery(column, sortType), params);
      return rows;
    }
    const { rows } = await database.query(getRecipesByReadyInMinutesQuery, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recipesByHealthScore = async (score, page, limit, column, sortType) => {
  try {
    const countResult = await database.query(TotalRecipesByHealthScoreQuery, [score]);
    const totalRecipes = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRecipes / limit);
    page = page > totalPages ? totalPages : page;
    const offset = (page - 1) * limit;
    const params = [score, parseInt(limit), parseInt(offset)];
    const isValidSort = validateSort(column, sortType);
    if (isValidSort) {
      const { rows } = await database.query(getRecipesByHealthScoreSortQuery(column, sortType), params);
      return rows;
    }
    const { rows } = await database.query(getRecipesByHealthScoreQuery, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recipesBySpoonacularScore = async (score, page, limit, column, sortType) => {
  try {
    const countResult = await database.query(TotalRecipesBySpoonacularScoreQuery, [score]);
    const totalRecipes = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRecipes / limit);
    page = page > totalPages ? totalPages : page;
    const offset = (page - 1) * limit;
    const params = [score, parseInt(limit), parseInt(offset)];
    const isValidSort = validateSort(column, sortType);
    if (isValidSort) {
      const { rows } = await database.query(getRecipesBySpoonacularScoreSortQuery(column, sortType), params);
      return rows;
    }
    const { rows } = await database.query(getRecipesBySpoonacularScoreQuery, params);
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
  recipesBySpoonacularScore,
  getAllDiets,
};
