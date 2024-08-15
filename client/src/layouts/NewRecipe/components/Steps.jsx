import React, { useState } from "react";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";
import { Textarea } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";

const StepsInput = ({ steps, setSteps, stepsError, setStepsError }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState("");
  const [number, setNumber] = useState(steps.length + 1);
  const [editingIndex, setEditingIndex] = useState(null);

  const addStep = () => {
    const newStep = { en: step, number };
    setSteps([...steps, newStep]);
    setStep("");
    setNumber(number + 1);
    if (steps.length + 1 >= 3) {
      setStepsError(false);
    }
  };

  const updateStep = () => {
    const updatedSteps = steps.map((s, index) =>
      index === editingIndex ? { ...s, step } : s,
    );
    setSteps(updatedSteps);
    setStep("");
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setStep(steps[index].step);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
    setNumber(updatedSteps.length + 1);
    if (updatedSteps.length < 3) {
      setStepsError(true);
    }
  };

  return (
    <div className="h-full w-full space-y-2">
      <div>
        <Textarea
          variant="static"
          label={
            editingIndex !== null
              ? `${t("StepsInput.editStep")} ${editingIndex + 1}`
              : `${t("StepsInput.step")} ${number}`
          }
          value={step}
          onChange={(e) => setStep(e.target.value)}
          rows={3}
          required={steps.length ? false : true}
          className={`${stepsError ? "!border-b !border-red-500" : ""} text-blue-gray-700 placeholder-shown:border-primaryDark dark:text-white dark:placeholder-shown:border-white`}
          labelProps={{ className: "!text-primaryDark dark:!text-white" }}
        />
        {stepsError && (
          <Typography
            variant="caption"
            className="mt-0 text-xs !font-extralight capitalize text-red-500"
          >
            <strong className="inline-block text-base text-red-500">* </strong>
            {t("StepsInput.error")}
          </Typography>
        )}
      </div>
      <Button
        type="button"
        onClick={editingIndex !== null ? updateStep : addStep}
        variant="primary"
      >
        {editingIndex !== null
          ? t("StepsInput.updateStep")
          : t("StepsInput.addStep")}
      </Button>
      <div className="mt-4 space-y-1">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex h-full w-full items-center justify-between"
          >
            <Typography
              className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-xs dark:text-primary hd:text-base"
              variant="body2"
            >
              {step.number}. {step.step}
            </Typography>
            <div className="flex items-center justify-center gap-2">
              <MdEdit
                className="cursor-pointer text-primaryDark hover:text-accent dark:text-primary dark:hover:text-accent"
                onClick={() => handleEdit(index)}
              />
              <MdDelete
                className="cursor-pointer text-primaryDark hover:text-accent dark:text-primary dark:hover:text-accent"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsInput;
