import React, { useCallback, useEffect, useState } from "react";
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
  const [score, setScore] = useState(spoonacularScore.to);
  const [scoreOpen, setScoreOpen] = useState(false);

  const debouncedChangeHandler = useCallback(
    debounce(async (value) => {
      handleRangeChange(setSpoonacularScore, { from: 0, to: value });
    }, 700),
    []
  );

  const handleOnChange = ({ target }) => {
    const { value } = target;
    setScore(parseInt(value));
    debouncedChangeHandler(parseInt(value));
  };

  useEffect(() => {
    if (spoonacularScore.to === 0) {
      setScore("0");
    }
  }, [spoonacularScore]);

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
            defaultValue={score}
            min={0}
            max={100}
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
  );
};

export default SpoonacularScoreFilters;
