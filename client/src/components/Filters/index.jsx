import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getDiets } from "../../api/recepies";
import Button from "../Button";
import Typography from "../Typography";

const Filters = ({
  onFilterChange,
  onMinutesChange,
  handleShowFilters,
  onHealthScoreChange,
  onSpoonacularScoreChange,
}) => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState("");
  const [tempMinutes, setTempMinutes] = useState(0);
  const [healthscore, setHealthScore] = useState(0);
  const [healthScoreTimeout, setHealthScoreTimeout] = useState(null);
  const [spoonacularScore, setSpoonacularScore] = useState(0);
  const [spoonacularTimeout, setspoonacularTimeout] = useState(null);
  const [filterCount, setFilterCount] = useState(0);
  const [dietsOpen, setDietsOpen] = useState(false);
  const [showAllDiets, setShowAllDiets] = useState(false);

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

  const updateFilterCount = () => {
    let count = 0;
    if (selectedDiet.length > 0) count += 1;
    if (tempMinutes.from > 0 || tempMinutes.to < 700) count += 1;
    if (healthscore > 0) count += 1;
    if (spoonacularScore > 90) count += 1;
    setFilterCount(count);
  };

  const handleDietChange = (event) => {
    const { value } = event.target;
    setSelectedDiet(value);
    onFilterChange(value);
    handleShowFilters();
    updateFilterCount();
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
    updateFilterCount();
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
    updateFilterCount();
  };

  const handleSpoonacularScoreChange = (e) => {
    const { value } = e.target;

    if (spoonacularTimeout) {
      clearTimeout(spoonacularTimeout);
    }

    const timeout = setTimeout(() => {
      onSpoonacularScoreChange(value);
    }, 2000);

    setSpoonacularScore(value);
    setspoonacularTimeout(timeout);
    updateFilterCount();
  };

  const clearFilters = () => {
    setSelectedDiet([]);
    setTempMinutes(0);
    setHealthScore(0);
    setSpoonacularScore(0);
    setFilterCount(0);
    onFilterChange([]);
    onMinutesChange(0);
    onHealthScoreChange(0);
    onSpoonacularScoreChange(0);
  };

  return (
    <div className="bg-primary h-full border-r border-t  border-black overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <Typography variant="h1" className="text-2xl">
          Filters <span className="text-sm">({filterCount})</span>
        </Typography>
        {filterCount > 0 && (
          <Button variant="secondary" type="button" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      <fieldset className="border-b">
        <details className={` ${dietsOpen ? "open" : ""}`}>
          <summary
            className="flex justify-between items-center cursor-pointer py-3 px-4"
            onClick={() => setDietsOpen(!dietsOpen)}
          >
            <Typography variant="h4">Diets</Typography>
          </summary>
          <ul
            className={`space-y-1 py-3 px-4 ${dietsOpen ? "block" : "hidden"}`}
          >
            {(showAllDiets ? diets : diets.slice(0, 4)).map((diet) => (
              <li key={diet} className="flex items-center py-2">
                <input
                  id={`filter-diet-${diet}`}
                  className="mr-2"
                  type="checkbox"
                  name="filter.diet"
                  value={diet}
                  checked={selectedDiet.includes(diet)}
                  onChange={handleDietChange}
                />
                <label
                  htmlFor={`filter-diet-${diet}`}
                  className="text-sm cursor-pointer capitalize"
                >
                  {diet}
                </label>
              </li>
            ))}
          </ul>
          <div className=" px-4">
            {showAllDiets ? (
              <summary
                className="cursor-pointer text-green-600"
                onClick={() => setShowAllDiets(false)}
              >
                See Less
              </summary>
            ) : (
              diets.length > 4 && (
                <summary
                  className="cursor-pointer text-green-600"
                  onClick={() => setShowAllDiets(true)}
                >
                  View More
                </summary>
              )
            )}
          </div>
        </details>
      </fieldset>

      <fieldset className="border-b border-inner ">
        <details className=" bg-primary py-3 px-4">
          <summary className="flex justify-between items-center cursor-pointer">
            <Typography variant="h4">Recipes Time</Typography>
          </summary>

          <div className="mt-4">
            <div className="flex flex-col space-y-4">
              <Typography
                variant="caption"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From
              </Typography>
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

              <div>
                <Typography
                  variant="caption"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  To
                </Typography>
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
                  <span className="ml-2 text-sm text-gray-600">minutes</span>
                </div>
              </div>
            </div>
            <Button
              className="mt-4"
              variant="primary"
              onClick={applyMinutesFilter}
            >
              Apply
            </Button>
          </div>
        </details>
      </fieldset>

      <fieldset className="border-b border-inner">
        <details className=" bg-primary">
          <summary className="flex justify-between items-center cursor-pointer py-3 px-4">
            <Typography variant="h4">Health Score</Typography>
          </summary>
          <div className="mt-3 py-3 px-4">
            <input
              type="range"
              min="0"
              max="100"
              value={healthscore}
              onChange={handleHealthScoreChange}
              className="block w-full"
            />
            <Typography
              variant="caption"
              className="block mt-2 text-sm text-gray-600"
            >
              Health Score: {healthscore}
            </Typography>
          </div>
        </details>
      </fieldset>

      <fieldset className="border-b border-inner">
        <details className=" bg-primary">
          <summary className="flex justify-between items-center cursor-pointer py-3 px-4">
            <Typography variant="h4">Spoonacular Score</Typography>
          </summary>
          <div className="mt-3 py-3 px-4">
            <input
              type="range"
              min="90"
              max="100"
              value={spoonacularScore}
              onChange={handleSpoonacularScoreChange}
              className="block w-full"
            />
            <Typography
              variant="caption"
              className="block mt-2 text-sm text-gray-600"
            >
              Spoonacular Score: {spoonacularScore}
            </Typography>
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
  onSpoonacularScoreChange: PropTypes.func.isRequired,
};

export default Filters;
