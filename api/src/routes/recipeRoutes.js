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
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/search", searchRecipesByTitle);

router.get("/", getAllRecipes);

router.get("/:recipeId", getOneRecipe);

router.post("/", createNewRecipe);

router.patch("/:recipeId", updateOneRecipe);

router.delete("/:recipeId", deleteOneRecipe);

router.get("/diet/:dietType", getRecipesByDiet);

router.get("/readyInMinutes/:minutes", getRecipesByReadyInMinutes);

router.get("/healthScore/:score", getRecipesByHealthScore);

export default router;
