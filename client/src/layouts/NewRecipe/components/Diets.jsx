import React from "react";
import PropTypes from "prop-types";
import { Option, Select } from "@material-tailwind/react";
import FilterChip from "../../../components/FilterChip";
import Typography from "../../../components/Typography";
import { capitalizeWords } from "../../../utils/capitalizeWords";
import { useTranslation } from "react-i18next";

const Diets = ({
  options,
  formData,
  setFormData,
  dietError,
  inputError,
  setDietError,
}) => {
  const { t } = useTranslation();
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
        label={t("Diets.label")}
        className={`border-b text-blue-gray-700 dark:text-white ${inputError ? "border-red-500" : "border-primaryDark dark:border-primary"}`}
        labelProps={{ className: "!text-primaryDark dark:!text-white" }}
        menuProps={{ className: "dark:!text-white dark:!bg-primaryDark" }}
      >
        {options.diets.length ? (
          options.diets.map((diet, index) => (
            <Option key={index} value={diet} className="capitalize">
              {capitalizeWords(t(`dietsFilters.${diet}`)) || t("Diets.unknown")}
            </Option>
          ))
        ) : (
          <Option value="">{t("Diets.noOptions")}</Option>
        )}
      </Select>
      {!dietError && (
        <div className="mt-5 flex flex-wrap gap-3">
          {formData.diets.map((diet, index) => (
            <FilterChip
              key={`selected-diet-${index}`}
              value={t(`dietsFilters.${diet}`)}
              handle={() => handleRemoveDiet(t(`dietsFilters.${diet}`))}
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
          {t("Diets.error")}
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
