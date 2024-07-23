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

export const getDiets = async () => {
  try {
    const response = await axios.get(`${URLS.API}${ROUTES.DIETS}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching diets:", error);
    throw error;
  }
};
