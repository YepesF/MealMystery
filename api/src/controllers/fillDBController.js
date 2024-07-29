import { randomUUID } from "crypto";
import { getRecipesSpoonacular } from "../services/fillDBService.js";
import db from "../database/index.js";
import { insertRecipeQuery, deleteAllRecipesQuery } from "../queries/recipesQueries.js";

const fillRecipes = async (req, res) => {
  try {
    const { password } = req.body;
    // Compare the password submitted by the user with the password in the .env file
    if (password !== process.env.DB_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await db.query(deleteAllRecipesQuery);

    const { results: recipes } = await getRecipesSpoonacular();

    recipes.forEach(async (recipe) => {
      const {
        title,
        readyInMinutes,
        image,
        summary,
        diets,
        healthScore,
        spoonacularScore,
        pricePerServing,
        nutrition,
        dishTypes,
        occasions,
        analyzedInstructions,
      } = recipe;

      if (image) {
        const id = randomUUID();
        // Insert into the database with the generated id
        await db.query(insertRecipeQuery, [
          id,
          title,
          Math.round(readyInMinutes),
          image,
          summary,
          JSON.stringify(diets),
          Math.round(healthScore),
          Math.round(spoonacularScore),
          Math.round(pricePerServing),
          JSON.stringify(nutrition),
          JSON.stringify(dishTypes),
          JSON.stringify(occasions),
          JSON.stringify(analyzedInstructions),

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
