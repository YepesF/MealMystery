import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const Equipment = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const selectedEquipmentId = parseInt(e, 10);
    const selectedEquipment = options.equipment.find(
      (item) => item.id === selectedEquipmentId
    );

    if (
      selectedEquipment &&
      !formData.equipment.some((item) => item.id === selectedEquipment.id)
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        equipment: [...prevFormData.equipment, selectedEquipment],
      }));
    }
  };

  const handleRemoveEquipment = (equipmentId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      equipment: prevFormData.equipment.filter((e) => e.id !== equipmentId),
    }));
  };

  return (
    <div className="w-full h-full">
      <Select onChange={handleSelectChange} variant="static" label="Equipment">
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
      <div className="flex flex-wrap gap-3 mt-2">
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
      })
    ).isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    equipment: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Equipment;
