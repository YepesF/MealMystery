const {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../services/recipeService");

const getAllRecipes = (req, res) => {
  const response = allRecipes();
  res.send(response);
};

const getOneRecipe = (req, res) => {
  const response = oneRecipe();
  res.send(response);
};

const createNewRecipe = (req, res) => {
  const response = newRecipe();
  res.send(response);
};

const updateOneRecipe = (req, res) => {
  const response = updateRecipe();
  res.send(response);
};

const deleteOneRecipe = (req, res) => {
  const response = deleteRecipe();
  res.send(response);
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
};
