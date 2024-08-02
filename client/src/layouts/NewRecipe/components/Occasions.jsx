import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../components/Typography";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const Occasions = ({
  options,
  formData,
  setFormData,
  occasionError,
  setOccasionError,
}) => {
  const handleSelectChange = (e) => {
    setFormData((prevFormData) => {
      if (!prevFormData.occasions.includes(e)) {
        return {
          ...prevFormData,
          occasions: [...prevFormData.occasions, e],
        };
      }
      return prevFormData;
    });
    if (occasionError) {
      setOccasionError(false);
    }
  };

  const handleRemoveOccasion = (occasion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      occasions: prevFormData.occasions.filter((o) => o !== occasion),
    }));
  };

  return (
    <div className="w-full h-full">
      <Select
        onChange={handleSelectChange}
        variant="static"
        label="Occasions"
        className={`border-b ${occasionError ? "border-red-500" : ""}`}
      >
        {options.occasions.length ? (
          options.occasions.map((occasion, index) => (
            <Option key={index} value={occasion} className="capitalize">
              {capitalizeWords(occasion) || "Unknown occasion"}
            </Option>
          ))
        ) : (
          <Option value="">No occasion available</Option>
        )}
      </Select>
      {occasionError && (
        <Typography
          variant="caption"
          className="text-red-500 text-xs !font-extralight capitalize mt-2"
        >
          <strong className="inline-block text-red-500 text-base">* </strong>
          Please select at least one piece of occasion.
        </Typography>
      )}
      <div className="flex flex-wrap gap-3 mt-2">
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
  occasionError: PropTypes.bool.isRequired,
  setOccasionError: PropTypes.func.isRequired,
};

export default Occasions;
