import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../../../api/recepies";
import Card from "../../../../components/Card";
import Pagination from "../../../../components/Pagination";
import {CustomSpinner} from "../../../../components/Spinner"


const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async (page) => {
      try {
        setLoading(true);
        const data = await getAllRecipes(page);
        setRecipes(data.recipes);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        window.scrollTo(0, 0);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-8 px-8 w-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner />
        </div>
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
          </>
      )}
    </div>
  );
};

export default RecipesPage;