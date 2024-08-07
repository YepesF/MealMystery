import { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Typography from "../../../../components/Typography";
import useRecipes from "../../../../hooks/useRecipes";

const Hero = () => {
  const { recipes } = useRecipes();
  const [renderRecipe, setRenderRecipe] = useState();

  useEffect(() => {
    if (recipes.length > 0) {
      const recipe = recipes[0];
      setRenderRecipe(
        <Card
          id={recipe.id}
          title={recipe.title}
          diets={recipe.diets}
          imageUrl={recipe.image}
          readyIn={recipe.ready_in_minutes}
        />,
      );
    }
  }, [recipes, setRenderRecipe]);

  return (
    <section className="w-screen bg-hero bg-cover bg-no-repeat saturate-[.75] 2k:h-screen 2k:bg-fixed">
      <div className="h-full w-full p-8">
        <Typography
          variant="h2"
          className="mb-4 capitalize text-primary 2k:text-4xl"
        >
          Our recommendation
        </Typography>
        <div className="w-1/2 2k:w-1/5">
          {recipes.length > 0 && renderRecipe}
        </div>
      </div>
    </section>
  );
};

export default Hero;
