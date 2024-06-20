import express from "express";
import {
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
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/diet", getRecipesByDiet);

router.get("/readyInMinutes", getRecipesByReadyInMinutes);

router.get("/healthScore", getRecipesByHealthScore);

router.get("/spoonacularScore", getRecipesBySpoonacularScore);

router.get("/search", searchRecipesByTitle);

router.get("/", getAllRecipes);

router.get("/:recipeId", getOneRecipe);

router.post("/", createNewRecipe);

router.patch("/:recipeId", updateOneRecipe);

router.delete("/:recipeId", deleteOneRecipe);

export default router;
