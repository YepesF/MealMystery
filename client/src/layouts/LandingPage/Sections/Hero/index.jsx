import { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Typography from "../../../../components/Typography";
import { getAllRecipes } from "../../../../api/recepies";

const Hero = () => {
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipes = await getAllRecipes();
        if (recipes && recipes.length > 0) {
          console.log('First recipe:', recipes[0]); // Verifica la primera receta obtenida
          setRecipe(recipes[0]); // la primera receta
        } else {
          console.log("No recipes found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, []);

  if (!recipe) {
    return (
      <div className="w-full h-[93vh] bg-hero bg-no-repeat bg-cover saturate-[.75]">
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
    <div className="w-full h-[93vh] bg-hero bg-no-repeat bg-cover saturate-[.75]">
      <div className="w-full p-8">
        <Typography variant="h2" className="mb-4">
          Our recommendation
        </Typography>
        <Card
          title={recipe.title}
          diets={recipe.diets}
          imageUrl={recipe.image}
        />
      </div>
    </div>
  );
};

export default Hero;
