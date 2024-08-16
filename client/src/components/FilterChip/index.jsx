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
      className="w-auto bg-accent text-[10px] text-primary md:text-base"
      open={open}
      value={value}
      onClose={handleClose}
    />
  );
};

export default FilterChip;
