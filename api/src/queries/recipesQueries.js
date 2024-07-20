const insertRecipeQuery = `
  INSERT INTO recipes (id, title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
`;

const totalRecipesQuery = `
  SELECT COUNT(*) AS count
  FROM recipes
  WHERE
    ($1::text IS NULL OR title ILIKE '%' || $1::text || '%') AND
    ($2::text[] IS NULL OR EXISTS (
      SELECT 1
      FROM json_array_elements_text(diets) diet
      WHERE diet = ANY ($2::text[])
    )) AND
    ($3::int IS NULL OR ready_in_minutes >= $3::int) AND
    ($4::int IS NULL OR ready_in_minutes <= $4::int) AND
    ($5::int IS NULL OR health_score >= $5::int) AND
    ($6::int IS NULL OR health_score <= $6::int) AND
    ($7::int IS NULL OR spoonacular_score >= $7::int) AND
    ($8::int IS NULL OR spoonacular_score <= $8::int)
`;

const getAllRecipesQuery = `
  SELECT *
  FROM recipes
  WHERE
    ($3::text IS NULL OR title ILIKE '%' || $3::text || '%') AND
    ($4::text[] IS NULL OR EXISTS (
      SELECT 1
      FROM json_array_elements_text(diets) diet
      WHERE diet = ANY ($4::text[])
    )) AND
    ($5::int IS NULL OR ready_in_minutes >= $5::int) AND
    ($6::int IS NULL OR ready_in_minutes <= $6::int) AND
    ($7::int IS NULL OR health_score >= $7::int) AND
    ($8::int IS NULL OR health_score <= $8::int) AND
    ($9::int IS NULL OR spoonacular_score >= $9::int) AND
    ($10::int IS NULL OR spoonacular_score <= $10::int)
`;

const orderClause = (sortType) => {
  return sortType
    ? `
    ORDER BY
    CASE WHEN $11::text = 'title' THEN title END ${sortType},
    CASE WHEN $11::text = 'ready_in_minutes' THEN ready_in_minutes END ${sortType},
    CASE WHEN $11::text = 'health_score' THEN health_score END ${sortType},
    CASE WHEN $11::text = 'spoonacular_score' THEN spoonacular_score END ${sortType}
  `
    : "";
};

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

const getSearchRecipesDietQuery = `
  SELECT *
  FROM recipes
  WHERE title ILIKE $1
    AND $2 = ANY(SELECT jsonb_array_elements_text(diets::jsonb))
  LIMIT $3 OFFSET $4;
`;

const deleteAllRecipesQuery = `
  DELETE FROM recipes
`;

const getAllDietsQuery = `
  SELECT DISTINCT json_array_elements_text(diets::json) AS diet
  FROM recipes
  ORDER BY diet;
`;

const totalRecipesByDietQuery = `
  SELECT COUNT(*) 
  FROM public.recipes
  WHERE $1 = ANY(SELECT jsonb_array_elements_text(diets::jsonb))
`;

const getRecipesByDietQuery = `
  SELECT *
  FROM recipes
  WHERE $1 = ANY(SELECT jsonb_array_elements_text(diets::jsonb))
  LIMIT $2 OFFSET $3;
`;
const getRecipesByDietSortQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE $1 = ANY(SELECT jsonb_array_elements_text(diets::jsonb))
  ORDER BY ${column} ${sort}
  LIMIT $2 OFFSET $3;
`;

const TotalRecipeByReadyInMinutesQuery = `
  SELECT COUNT(*)
  FROM public.recipes
  WHERE ready_in_minutes BETWEEN $1 AND $2
`;

const getRecipesByReadyInMinutesQuery = `
   SELECT *
  FROM recipes
  WHERE ready_in_minutes BETWEEN $1 AND $2
  LIMIT $3 OFFSET $4;
`;

const getRecipesByReadyInMinutesSortQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE ready_in_minutes BETWEEN $1 AND $2
  ORDER BY ${column} ${sort}
  LIMIT $3 OFFSET $4;
`;

const TotalRecipesByHealthScoreQuery = `
  SELECT COUNT(*)
  FROM public.recipes
  WHERE health_score <= $1
`;

const getRecipesByHealthScoreQuery = `
  SELECT *
  FROM recipes
  WHERE health_score <= $1
  LIMIT $2 OFFSET $3;
`;

const getRecipesByHealthScoreSortQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE health_score <= $1
  ORDER BY ${column} ${sort}
  LIMIT $2 OFFSET $3;
`;

const TotalRecipesBySpoonacularScoreQuery = `
  SELECT COUNT(*)
  FROM public.recipes
  WHERE spoonacular_score <= $1
`;

const getRecipesBySpoonacularScoreQuery = `
  SELECT *
  FROM recipes
  WHERE spoonacular_score <= $1
  LIMIT $2 OFFSET $3;
`;

const getRecipesBySpoonacularScoreSortQuery = (column, sort) => `
  SELECT *
  FROM recipes
  WHERE spoonacular_score <= $1
  ORDER BY ${column} ${sort}
  LIMIT $2 OFFSET $3;
`;

export {
  insertRecipeQuery,
  totalRecipesQuery,
  orderClause,
  getAllRecipesQuery,
  getAllRecipesSortQuery,
  getRecipeQuery,
  updateRecipeQuery,
  deleteRecipeQuery,
  totalSearchRecipesQuery,
  searchRecipesQuery,
  getSearchRecipesSortQuery,
  getSearchRecipesDietQuery,
  deleteAllRecipesQuery,
  getAllDietsQuery,
  totalRecipesByDietQuery,
  getRecipesByDietQuery,
  getRecipesByDietSortQuery,
  TotalRecipeByReadyInMinutesQuery,
  getRecipesByReadyInMinutesQuery,
  getRecipesByReadyInMinutesSortQuery,
  TotalRecipesByHealthScoreQuery,
  getRecipesByHealthScoreQuery,
  getRecipesByHealthScoreSortQuery,
  TotalRecipesBySpoonacularScoreQuery,
  getRecipesBySpoonacularScoreQuery,
  getRecipesBySpoonacularScoreSortQuery,
};
