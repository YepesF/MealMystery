import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import { getAllRecipes } from "../../../api/recepies";
import Card from "../../../components/Card";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await getAllRecipes();
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <PageLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <Card
                        id={recipe.id}
                        title={recipe.title}
                        diets={recipe.diets}
                        imageUrl={recipe.image}
                    />
                ))}
            </div>
        </PageLayout>
    );
};

export default RecipesPage;
