import useRecipes from "../../../../hooks/useRecipes";
import Filters from "../../../../components/Filters";
import { CustomSpinner } from "../../../../components/Spinner";
import Card from "../../../../components/Card";
import Pagination from "../../../../components/Pagination";

const RecipesPage = () => {
  const {
    recipes,
    currentPage,
    totalPages,
    loading,
    handlePageChange,
    handleFilterChange,
  } = useRecipes();

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
            {recipes.map(
              ({ id, title, diets, image, ready_in_minutes }, index) => (
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
                  decoration
                />
              )
            )}
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
