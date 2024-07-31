import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  newRecipe,
  getDiets,
  getAllDishTypes,
  getAllOccasions,
  getAllEquipment,
  getAllIngredients,
} from "../../api/recepies";
import PageLayout from "../PageLayout";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import Diets from "../NewRecipe/components/Diets";
import DishTypes from "../NewRecipe/components/DishTypes";
import Occasions from "../NewRecipe/components/Occasions";
import StepsInput from "../NewRecipe/components/Steps";
import Equipment from "../NewRecipe/components/Equipment";
import Ingredients from "../NewRecipe/components/Ingredients";
import Input from "../../components/Input";

const NewRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ready_in_minutes: "",
    image: "",
    summary: "",
    price_serving: "",
    diets: [],
    dish_types: [],
    occasions: [],
    steps: [],
    equipment: [],
    ingredients: [],
  });

  const [options, setOptions] = useState({
    diets: [],
    dish_types: [],
    occasions: [],
    equipment: [],
    ingredients: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [diets, dish_types, occasions, equipment, ingredients] =
          await Promise.all([
            getDiets(),
            getAllDishTypes(),
            getAllOccasions(),
            getAllEquipment(),
            getAllIngredients(),
          ]);

        setOptions({ diets, dish_types, occasions, equipment, ingredients });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const formatOptions = (options) => ({
    ingredients: options.ingredients.map((ingredient) => ({
      ...ingredient,
      id: Number(ingredient.id),
    })),
    equipment: options.equipment.map((item) => ({
      ...item,
      id: Number(item.id),
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      await newRecipe(formData);
      setFormData({
        title: "",
        ready_in_minutes: "",
        image: "",
        summary: "",
        price_serving: "",
        diets: [],
        dish_types: [],
        occasions: [],
        steps: [],
        equipment: [],
        ingredients: [],
      });
      setSuccessMessage("Recipe created successfully!");
      setTimeout(() => {
        navigate("");
      }, 2000); // Redirige después de 2 segundos para mostrar el mensaje
    } catch (error) {
      console.error("Error creating new recipe:", error);
      setError("Failed to create the recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <Typography variant="h2" className="text-4xl font-bold capitalize mb-4">
          New Recipe
        </Typography>
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Input
            label="Ready in Minutes"
            name="ready_in_minutes"
            type="number"
            value={formData.ready_in_minutes}
            onChange={handleChange}
            required
          />

          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Summary
            </label>
            <textarea
              label="Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={5}
              className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            />
          </div>

          <Input
            label="Price Serving"
            name="price_serving"
            type="number"
            value={formData.price_serving}
            onChange={handleChange}
            required
          />

          <Diets
            options={options}
            formData={formData}
            setFormData={setFormData}
          />

          <DishTypes
            options={options}
            formData={formData}
            setFormData={setFormData}
          />
          <Occasions
            options={options}
            formData={formData}
            setFormData={setFormData}
          />

          <StepsInput
            steps={formData.steps}
            setSteps={(steps) => setFormData({ ...formData, steps })}
          />

          <Equipment
            options={formatOptions(options)}
            formData={formData}
            setFormData={setFormData}
          />
          <Ingredients
            options={formatOptions(options)}
            formData={formData}
            setFormData={setFormData}
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Recipe"}
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default NewRecipe;
