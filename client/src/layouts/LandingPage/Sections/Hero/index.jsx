import { useState } from "react";
import Card from "../../../../components/Card";
import Typography from "../../../../components/Typography";

const Hero = () => {
  const [recipe] = useState({
    id: "be4bfab0-811f-4e2d-975d-1447bccdf6a5",
    title: "Red Lentil Soup with Chicken and Turnips",
    diets: ["gluten free", "dairy free"],
    image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
    readyIn: 55,
  });

  return (
    <section className="w-full h-screen bg-hero bg-no-repeat bg-cover bg-fixed saturate-[.75]">
      <div className="w-full p-8">
        <Typography
          variant="h2"
          className="mb-4 text-4xl capitalize text-primary"
        >
          Our recommendation
        </Typography>
        <div className="w-1/5">
          <Card
            id={recipe.id}
            title={recipe.title}
            diets={recipe.diets}
            imageUrl={recipe.image}
            readyIn={recipe.readyIn}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
