// Call database
import axios from 'axios';
import { URLS } from '../constants/index';
export const getAllRecipes = async () => {
    try {
        const response = await axios.get(URLS.API);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        const data = response.data;
        console.log('Data fetched from API:', data);
        return data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};

export const getRecipeById = async (id) => {
    try {
        const response = await axios.get(`${URLS.API}/${id}`);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        const data = response.data;
        console.log(`Recipe fetched from API with ID ${id}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching recipe with ID ${id}:`, error);
        throw error;
    }
};