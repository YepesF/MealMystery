const { getRecipesSpoonacular } = require("../services/fillDBService");
const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const { insertRecipeQuery } = require("../queries/recipesQueries");
const fillRecipes = async (req, res) => {
  try {
    const { results } = await getRecipesSpoonacular();
    const recipes = [];

    // Utilizar forEach en lugar de for
    results.forEach(async (recipe) => {
      const {
        title,
        readyInMinutes,
        image,
        summary,
        diets,
        healthScore,
        spoonacularScore,
      } = recipe;

      if (image) {
        const newRecipe = {
          title,
          readyInMinutes: Math.round(readyInMinutes), // Round to integer
          image,
          summary,
          diets: JSON.stringify(diets), // Convert diets to JSON
          healthScore: Math.round(healthScore),
          spoonacularScore: Math.round(spoonacularScore),
        };
        recipes.push(newRecipe);

        // Generate a unique id for the recipe
        const id = uuidv4();

        // Insert into the database with the generated id
        await db.query(insertRecipeQuery, [
          id,
          title,
          newRecipe.readyInMinutes,
          image,
          summary,
          newRecipe.diets,
          newRecipe.healthScore,
          newRecipe.spoonacularScore,
        ]);
      }
    });
    res.status(200).json({
      message: "Recipes have been successfully added to the database.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  fillRecipes,
};
