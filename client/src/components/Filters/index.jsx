import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getDiets } from "../../api/recepies";

const Filters = ({ onFilterChange, handleShowFilters }) => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState("");

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const data = await getDiets();
        setDiets(data);
      } catch (error) {
        console.error("Error fetching diets:", error);
      }
    };

    fetchDiets();
  }, []);

  const handleDietChange = (event) => {
    const { value } = event.target;
    setSelectedDiet(value);
    onFilterChange(value);
    handleShowFilters();
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <div className="mb-4">
        <label
          htmlFor="diet"
          className="block text-sm font-medium text-gray-700"
        >
          Diet:
        </label>
        <select
          id="diet"
          name="diet"
          value={selectedDiet}
          onChange={handleDietChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Diets</option>
          {diets.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
