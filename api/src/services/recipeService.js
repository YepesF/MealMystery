const database = require("../database");
const { getAllRecipesQuery, getRecipeQuery } = require("../queries/recipesQueries");

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
    const { id, title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score } = recipeData;
    const { rows } = await database.query(insertRecipeQuery, [id, title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const updateRecipe = async (id, recipeData) => {
  try {
    const { title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score } = recipeData;
    const { rows } = await database.query(updateRecipeQuery, [title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score, id]);
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


module.exports = {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
};
