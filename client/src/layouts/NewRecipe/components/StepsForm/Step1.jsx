import React, { useState } from "react";
import { Card, CardBody, Input, Textarea } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import Diets from "../Diets";
import { useTranslation } from "react-i18next";

const Step1 = ({
  handleNext,
  handleChange,
  formData,
  inputError,
  options,
  setFormData,
}) => {
  const [dietError, setDietError] = useState(false);
  const { t } = useTranslation();

  const onNext = (e) => {
    e.preventDefault();
    if (formData.diets.length === 0) {
      setDietError(true);
      return;
    }
    setDietError(false);
    handleNext();
  };

  return (
    <Card className="mt-6 w-full dark:bg-primaryDark dark:text-primary hd:mt-2 hd:w-[60vw] fhd:w-[70vw]">
      <CardBody className="flex flex-col gap-16 hd:gap-10">
        <Typography
          variant="h2"
          className="text-xl font-bold capitalize text-primaryDark fhd:text-2xl"
        >
          {t("Step1.newRecipe")}
        </Typography>
        <form onSubmit={onNext}>
          <div className="flex flex-col gap-10">
            <div className="flex h-full flex-col items-start justify-center gap-10 hd:flex-row">
              <Input
                className="text-blue-gray-700 placeholder-shown:border-primaryDark dark:text-white dark:placeholder-shown:border-white"
                labelProps={{ className: "!text-primaryDark dark:!text-white" }}
                variant="static"
                label={t("Step1.title")}
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <div className="h-full w-full">
                <Input
                  className="text-blue-gray-700 placeholder-shown:border-primaryDark dark:text-white dark:placeholder-shown:border-white"
                  labelProps={{
                    className: "!text-primaryDark dark:!text-white",
                  }}
                  variant="static"
                  label={t("Step1.imageURL")}
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  error={inputError}
                />
                {inputError && (
                  <Typography
                    variant="caption"
                    className="mt-2 text-xs !font-extralight capitalize text-red-500"
                  >
                    <strong className="inline-block text-base text-red-500">
                      *
                    </strong>{" "}
                    {t("Step1.invalidURL")}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex h-full flex-col items-start justify-center gap-10 hd:flex-row">
              <Input
                className="text-blue-gray-700 placeholder-shown:border-primaryDark dark:text-white dark:placeholder-shown:border-white"
                labelProps={{ className: "!text-primaryDark dark:!text-white" }}
                variant="static"
                label={t("Step1.readyInMinutes")}
                name="ready_in_minutes"
                type="number"
                value={formData.ready_in_minutes}
                onChange={handleChange}
                required
              />
              <Input
                className="text-blue-gray-700 placeholder-shown:border-primaryDark dark:text-white dark:placeholder-shown:border-white"
                labelProps={{ className: "!text-primaryDark dark:!text-white" }}
                variant="static"
                label={t("Step1.priceServing")}
                name="price_serving"
                type="number"
                value={formData.price_serving}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex h-full flex-col items-start justify-center gap-10 hd:flex-row">
              <Textarea
                className="text-blue-gray-700 placeholder-shown:border-primaryDark dark:text-white dark:placeholder-shown:border-white"
                labelProps={{ className: "!text-primaryDark dark:!text-white" }}
                variant="static"
                label={t("Step1.summary")}
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={3}
                required
              />
              <Diets
                options={options}
                formData={formData}
                setFormData={setFormData}
                dietError={dietError}
                inputError={dietError}
                setDietError={setDietError}
              />
            </div>
          </div>
          <div className="flex justify-end pt-16">
            <Button
              className="!w-32 dark:text-accent"
              type="submit"
              disabled={inputError || dietError}
            >
              {t("Step1.next")}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

Step1.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    ready_in_minutes: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    price_serving: PropTypes.string.isRequired,
    diets: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  inputError: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    diets: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Step1;
