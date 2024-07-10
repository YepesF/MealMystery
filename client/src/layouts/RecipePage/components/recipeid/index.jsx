import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../../../api/recepies";
import Typography from "../../../../components/Typography";
import { CustomSpinner } from "../../../../components/Spinner";

const processSummary = (summary) => {
    return summary.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, (match, href, text) => {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    });
};

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

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

    if (!recipe) {
        return <CustomSpinner />;
    }

    return (
        <div className="container mx-auto p-8 flex flex-col md:flex-row">
            <div className="md:w-1/2">
                <img className="w-full h-auto object-cover rounded-md" src={recipe?.image} alt={recipe?.title} />
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <Typography variant="h2" className="text-slate-600 text-2xl font-bold capitalize mb-4">
                    {recipe?.title}
                </Typography>
                <Typography variant="body1" className="text-slate-600 mb-4">
                    <span dangerouslySetInnerHTML={{ __html: processSummary(recipe?.summary) }} />
                </Typography>
                <Typography variant="body1" className="text-slate-600 capitalize mb-2">
                    <strong>Diets:</strong> {recipe?.diets?.join(", ")}
                </Typography>
                <Typography variant="body1" className="text-slate-600 capitalize mb-2">
                    <strong>Ready in minutes:</strong> {recipe?.ready_in_minutes}
                </Typography>
                <Typography variant="body1" className="text-slate-600 capitalize mb-2">
                    <strong>Health score:</strong> {recipe?.health_score}
                </Typography>
                <Typography variant="body1" className="text-slate-600 capitalize mb-2">
                    <strong>Spoonacular score:</strong> {recipe?.spoonacular_score}
                </Typography>
            </div>
        </div>
    );
};

export default RecipePage;
