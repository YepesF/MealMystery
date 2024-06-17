import {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} from "../services/recipeService.js";

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
  const {
    title,
    ready_in_minutes,
    image,
    summary,
    diets,
    health_score,
    spoonacular_score,
  } = req.body;

  if (
    !title ||
    !ready_in_minutes ||
    !image ||
    !summary ||
    !diets ||
    !health_score ||
    !spoonacular_score
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await newRecipe(req.body);
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

const searchRecipesByTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: "Title parameter is required" });
  }

  try {
    const results = await searchRecipes(title);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  searchRecipesByTitle,
};
