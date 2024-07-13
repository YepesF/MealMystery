// Call database
import axios from "axios";
import { ROUTES, URLS } from "../constants/index";
export const getAllRecipes = async (page, column, sortType) => {
  try {
    const url = `${URLS.API}?page=${page}&column=${column}&sortType=${sortType}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
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

export const searchRecipe = async (title, page, diet = "") => {
  try {
    const response = await axios.get(
      `${URLS.API}/search?page=${page}&diet=${diet}&title=${title}&limit=12`
    );

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

export const recipesByDiet = async (
  diet,
  page = 1,
  limit = 12,
  column,
  sortType
) => {
  try {
    const response = await axios.get(
      `${URLS.API}${ROUTES.DIET}?diet=${diet}&page=${page}&limit=${limit}&column=${column}&sortType=${sortType}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes by diet:", error);
    throw error;
  }
};
