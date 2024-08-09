import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../components/Typography";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const Equipment = ({
  options,
  formData,
  setFormData,
  equipmentError,
  setEquipmentError,
}) => {
  const handleSelectChange = (e) => {
    const selectedEquipmentId = parseInt(e, 10);
    const selectedEquipment = options.equipment.find(
      (item) => item.id === selectedEquipmentId,
    );

    if (
      selectedEquipment &&
      !formData.equipment.some((item) => item.id === selectedEquipment.id)
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        equipment: [...prevFormData.equipment, selectedEquipment],
      }));
      if (equipmentError) {
        setEquipmentError(false);
      }
    }
  };

  const handleRemoveEquipment = (equipmentId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      equipment: prevFormData.equipment.filter((e) => e.id !== equipmentId),
    }));
  };

  return (
    <div className="h-full w-full">
      <Select
        onChange={handleSelectChange}
        variant="static"
        label="Equipment"
        className={`border-b ${equipmentError ? "border-red-500" : ""}`}
        labelProps={{ className: "dark:!text-white" }}
        menuProps={{ className: "dark:!text-white dark:!bg-primaryDark" }}
      >
        {options.equipment.length ? (
          options.equipment.map((equipment, index) => (
            <Option
              key={index}
              value={`${equipment.id}`}
              className="capitalize"
            >
              {capitalizeWords(equipment.name) || "Unknown equipment"}
            </Option>
          ))
        ) : (
          <Option value="">No equipment available</Option>
        )}
      </Select>
      {equipmentError && (
        <Typography
          variant="caption"
          className="mt-2 text-xs !font-extralight capitalize text-red-500"
        >
          <strong className="inline-block text-base text-red-500">* </strong>
          Please select at least one piece of equipment.
        </Typography>
      )}
      <div className="mt-2 flex flex-wrap gap-3">
        {formData.equipment.map((item) => (
          <FilterChip
            key={`selected-equipment-${item.id}`}
            value={item.name || "Unknown Equipment"}
            handle={() => handleRemoveEquipment(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

Equipment.propTypes = {
  options: PropTypes.shape({
    equipment: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    equipment: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  equipmentError: PropTypes.bool.isRequired,
  setEquipmentError: PropTypes.func.isRequired,
};

export default Equipment;
