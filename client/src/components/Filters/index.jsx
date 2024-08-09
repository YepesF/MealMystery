import Button from "../Button";
import Typography from "../Typography";
import DietsFilters from "./components/DietsFilters";
import ReadyInMinutesFilters from "./components/ReadyInMinutesFilters";
import HealthScoreFilters from "./components/HealthScoreFilters";
import SpoonacularScoreFilters from "./components/SpoonacularScoreFilters";
import { motion } from "framer-motion";
import FilterChip from "../FilterChip";

const Filters = ({
  filterCount,
  clearFilters,
  selectedDiets,
  healthScore,
  readyInMinutes,
  handleSelectedDiets,
  handleRangeChange,
  setReadyInMinutes,
  setHealthScore,
  spoonacularScore,
  setSpoonacularScore,
  debouncedChangeHandler,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [-500, 0] }}
      exit={{ opacity: 0, x: [0, -500] }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="flex h-[80vh] flex-col items-start overflow-auto overflow-x-hidden bg-primary pr-2 text-primary dark:bg-primaryDark"
    >
      <div className="flex min-h-[6vh] w-full items-center justify-between py-4">
        <Typography variant="h1" className="text-lg md:text-2xl">
          Filters <span className="text-sm">({filterCount})</span>
        </Typography>
        {filterCount > 0 && (
          <Button variant="accent" type="button" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      {filterCount > 0 && (
        <div className="flex w-full flex-wrap gap-1">
          {selectedDiets.length > 0 &&
            selectedDiets.map((diet, index) => (
              <FilterChip
                key={index}
                value={diet}
                handle={() => handleSelectedDiets(diet)}
              />
            ))}
          {(readyInMinutes.from > 0 || readyInMinutes.to > 0) && (
            <FilterChip
              value={`Ready in: ${readyInMinutes.from} - ${readyInMinutes.to} min.`}
              handle={() => setReadyInMinutes({ from: 0, to: 0 })}
            />
          )}
          {healthScore.to > 0 && (
            <FilterChip
              value={`Health score: ${healthScore.from} - ${healthScore.to}`}
              handle={() => setHealthScore({ from: 0, to: 0 })}
            />
          )}
          {spoonacularScore.to > 0 && (
            <FilterChip
              value={`Spoonacular score: ${spoonacularScore.from} - ${spoonacularScore.to}`}
              handle={() => setSpoonacularScore({ from: 0, to: 0 })}
            />
          )}
        </div>
      )}
      <DietsFilters
        handleSelectedDiets={handleSelectedDiets}
        selectedDiets={selectedDiets}
      />
      <ReadyInMinutesFilters
        handleRangeChange={handleRangeChange}
        readyInMinutes={readyInMinutes}
        setReadyInMinutes={setReadyInMinutes}
      />
      <HealthScoreFilters
        debouncedChangeHandler={debouncedChangeHandler}
        healthScore={healthScore}
        setHealthScore={setHealthScore}
      />
      <SpoonacularScoreFilters
        debouncedChangeHandler={debouncedChangeHandler}
        spoonacularScore={spoonacularScore}
        setSpoonacularScore={setSpoonacularScore}
      />
    </motion.div>
  );
};

export default Filters;
