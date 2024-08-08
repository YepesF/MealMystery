import { useState } from "react";
import Typography from "../../Typography";

const SortOrder = ({ setSortOrder }) => {
  const [sortType, setSortType] = useState("ASC");

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortType(selectedSort);
    setSortOrder(selectedSort);
  };

  return (
    <div className="flex items-center">
      <select
        value={sortType}
        onChange={handleSortChange}
        className="cursor-pointer border-none bg-primary text-accent focus:ring-0 dark:bg-primaryDark"
      >
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
      <Typography variant="caption" className="ml-2 dark:text-primary">
        Order
      </Typography>
    </div>
  );
};

export default SortOrder;
