import { useState } from "react";
import Typography from "../../Typography";

const SortOrder = ({ setSortOrder, setSortColumn }) => {
  const [sortType, setSortType] = useState("ASC");
  const [sortColumn, setLocalSortColumn] = useState("title");

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    const [column, order] = selectedSort.split(":");
    setLocalSortColumn(column);
    setSortType(order);
    setSortColumn(column);
    setSortOrder(order);
  };

  return (
    <div className="flex items-center">
      <select
        value={`${sortColumn}:${sortType}`}
        onChange={handleSortChange}
        className="cursor-pointer border-none bg-primary text-accent focus:ring-0 dark:bg-primaryDark"
      >
        <option value="title:ASC">Title A-Z</option>
        <option value="title:DESC">Title Z-A</option>
        <option value="ready_in_minutes:ASC">Time: Asc ↑</option>
        <option value="ready_in_minutes:DESC">Time: Desc ↓</option>
        <option value="spoonacular_score:ASC">Spoonacular: Asc ↑</option>
        <option value="spoonacular_score:DESC">Spoonacular: Desc ↓</option>
        <option value="health_score:ASC">Health: Asc ↑</option>
        <option value="health_score:DESC">Health: Desc ↓</option>
      </select>
      <Typography variant="caption" className="ml-2 dark:text-primary">
        Order
      </Typography>
    </div>
  );
};

export default SortOrder;
