import { useEffect, useState } from "react";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import Badge from "../../../../components/Badge";
import { getAllRecipesFavorites } from "../../../../api/recepies";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants";
import { Spinner } from "@material-tailwind/react";

const Favorites = () => {
  const [recipes, setSecipes] = useState([]);
  const [activeButton, setActiveButton] = useState({
    time: true,
    spoonacular: false,
    health: false,
  });
  const [loading, setLoading] = useState(false);

  const handleClick = (buttonName) => {
    const defaultProps = { time: false, spoonacular: false, health: false };
    setActiveButton({ ...defaultProps, [buttonName]: true });
  };

  const getClassNames = (buttonName) => {
    return activeButton[buttonName] ? "bg-secondary text-primary" : "";
  };

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      const recipes = await getAllRecipesFavorites(activeButton);
      setSecipes(recipes.recipes || []);
      setLoading(false);
    };

    getFavorites();
  }, [activeButton, getAllRecipesFavorites, setSecipes, setLoading]);

  return (
    <section className="w-full flex flex-col justify-start items-start px-8 pt-48">
      <div className="flex items-center justify-center gap-8 mb-4">
        <Typography
          className="text-slate-950 font-extrabold text-6xl whitespace-nowrap text-ellipsis"
          variant="h2"
        >
          Favorites
        </Typography>
        <div className="flex items-center justify-center gap-2">
          <Button
            size="small"
            className={getClassNames("time")}
            onClick={() => handleClick("time")}
          >
            Time
          </Button>
          <Button
            size="small"
            className={getClassNames("spoonacular")}
            onClick={() => handleClick("spoonacular")}
          >
            Spoonacular
          </Button>
          <Button
            size="small"
            className={getClassNames("health")}
            onClick={() => handleClick("health")}
          >
            Health
          </Button>
        </div>
      </div>
      <div className="w-full overflow-x-auto hide-scrollbar min-h-[50rem]">
        {loading && (
          <div className="flex justify-center items-center h-[40rem]">
            <Spinner className="h-16 w-16 text-green-600" />
          </div>
        )}
        <div className="h-full flex justify-start items-center">
          {!loading &&
            recipes.map(
              (
                {
                  id,
                  image,
                  title,
                  ready_in_minutes,
                  spoonacular_score,
                  health_score,
                  diets,
                },
                index
              ) => (
                <Link
                  key={index}
                  to={`${ROUTES.RECIPE}/${id}`}
                  className="flex-shrink-0 p-0 w-[30%]"
                >
                  <article
                    className={`h-full p-4 border-t ${index < recipes.length - 1 ? "border-r" : ""} border-current px-4 bg-primary flex flex-col items-start justify-start gap-6`}
                  >
                    <div className="w-full">
                      <Typography
                        variant="body1"
                        className="text-slate-950 font-extrabold text-xl overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-slate-600 capitalize"
                      >
                        {activeButton.time && "Ready in minutes:"}
                        {activeButton.spoonacular && "Spoonacular Score:"}
                        {activeButton.health && "Health Score:"}
                        <strong className="text-secondary ml-2">
                          {activeButton.time && ready_in_minutes}
                          {activeButton.spoonacular && spoonacular_score}
                          {activeButton.health && health_score}
                        </strong>
                      </Typography>
                    </div>
                    <div className="w-full h-[40rem] flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={image}
                        alt={title}
                      />
                    </div>
                    <div className="flex justify-center h-full">
                      {diets.length ? (
                        diets.slice(0, 3).map((diet, index) => (
                          <Badge
                            key={index}
                            className={`capitalize ${index > 0 && "ml-4"}`}
                          >
                            {diet}
                          </Badge>
                        ))
                      ) : (
                        <Badge className="h-full opacity-0">&nbsp;</Badge>
                      )}
                    </div>{" "}
                  </article>
                </Link>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
