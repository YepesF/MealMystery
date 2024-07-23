import { useState } from "react";
import Typography from "../../Typography";
import Button from "../../Button";

const ReadyInMinutesFilters = ({ handleRangeChange, setReadyInMinutes }) => {
  const [range, setRange] = useState({ from: 0, to: 0 });
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setRange({ ...range, [name]: value });
  };
  return (
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
                value={range.from}
                onChange={handleOnChange}
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
                  value={range.to}
                  onChange={handleOnChange}
                  className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-3/4 sm:text-sm border rounded-md p-2"
                />
                <span className="ml-2 text-sm text-gray-600">minutes</span>
              </div>
            </div>
          </div>
          <Button
            className="mt-4"
            variant="primary"
            onClick={() => handleRangeChange(setReadyInMinutes, range)}
          >
            Apply
          </Button>
        </div>
      </details>
    </fieldset>
  );
};

export default ReadyInMinutesFilters;
