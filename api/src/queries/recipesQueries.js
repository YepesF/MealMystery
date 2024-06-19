const insertRecipeQuery = `
  INSERT INTO recipes (id, title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
`;

const totalRecipesQuery = "SELECT COUNT(*) FROM public.recipes";

const getAllRecipesQuery = `
  SELECT *
  FROM recipes
  LIMIT $1 OFFSET $2;
`;

const getAllRecipesSortQuery = (colum, sort) => `
  SELECT *
  FROM recipes
  ORDER BY ${colum} ${sort}
  LIMIT $1 OFFSET $2;
`;

const getRecipeQuery = `
  SELECT *
  FROM recipes
  WHERE id = $1;
`;

const updateRecipeQuery = `
  UPDATE recipes
  SET title = $1, ready_in_minutes = $2, image = $3, summary = $4, diets = $5, health_score = $6, spoonacular_score = $7
  WHERE id = $8
  RETURNING *;
`;

const deleteRecipeQuery = `
  DELETE FROM recipes
  WHERE id = $1
  RETURNING *;
`;

const totalSearchRecipesQuery = `
  SELECT COUNT(*)
  FROM recipes
  WHERE title ILIKE $1;
`;

const searchRecipesQuery = `
  SELECT *
  FROM recipes
  WHERE title ILIKE $1
  LIMIT $2 OFFSET $3;
`;

const getSearchRecipesSortQuery = (colum, sort) => `
  SELECT *
  FROM recipes
  WHERE title ILIKE $1
  ORDER BY ${colum} ${sort}
  LIMIT $2 OFFSET $3;
`;

const deleteAllRecipesQuery = `
  DELETE FROM recipes
`;

const getRecipesByDietQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE $1 = ANY(SELECT jsonb_array_elements_text(diets::jsonb))
  ORDER BY ${column} ${sort}
  LIMIT $2 OFFSET $3;
`;

const getRecipesByReadyInMinutesQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE ready_in_minutes <= $1
  ORDER BY ${column} ${sort}
  LIMIT $2 OFFSET $3;
`;

const getRecipesByHealthScoreQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE health_score <= $1
  ORDER BY ${column} ${sort}
  LIMIT $2 OFFSET $3;
`;

const getRecipesBySpoonacularScoreQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE spoonacular_score <= $1
  ORDER BY ${column} ${sort}
  LIMIT $2 OFFSET $3;
`;

export {
  insertRecipeQuery,
  totalRecipesQuery,
  getAllRecipesQuery,
  getAllRecipesSortQuery,
  getRecipeQuery,
  updateRecipeQuery,
  deleteRecipeQuery,
  totalSearchRecipesQuery,
  searchRecipesQuery,
  getSearchRecipesSortQuery,
  deleteAllRecipesQuery,
  getRecipesByDietQuery,
  getRecipesByReadyInMinutesQuery,
  getRecipesByHealthScoreQuery,
  getRecipesBySpoonacularScoreQuery,
};
