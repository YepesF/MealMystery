import React from "react";
import Typography from "../../../components/Typography";

const NavDetails = ({ recipeTitle }) => {
  return (
    <div className="px-4 border-b sticky bg-primary top-12 z-10">
      <div className="flex justify-start items-center gap-3 p-3">
        <Typography
          variant="h2"
          className="w-full max-w-[40%] text-xl font-bold capitalize"
        >
          {recipeTitle}
        </Typography>
        <div className="w-full flex justify-start items-center p-3">
          <Typography
            variant="h2"
            className="text-md !font-extralight capitalize"
          >
            Equipament
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default NavDetails;
