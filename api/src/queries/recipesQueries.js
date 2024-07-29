const insertRecipeQuery = `
  INSERT INTO recipes (id, title, ready_in_minutes, image, summary, diets, health_score, spoonacular_score, price_serving, dish_types, occasions, steps, equipment, ingredients)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
`;

const totalRecipesQuery = `
  SELECT COUNT(*) AS count
  FROM recipes
  WHERE
    ($1::text IS NULL OR title ILIKE '%' || $1::text || '%') AND
    ($2::text[] IS NULL OR (
      SELECT COUNT(*)
      FROM jsonb_array_elements_text(diets) diet
      WHERE diet::text = ANY ($2::text[])
    ) = array_length($2::text[], 1)) AND
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
    ($4::text[] IS NULL OR (
      SELECT COUNT(*)
      FROM jsonb_array_elements_text(diets) diet
      WHERE diet::text = ANY ($4::text[])
    ) = array_length($4::text[], 1)) AND
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

const getRecipeQuery = `
  SELECT *
  FROM recipes
  WHERE id = $1;
`;

const updateRecipeQuery = `
  UPDATE recipes
  SET
    title = $1,
    ready_in_minutes = $2,
    image = $3,
    summary = $4,
    diets = $5,
    health_score = $6,
    spoonacular_score = $7,
    price_per_serving = $8,
    nutrition = $9,
    dish_types = $10,
    occasions = $11,
    analyzed_instructions = $12
  WHERE id = $13
`;

const deleteRecipeQuery = `
  DELETE FROM recipes
  WHERE id = $1
  RETURNING *;
`;

const deleteAllRecipesQuery = `
  DELETE FROM recipes
`;

const getAllDietsQuery = `
  SELECT DISTINCT json_array_elements_text(diets::json) AS diet
  FROM recipes
  ORDER BY diet;
`;

const getAllDishTypesQuery = `
  SELECT DISTINCT json_array_elements_text(dish_types::json) AS dish_type
  FROM recipes
  ORDER BY dish_type;
`;

const getAllOccasionsQuery = `
  SELECT DISTINCT json_array_elements_text(occasions::json) AS occasion
  FROM recipes
  ORDER BY occasion;
`;

const getMaxMinValuesQuery = `
  SELECT
    MIN(health_score) AS minHealth,
    MAX(health_score) AS maxHealth,
    MIN(spoonacular_score) AS minSpoonacular,
    MAX(spoonacular_score) AS maxSpoonacular
  FROM recipes;
`;

export {
  insertRecipeQuery,
  totalRecipesQuery,
  orderClause,
  getAllRecipesQuery,
  getRecipeQuery,
  updateRecipeQuery,
  deleteRecipeQuery,
  deleteAllRecipesQuery,
  getAllDietsQuery,
  getAllDishTypesQuery,
  getAllOccasionsQuery,
  getMaxMinValuesQuery,
};
