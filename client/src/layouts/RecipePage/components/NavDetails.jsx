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
    <div
      id="navDetail"
      className="sticky top-12 z-10 flex flex-col items-center justify-start gap-3 border-b border-gray-400 bg-primary p-3 px-4 dark:border-primary dark:bg-primaryDark dark:text-primary hd:flex-row"
    >
      <Typography
        variant="h2"
        className="w-full text-center text-lg font-bold capitalize hd:max-w-[40%] hd:text-start hd:text-xl"
      >
        {recipeTitle}
      </Typography>
      <div className="flex w-full items-center justify-center gap-3 p-3 text-sm hd:justify-start hd:text-base">
        <div
          className="min-h-7"
          onClick={() => handleScrollToSection("instructions")}
        >
          <Typography
            variant="h2"
            className={`!font-extralight capitalize ${activeSection === "instructions" ? "border-b-2" : ""} cursor-pointer border-accent hover:border-b-2`}
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
            className={`!font-extralight capitalize ${activeSection === "equipment" ? "border-b-2" : ""} cursor-pointer border-accent hover:border-b-2`}
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
            className={`!font-extralight capitalize ${activeSection === "ingredients" ? "border-b-2" : ""} cursor-pointer border-accent hover:border-b-2`}
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
            className={`!font-extralight capitalize ${activeSection === "recommend" ? "border-b-2" : ""} cursor-pointer border-accent hover:border-b-2`}
          >
            Recommend
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default NavDetails;
