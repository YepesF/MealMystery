import React, { useEffect, useState } from "react";
import Typography from "../../../components/Typography";

const NavDetails = ({ recipeTitle, activeSection }) => {
  const handleScrollToSection = (id) => {
    const navbarHeight = document.querySelector("#navDetail").offsetHeight;
    const topNavbarHeight = document.querySelector("#navbar").offsetHeight;
    const totalNavbarHeight = topNavbarHeight + navbarHeight + 5;
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - totalNavbarHeight, // Adjust the position with navbar height
        behavior: "smooth",
      });
    }
  };
  return (
    <div id="navDetail" className="px-4 border-b sticky bg-primary top-12 z-10">
      <div className="flex justify-start items-center gap-3 p-3">
        <Typography
          variant="h2"
          className="w-full max-w-[40%] text-xl font-bold capitalize"
        >
          {recipeTitle}
        </Typography>
        <div className="w-full flex justify-start items-center gap-3 p-3">
          <div
            className="min-h-7"
            onClick={() => handleScrollToSection("instructions")}
          >
            <Typography
              variant="h2"
              className={`text-md !font-extralight capitalize ${activeSection === "instructions" ? "border-b-2" : ""} hover:border-b-2 border-accent cursor-pointer`}
            >
              Instructions
            </Typography>
          </div>
          <div
            className="min-h-7"
            onClick={() => handleScrollToSection("equipment")}
          >
            <Typography
              variant="h2"
              className={`text-md !font-extralight capitalize ${activeSection === "equipment" ? "border-b-2" : ""} hover:border-b-2 border-accent cursor-pointer`}
            >
              Equipment
            </Typography>
          </div>
          <div
            className="min-h-7"
            onClick={() => handleScrollToSection("ingredients")}
          >
            <Typography
              variant="h2"
              className={`text-md !font-extralight capitalize ${activeSection === "ingredients" ? "border-b-2" : ""} hover:border-b-2 border-accent cursor-pointer`}
            >
              Ingredients
            </Typography>
          </div>
          <div
            className="min-h-7"
            onClick={() => handleScrollToSection("recommend")}
          >
            <Typography
              variant="h2"
              className={`text-md !font-extralight capitalize ${activeSection === "recommend" ? "border-b-2" : ""} hover:border-b-2 border-accent cursor-pointer`}
            >
              Recommend
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDetails;
