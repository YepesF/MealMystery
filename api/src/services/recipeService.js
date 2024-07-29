import { randomUUID } from "crypto";
import database from "../database/index.js";
import {
  getRecipeQuery,
  insertRecipeQuery,
  deleteRecipeQuery,
  updateRecipeQuery,
  totalRecipesQuery,
  getAllDietsQuery,
  getAllRecipesQuery,
  orderClause,
  getMaxMinValuesQuery,
} from "../queries/recipesQueries.js";

const allRecipes = async (
  currentPage,
  limit,
  sortColumn,
  sortType,
  query,
  diets,
  readyInFrom,
  readyInTo,
  healthScoreFrom,
  healthScoreTo,
  spoonacularScoreFrom,
  spoonacularScoreTo,
) => {
  try {
    const { rows } = await database.query(totalRecipesQuery, [
      query,
      diets,
      readyInFrom,
      readyInTo,
      healthScoreFrom,
      healthScoreTo,
      spoonacularScoreFrom,
      spoonacularScoreTo,
    ]);
    const totalCount = parseInt(rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / limit);
    const validPage = Math.max(1, Math.min(currentPage, totalPages));

    const completeQuery = `
      ${getAllRecipesQuery}
      ${orderClause(sortType)}
      LIMIT $1::int OFFSET ($2::int - 1) * $1::int
    `;

    const { rows: recipes } = await database.query(completeQuery, [
      limit,
      validPage,
      query,
      diets,
      readyInFrom,
      readyInTo,
      healthScoreFrom,
      healthScoreTo,
      spoonacularScoreFrom,
      spoonacularScoreTo,
      sortColumn,
    ]);

    return { recipes, currentPage, totalPages };
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

const getAllDiets = async () => {
  try {
    const { rows } = await database.query(getAllDietsQuery);
    return rows.map((row) => row.diet);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching diets");
  }
};

const getMaxMinValues = async () => {
  try {
    const { rows } = await database.query(getMaxMinValuesQuery);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching diets");
  }
};

export {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  getAllDiets,
  getMaxMinValues,
};
