
const insertRecipeQuery = `
  INSERT INTO recipes (id, title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
`;

const getAllRecipesQuery = `
    SELECT *
    FROM recipes;
`;

const getRecipeQuery = `
    SELECT *
    FROM recipes
    WHERE id = $1;
`;

module.exports = {
    insertRecipeQuery,
    getAllRecipesQuery,
    getRecipeQuery
};
