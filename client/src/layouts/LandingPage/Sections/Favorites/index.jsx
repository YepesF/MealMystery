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
import { useTranslation } from "react-i18next";

const Favorites = () => {
  const { t, i18n } = useTranslation();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const screenSize = useScreenSize();
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", screenSize > 1280 ? "-260%" : screenSize > 768 ? "-500%" : "-981%"],
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
      className="flex h-[900vh] w-full flex-col items-start justify-start px-2 pt-20 md:h-[900vh] md:px-4 md:pt-32 hd:px-6 hd:pt-40 fhd:px-8 fhd:pt-48"
    >
      <div className="sticky top-[26vh] mb-4 flex items-center justify-center gap-4 md:gap-8 hd:top-[10vh] fhd:top-[20vh]">
        <Typography
          className="text-2xl font-extrabold dark:text-primary md:text-4xl hd:text-5xl fhd:text-6xl"
          variant="h2"
        >
          {t("Favorites.Favorites")}
        </Typography>
        <div className="flex items-center justify-center gap-2">
          <Button
            size="small"
            className={getClassNames("time")}
            onClick={() => handleClick("time")}
          >
            {t("Favorites.Time")}
          </Button>
          <Button
            size="small"
            className={getClassNames("spoonacular")}
            onClick={() => handleClick("spoonacular")}
          >
            {t("Favorites.Spoonacular")}
          </Button>
          <Button
            size="small"
            className={getClassNames("health")}
            onClick={() => handleClick("health")}
          >
            {t("Favorites.Health")}
          </Button>
        </div>
      </div>
      <div className="sticky top-[30vh] w-full overflow-x-auto hide-scrollbar md:min-h-[50rem] hd:top-[5vh] fhd:top-[20vh] 2k:top-[25vh]">
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
                  title_es,
                },
                index,
              ) => (
                <Link
                  key={index}
                  to={`${ROUTES.RECIPE}/${id}`}
                  className="w-[90%] flex-shrink-0 p-0 md:w-1/2 hd:w-[35%] fhd:w-[30%]"
                >
                  <article
                    className={`h-full border-t p-4 ${index < recipes.length - 1 ? "border-r" : ""} flex flex-col items-start justify-start gap-6 border-gray-400 bg-primary px-4 dark:border-primary dark:bg-primaryDark`}
                  >
                    <div className="w-full">
                      <Typography
                        variant="body1"
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-extrabold dark:text-primary md:text-xl fhd:text-xl"
                      >
                        {i18n.language === "en" ? title : title_es}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-xs capitalize dark:text-primary md:text-sm fhd:text-xl"
                      >
                        {activeButton.time && t("Favorites.ReadyIn")}
                        {activeButton.spoonacular &&
                          t("Favorites.SpoonacularScore")}
                        {activeButton.health && t("Favorites.HealthScore")}
                        <strong className="ml-2 text-accent">
                          {activeButton.time && ready_in_minutes}
                          {activeButton.spoonacular && spoonacular_score}
                          {activeButton.health && health_score}
                        </strong>
                      </Typography>
                    </div>
                    <div className="h-[25rem] w-full flex-shrink-0 md:h-[25rem] fhd:h-[30rem]">
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
                            {t(diet)}
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
