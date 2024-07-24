import Button from "../Button";
import Typography from "../Typography";
import DietsFilters from "./components/DietsFilters";
import ReadyInMinutesFilters from "./components/ReadyInMinutesFilters";
import HealthScoreFilters from "./components/HealthScoreFilters";
import SpoonacularScoreFilters from "./components/SpoonacularScoreFilters";
import { motion } from "framer-motion";

const Filters = ({
  filterCount,
  clearFilters,
  selectedDiets,
  healthScore,
  handleSelectedDiets,
  handleRangeChange,
  setReadyInMinutes,
  setHealthScore,
  spoonacularScore,
  setSpoonacularScore,
}) => {
  const variants = {
    visible: { opacity: 0 },
    hidden: { opacity: 1 },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [-500, 0] }}
      exit={{ opacity: 0, x: [0, -500] }}
      transition={{ ease: "easeOut", duration: 0.4 }}
      className="bg-primary h-full border-r border-t  border-black overflow-hidden pr-2"
    >
      <div className="py-4 pr-4 flex justify-between items-center min-h-[6vh]">
        <Typography variant="h1" className="text-2xl">
          Filters <span className="text-sm">({filterCount})</span>
        </Typography>
        {filterCount > 0 && (
          <Button
            className="!py-1"
            variant="secondary"
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <DietsFilters
        handleSelectedDiets={handleSelectedDiets}
        selectedDiets={selectedDiets}
      />
      <ReadyInMinutesFilters
        handleRangeChange={handleRangeChange}
        setReadyInMinutes={setReadyInMinutes}
      />
      <HealthScoreFilters
        handleRangeChange={handleRangeChange}
        healthScore={healthScore}
        setHealthScore={setHealthScore}
      />
      <SpoonacularScoreFilters
        handleRangeChange={handleRangeChange}
        spoonacularScore={spoonacularScore}
        setSpoonacularScore={setSpoonacularScore}
      />
    </motion.div>
  );
};

export default Filters;
