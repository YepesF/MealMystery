const axios = require("axios");

const getRecipesSpoonacular = async () => {
  const { SPOONACULAR_API_KEY } = process.env;
  const url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${SPOONACULAR_API_KEY}`;
  const response = axios.get(url).then(({ data }) => data);
  return response;
};

module.exports = {
  getRecipesSpoonacular,
};
