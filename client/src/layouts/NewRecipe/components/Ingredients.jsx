import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../components/Typography";
import FilterChip from "../../../components/FilterChip";
import { Option, Select } from "@material-tailwind/react";
import { capitalizeWords } from "../../../utils/capitalizeWords";

const Ingredients = ({
  options,
  formData,
  setFormData,
  ingredientError,
  setIngredientError,
}) => {
  const handleSelectChange = (e) => {
    const selectedIngredientId = parseInt(e, 10);
    const selectedIngredient = options.ingredients.find(
      (ingredient) => ingredient.id === selectedIngredientId,
    );

    if (
      selectedIngredient &&
      !formData.ingredients.some(
        (ingredient) => ingredient.id === selectedIngredient.id,
      )
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredients: [...prevFormData.ingredients, selectedIngredient],
      }));
      if (ingredientError) {
        setIngredientError(false);
      }
    }
  };

  const handleRemoveIngredient = (ingredientId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.filter(
        (i) => i.id !== ingredientId,
      ),
    }));
  };

  return (
    <div className="h-full w-full">
      <Select
        onChange={handleSelectChange}
        variant="static"
        label="Ingredient"
        className={`border-b text-blue-gray-700 dark:text-white ${ingredientError ? "border-red-500" : "border-primaryDark dark:border-primary"}`}
        labelProps={{ className: "!text-primaryDark dark:!text-white" }}
        menuProps={{ className: "dark:!text-white dark:!bg-primaryDark" }}
      >
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
      {ingredientError && (
        <Typography
          variant="caption"
          className="mt-2 text-xs !font-extralight capitalize text-red-500"
        >
          <strong className="inline-block text-base text-red-500">* </strong>
          Please select at least one ingredient.
        </Typography>
      )}
      <div className="mt-2 flex flex-wrap gap-3">
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
      }),
    ).isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  ingredientError: PropTypes.bool.isRequired,
  setIngredientError: PropTypes.func.isRequired,
};

export default Ingredients;
