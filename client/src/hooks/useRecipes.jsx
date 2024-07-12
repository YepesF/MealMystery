import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getAllRecipes, recipesByDiet, searchRecipe } from "../api/recepies";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState("");
  const location = useLocation();

  const fetchRecipes = useCallback(async (page = 1, diet) => {
    try {
      setLoading(true);
      const data = diet
        ? await recipesByDiet(diet, page)
        : await getAllRecipes(page);
      if (diet) {
        setRecipes(data.recipes);
      } else {
        setRecipes(data.recipes || []);
      }
      setTotalPages(data.totalPages || 1);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchRecipes = useCallback(async (query, page = 1, diet) => {
    try {
      setLoading(true);
      const data = await searchRecipe(query, page, diet);
      setRecipes(data.recipes || []);
      setTotalPages(data.totalPages || 1);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error searching recipes:", error);
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
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    if (query) {
      searchRecipes(query, currentPage, selectedDiet);
    } else {
      fetchRecipes(currentPage, selectedDiet);
    }
  }, [selectedDiet, currentPage, location.search, searchRecipes, fetchRecipes]);

  return {
    recipes,
    currentPage,
    totalPages,
    loading,
    selectedDiet,
    handlePageChange,
    handleFilterChange,
  };
};

export default useRecipes;
