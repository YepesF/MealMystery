// Call database
import axios from "axios";
import { URLS } from "../constants/index";
export const getAllRecipes = async (page, column, sortType) => {
  try {
    const response = await axios.get(
      `${URLS.API}?page=${page}&column=${column}&sortType=${sortType}`
    );

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
