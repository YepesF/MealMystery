import { useEffect, useRef, useState } from "react";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import Badge from "../../../../components/Badge";
import { getAllRecipesFavorites } from "../../../../api/recepies";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants";
import { Spinner } from "@material-tailwind/react";
import { useScroll, useTransform, motion } from "framer-motion";
import useScreenSize from "../../../../hooks/useScreenSize";

const Favorites = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const screenSize = useScreenSize();
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", screenSize > 768 ? "-260%" : "-981%"],
  );
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

    // Scroll to the top of the section
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getClassNames = (buttonName) => {
    return activeButton[buttonName]
      ? "bg-accent text-primary dark:text-primary"
      : "";
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
    <section
      ref={targetRef}
      className="flex h-[900vh] w-full flex-col items-start justify-start px-2 pt-20 md:h-[900vh] md:px-4 md:pt-32 2k:px-8 2k:pt-48"
    >
      <div className="sticky top-[7vh] mb-4 flex items-center justify-center gap-4 md:top-[20vh] md:gap-8">
        <Typography
          className="text-slate-950 text-2xl font-extrabold dark:text-primary md:text-4xl 2k:text-6xl"
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
      <div className="sticky top-[12vh] w-full overflow-x-auto hide-scrollbar md:top-[25vh] md:min-h-[50rem]">
        {loading && (
          <div className="flex h-full items-center justify-center">
            <Spinner color="red" className="h-16 w-16 text-accent" />
          </div>
        )}
        <motion.div
          style={{ x }}
          className="flex h-full items-center justify-start"
        >
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
                index,
              ) => (
                <Link
                  key={index}
                  to={`${ROUTES.RECIPE}/${id}`}
                  className="w-[90%] flex-shrink-0 p-0 md:w-[30%]"
                >
                  <article
                    className={`h-full border-t p-4 ${index < recipes.length - 1 ? "border-r" : ""} flex flex-col items-start justify-start gap-6 border-gray-400 bg-primary px-4 dark:border-primary dark:bg-primaryDark`}
                  >
                    <div className="w-full">
                      <Typography
                        variant="body1"
                        className="text-slate-950 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-extrabold dark:text-primary md:text-xl 2k:text-xl"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="ext-slate-950 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-extrabold capitalize dark:text-primary md:text-xl 2k:text-xl"
                      >
                        {activeButton.time && "Ready in minutes:"}
                        {activeButton.spoonacular && "Spoonacular Score:"}
                        {activeButton.health && "Health Score:"}
                        <strong className="ml-2 text-accent">
                          {activeButton.time && ready_in_minutes}
                          {activeButton.spoonacular && spoonacular_score}
                          {activeButton.health && health_score}
                        </strong>
                      </Typography>
                    </div>
                    <div className="h-[15rem] w-full flex-shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        src={image}
                        alt={title}
                      />
                    </div>
                    <div className="flex h-full justify-center">
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
              ),
            )}
        </motion.div>
      </div>
    </section>
  );
};

export default Favorites;
