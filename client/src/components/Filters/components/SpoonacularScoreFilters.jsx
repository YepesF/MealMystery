import { useEffect, useState } from "react";
import Typography from "../../Typography";
import ArrowIcon from "./ArrowIcon";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { getMaxMinValues } from "../../../api/recepies";

const SpoonacularScoreFilters = ({
  debouncedChangeHandler,
  spoonacularScore,
  setSpoonacularScore,
}) => {
  const [scoreOpen, setScoreOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const handleOnChange = ({ target }) => {
    setScore(parseInt(target.value));
    debouncedChangeHandler(setSpoonacularScore, {
      from: 0,
      to: parseInt(target.value),
    });
  };

  useEffect(() => {
    const getMaxMin = async () => {
      const { minspoonacular, maxspoonacular } = await getMaxMinValues();
      setScore(minspoonacular);
      setMinValue(minspoonacular);
      setMaxValue(maxspoonacular);
    };

    getMaxMin();
  }, []);

  useEffect(() => {
    !spoonacularScore.to && setScore(minValue);
  }, [spoonacularScore]);

  return (
    <Accordion open={scoreOpen} icon={<ArrowIcon open={scoreOpen} />}>
      <AccordionHeader
        className="text-base font-bold text-black dark:text-primary"
        onClick={() => setScoreOpen(!scoreOpen)}
      >
        Spoonacular Score
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
            Spoonacular Score: <strong className="!text-accent">{score}</strong>
          </Typography>
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default SpoonacularScoreFilters;
