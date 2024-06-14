const database = require("../database");
const { getAllRecipesQuery } = require("../queries/recipesQueries");

const allRecipes = async () => {
  try {
    const { rows } = await database.query(getAllRecipesQuery);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const oneRecipe = () => {
  return "Get an existing recipe";
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
