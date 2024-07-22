import React, { useCallback, useState } from "react";
import Typography from "../../Typography";
import { debounce } from "lodash";

const SpoonacularScoreFilters = ({
  handleRangeChange,
  spoonacularScore,
  setSpoonacularScore,
}) => {
  const [score, setScore] = useState(spoonacularScore.to);

  const debouncedChangeHandler = useCallback(
    debounce(async (name, value) => {
      handleRangeChange(setSpoonacularScore, { from: 0, [name]: value });
    }, 2000),
    []
  );

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setScore(value);
    debouncedChangeHandler(name, value);
  };
  return (
    <fieldset className="border-b border-inner">
      <details className=" bg-primary">
        <summary className="flex justify-between items-center cursor-pointer py-3 px-4">
          <Typography variant="h4">Spoonacular Score</Typography>
        </summary>
        <div className="mt-3 py-3 px-4">
          <input
            name="to"
            type="range"
            min="90"
            max="100"
            value={score}
            onChange={handleOnChange}
            className="block w-full"
          />
          <Typography
            variant="caption"
            className="block mt-2 text-sm text-gray-600"
          >
            Spoonacular Score: {score}
          </Typography>
        </div>
      </details>
    </fieldset>
  );
};

export default SpoonacularScoreFilters;
