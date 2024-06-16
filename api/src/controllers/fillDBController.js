import { getRecipesSpoonacular } from "../services/fillDBService.js";
import db from "../database/index.js";
import { v4 as uuidv4 } from "uuid";
import { insertRecipeQuery } from "../queries/recipesQueries.js";

const fillRecipes = async (req, res) => {
  try {
    const { results } = await getRecipesSpoonacular();
    const dbPassword = process.env.DB_PASSWORD;

    if (!dbPassword) {
      throw new Error("Database password is missing in environment variables.");
    }

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
        // Generate a unique id for the recipe
        const id = uuidv4();

        // Insert into the database with the generated id
        await db.query(insertRecipeQuery, [
          id,
          title,
          Math.round(readyInMinutes), // Round to integer
          image,
          summary,
          JSON.stringify(diets), // Convert diets to JSON
          Math.round(healthScore),
          Math.round(spoonacularScore),
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

export {
  fillRecipes,
};
