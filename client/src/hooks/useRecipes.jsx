import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllRecipes } from "../api/recepies";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [readyInMinutes, setReadyInMinutes] = useState({ from: 0, to: 0 });
  const [healthScore, setHealthScore] = useState({ from: 0, to: 0 });
  const [spoonacularScore, setSpoonacularScore] = useState({ from: 0, to: 0 });
  const [filterCount, setFilterCount] = useState(0);
  const [params, setParams] = useSearchParams();

  const clearDietParams = () => {
    setCurrentPage(1);
    params.delete("diet");
    setParams(params);
  };

  const clearFilters = () => {
    setSelectedDiets([]);
    setReadyInMinutes({ from: 0, to: 0 });
    setHealthScore({ from: 0, to: 0 });
    setSpoonacularScore({ from: 0, to: 0 });
    setFilterCount(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(Number(page));
  };

  const handleSelectedDiets = (diet) => {
    if (diet) {
      setSelectedDiets((prevSelectedDiets) => {
        if (prevSelectedDiets.includes(diet)) {
          // Remove diet from array
          return prevSelectedDiets.filter(
            (selectedDiet) => selectedDiet !== diet
          );
        } else {
          // Add diet to array
          return [...prevSelectedDiets, diet];
        }
      });
    } else {
      setSelectedDiets([]);
    }
    clearDietParams();
  };

  const handleRangeChange = useCallback(async (callback, data) => {
    if (data) {
      callback({ ...data });
    } else {
      callback({ from: 0, to: 0 });
    }
    clearDietParams();
  }, []);

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

  useEffect(() => {
    const query = params.get("query") || null;
    const diet = params.get("diet") || null;
    handleRecipes(
      getAllRecipes,
      currentPage,
      query,
      diet ? [diet] : selectedDiets,
      readyInMinutes.from,
      readyInMinutes.to,
      healthScore.from,
      healthScore.to,
      spoonacularScore.from,
      spoonacularScore.to
    );
  }, [
    handleRecipes,
    getAllRecipes,
    currentPage,
    params,
    selectedDiets,
    readyInMinutes,
    healthScore,
    spoonacularScore,
  ]);

  useEffect(() => {
    let count = 0;
    if (selectedDiets.length > 0) count += 1;
    if (readyInMinutes.from > 0 || readyInMinutes.to > 0) count += 1;
    if (healthScore.to > 0) count += 1;
    if (spoonacularScore.to > 0) count += 1;
    setFilterCount(count);
  }, [
    selectedDiets,
    readyInMinutes,
    healthScore,
    spoonacularScore,
    setFilterCount,
  ]);

  return {
    recipes,
    currentPage,
    totalPages,
    loading,
    selectedDiets,
    readyInMinutes,
    healthScore,
    spoonacularScore,
    filterCount,
    setReadyInMinutes,
    setHealthScore,
    setSpoonacularScore,
    handlePageChange,
    handleSelectedDiets,
    handleRangeChange,
    clearFilters,
  };
};

export default useRecipes;
