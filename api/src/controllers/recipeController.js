import {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  recipesByDiet,
  recipesByReadyInMinutes,
  recipesByHealthScore,
  recipesBySpoonacularScore,
  getAllDiets,
} from "../services/recipeService.js";

const getAllRecipes = async (req, res) => {
  const { page = 1, limit = 12, column, sortType } = req.query;
  try {
    const response = await allRecipes(page, limit, column, sortType);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneRecipe = async (req, res) => {
  const { recipeId } = req.params;
  if (!recipeId) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const response = await oneRecipe(recipeId);
    if (!response) {
      return res.status(404).json({ error: "Recipe not found" });
    }
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
    !Array.isArray(diets) ||
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
  const { recipeId } = req.params;
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
    !Array.isArray(diets) ||
    !health_score ||
    !spoonacular_score
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await updateRecipe(recipeId, req.body);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOneRecipe = async (req, res) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const response = await deleteRecipe(recipeId);
    if (response) {
      res.status(200).json({ message: "Recipe successfully deleted" });
    } else {
      res.status(404).json({ error: "Recipe not founda" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchRecipesByTitle = async (req, res) => {
  const { title, page = 1, limit = 10, column, sortType, diet = "" } = req.query;
  console.log(diet);

  if (!title) {
    return res.status(200).json([]);
  }

  try {
    const results = await searchRecipes(title, page, limit, column, sortType, diet);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDiets = async (req, res) => {
  try {
    const diets = await getAllDiets();
    res.status(200).json(diets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRecipesByDiet = async (req, res) => {
  const { diet, page = 1, limit = 12, column, sortType } = req.query;

  if (!diet) {
    return res.status(400).json({ error: "Diet type is required" });
  }

  try {
    const response = await recipesByDiet(diet, page, limit, column, sortType);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRecipesByReadyInMinutes = async (req, res) => {
  const { page = 1, limit = 10, column, sortType, minutes } = req.query;
  if (!minutes) {
    return res.status(400).json({ error: "Valid minutes are required" });
  }

  try {
    const response = await recipesByReadyInMinutes(parseInt(minutes), page, limit, column, sortType);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRecipesByHealthScore = async (req, res) => {
  const { page = 1, limit = 10, column, sortType, score } = req.query;
  if (!score) {
    return res.status(400).json({ error: "Valid health score is required" });
  }

  try {
    const response = await recipesByHealthScore(parseInt(score), page, limit, column, sortType);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRecipesBySpoonacularScore = async (req, res) => {
  const { page = 1, limit = 10, column, sortType, score } = req.query;
  if (!score) {
    return res.status(400).json({ error: "Valid spoonacular score is required" });
  }

  try {
    const response = await recipesBySpoonacularScore(parseInt(score), page, limit, column, sortType);
    res.status(200).json(response);
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
  getRecipesByDiet,
  getRecipesByReadyInMinutes,
  getRecipesByHealthScore,
  getRecipesBySpoonacularScore,
  getDiets,
};
