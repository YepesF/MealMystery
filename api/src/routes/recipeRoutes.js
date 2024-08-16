const express = require("express");
const {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
} = require("../controllers/recipeController");
const router = express.Router();

router.get("/", getAllRecipes);

router.get("/:workoutId", getOneRecipe);

router.post("/", createNewRecipe);

router.patch("/:workoutId", updateOneRecipe);

router.delete("/:workoutId", deleteOneRecipe);

module.exports = router;
