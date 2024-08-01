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
import { Stepper, Step } from "@material-tailwind/react";
import Step1 from "./components/StepsForm/Step1";
import { isValidUrl } from "../../utils/validations";
import Step2 from "./components/StepsForm/Step2";

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
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

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
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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
    if (name === "image") {
      !isValidUrl(value) && setInputError(true);
      !value && setInputError(false);
    }
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
      {!loading && (
        <div className="w-full py-4 px-8 flex flex-col justify-center items-center gap-10">
          <Stepper
            className="w-[50vw]"
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
            lineClassName="bg-accent/30"
            activeLineClassName="bg-accent"
          >
            <Step
              className="h-4 w-4 !bg-accent/50 text-white/75 cursor-pointer"
              activeClassName="ring-0 !bg-accent text-white"
              completedClassName="!bg-accent text-white"
            />
            <Step
              className="h-4 w-4 !bg-accent/50 text-white/75 cursor-pointer"
              activeClassName="ring-0 !bg-accent text-white"
              completedClassName="!bg-accent text-white"
            />
          </Stepper>
          <div className="flex justify-center">
            {activeStep === 0 && (
              <Step1
                handleNext={handleNext}
                handleChange={handleChange}
                formData={formData}
                inputError={inputError}
                options={options}
                setFormData={setFormData}
              />
            )}
            {activeStep === 1 && (
              <Step2
                handlePrev={handlePrev}
                handleChange={handleChange}
                formData={formData}
                inputError={inputError}
                options={options}
                setFormData={setFormData}
                formatOptions={formatOptions}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
      </div>
    </PageLayout>
  );
};

export default NewRecipe;
