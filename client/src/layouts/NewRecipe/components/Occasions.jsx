import React from "react";
import Badge from "../components/Badge";

const Occasions = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData.occasions.includes(value)) {
        return { ...prevFormData, occasions: [...prevFormData.occasions, value] };
      }
      return prevFormData;
    });
  };

  const handleRemoveOccasion = (occasion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      occasions: prevFormData.occasions.filter((d) => d !== occasion),
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Occasions</label>
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
          <Badge
            key={`selected-occasion-${index}`}
            text={occasion}
            onRemove={() => handleRemoveOccasion(occasion)}
          />
        ))}
      </div>
    </div>
  );
};

export default Occasions;
