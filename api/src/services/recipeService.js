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

const newRecipe = () => {
  return "Create a new recipe";
};

const updateRecipe = () => {
  return "Update an existing recipe";
};

const deleteRecipe = () => {
  return "Delete an existing recipe";
};

module.exports = {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
};
