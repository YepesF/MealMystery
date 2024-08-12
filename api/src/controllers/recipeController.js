import {
  allRecipes,
  oneRecipe,
  newRecipe,
  getAllDiets,
  getAllDishTypes,
  getAllOccasions,
  getAllEquipment,
  getAllIngredients,
  getMaxMinValues,
} from "../services/recipeService.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    if (error.message === "Invalid UUID format") {
      return res.status(400).json({ error: "Invalid UUID format" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNewRecipe = async (req, res) => {
  const {
    title,
    ready_in_minutes,
    image,
    summary,
    price_serving,
    dish_types,
    occasions,
    steps,
    equipment,
    ingredients,
  } = req.body;

  if (
    !title ||
    !ready_in_minutes ||
    !image ||
    !summary ||
    !price_serving ||
    !dish_types ||
    !occasions ||
    !steps ||
    !equipment ||
    !ingredients
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await newRecipe(req.body);
    res.status(200).json(response);
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

const getDishTypes = async (req, res) => {
  try {
    const dishTypes = await getAllDishTypes();
    res.status(200).json(dishTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOccasions = async (req, res) => {
  try {
    const occasions = await getAllOccasions();
    res.status(200).json(occasions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEquipment = async (req, res) => {
  try {
    const equipment = await getAllEquipment();
    res.json(equipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving equipment" });
  }
};

const getIngredients = async (req, res) => {
  try {
    const ingredients = await getAllIngredients();
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving ingredients" });
  }
};

const getMaxMin = async (req, res) => {
  try {
    const data = await getMaxMinValues();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const translations = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "translate this into spanish: Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
};

export {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  getDiets,
  getDishTypes,
  getOccasions,
  getEquipment,
  getIngredients,
  getMaxMin,
  translations,
};
