import { useEffect, useState } from "react";
import Typography from "../../Typography";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import ArrowIcon from "./ArrowIcon";
import { getMaxMinValues } from "../../../api/recepies";

const HealthScoreFilters = ({
  debouncedChangeHandler,
  healthScore,
  setHealthScore,
}) => {
  const [scoreOpen, setScoreOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const handleOnChange = ({ target }) => {
    setScore(parseInt(target.value));
    debouncedChangeHandler(setHealthScore, {
      from: 0,
      to: parseInt(target.value),
    });
  };

  useEffect(() => {
    const getMaxMin = async () => {
      const { minhealth, maxhealth } = await getMaxMinValues();
      setScore(minhealth);
      setMinValue(minhealth);
      setMaxValue(maxhealth);
    };

    getMaxMin();
  }, []);

  useEffect(() => {
    !healthScore.to && setScore(minValue);
  }, [healthScore]);

  return (
    <Accordion open={scoreOpen} icon={<ArrowIcon open={scoreOpen} />}>
      <AccordionHeader
        className="text-base font-bold text-black dark:text-primary"
        onClick={() => setScoreOpen(!scoreOpen)}
      >
        Health Score
      </AccordionHeader>
      <AccordionBody>
        <div className="px-1">
          <input
            type="range"
            id="price-range"
            className="w-full cursor-pointer"
            min={minValue}
            max={maxValue}
            value={score}
            onChange={handleOnChange}
          />
          <Typography
            variant="caption"
            className="mt-2 block text-sm text-gray-600 dark:text-primary/90"
          >
            Health Score: <strong className="!text-accent">{score}</strong>
          </Typography>
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default HealthScoreFilters;
