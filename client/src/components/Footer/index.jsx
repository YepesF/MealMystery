import React from "react";
import Typography from "../Typography";
import { ROUTES } from "../../constants";

const Footer = () => {
  return (
    <section className="w-full h-[60vh] bg-black p-4 flex flex-col gap-8">
      <div className="w-full h-[30vh] bg-secondary rounded-md p-4 flex flex-col justify-between">
        <div className="w-full flex justify-between items-start">
          <Typography className="text-primary text-xs" variant="body2">
            ↓
          </Typography>
          <Typography className="text-primary text-xs" variant="body2">
            DISCOVER THE <br />
            JOY OF COOKING <br />
            WITH US.
          </Typography>
          <Typography className="text-primary text-xs" variant="body2">
            YOUR TRUSTED <br />
            PARTNER IN THE <br />
            KITCHEN.
          </Typography>
          <Typography className="text-primary text-xs" variant="body2">
            ↓
          </Typography>
        </div>
        <div className="w-full flex flex-col justify-center gap-4">
          <Typography className="text-primary text-6xl" variant="h1">
            Meal Mystery
          </Typography>
          <div className="w-full h-[1vh] bg-primary rounded-sm"></div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-full p-4 border-r border-b border-primary flex flex-col items-start justify-start">
          <a href={ROUTES.RECIPES}>
            <Typography
              className="text-primary text-2xl font-extrabold hover:text-secondary"
              variant="body2"
            >
              Recepies
            </Typography>
          </a>
          <a href={ROUTES.DIETS}>
            <Typography
              className="text-primary text-2xl font-extrabold hover:text-secondary"
              variant="body2"
            >
              Diet
            </Typography>
          </a>
          <a href={ROUTES.ROOT}>
            <Typography
              className="text-primary text-2xl font-extrabold hover:text-secondary"
              variant="body2"
            >
              New Recipe
            </Typography>
          </a>
        </div>
        <div className="w-full p-4 border-b border-primary">
          <Typography className="w-1/4 text-primary text-sm" variant="body2">
            Meal Mystery is a comprehensive platform designed for culinary
            enthusiasts of all levels. Whether you are a seasoned chef or just
            starting your culinary journey, our platform provides a wide range
            of gourmet recipes, high-quality ingredients, personalized cooking
            tips, and professional techniques to enhance your cooking skills.
          </Typography>
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href="https://github.com/YepesF/MealMystery"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="hover:fill-secondary"
            fill="white"
            viewBox="0 0 1024 1024"
            height="24px"
            width="24px"
          >
            <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
