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
    getAllRecipesQuery,
    getRecipeQuery
};
