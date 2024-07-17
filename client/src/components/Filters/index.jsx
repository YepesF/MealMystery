import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getDiets } from "../../api/recepies";

const Filters = ({
  onFilterChange,
  onMinutesChange,
  handleShowFilters,
  onHealthScoreChange,
}) => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState("");
  const [tempMinutes, setTempMinutes] = useState({ from: 0, to: 700 });
  const [healthscore, setHealthScore] = useState(100);
  const [healthScoreTimeout, setHealthScoreTimeout] = useState(null);

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

  const handleTempMinutesChange = (e) => {
    const { name, value } = e.target;
    setTempMinutes((prevMinutes) => ({
      ...prevMinutes,
      [name]: parseInt(value),
    }));
  };

  const applyMinutesFilter = () => {
    onMinutesChange(tempMinutes);
  };

  const handleHealthScoreChange = (e) => {
    const { value } = e.target;

    if (healthScoreTimeout) {
      clearTimeout(healthScoreTimeout);
    }

    const timeout = setTimeout(() => {
      onHealthScoreChange(value);
    }, 2000);

    setHealthScore(value);
    setHealthScoreTimeout(timeout);
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>
      <div className="mb-6">
        <label
          htmlFor="diet"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Diet:
        </label>
        <select
          id="diet"
          name="diet"
          value={selectedDiet}
          onChange={handleDietChange}
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        >
          <option value="">All Diets</option>
          {diets.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </div>
      <fieldset className="mb-6">
        <details className="border border-gray-300 rounded-md p-4">
          <summary className="cursor-pointer text-lg font-semibold text-gray-800">
            <legend>Recipes Time</legend>
          </summary>
          <div className="mt-4">
            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="from"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  From
                </label>
                <div className="flex items-center">
                  <input
                    name="from"
                    id="from"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="700"
                    value={tempMinutes.from}
                    onChange={handleTempMinutesChange}
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-3/4 sm:text-sm border rounded-md p-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">minutes</span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="to"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  TO
                </label>
                <div className="flex items-center">
                  <input
                    name="to"
                    id="to"
                    type="number"
                    placeholder="700"
                    min="0"
                    max="700"
                    value={tempMinutes.to}
                    onChange={handleTempMinutesChange}
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-3/4 sm:text-sm border rounded-md p-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">minutos</span>
                </div>
              </div>
            </div>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Submit"
              onClick={applyMinutesFilter}
            >
              Apply
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Maximum time: 700 minutes
            </p>
          </div>
        </details>
      </fieldset>
      <fieldset className="mb-6">
        <details className="border border-gray-300 rounded-md p-4">
          <summary className="cursor-pointer text-lg font-semibold text-gray-800">
            <legend>Health Score</legend>
          </summary>
          <div className="mt-4">
            <input
              type="range"
              min="1"
              max="100"
              value={healthscore}
              onChange={handleHealthScoreChange}
              className="block w-full"
            />
            <output className="block mt-2 text-sm text-gray-600">
              Health Score: {healthscore}
            </output>
          </div>
        </details>
      </fieldset>
    </div>
  );
};

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onMinutesChange: PropTypes.func.isRequired,
  handleShowFilters: PropTypes.func.isRequired,
  onHealthScoreChange: PropTypes.func.isRequired,
};

export default Filters;
