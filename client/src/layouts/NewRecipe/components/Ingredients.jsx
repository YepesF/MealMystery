import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import Typography from "../../../components/Typography";

const Ingredients = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const selectedIngredientId = parseInt(e.target.value, 10);
    const selectedIngredient = options.ingredients.find(
      (ingredient) => ingredient.id === selectedIngredientId
    );

    if (
      selectedIngredient &&
      !formData.ingredients.some(
        (ingredient) => ingredient.id === selectedIngredient.id
      )
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredients: [...prevFormData.ingredients, selectedIngredient],
      }));
    }
  };

  const handleRemoveIngredient = (ingredientId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.filter(
        (i) => i.id !== ingredientId
      ),
    }));
  };

  return (
    <div>
      <Typography
        variant="body2"
        className="block text-sm font-medium text-gray-700"
      >
        Ingredients
      </Typography>
      <select
        onChange={handleSelectChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        aria-label="Select ingredient"
      >
        <option value="">Select an ingredient</option>
        {options.ingredients.length ? (
          options.ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name || "Unknown Ingredient"}
            </option>
          ))
        ) : (
          <option value="">No ingredients available</option>
        )}
      </select>
      <div className="flex flex-wrap mt-2">
        {formData.ingredients.map((ingredient) => (
          <FilterChip
            key={`selected-ingredient-${ingredient.id}`}
            value={ingredient.name || "Unknown Ingredient"}
            handle={() => handleRemoveIngredient(ingredient.id)}
          />
        ))}
      </div>
    </div>
  );
};

Ingredients.propTypes = {
  options: PropTypes.shape({
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Ingredients;
