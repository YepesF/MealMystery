import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const DishTypes = ({ options, formData, setFormData }) => {
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
  };

  const handleRemoveDishType = (dishType) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dish_types: prevFormData.dish_types.filter((d) => d !== dishType),
    }));
  };

  return (
    <div className="w-full h-full">
      <Select onChange={handleSelectChange} variant="static" label="Dish Type">
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
      <div className="flex flex-wrap gap-3 mt-2">
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
};

export default DishTypes;
