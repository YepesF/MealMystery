import React, { useCallback, useState } from "react";
import Typography from "../../Typography";
import { debounce } from "lodash";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Slider,
} from "@material-tailwind/react";
import ArrowIcon from "./ArrowIcon";

const HealthScoreFilters = ({
  handleRangeChange,
  healthScore,
  setHealthScore,
}) => {
  const [score, setScore] = useState(healthScore.to || 0);
  const [scoreOpen, setScoreOpen] = useState(false);

  const debouncedChangeHandler = useCallback(
    debounce(async (name, value) => {
      handleRangeChange(setHealthScore, { from: 0, [name]: value });
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
        Health Score
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
            Health Score: <strong className="!text-secondary">{score}</strong>
          </Typography>
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default HealthScoreFilters;
