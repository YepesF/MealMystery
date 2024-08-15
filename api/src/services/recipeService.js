import { randomUUID } from "crypto";
import database from "../database/index.js";
import {
  getRecipeQuery,
  insertRecipeQuery,
  totalRecipesQuery,
  getAllDietsQuery,
  getAllDishTypesQuery,
  getAllOccasionsQuery,
  getAllEquipmentQuery,
  getAllIngredientsQuery,
  getAllRecipesQuery,
  orderClause,
  getMaxMinValuesQuery,
} from "../queries/recipesQueries.js";
import { translate } from "../utils/translate/index.js";

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
      query?.value || null,
      diets,
      readyInFrom,
      readyInTo,
      healthScoreFrom,
      healthScoreTo,
      spoonacularScoreFrom,
      spoonacularScoreTo,
      query?.lang || null,
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
      query?.value || null,
      diets,
      readyInFrom,
      readyInTo,
      healthScoreFrom,
      healthScoreTo,
      spoonacularScoreFrom,
      spoonacularScoreTo,
      query?.lang || null,
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
  const rotateKeys = Math.floor(Math.random() * process.env.GEMINI_API_KEY.split(",").length);
  try {
    const {
      title,
      ready_in_minutes,
      image,
      summary,
      diets,
      price_serving,
      dish_types,
      occasions,
      steps,
      equipment,
      ingredients,
    } = recipeData;

    const translateData = await translate({ title, summary, steps }, rotateKeys);

    const { rows } = await database.query(insertRecipeQuery, [
      randomUUID(),
      title,
      ready_in_minutes,
      image,
      summary,
      JSON.stringify(diets),
      Math.floor(Math.random() * (100 - 40 + 1)) + 40,
      Math.floor(Math.random() * (100 - 40 + 1)) + 40,
      price_serving,
      JSON.stringify(dish_types),
      JSON.stringify(occasions),
      JSON.stringify(translateData?.steps || steps),
      JSON.stringify(equipment),
      JSON.stringify(ingredients),
      translateData?.titleEs || title,
      translateData?.summaryEs || summary,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
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

const getAllEquipment = async () => {
  const { rows } = await database.query(getAllEquipmentQuery);
  return rows;
};

const getAllIngredients = async () => {
  const { rows } = await database.query(getAllIngredientsQuery);
  return rows;
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
  getAllDiets,
  getAllDishTypes,
  getAllOccasions,
  getAllEquipment,
  getAllIngredients,
  getMaxMinValues,
};
