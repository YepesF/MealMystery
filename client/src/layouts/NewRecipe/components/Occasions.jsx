import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import Typography from "../../../components/Typography";

const Occasions = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData.occasions.includes(value)) {
        return {
          ...prevFormData,
          occasions: [...prevFormData.occasions, value],
        };
      }
      return prevFormData;
    });
  };

  const handleRemoveOccasion = (occasion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      occasions: prevFormData.occasions.filter((o) => o !== occasion),
    }));
  };

  return (
    <div>
      <Typography
        variant="body2"
        className="block text-sm font-medium text-gray-700"
      >
        Occasions
      </Typography>
      <select
        onChange={handleSelectChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
      >
        <option value="">Select an occasion</option>
        {options.occasions.map((occasion, index) => (
          <option key={`occasion-${index}`} value={occasion}>
            {occasion}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap mt-2">
        {formData.occasions.map((occasion, index) => (
          <FilterChip
            key={`selected-occasion-${index}`}
            value={occasion}
            handle={() => handleRemoveOccasion(occasion)}
          />
        ))}
      </div>
    </div>
  );
};

Occasions.propTypes = {
  options: PropTypes.shape({
    occasions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    occasions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Occasions;
