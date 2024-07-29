import express from "express";
import {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  getDiets,
  getDishTypes,
  getOccasions,
  getMaxMin,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/max-min", getMaxMin);

router.get("/diets", getDiets);

router.get("/dishtypes", getDishTypes);

router.get("/occasions", getOccasions);

router.post("/all", getAllRecipes);

router.get("/:recipeId", getOneRecipe);

router.post("/", createNewRecipe);

router.patch("/:recipeId", updateOneRecipe);

router.delete("/:recipeId", deleteOneRecipe);

export default router;
