import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import Typography from "../../../components/Typography";

const Equipment = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const selectedEquipmentId = parseInt(e.target.value, 10);
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
    <div>
      <Typography
        variant="body2"
        className="block text-sm font-medium text-gray-700"
      >
        Equipment
      </Typography>
      <select
        onChange={handleSelectChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        aria-label="Select equipment"
      >
        <option value="">Select equipment</option>
        {options.equipment.length ? (
          options.equipment.map((item) => (
            <option key={`equipment-${item.id}`} value={item.id}>
              {item.name || "Unknown Equipment"}
            </option>
          ))
        ) : (
          <option value="">No equipment available</option>
        )}
      </select>
      <div className="flex flex-wrap mt-2">
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
