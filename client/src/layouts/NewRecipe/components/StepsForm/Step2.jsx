import { Card, CardBody } from "@material-tailwind/react";
import React, { useState } from "react";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import StepsInput from "../Steps";
import Equipment from "../Equipment";
import Ingredients from "../Ingredients";
import DishTypes from "../DishTypes";
import Occasions from "../Occasions";
import { useTranslation } from "react-i18next";

const Step2 = ({
  handlePrev,
  formData,
  options,
  setFormData,
  formatOptions,
  handleSubmit,
}) => {
  const [dishTypeError, setDishTypeError] = useState(false);
  const [ingredientError, setIngredientError] = useState(false);
  const [equipmentError, setEquipmentError] = useState(false);
  const [occasionError, setOccasionError] = useState(false);
  const [stepsError, setStepsError] = useState(false);
  const { t } = useTranslation();

  const handleCreate = (e) => {
    e.preventDefault();

    if (formData.dish_types.length === 0) {
      setDishTypeError(true);
    } else {
      setDishTypeError(false);
    }

    if (formData.ingredients.length === 0) {
      setIngredientError(true);
    } else {
      setIngredientError(false);
    }

    if (formData.equipment.length === 0) {
      setEquipmentError(true);
    } else {
      setEquipmentError(false);
    }

    if (formData.occasions.length === 0) {
      setOccasionError(true);
    } else {
      setOccasionError(false);
    }

    if (formData.steps.length < 3) {
      setStepsError(true);
    } else {
      setStepsError(false);
    }

    if (
      formData.dish_types.length > 0 &&
      formData.ingredients.length > 0 &&
      formData.equipment.length > 0 &&
      formData.occasions.length > 0 &&
      formData.steps.length >= 3
    ) {
      handleSubmit(e);
    }
  };

  return (
    <Card className="mt-6 w-full dark:bg-primaryDark dark:text-primary hd:mt-2 hd:w-[60vw] fhd:w-[70vw]">
      <CardBody className="flex flex-col gap-16 hd:gap-10">
        <Typography
          variant="h2"
          className="text-xl font-bold capitalize fhd:text-2xl"
        >
          {t("Step2.newRecipe")}
        </Typography>
        <form>
          <div className="flex flex-col gap-10 hd:gap-6">
            <div className="flex items-center justify-center gap-10 hd:gap-6">
              <StepsInput
                steps={formData.steps}
                setSteps={(steps) => setFormData({ ...formData, steps })}
                stepsError={stepsError}
                setStepsError={setStepsError}
              />
            </div>
            <div className="flex h-full flex-col items-start justify-center gap-10 hd:flex-row hd:gap-6">
              <Equipment
                options={formatOptions(options)}
                formData={formData}
                setFormData={setFormData}
                equipmentError={equipmentError}
                setEquipmentError={setEquipmentError}
              />
              <Ingredients
                options={formatOptions(options)}
                formData={formData}
                setFormData={setFormData}
                ingredientError={ingredientError}
                setIngredientError={setIngredientError}
              />
            </div>
            <div className="flex h-full flex-col items-start justify-center gap-10 hd:flex-row hd:gap-6">
              <DishTypes
                options={options}
                formData={formData}
                setFormData={setFormData}
                dishTypeError={dishTypeError}
                setDishTypeError={setDishTypeError}
              />
              <Occasions
                options={options}
                formData={formData}
                setFormData={setFormData}
                occasionError={occasionError}
                setOccasionError={setOccasionError}
              />
            </div>
          </div>
          <div className="flex justify-between pt-16 hd:pt-8">
            <Button className="!w-32" type="button" onClick={handlePrev}>
              {t("Step2.back")}
            </Button>
            <Button className="!w-32" type="button" onClick={handleCreate}>
              {t("Step2.create")}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Step2;
