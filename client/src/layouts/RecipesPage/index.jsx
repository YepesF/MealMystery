import React from "react";
import PropTypes from "prop-types";
import Recipes from "./Recipes";


const RecipesPage = () => {
    return (
        <Recipes />
    );
};

RecipesPage.propTypes = {
    children: PropTypes.node,
};

export default RecipesPage;
