import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../components/Typography";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const DishTypes = ({
  options,
  formData,
  setFormData,
  dishTypeError,
  setDishTypeError,
}) => {
  const handleSelectChange = (e) => {
    setFormData((prevFormData) => {
      if (!prevFormData.dish_types.includes(e)) {
        return {
          ...prevFormData,
          dish_types: [...prevFormData.dish_types, e],
        };
      }
      return prevFormData;
    });
    if (dishTypeError) {
      setDishTypeError(false);
    }
  };

  const handleRemoveDishType = (dishType) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dish_types: prevFormData.dish_types.filter((d) => d !== dishType),
    }));
  };

  return (
    <div className="h-full w-full">
      <Select
        onChange={handleSelectChange}
        variant="static"
        label="Dish Type"
        className={`border-b text-blue-gray-700 dark:text-white ${dishTypeError ? "border-red-500" : "border-primaryDark dark:border-primary"}`}
        labelProps={{ className: "!text-primaryDark dark:!text-white" }}
        menuProps={{ className: "dark:!text-white dark:!bg-primaryDark" }}
      >
        {options.dish_types.length ? (
          options.dish_types.map((dish, index) => (
            <Option key={index} value={dish} className="capitalize">
              {capitalizeWords(dish) || "Unknown dish"}
            </Option>
          ))
        ) : (
          <Option value="">No dish available</Option>
        )}
      </Select>
      {dishTypeError && (
        <Typography
          variant="caption"
          className="mt-2 text-xs !font-extralight capitalize text-red-500"
        >
          <strong className="inline-block text-base text-red-500">* </strong>
          Please select at least one dish type.
        </Typography>
      )}
      <div className="mt-2 flex flex-wrap gap-3">
        {formData.dish_types.map((dishType, index) => (
          <FilterChip
            key={`selected-dish-type-${index}`}
            value={dishType}
            handle={() => handleRemoveDishType(dishType)}
          />
        ))}
      </div>
    </div>
  );
};

DishTypes.propTypes = {
  options: PropTypes.shape({
    dish_types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    dish_types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  dishTypeError: PropTypes.bool.isRequired,
  setDishTypeError: PropTypes.func.isRequired,
};

export default DishTypes;
