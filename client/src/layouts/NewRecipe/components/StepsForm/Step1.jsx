import React, { useState } from "react";
import { Card, CardBody, Input, Textarea } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import Diets from "../Diets";

const Step1 = ({
  handleNext,
  handleChange,
  formData,
  inputError,
  options,
  setFormData,
}) => {
  const [dietError, setDietError] = useState(false);

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
    <Card className="mt-6 w-[70vw]">
      <CardBody className="flex flex-col gap-16">
        <Typography variant="h2" className="text-2xl font-bold capitalize">
          New Recipe
        </Typography>
        <form onSubmit={onNext}>
          <div className="flex flex-col gap-10">
            <div className="h-full flex justify-center items-start gap-10">
              <Input
                variant="static"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <div className="w-full h-full">
                <Input
                  variant="static"
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  error={inputError}
                />
                {inputError && (
                  <Typography
                    variant="caption"
                    className="text-xs !font-extralight capitalize mt-2 text-red-500"
                  >
                    <strong className="inline-block text-red-500 text-base">
                      *
                    </strong>{" "}
                    invalid URL
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center gap-10">
              <Input
                variant="static"
                label="Ready in Minutes"
                name="ready_in_minutes"
                type="number"
                value={formData.ready_in_minutes}
                onChange={handleChange}
                required
              />
              <Input
                variant="static"
                label="Price Serving"
                name="price_serving"
                type="number"
                value={formData.price_serving}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-center items-start gap-10">
              <Textarea
                variant="static"
                label="Summary"
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
          <div className="pt-16 flex justify-end">
            <Button
              className="!w-32"
              type="submit"
              disabled={inputError || dietError}
            >
              Next
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
