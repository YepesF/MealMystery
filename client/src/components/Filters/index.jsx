import Button from "../Button";
import Typography from "../Typography";
import DietsFilters from "./components/DietsFilters";
import ReadyInMinutesFilters from "./components/ReadyInMinutesFilters";
import HealthScoreFilters from "./components/HealthScoreFilters";
import SpoonacularScoreFilters from "./components/SpoonacularScoreFilters";
import { motion } from "framer-motion";
import FilterChip from "../FilterChip";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [-500, 0] }}
      exit={{ opacity: 0, x: [0, -500] }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="flex h-[80vh] flex-col items-start overflow-auto overflow-x-hidden bg-primary pr-2 dark:bg-primaryDark dark:text-primary"
    >
      <div className="flex min-h-[6vh] w-full items-center justify-between py-4">
        <Typography
          variant="h1"
          className="text-lg md:text-2xl hd:text-3xl 2k:text-5xl"
        >
          {t("Filters.filters")}{" "}
          <span className="text-sm">({filterCount})</span>
        </Typography>
        {filterCount > 0 && (
          <Button variant="accent" type="button" onClick={clearFilters}>
            {t("Filters.clearFilters")}
          </Button>
        )}
      </div>
      {filterCount > 0 && (
        <div className="flex w-full flex-wrap gap-1">
          {selectedDiets.length > 0 &&
            selectedDiets.map((diet, index) => (
              <FilterChip
                key={index}
                value={t(`dietsFilters.${diet}`)}
                handle={() => handleSelectedDiets(diet)}
              />
            ))}
          {(readyInMinutes.from > 0 || readyInMinutes.to > 0) && (
            <FilterChip
              value={`${t("Filters.readyIn")}: ${readyInMinutes.from} - ${readyInMinutes.to} ${t("Filters.minutes")}`}
              handle={() => setReadyInMinutes({ from: 0, to: 0 })}
            />
          )}
          {healthScore.to > 0 && (
            <FilterChip
              value={`${t("Filters.healthScore")}: ${healthScore.from} - ${healthScore.to}`}
              handle={() => setHealthScore({ from: 0, to: 0 })}
            />
          )}
          {spoonacularScore.to > 0 && (
            <FilterChip
              value={`${t("Filters.spoonacularScore")}: ${spoonacularScore.from} - ${spoonacularScore.to}`}
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
