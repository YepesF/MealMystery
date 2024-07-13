import React, { useState } from "react";
import Filters from "../Filters";
import { ImEqualizer2 } from "react-icons/im";

const NavFilters = ({ recipesCount, handleShowFilters, showFilters }) => {
  return (
    <div className="relative container mx-auto p-4">
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <button
          className="relative inline-flex items-center bg-primary-500 text-black px-4 py-2 rounded focus:outline-none"
          aria-label="Toggle filters"
          onClick={handleShowFilters}
        >
          <span className="flex items-center">
            <span className="mr-2 ">
              {showFilters ? "Hide filters" : "Show filters"}
            </span>
            <ImEqualizer2 />
          </span>
        </button>

        <p className="text-lg font-semibold">Recipes</p>

        <div className="flex items-center py-2 px-4" role="status">
          <p>
            <span className="text-primary-500 font-bold">{recipesCount}</span>
            <span>Recipes</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavFilters;
