import React, { useCallback, useState } from "react";
import Typography from "../../Typography";
import { debounce } from "lodash";
import ArrowIcon from "./ArrowIcon";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Slider,
} from "@material-tailwind/react";

const SpoonacularScoreFilters = ({
  handleRangeChange,
  spoonacularScore,
  setSpoonacularScore,
}) => {
  const [score, setScore] = useState(spoonacularScore.to || 0);
  const [scoreOpen, setScoreOpen] = useState(false);

  const debouncedChangeHandler = useCallback(
    debounce(async (name, value) => {
      handleRangeChange(setSpoonacularScore, { from: 0, [name]: value });
    }, 700),
    []
  );

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setScore(parseInt(value));
    debouncedChangeHandler(name, parseInt(value));
  };

  return (
    <Accordion open={scoreOpen} icon={<ArrowIcon open={scoreOpen} />}>
      <AccordionHeader
        className="font-bold text-base text-black"
        onClick={() => setScoreOpen(!scoreOpen)}
      >
        Spoonacular Score
      </AccordionHeader>
      <AccordionBody>
        <div className="px-1">
          <Slider
            className="text-secondary"
            defaultValue={0}
            min={0}
            max={100}
            name="to"
            value={score}
            onChange={handleOnChange}
          />
          <Typography
            variant="caption"
            className="block mt-2 text-sm text-gray-600"
          >
            Spoonacular Score:{" "}
            <strong className="!text-secondary">{score}</strong>
          </Typography>
        </div>
      </AccordionBody>
    </Accordion>
    // <fieldset className="border-b border-inner">
    //   <details className=" bg-primary">
    //     <summary className="flex justify-between items-center cursor-pointer py-3 px-4">
    //       <Typography variant="h4"></Typography>
    //     </summary>
    //     <div className="mt-3 py-3 px-4">
    //       <input
    //         name="to"
    //         type="range"
    //         min="90"
    //         max="100"
    //         value={score}
    //         onChange={handleOnChange}
    //         className="block w-full"
    //       />
    //       <Typography
    //         variant="caption"
    //         className="block mt-2 text-sm text-gray-600"
    //       >
    //          {score}
    //       </Typography>
    //     </div>
    //   </details>
    // </fieldset>
  );
};

export default SpoonacularScoreFilters;
