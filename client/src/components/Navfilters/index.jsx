import { ImEqualizer2 } from "react-icons/im";
import Typography from "../Typography";
import { motion } from "framer-motion";
import useRecipes from "../../hooks/useRecipes";
import SortOrder from "../Navfilters/components/Ordersort";

const NavFilters = ({
  handleShowFilters,
  showFilters,
  setSortOrder,
  setSortColumn,
}) => {
  const { recipes } = useRecipes();
  return (
    <div className="sticky top-12 z-10 mb-1 flex h-12 w-full items-center justify-between border-b border-t border-gray-400 bg-primary p-3">
      <motion.div
        className="flex cursor-pointer items-center hover:text-accent"
        onClick={handleShowFilters}
        whileHover={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.9 }}
      >
        <ImEqualizer2 />
        <Typography variant="caption" className="ml-4">
          {showFilters ? "Hide filters" : "Show filters"}
        </Typography>
      </motion.div>
      <Typography variant="caption">Recipes</Typography>
      <div>
        <SortOrder setSortOrder={setSortOrder} setSortColumn={setSortColumn} />
      </div>
    </div>
  );
};

export default NavFilters;
