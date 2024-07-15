import { ImEqualizer2 } from "react-icons/im";
import Typography from "../Typography";
import { motion } from "framer-motion";

const NavFilters = ({ recipesCount, handleShowFilters, showFilters }) => {
  return (
    <div className="w-full h-12 border-t border-b border-current p-3 bg-primary flex justify-between items-center sticky top-12 z-20 mb-1">
      <motion.div
        className="flex items-center cursor-pointer hover:text-secondary"
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
        <Typography variant="caption" className="text-secondary">
          {recipesCount}
        </Typography>
        <Typography variant="caption" className="ml-1">
          Recipes
        </Typography>
      </div>
    </div>
  );
};

export default NavFilters;
