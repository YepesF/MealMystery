import React from "react";
import Typography from "../../../components/Typography";
import Badge from "../../../components/Badge";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

const processSummary = (summary) => {
  return summary.replace(
    /<a href="([^"]+)">([^<]+)<\/a>/g,
    (match, href, text) => {
      return `<a class="underline decoration-accent font-normal hover:text-accent" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    },
  );
};

const RecipeHero = ({
  image,
  title,
  ready_in_minutes,
  health_score,
  spoonacular_score,
  summary,
  diets,
  dish_types,
  price_serving,
  title_es,
  summary_es,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="mb-2 flex h-auto w-full flex-col items-center justify-center border-b border-t border-gray-400 dark:border-primary hd:flex-row">
      <div className="flex h-full items-center justify-center border-gray-400 p-2 dark:border-primary hd:w-2/3 hd:border-r hd:px-[5vw] hd:py-[5vh]">
        <img className="h-auto w-full object-cover" src={image} alt={title} />
      </div>
      <div className="flex h-full flex-col justify-between gap-3 p-2 dark:text-primary hd:w-1/3 hd:px-[1vw]">
        <div>
          <Typography
            variant="h2"
            className="text-2xl font-bold capitalize hd:text-4xl"
          >
            {i18n.language === "en" ? title : title_es}
          </Typography>
          <div className="flex w-full flex-wrap gap-3 p-0 text-xs hd:text-base">
            {dish_types.map((dish, index) => (
              <Typography
                key={index}
                variant="caption"
                className="capitalize text-gray-400"
              >
                {t(`DishTypes.${dish}`)}
              </Typography>
            ))}
          </div>
        </div>
        <Typography
          variant="caption"
          className="mb-6 text-xs capitalize hd:text-base"
        >
          {t("RecipeHero.price")}:{" "}
          <strong className="ml-2 text-accent">${price_serving}</strong>
        </Typography>
        <div className="mb-[2vh] flex w-full items-start justify-between gap-3 border-b pb-2 text-xs dark:border-primary hd:text-base">
          <Typography variant="body1" className="capitalize">
            {t("RecipeHero.readyInMinutes")}:
            <strong className="ml-2 text-accent">{ready_in_minutes}</strong>
          </Typography>
          <Typography variant="body1" className="capitalize">
            {t("RecipeHero.healthScore")}:
            <strong className="ml-2 text-accent">{health_score}</strong>
          </Typography>
          <Typography variant="body1" className="capitalize">
            {t("RecipeHero.spoonacularScore")}:
            <strong className="ml-2 text-accent">{spoonacular_score}</strong>
          </Typography>
        </div>
        <div className="py-4">
          <span
            className="text-xs font-extralight xl:text-sm 2xl:text-2xl"
            dangerouslySetInnerHTML={{
              __html: processSummary(
                DOMPurify.sanitize(
                  i18n.language === "en" ? summary : summary_es,
                ),
              ),
            }}
          />
        </div>
        <div className="w-full">
          <div className="flex w-full flex-wrap gap-3 p-4">
            {diets.map((diet, index) => (
              <div key={index} className="flex items-center justify-center">
                <Badge className="cursor-pointer capitalize">{t(diet)}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
