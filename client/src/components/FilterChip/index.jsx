import React, { useState } from "react";
import { Chip } from "@material-tailwind/react";

const FilterChip = ({ value, handle }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    handle();
  };
  return (
    <Chip
      size="sm"
      className="bg-secondary text-primary w-auto"
      open={open}
      value={value}
      onClose={handleClose}
    />
  );
};

export default FilterChip;
