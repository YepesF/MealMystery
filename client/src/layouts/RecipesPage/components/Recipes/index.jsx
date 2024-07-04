import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../../../api/recepies";
import Card from "../../../../components/Card";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 px-8 w-full">
            {recipes.map(({id, title, diets, image}, index) => (
                <Card
                    key={id}
                    id={id}
                    title={title}
                    diets={diets}
                    imageUrl={image}
                    onClick={() => handleCardClick(id)}
                    index={index}
                />
            ))}
        </div>
        
        
    );
};

export default RecipesPage;