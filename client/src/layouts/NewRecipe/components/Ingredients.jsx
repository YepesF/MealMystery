import React from "react";
import PropTypes from "prop-types";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const Ingredients = ({ options, formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const selectedIngredientId = parseInt(e, 10);
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
    <div className="w-full h-full">
      <Select onChange={handleSelectChange} variant="static" label="Ingredient">
        {options.ingredients.length ? (
          options.ingredients.map((ingredient, index) => (
            <Option
              key={index}
              value={`${ingredient.id}`}
              className="capitalize"
            >
              {capitalizeWords(ingredient.name) || "Unknown Ingredient"}
            </Option>
          ))
        ) : (
          <Option value="">No ingredients available</Option>
        )}
      </Select>
      <div className="flex flex-wrap gap-3 mt-2">
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
