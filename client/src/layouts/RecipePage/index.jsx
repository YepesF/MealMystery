import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../PageLayout";
import Typography from "../../components/Typography";
import { Spinner } from "@material-tailwind/react";

import { getRecipeById } from "../../api/recepies";
import Badge from "../../components/Badge";
import DOMPurify from "dompurify";

const processSummary = (summary) => {
  return summary.replace(
    /<a href="([^"]+)">([^<]+)<\/a>/g,
    (match, href, text) => {
      return `<a class="underline decoration-accent font-normal hover:text-accent" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
  );
};

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  window.scrollTo(0, 0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <PageLayout>
      {!recipe ? (
        <Spinner color="red" className="h-16 w-16 text-accent" />
      ) : (
        <div className="h-screen flex w-full border-t border-b border-black mb-2">
          <div className="w-2/3 h-full flex items-center justify-center border-r border-black py-[3vh] px-[3vw]">
            <img
              className="w-full h-auto object-cover"
              src={recipe?.image}
              alt={recipe?.title}
            />
          </div>
          <div className="w-1/3 h-full py-[6vh] px-[1vw]">
            <Typography variant="h2" className="text-4xl font-bold capitalize">
              {recipe?.title}
            </Typography>
            <div className="w-full flex justify-between items-start gap-3">
              <Typography variant="body1" className="text-slate-600 capitalize">
                Ready in minutes:
                <strong className="text-accent ml-2">
                  {recipe?.ready_in_minutes}
                </strong>
              </Typography>
              <Typography variant="body1" className="text-slate-600 capitalize">
                Health Score:
                <strong className="text-accent ml-2">
                  {recipe?.health_score}
                </strong>
              </Typography>
              <Typography variant="body1" className="text-slate-600 capitalize">
                Spoonacular Score:
                <strong className="text-accent ml-2">
                  {recipe?.spoonacular_score}
                </strong>
              </Typography>
            </div>
            <div className="w-full my-[8vh]">
              <Typography variant="body1" className="text-slate-600 capitalize">
                Diets:
              </Typography>
              <div className="w-full grid grid-cols-3 gap-3 p-4">
                {recipe?.diets.map((diet, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <Badge className="cursor-pointer capitalize">{diet}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t py-4">
              <span
                className="font-extralight text-xs 2xl:text-sm"
                dangerouslySetInnerHTML={{
                  __html: processSummary(DOMPurify.sanitize(recipe?.summary)),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default RecipePage;
