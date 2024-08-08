import React from "react";
import Typography from "../../../components/Typography";
import Badge from "../../../components/Badge";
import DOMPurify from "dompurify";

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
}) => {
  return (
    <div className="mb-2 flex h-auto w-full items-center justify-center border-b border-t border-gray-400">
      <div className="flex h-full w-2/3 items-center justify-center border-r border-gray-400 px-[5vw] py-[5vh]">
        <img className="h-auto w-full object-cover" src={image} alt={title} />
      </div>
      <div className="flex h-full w-1/3 flex-col justify-between gap-3 px-[1vw]">
        <div>
          <Typography variant="h2" className="text-4xl font-bold capitalize">
            {title}
          </Typography>
          <div className="flex w-full flex-wrap gap-3 p-0">
            {dish_types.map((dish, index) => (
              <Typography
                key={index}
                variant="caption"
                className="capitalize text-gray-400"
              >
                {dish}
              </Typography>
            ))}
          </div>
        </div>
        <Typography variant="caption" className="mb-6 capitalize">
          Price: <strong className="ml-2 text-accent">${price_serving}</strong>
        </Typography>
        <div className="mb-[2vh] flex w-full items-start justify-between gap-3 border-b pb-2">
          <Typography variant="body1" className="capitalize">
            Ready in minutes:
            <strong className="ml-2 text-accent">{ready_in_minutes}</strong>
          </Typography>
          <Typography variant="body1" className="capitalize">
            Health Score:
            <strong className="ml-2 text-accent">{health_score}</strong>
          </Typography>
          <Typography variant="body1" className="capitalize">
            Spoonacular Score:
            <strong className="ml-2 text-accent">{spoonacular_score}</strong>
          </Typography>
        </div>
        <div className="py-4">
          <span
            className="text-xs font-extralight xl:text-sm 2xl:text-2xl"
            dangerouslySetInnerHTML={{
              __html: processSummary(DOMPurify.sanitize(summary)),
            }}
          />
        </div>
        <div className="w-full">
          <div className="flex w-full flex-wrap gap-3 p-4">
            {diets.map((diet, index) => (
              <div key={index} className="flex items-center justify-center">
                <Badge className="cursor-pointer capitalize">{diet}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
