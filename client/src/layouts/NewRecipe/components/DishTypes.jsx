import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import Typography from "../../../components/Typography";

const DishTypes = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData.dish_types.includes(value)) {
        return {
          ...prevFormData,
          dish_types: [...prevFormData.dish_types, value],
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
    <div>
      <Typography
        variant="body2"
        className="block text-sm font-medium text-gray-700"
      >
        Dish Types
      </Typography>
      <select
        onChange={handleSelectChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
      >
        <option value="">Select a dish type</option>
        {options.dish_types.map((dishType, index) => (
          <option key={`dish-type-${index}`} value={dishType}>
            {dishType}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap mt-2">
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
