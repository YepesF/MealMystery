import React from "react";
import PropTypes from "prop-types";
import { Option, Select } from "@material-tailwind/react";
import FilterChip from "../../../components/FilterChip";
import Typography from "../../../components/Typography";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const Diets = ({
  options,
  formData,
  setFormData,
  dietError,
  inputError,
  setDietError,
}) => {
  const handleSelectChange = (e) => {
    setFormData((prevFormData) => {
      if (!prevFormData.diets.includes(e)) {
        setDietError(false);
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
    if (formData.diets.length === 1) {
      setDietError(false);
    }
  };

  return (
    <div className="h-full w-full">
      <Select
        onChange={handleSelectChange}
        variant="static"
        label="Diets"
        className={`border-b text-blue-gray-700 placeholder-shown:border-blue-gray-200 dark:text-white dark:placeholder-shown:border-white ${inputError ? "border-red-500" : ""}`}
        style={{ borderColor: inputError ? "red" : "" }}
        labelProps={{ className: "dark:!text-white" }}
        menuProps={{ className: "dark:!text-white dark:!bg-primaryDark" }}
      >
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
      {!dietError && (
        <div className="mt-5 flex flex-wrap gap-3">
          {formData.diets.map((diet, index) => (
            <FilterChip
              key={`selected-diet-${index}`}
              value={diet}
              handle={() => handleRemoveDiet(diet)}
            />
          ))}
        </div>
      )}
      {dietError && (
        <Typography
          variant="caption"
          className="mt-20 text-xs !font-extralight capitalize text-red-500"
        >
          <strong className="inline-block text-base text-red-500">* </strong>
          At least one diet must be selected
        </Typography>
      )}
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
  dietError: PropTypes.bool.isRequired,
  inputError: PropTypes.bool.isRequired,
  setDietError: PropTypes.func.isRequired,
};

export default Diets;
