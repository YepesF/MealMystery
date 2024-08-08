import { ImEqualizer2 } from "react-icons/im";
import Typography from "../Typography";
import { motion } from "framer-motion";
import SortOrder from "../Navfilters/components/Ordersort";

const NavFilters = ({ handleShowFilters, showFilters, setSortOrder }) => {
  return (
    <div className="sticky top-12 z-10 mb-1 flex h-12 w-full items-center justify-between border-b border-t border-gray-400 bg-primary p-1 dark:border-primary dark:bg-primaryDark 2k:p-3">
      <motion.div
        className="flex cursor-pointer items-center text-xs hover:text-accent dark:text-primary dark:hover:text-accent 2k:text-base"
        onClick={handleShowFilters}
        whileHover={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.9 }}
      >
        <ImEqualizer2 />
        <Typography variant="caption" className="ml-1 2k:ml-4">
          {showFilters ? "Hide filters" : "Show filters"}
        </Typography>
      </motion.div>
      <Typography
        variant="caption"
        className="text-xs dark:text-primary 2k:text-base"
      >
        Recipes
      </Typography>
      <div className="text-xs 2k:text-base">
        <SortOrder setSortOrder={setSortOrder} />
      </div>
    </div>
  );
};

export default NavFilters;
