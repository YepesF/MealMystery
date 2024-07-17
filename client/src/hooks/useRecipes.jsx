import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAllRecipes,
  recipesByDiet,
  searchRecipe,
  getRecipesByReadyInMinutes,
} from "../api/recepies";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState("");
  const [readyInMinutes, setReadyInMinutes] = useState({ from: 0, to: 700 });
  const [params, setParams] = useSearchParams();

  const handleRecipes = useCallback(async (callback, ...args) => {
    try {
      window.scrollTo(0, 0);
      setLoading(true);
      const data = await callback(...args);
      setRecipes(data.recipes);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(Number(page));
  };

  const handleFilterChange = (diet) => {
    setSelectedDiet(diet);
    setCurrentPage(1);
    // Clear the "f" parameter from the URL
    params.delete("f");
    setParams(params);
  };

  const handleMinutesChange = (from, to) => {
    setReadyInMinutes(from, to);
    setCurrentPage(1);
    params.delete("f");
    setParams(params);
  };

  useEffect(() => {
    if (!params.size && !selectedDiet && !readyInMinutes) {
      handleRecipes(getAllRecipes, currentPage);
    }
  }, [handleRecipes, currentPage, params.size, selectedDiet, readyInMinutes]);

  useEffect(() => {
    const query = params.get("q") || "";
    const filter = params.get("f") || "";

    if (query) {
      handleRecipes(searchRecipe, query, currentPage, selectedDiet);
    } else if (filter) {
      handleRecipes(recipesByDiet, filter, currentPage);
    } else if (selectedDiet) {
      handleRecipes(recipesByDiet, selectedDiet, currentPage);
    } else if (readyInMinutes) {
      handleRecipes(
        getRecipesByReadyInMinutes,
        readyInMinutes.from,
        readyInMinutes.to,
        currentPage
      );
    } else {
      handleRecipes(getAllRecipes, currentPage);
    }
  }, [handleRecipes, params, currentPage, selectedDiet, readyInMinutes]);

  return {
    recipes,
    currentPage,
    totalPages,
    loading,
    selectedDiet,
    handlePageChange,
    handleFilterChange,
    handleMinutesChange,
  };
};

export default useRecipes;
