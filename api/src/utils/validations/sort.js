import { SORT_COLUMNS, SORT_TYPE } from "../../constants/sort.js";

export const validateSort = (colum, type) => {
  if (!colum || !type) {
    return false;
  }

  const isValidSortColumn = (column) => Object.values(SORT_COLUMNS).includes(column);
  const isValidSortType = (type) => Object.values(SORT_TYPE).includes(type);

  if (!isValidSortColumn(colum) || !isValidSortType(type.toUpperCase())) {
    return false;
  }

  return true;
};
