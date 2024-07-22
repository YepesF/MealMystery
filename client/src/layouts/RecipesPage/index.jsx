import { useEffect, useState } from "react";
import useRecipes from "../../hooks/useRecipes";
import PageLayout from "../PageLayout";
import NavFilters from "../../components/Navfilters";
import Filters from "../../components/Filters";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { Spinner } from "@material-tailwind/react";

const RecipesPage = () => {
  const {
    recipes,
    currentPage,
    totalPages,
    loading,
    filterCount,
    selectedDiets,
    healthScore,
    spoonacularScore,
    handlePageChange,
    clearFilters,
    handleSelectedDiets,
    handleRangeChange,
    setReadyInMinutes,
    setHealthScore,
    setSpoonacularScore,
  } = useRecipes();

  const [showFilters, setshowFilters] = useState(false);
  const handleShowFilters = () => setshowFilters(!showFilters);

  return (
    <PageLayout>
      <div className="py-8 px-8 h-full w-full">
        {recipes && (
          <NavFilters
            handleShowFilters={handleShowFilters}
            showFilters={showFilters}
          />
        )}
        <div className="min-h-screen">
          {loading ? (
            <div className="flex justify-center items-center h-full fixed top-0 left-1/2">
              <Spinner className="h-16 w-16 text-green-600" />
            </div>
          ) : (
            <div className="flex">
              {showFilters && (
                <div className="bg-gray-200 w-1/4 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                  <Filters
                    clearFilters={clearFilters}
                    filterCount={filterCount}
                    handleSelectedDiets={handleSelectedDiets}
                    selectedDiets={selectedDiets}
                    handleRangeChange={handleRangeChange}
                    setReadyInMinutes={setReadyInMinutes}
                    healthScore={healthScore}
                    setHealthScore={setHealthScore}
                    spoonacularScore={spoonacularScore}
                    setSpoonacularScore={setSpoonacularScore}
                  />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                {recipes.length === 0 ? (
                  <div>No recipes found.</div>
                ) : (
                  recipes.map(
                    (
                      {
                        id,
                        title,
                        diets,
                        image,
                        ready_in_minutes,
                        health_score,
                        spoonacular_score,
                      },
                      index
                    ) => (
                      <Card
                        key={id}
                        id={id}
                        title={title}
                        diets={diets}
                        imageUrl={image}
                        readyIn={ready_in_minutes}
                        healthScore={health_score}
                        spoonacularScore={spoonacular_score}
                        index={index}
                        imageHeight={showFilters ? 40 : 60}
                        decoration
                      />
                    )
                  )
                )}
              </div>
            </div>
          )}
          {!!recipes.length && !loading && (
            <div className="justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default RecipesPage;
