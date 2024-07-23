import Button from "../Button";
import Typography from "../Typography";
import DietsFilters from "./components/DietsFilters";
import ReadyInMinutesFilters from "./components/ReadyInMinutesFilters";
import HealthScoreFilters from "./components/HealthScoreFilters";
import SpoonacularScoreFilters from "./components/SpoonacularScoreFilters";

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
  return (
    <div className="bg-primary h-full border-r border-t  border-black overflow-hidden">
      <div className="p-4 flex justify-between items-center min-h-[6vh]">
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
    </div>
  );
};

export default Filters;
