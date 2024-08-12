import express from "express";
import {
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
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/max-min", getMaxMin);

router.get("/translater", translations);

router.get("/diets", getDiets);

router.get("/dishtypes", getDishTypes);

router.get("/occasions", getOccasions);

router.get("/equipment", getEquipment);

router.get("/ingredients", getIngredients);

router.post("/all", getAllRecipes);

router.get("/:recipeId", getOneRecipe);

router.post("/", createNewRecipe);

export default router;
