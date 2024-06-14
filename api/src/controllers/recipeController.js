const {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../services/recipeService");

const getAllRecipes = async (req, res) => {
  try {
    const response = await allRecipes();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const response = await oneRecipe(recipeId);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
