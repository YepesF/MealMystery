import { Card, CardBody } from "@material-tailwind/react";
import React from "react";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import StepsInput from "../Steps";
import Equipment from "../Equipment";
import Ingredients from "../Ingredients";
import DishTypes from "../DishTypes";
import Occasions from "../Occasions";

const Step2 = ({
  handlePrev,
  formData,
  options,
  setFormData,
  formatOptions,
  handleSubmit,
}) => {
  return (
    <Card className="mt-6 w-[70vw]">
      <CardBody className="flex flex-col gap-16">
        <Typography variant="h2" className="text-2xl font-bold capitalize">
          New Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <div className="flex justify-center items-center gap-10">
              <StepsInput
                steps={formData.steps}
                setSteps={(steps) => setFormData({ ...formData, steps })}
              />
            </div>
            <div className="flex justify-center items-start gap-10">
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
            </div>
            <div className="flex justify-center items-start gap-10">
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
            </div>
          </div>
          <div className="pt-16 flex justify-between">
            <Button className="!w-32" type="submit" onClick={handlePrev}>
              Back
            </Button>
            <Button className="!w-32" type="submit">
              Create
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Step2;
