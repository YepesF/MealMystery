import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../../../api/recepies";
import Card from "../../../../components/Card";
import Pagination from "../../../../components/Pagination";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async (page) => {
      try {
        const data = await getAllRecipes(page);
        setRecipes(data.recipes);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-8 px-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 px-8 w-full">
        {recipes.map(({ id, title, diets, image, ready_in_minutes }, index) => (
          <Card
            key={id}
            id={id}
            title={title}
            diets={diets}
            imageUrl={image}
            readyIn={ready_in_minutes}
            onClick={() => handleCardClick(id)}
            index={index}
            imageHeight={60}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RecipesPage;