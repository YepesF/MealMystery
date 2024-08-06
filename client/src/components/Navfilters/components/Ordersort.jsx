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
        className="bg-primary text-accent border-none focus:ring-0 cursor-pointer"
      >
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
      <Typography variant="caption" className="ml-2">
        Order
      </Typography>
    </div>
  );
};

export default SortOrder;
