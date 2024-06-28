// pages/RecipePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../../../api/recepies";
import Typography from "../../../../components/Typography";

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

    useEffect(() => {
        const disableModalFeatures = () => {
            const modalElement = document.getElementById("modal-id");
            if (modalElement) {
                modalElement.classList.remove("feature-enabled");
            }
        };
        disableModalFeatures();
        return () => {
        };
    }, []);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (


        <div>
            <div className="mb-8">
                <img className="w-full h-48 object-cover" src={recipe.image} alt={recipe.title} />
            </div>
            <Typography variant="h2" className="text-slate-600 text-lg font-bold capitalize">{recipe.title}</Typography>
            <Typography variant="body1" className="text-slate-600 capitalize">{recipe.summary}</Typography>
            <Typography variant="body1" className="text-slate-600 capitalize">
                Diets: {recipe.diets.join(", ")}
            </Typography>
            <Typography variant="body1" className="text-slate-600 capitalize">
                Ready in minutes: {recipe.ready_in_minutes}
            </Typography>
            <Typography variant="body1" className="text-slate-600 capitalize">
                Health score: {recipe.health_score}
            </Typography>
            <Typography variant="body1" className="text-slate-600 capitalize">
                Spoonacular score: {recipe.spoonacular_score}
            </Typography>
        </div>
    );
};



export default RecipePage;
