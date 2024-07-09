import React, { useEffect, useState } from "react";
import { getAllRecipes, recipesByDiet } from "../../../../api/recepies";
import Card from "../../../../components/Card";
import Pagination from "../../../../components/Pagination";
import { CustomSpinner } from "../../../../components/Spinner";
import Filters from "../../../../components/Filters";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState("");

  const fetchRecipes = async (page, diet) => {
    try {
      setLoading(true);
      const data = diet ? await recipesByDiet(diet, page) : await getAllRecipes(page);
      if (diet) {
        setRecipes(data);
      } else {
        setRecipes(data.recipes || []);
      }
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages || 1);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage, selectedDiet);
  }, [currentPage, selectedDiet]);

  const handlePageChange = (page) => {
    setCurrentPage(Number(page));
    fetchRecipes(Number(page), selectedDiet);
  };

  const handleFilterChange = (diet) => {
    setSelectedDiet(diet);
    setCurrentPage(1);
    fetchRecipes(1, diet);
  };

  return (
    <div className="py-8 px-8 w-full">
      <Filters onFilterChange={handleFilterChange} />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner />
        </div>
      ) : recipes.length === 0 ? (
        <div>No recipes found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 px-8 w-full">
            {recipes.map(({ id, title, diets, image, ready_in_minutes }, index) => (
              <Card
                key={id}
                id={id}
                title={title}
                diets={diets}
                imageUrl={image}
                readyIn={ready_in_minutes}
                index={index}
                imageHeight={60}
                onClick={() => handleCardClick(id)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={parseInt(currentPage)}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipesPage;
