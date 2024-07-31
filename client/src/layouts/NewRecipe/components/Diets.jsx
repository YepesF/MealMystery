import React from "react";
import Badge from "../components/Badge";

const Diets = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (!prevFormData.diets.includes(value)) {
        return { ...prevFormData, diets: [...prevFormData.diets, value] };
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
    <div>
      <label className="block text-sm font-medium text-gray-700">Diets</label>
      <select
        onChange={handleSelectChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
      >
        <option value="">Select a diet</option>
        {options.diets.map((diet, index) => (
          <option key={`diet-${index}`} value={diet}>
            {diet}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap mt-2">
        {formData.diets.map((diet, index) => (
          <Badge
            key={`selected-diet-${index}`}
            text={diet}
            onRemove={() => handleRemoveDiet(diet)}
          />
        ))}
      </div>
    </div>
  );
};

export default Diets;
