import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  newRecipe, getDiets, getAllDishTypes, getAllOccasions
} from "../../api/recepies";
import PageLayout from "../PageLayout";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import Diets from "../NewRecipe/components/Diets";
import DishTypes from "../NewRecipe/components/DishTypes";
import Occasions from "../NewRecipe/components/Occasions";
import Input from "../../components/Input"; 

const NewRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    ready_in_minutes: '',
    image: '',
    summary: '',
    price_serving: '',
    diets: [],
    dish_types: [],
    occasions: [],
    steps: [],
    equipment: [],
    ingredients: []
  });

  const [options, setOptions] = useState({
    diets: [],
    dish_types: [],
    occasions: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [diets, dish_types, occasions] = await Promise.all([
          getDiets(),
          getAllDishTypes(),
          getAllOccasions(),
        ]);

        setOptions({ diets, dish_types, occasions });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await newRecipe(formData);
      navigate("");
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
        {error && <div className="text-red-500">{error}</div>}
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
          
          <Input
            label="Summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Price Serving"
            name="price_serving"
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
          
          <Input
            label="Steps"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
          
          {error && (
            <Typography variant="body2" className="text-red-500 mb-4">
              {error}
            </Typography>
          )}
          
          <Button type="submit" variant="primary" size="large" disabled={loading}>
            {loading ? "Creando..." : "Crear Receta"}
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default NewRecipe;
