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
import { useTranslation } from "react-i18next";

const RecipesPage = () => {
  const { t } = useTranslation();
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

  return (
    <PageLayout>
      <div className="h-full w-full px-2 py-8 hd:px-6 fhd:px-8 2k:px-10">
        {recipes && (
          <NavFilters
            handleShowFilters={handleShowFilters}
            showFilters={showFilters}
            setSortOrder={setSortType}
            setSortColumn={setSortColumn}
          />
        )}
        <div className="min-h-screen">
          <div className="flex h-full w-full">
            <AnimatePresence>
              {showFilters && (
                <div className="md:w- sticky top-20 h-screen w-full border-r border-t border-gray-400 bg-primary pr-1 dark:bg-primaryDark md:w-[40%] hd:w-1/3 2k:w-1/5">
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
            <div className="relative grid h-full w-full grid-cols-1 md:grid-cols-2 hd:grid-cols-3">
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
                      title_es,
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
                      title_es={title_es}
                      decoration
                    />
                  ),
                )
              ) : (
                <Typography className="ml-3">
                  {" "}
                  {t("RecipesPage.noRecipes")}
                </Typography>
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
