import React from "react";
import PropTypes from "prop-types";
import Recipeid from "./recipeid";


const RecipePage = () => {
    return (
        <Recipeid />
    );
};

RecipePage.propTypes = {
    children: PropTypes.node,
};

export default RecipePage;
