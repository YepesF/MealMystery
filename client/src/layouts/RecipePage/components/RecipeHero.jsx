import React from "react";
import Typography from "../../../components/Typography";
import Badge from "../../../components/Badge";
import DOMPurify from "dompurify";

const processSummary = (summary) => {
  return summary.replace(
    /<a href="([^"]+)">([^<]+)<\/a>/g,
    (match, href, text) => {
      return `<a class="underline decoration-accent font-normal hover:text-accent" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
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
    <div className="h-auto flex justify-center items-center w-full border-t border-b border-gray-400 mb-2">
      <div className="w-2/3 h-full flex items-center justify-center border-r border-gray-400 py-[5vh] px-[5vw]">
        <img className="w-full h-auto object-cover" src={image} alt={title} />
      </div>
      <div className="w-1/3 h-full flex flex-col justify-between gap-3 px-[1vw]">
        <div>
          <Typography variant="h2" className="text-4xl font-bold capitalize">
            {title}
          </Typography>
          <div className="w-full flex flex-wrap gap-3 p-0">
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
        <Typography variant="caption" className="capitalize mb-6">
          Price: <strong className="text-accent ml-2">${price_serving}</strong>
        </Typography>
        <div className="w-full flex justify-between items-start gap-3 pb-2 mb-[2vh] border-b">
          <Typography variant="body1" className="text-slate-600 capitalize">
            Ready in minutes:
            <strong className="text-accent ml-2">{ready_in_minutes}</strong>
          </Typography>
          <Typography variant="body1" className="text-slate-600 capitalize">
            Health Score:
            <strong className="text-accent ml-2">{health_score}</strong>
          </Typography>
          <Typography variant="body1" className="text-slate-600 capitalize">
            Spoonacular Score:
            <strong className="text-accent ml-2">{spoonacular_score}</strong>
          </Typography>
        </div>
        <div className="py-4">
          <span
            className="font-extralight text-xs xl:text-sm 2xl:text-2xl"
            dangerouslySetInnerHTML={{
              __html: processSummary(DOMPurify.sanitize(summary)),
            }}
          />
        </div>
        <div className="w-full">
          <div className="w-full flex flex-wrap gap-3 p-4">
            {diets.map((diet, index) => (
              <div key={index} className="flex justify-center items-center">
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
