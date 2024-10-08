import { ImEqualizer2 } from "react-icons/im";
import Typography from "../Typography";
import { motion } from "framer-motion";
import SortOrder from "../Navfilters/components/Ordersort";
import { useTranslation } from "react-i18next";

const NavFilters = ({
  handleShowFilters,
  showFilters,
  setSortOrder,
  setSortColumn,
}) => {
  const { t } = useTranslation();
  return (
    <div className="sticky top-12 z-10 mb-1 flex h-12 w-full items-center justify-between border-b border-t border-gray-400 bg-primary p-1 dark:border-primary dark:bg-primaryDark md:p-3">
      <motion.div
        className="flex cursor-pointer items-center text-xs hover:text-accent dark:text-primary dark:hover:text-accent md:text-base"
        onClick={handleShowFilters}
        whileHover={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.9 }}
      >
        <ImEqualizer2 />
        <Typography variant="caption" className="ml-1 md:ml-4">
          {showFilters
            ? t("NavFilters.hideFilters")
            : t("NavFilters.showFilters")}
        </Typography>
      </motion.div>
      <Typography
        variant="caption"
        className="text-xs dark:text-primary md:text-base"
      >
        {t("NavFilters.recipes")}
      </Typography>
      <div className="text-xs md:text-base">
        <SortOrder setSortOrder={setSortOrder} setSortColumn={setSortColumn} />
      </div>
    </div>
  );
};

export default NavFilters;
