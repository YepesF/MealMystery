import {
  allRecipes,
  oneRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  getAllDiets,
} from "../services/recipeService.js";

const getAllRecipes = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    query = null,
    diets = null,
    readyInFrom = null,
    readyInTo = null,
    healthScoreFrom = null,
    healthScoreTo = null,
    spoonacularScoreFrom = null,
    spoonacularScoreTo = null,
    sortColumn = "title",
    sortType = "ASC",
  } = req.body;
  try {
    const response = await allRecipes(
      page,
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
    );
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

const getDiets = async (req, res) => {
  try {
    const diets = await getAllDiets();
    res.status(200).json(diets);
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
  getDiets,
};
