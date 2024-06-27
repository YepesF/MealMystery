import { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Typography from "../../../../components/Typography";
import { getAllRecipes, getRecipeById } from "../../../../api/recepies";

const Hero = () => {
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipes = await getAllRecipes();
        if (recipes && recipes.length > 0) {
          setRecipe(recipes[0]);
        } else {
          console.log("No recipes found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, []);

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const recipeById = await getRecipeById;
        console.log("Recipe fetched by ID:", recipeById);
      } catch (error) {
        console.error("Error fetching recipe by ID:", error);
      }
    };

    fetchRecipeById();
  }, []);

  if (!recipe) {
    return (
      <div className="w-full h-screen bg-hero bg-no-repeat bg-cover saturate-[.75]">
        <div className="w-full p-8">
          <Typography variant="h2" className="mb-4">
            Our recommendation
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Loading...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full h-screen bg-hero bg-no-repeat bg-cover saturate-[.75]">
      <div className="w-full p-8">
        <Typography variant="h2" className="mb-4">
          Our recommendation
        </Typography>
        <Card
          id={recipe.id}
          title={recipe.title}
          diets={recipe.diets}
          imageUrl={recipe.image}
        />
      </div>
    </section>
  );
};

export default Hero;
