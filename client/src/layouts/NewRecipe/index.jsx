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
import { Stepper, Step, Button, Spinner } from "@material-tailwind/react";
import Step1 from "./components/StepsForm/Step1";
import { isValidUrl } from "../../utils/validations";
import Step2 from "./components/StepsForm/Step2";
import AlertSuccess from "./components/Alerts/Alert";
import { useTranslation } from "react-i18next";

const NewRecipe = () => {
  const { t } = useTranslation();
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
  const [inputError, setInputError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [successMessage, setSuccessMessage] = useState(
    t("NewRecipe.successMessage"),
  );
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
        console.error(t("NewRecipe.errorFetchingOptions"), error);
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
      const { id } = await newRecipe(formData);
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
      setActiveStep(0);
      setAlertType("success");
      setAlertOpen(true);
      setTimeout(() => {
        navigate(`/recipe/${id}`);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setAlertType("error");
      setAlertOpen(true);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      {loading ? (
        <Spinner color="red" className="h-16 w-16 text-accent" />
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-10 px-2 py-4 hd:px-8">
          <Stepper
            className="hd:w-[50vw]"
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
            lineClassName="bg-accent/30"
            activeLineClassName="bg-accent"
          >
            <Step
              className="h-4 w-4 cursor-pointer !bg-accent/50 text-white/75"
              activeClassName="ring-0 !bg-accent text-white"
              completedClassName="!bg-accent text-white"
            />
            <Step
              className="h-4 w-4 cursor-pointer !bg-accent/50 text-white/75"
              activeClassName="ring-0 !bg-accent text-white"
              completedClassName="!bg-accent text-white"
            />
          </Stepper>
          <div className="flex w-full justify-center">
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
      <AlertSuccess
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertType === "success" ? successMessage : error}
        type={alertType}
      />
    </PageLayout>
  );
};

export default NewRecipe;
