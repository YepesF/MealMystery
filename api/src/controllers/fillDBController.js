const { getRecipesSpoonacular } = require("../services/fillDBService");

const fillRecipes = async (req, res) => {
  try {
    const { results } = await getRecipesSpoonacular();
    const recipes = [];
    results.forEach((recipe) => {
      const {
        title,
        readyInMinutes,
        image,
        summary,
        diets,
        healthScore,
        spoonacularScore,
      } = recipe;
      image &&
        recipes.push({
          title,
          readyInMinutes,
          image,
          summary,
          diets,
          healthScore,
          spoonacularScore,
        });
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  fillRecipes,
};
