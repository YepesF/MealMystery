import { randomUUID } from "crypto";
import { getRecipesSpoonacular } from "../services/fillDBService.js";
import db from "../database/index.js";
import { insertRecipeQuery, deleteAllRecipesQuery } from "../queries/recipesQueries.js";
import { translate } from "../utils/translate/index.js";

const fillRecipes = async (req, res) => {
  let rotateKeys = 0;
  try {
    const { password } = req.body;

    // Compare the password submitted by the user with the password in the .env file
    if (password !== process.env.DB_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await db.query(deleteAllRecipesQuery);

    const { results: recipes } = await getRecipesSpoonacular();

    for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];
      console.log(`Processing recipe ${index + 1} of ${recipes.length}`);

      const {
        title,
        readyInMinutes,
        summary,
        diets,
        healthScore,
        spoonacularScore,
        pricePerServing,
        dishTypes,
        occasions,
        analyzedInstructions,
      } = recipe;
      const image = `https://img.spoonacular.com/recipes/${recipe.id}-636x393.jpg`;
      const stepsData = [];
      const equipmentData = [];
      const ingredientsData = [];

      if (analyzedInstructions.length) {
        for (const { number, step, ingredients, equipment } of analyzedInstructions[0].steps) {
          stepsData.push({ number, en: step });

          for (const { id, name, image } of equipment) {
            const exists = equipmentData.some(equip => equip.id === id);
            if (!exists) {
              equipmentData.push({ id, name, image });
            }
          }

          for (const { id, name, image } of ingredients) {
            const exists = ingredientsData.some(ingredient => ingredient.id === id);
            if (!exists && id) {
              ingredientsData.push({
                id,
                name,
                image: image.startsWith("https") ? image : `https://img.spoonacular.com/ingredients_100x100/${image}`,
              });
            }
          }
        }
      }

      const id = randomUUID();
      const recipeData = await translate({ title, summary, steps: stepsData }, rotateKeys);
      rotateKeys = rotateKeys === process.env.GEMINI_API_KEY.split(",").length - 1 ? 0 : rotateKeys + 1;

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
        pricePerServing,
        JSON.stringify(dishTypes),
        JSON.stringify(occasions),
        JSON.stringify(recipeData?.steps || stepsData),
        JSON.stringify(equipmentData),
        JSON.stringify(ingredientsData),
        recipeData?.titleEs || title,
        recipeData?.summaryEs || summary,
      ]);
    }

    res.status(200).json({
      message: "Recipes have been successfully added to the database.",
    });
  } catch (error) {
    console.error(error.message || error.response?.data?.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  fillRecipes,
};
