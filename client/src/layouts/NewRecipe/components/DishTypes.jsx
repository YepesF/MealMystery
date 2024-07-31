import React from "react";
import Badge from "../components/Badge";

const DishTypes = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData.dish_types.includes(value)) {
        return { ...prevFormData, dish_types: [...prevFormData.dish_types, value] };
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
      <label className="block text-sm font-medium text-gray-700">Dish Types</label>
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
          <Badge
            key={`selected-dish-type-${index}`}
            text={dishType}
            onRemove={() => handleRemoveDishType(dishType)}
          />
        ))}
      </div>
    </div>
  );
};

export default DishTypes;
