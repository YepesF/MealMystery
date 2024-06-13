// src/controllers/fillDBController.js
const { getRecipesSpoonacular } = require("../services/fillDBService");
const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const fillRecipes = async (req, res) => {
  try {
    const { results } = await getRecipesSpoonacular();
    const recipes = [];
    for (const recipe of results) {
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
          readyInMinutes: Math.round(readyInMinutes), // Round an integer
          image,
          summary,
          diets,
          healthScore: Math.round(healthScore),
          spoonacularScore: Math.round(spoonacularScore),
        };
        recipes.push(newRecipe);

        // Generate a unique id for the recipe
        const id = uuidv4();

        // Insert into the database with the generated id
        await db.query(
          `INSERT INTO recipes (id, title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            id,
            title,
            newRecipe.readyInMinutes,
            image,
            summary,
            diets.join(","),
            newRecipe.healthScore,
            newRecipe.spoonacularScore,
          ],
        );
      }
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  fillRecipes,
};
