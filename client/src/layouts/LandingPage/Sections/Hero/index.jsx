import Card from "../../../../components/Card";
import Typography from "../../../../components/Typography";

const Hero = () => {
  return (
    <div className="w-full h-[93vh] bg-hero bg-no-repeat bg-cover saturate-[.75]">
      <div className="w-full p-8">
        <Typography variant="h2" className="mb-4">
          Our recommendation
        </Typography>
        <Card
          title="Moroccan chickpea and lentil stew"
          subtitle="Vegan"
          price="$14.00"
          imageUrl="https://img.spoonacular.com/recipes/652417-312x231.jpg"
        />
      </div>
    </div>
  );
};

export default Hero;
