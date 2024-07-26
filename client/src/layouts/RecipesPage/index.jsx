import { useState } from "react";
import useRecipes from "../../hooks/useRecipes";
import PageLayout from "../PageLayout";
import NavFilters from "../../components/Navfilters";
import Filters from "../../components/Filters";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { Spinner } from "@material-tailwind/react";
import { AnimatePresence } from "framer-motion";
import Typography from "../../components/Typography";

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
    readyInMinutes,
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
      <div className="py-8 px-8 h-full w-full bg-primary">
        {recipes && (
          <NavFilters
            handleShowFilters={handleShowFilters}
            showFilters={showFilters}
          />
        )}
        <div className="min-h-screen">
          <div className="flex">
            <AnimatePresence>
              {showFilters && (
                <div className="bg-primary w-1/4 sticky top-20 h-screen border-r border-t border-black pr-1">
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
                    readyInMinutes={readyInMinutes}
                  />
                </div>
              )}
            </AnimatePresence>
            <div className="relative grid grid-cols-1 grid-rows-12 md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4 w-full">
              {loading ? (
                <div className="flex justify-center items-center absolute top-[40%] left-1/2">
                  <Spinner className="h-16 w-16 text-green-600" />
                </div>
              ) : recipes.length ? (
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
              ) : (
                <Typography className="ml-3">No recipes found.</Typography>
              )}
            </div>
          </div>
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
