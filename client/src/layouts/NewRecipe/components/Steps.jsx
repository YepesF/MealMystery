import React, { useState } from "react";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";

const StepsInput = ({ steps, setSteps }) => {
  const [step, setStep] = useState("");
  const [number, setNumber] = useState(steps.length + 1);
  const [editingIndex, setEditingIndex] = useState(null);

  const addStep = () => {
    const newStep = { step, number };
    setSteps([...steps, newStep]);
    setStep("");
    setNumber(number + 1);
  };

  const updateStep = () => {
    const updatedSteps = steps.map((s, index) =>
      index === editingIndex ? { ...s, step } : s
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
    setNumber(steps.length);
  };

  return (
    <div className="space-y-2">
      <Typography
        variant="body2"
        className="block text-sm font-medium text-gray-700"
      >
        {editingIndex !== null
          ? `Edit Step ${editingIndex + 1}`
          : `Step ${number}`}
      </Typography>
      <textarea
        value={step}
        onChange={(e) => setStep(e.target.value)}
        rows={3}
        className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
        placeholder="Enter the step instructions here"
      />
      <Button
        type="button"
        onClick={editingIndex !== null ? updateStep : addStep}
        variant="primary"
      >
        {editingIndex !== null ? "Update Step" : "Add Step"}
      </Button>
      <div className="mt-4 space-y-1">
        {steps.map((step, index) => (
          <div key={index} className="flex justify-between items-center">
            <Typography variant="body2">
              {step.number}. {step.step}
            </Typography>
            <div className="space-x-2">
              <Button
                type="button"
                onClick={() => handleEdit(index)}
                variant="secondary"
                size="small"
              >
                Edit
              </Button>
              <Button
                type="button"
                onClick={() => handleDelete(index)}
                variant="secondary"
                size="small"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsInput;
