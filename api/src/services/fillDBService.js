import axios from "axios";

const getRecipesSpoonacular = async () => {
  const { SPOONACULAR_API_KEY } = process.env;
  const url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&fillIngredients=true&number=100&apiKey=${SPOONACULAR_API_KEY}`;
  const response = await axios.get(url).then(({ data }) => data);
  return response;
};

export {
  getRecipesSpoonacular,
};
