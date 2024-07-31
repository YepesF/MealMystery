// Call database
import axios from "axios";
import { ROUTES, URLS } from "../constants/index";
export const getAllRecipes = async (
  page = 1,
  query = null,
  diets = [],
  readyInFrom = null,
  readyInTo = null,
  healthScoreFrom = null,
  healthScoreTo = null,
  spoonacularScoreFrom = null,
  spoonacularScoreTo = null,
  sortColumn = "title",
  sortType = "ASC"
) => {
  const options = {
    url: `${URLS.API}/all`,
    method: "POST",
    data: {
      page,
      query,
      diets: diets.length ? diets : null,
      readyInFrom: readyInFrom || null,
      readyInTo: readyInTo || null,
      healthScoreFrom: healthScoreFrom || null,
      healthScoreTo: healthScoreTo || null,
      spoonacularScoreFrom: spoonacularScoreFrom || null,
      spoonacularScoreTo: spoonacularScoreTo || null,
      sortColumn,
      sortType,
    },
  };
  try {
    const { data, status } = await axios.request(options);

    if (status !== 200) {
      throw new Error("Network response was not ok");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllRecipesFavorites = async ({ time, spoonacular, health }) => {
  const options = {
    url: `${URLS.API}/all`,
    method: "POST",
    data: {
      page: 1,
      query: null,
      diets: null,
      readyInFrom: null,
      readyInTo: time ? 30 : null,
      healthScoreFrom: null,
      healthScoreTo: health ? 100 : null,
      spoonacularScoreFrom: null,
      spoonacularScoreTo: spoonacular ? 100 : null,
      sortColumn: time
        ? "ready_in_minutes"
        : spoonacular
          ? "spoonacular_score"
          : "health_score",
      sortType: spoonacular || health ? "DESC" : "ASC",
    },
  };
  try {
    const { data, status } = await axios.request(options);

    if (status !== 200) {
      throw new Error("Network response was not ok");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${URLS.API}/${id}`);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const newRecipe = async (recipeData) => {
  const options = {
    url: `${URLS.API}`,
    method: "POST",
    data: recipeData,
  };

  try {
    const { data, status } = await axios.request(options);
    if (status !== 200) {
      throw new Error("Network response was not ok");
    }
    return data;
  } catch (error) {
    console.error("Error creating new recipe:", error);
    throw error;
  }
};

export const getDiets = async () => {
  try {
    const response = await axios.get(`${URLS.API}${ROUTES.DIETS}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching diets:", error);
    throw error;
  }
};

export const getAllDishTypes = async () => {
  try {
    const response = await axios.get(`${URLS.API}/dishtypes`);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching dish types:", error);
    throw error;
  }
};

export const getAllOccasions = async () => {
  try {
    const response = await axios.get(`${URLS.API}/occasions`);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching occasions:", error);
    throw error;
  }
};

export const getAllEquipment = async () => {
  try {
    const response = await axios.get(`${URLS.API}/equipment`);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw error;
  }
};

export const getAllIngredients = async () => {
  try {
    const response = await axios.get(`${URLS.API}/ingredients`);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

export const getMaxMinValues = async () => {
  try {
    const response = await axios.get(`${URLS.API}/max-min`);
    return response.data;
  } catch (error) {
    console.error("Error fetching diets:", error);
    throw error;
  }
};
