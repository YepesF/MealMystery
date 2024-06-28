import React from "react";
import PropTypes from "prop-types";
import Recipes from "./components/Recipes";
import PageLayout from "../PageLayout";


const RecipesPage = () => {
    return (
        <PageLayout>
            <Recipes />
        </PageLayout>

    );
};

RecipesPage.propTypes = {
    children: PropTypes.node,
};

export default RecipesPage;
