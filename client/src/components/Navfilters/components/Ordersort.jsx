import { useState } from "react";
import Typography from "../../Typography";
import { useTranslation } from "react-i18next";

const SortOrder = ({ setSortOrder, setSortColumn }) => {
  const { t } = useTranslation();
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
        <option value="title:ASC">{t("SortOrder.titleAsc")}</option>
        <option value="title:DESC">{t("SortOrder.titleDesc")}</option>
        <option value="ready_in_minutes:ASC">{t("SortOrder.timeAsc")}</option>
        <option value="ready_in_minutes:DESC">{t("SortOrder.timeDesc")}</option>
        <option value="spoonacular_score:ASC">
          {t("SortOrder.spoonacularAsc")}
        </option>
        <option value="spoonacular_score:DESC">
          {t("SortOrder.spoonacularDesc")}
        </option>
        <option value="health_score:ASC">{t("SortOrder.healthAsc")}</option>
        <option value="health_score:DESC">{t("SortOrder.healthDesc")}</option>
      </select>
      <Typography variant="caption" className="ml-2 dark:text-primary">
        {t("SortOrder.order")}
      </Typography>
    </div>
  );
};

export default SortOrder;
