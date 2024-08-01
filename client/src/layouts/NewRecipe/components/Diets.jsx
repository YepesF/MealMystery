import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const Diets = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    setFormData((prevFormData) => {
      if (!prevFormData.diets.includes(e)) {
        return { ...prevFormData, diets: [...prevFormData.diets, e] };
      }
      return prevFormData;
    });
  };

  const handleRemoveDiet = (diet) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      diets: prevFormData.diets.filter((d) => d !== diet),
    }));
  };

  return (
    <div className="w-full h-full">
      <Select onChange={handleSelectChange} variant="static" label="Diets">
        {options.diets.length ? (
          options.diets.map((diet, index) => (
            <Option key={index} value={diet} className="capitalize">
              {capitalizeWords(diet) || "Unknown diet"}
            </Option>
          ))
        ) : (
          <Option value="">No diets available</Option>
        )}
      </Select>
      <div className="flex flex-wrap gap-3 mt-5">
        {formData.diets.map((diet, index) => (
          <FilterChip
            key={`selected-diet-${index}`}
            value={diet}
            handle={() => handleRemoveDiet(diet)}
          />
        ))}
      </div>
    </div>
  );
};

Diets.propTypes = {
  options: PropTypes.shape({
    diets: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    diets: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Diets;
