import { randomUUID } from "crypto";
import database from "../database/index.js";
import {
  getRecipeQuery,
  insertRecipeQuery,
  deleteRecipeQuery,
  updateRecipeQuery,
  totalRecipesQuery,
  getAllDietsQuery,
  getAllDishTypesQuery,
  getAllOccasionsQuery,
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
      nutrients,
      step_ingredients,
      equipment_details,
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
      JSON.stringify(nutrients),
      JSON.stringify(step_ingredients),
      JSON.stringify(equipment_details),
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
      nutrients,
      step_ingredients,
      equipment_details,
    } = recipeData;

    const { rows } = await database.query(updateRecipeQuery, [
      title,
      Math.round(ready_in_minutes),
      image,
      summary,
      JSON.stringify(diets),
      Math.round(health_score),
      Math.round(spoonacular_score),
      JSON.stringify(nutrients),
      JSON.stringify(step_ingredients),
      JSON.stringify(equipment_details),
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

const getAllDishTypes = async () => {
  try {
    const { rows } = await database.query(getAllDishTypesQuery);
    return rows.map((row) => row.dish_type);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching dish types");
  }
};

const getAllOccasions = async () => {
  try {
    const { rows } = await database.query(getAllOccasionsQuery);
    return rows.map((row) => row.occasion);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching occasions");
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
  getAllDishTypes,
  getAllOccasions,
  getMaxMinValues,
};
