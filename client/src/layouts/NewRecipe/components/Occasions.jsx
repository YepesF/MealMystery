import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../components/Typography";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";
import { useTranslation } from "react-i18next";

const Occasions = ({
  options,
  formData,
  setFormData,
  occasionError,
  setOccasionError,
}) => {
  const { t } = useTranslation();
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
    <div className="h-full w-full">
      <Select
        onChange={handleSelectChange}
        variant="static"
        label={t("occasions.label")}
        className={`border-b text-blue-gray-700 dark:text-white ${occasionError ? "border-red-500" : "border-primaryDark dark:border-primary"}`}
        labelProps={{ className: "!text-primaryDark dark:!text-white" }}
        menuProps={{ className: "dark:!text-white dark:!bg-primaryDark" }}
      >
        {options.occasions.length ? (
          options.occasions.map((occasion, index) => (
            <Option key={index} value={occasion} className="capitalize">
              {capitalizeWords(t(`occasions.${occasion}`)) ||
                t("occasions.unknown")}
            </Option>
          ))
        ) : (
          <Option value="">{t("occasions.noAvailable")}</Option>
        )}
      </Select>
      {occasionError && (
        <Typography
          variant="caption"
          className="mt-2 text-xs !font-extralight capitalize text-red-500"
        >
          <strong className="inline-block text-base text-red-500">* </strong>
          {t("occasions.error")}
        </Typography>
      )}
      <div className="mt-2 flex flex-wrap gap-3">
        {formData.occasions.map((occasion, index) => (
          <FilterChip
            key={`selected-occasion-${index}`}
            value={t(`occasions.${occasion}`)}
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
