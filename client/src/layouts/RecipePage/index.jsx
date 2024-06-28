import React from "react";
import PropTypes from "prop-types";
import Recipeid from "../RecipePage/components/recipeid";
import PageLayout from "../PageLayout";



const RecipePage = () => {
    return (
        <PageLayout>
            <Recipeid />
        </PageLayout>
    );
};

RecipePage.propTypes = {
    children: PropTypes.node,
};

export default RecipePage;
