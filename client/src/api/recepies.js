// Call database
import axios from 'axios';
import { URLS } from '../constants/index';
export const getAllRecipes = async () => {
    try {
        const response = await fetch(URLS.API);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched from API:', data);
        return data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};
