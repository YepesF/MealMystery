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

const createNewRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    const response = await newRecipe(recipeData);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOneRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipeData = req.body;
    const response = await updateRecipe(recipeId, recipeData);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOneRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const response = await deleteRecipe(recipeId);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
};
