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
    debouncedChangeHandler,
    setSortColumn,
    setSortType,
  } = useRecipes();

  const [showFilters, setshowFilters] = useState(false);
  const handleShowFilters = () => setshowFilters(!showFilters);

  const setSortOrder = (sortType) => {
    setSortColumn("title");
    setSortType(sortType);
  };

  return (
    <PageLayout>
      <div className="h-full w-full px-2 py-8 2k:px-8">
        {recipes && (
          <NavFilters
            handleShowFilters={handleShowFilters}
            showFilters={showFilters}
            setSortOrder={setSortOrder}
          />
        )}
        <div className="min-h-screen">
          <div className="flex h-full w-full">
            <AnimatePresence>
              {showFilters && (
                <div className="sticky top-20 h-screen w-full border-r border-t border-gray-400 bg-primary pr-1 dark:bg-primaryDark 2k:w-1/4">
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
                    debouncedChangeHandler={debouncedChangeHandler}
                  />
                </div>
              )}
            </AnimatePresence>
            <div className="relative grid h-full w-full grid-cols-1 grid-rows-12 md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4">
              {loading ? (
                <div className="fixed flex h-screen w-screen items-center justify-center">
                  <Spinner color="red" className="h-16 w-16 text-accent" />
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
                    index,
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
                      decoration
                    />
                  ),
                )
              ) : (
                <Typography className="ml-3">No recipes found.</Typography>
              )}
            </div>
          </div>
          {!!recipes.length && !loading && (
            <div className="mt-8 justify-center">
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
