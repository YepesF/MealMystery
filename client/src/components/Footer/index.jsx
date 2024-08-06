import React from "react";
import Typography from "../Typography";
import { ROUTES } from "../../constants";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="flex h-[60vh] w-full flex-col gap-8 bg-black p-4">
      <div className="flex h-[30vh] w-full flex-col justify-between rounded-md bg-secondary p-4">
        <div className="flex w-full items-start justify-between">
          <Typography className="text-xs text-primary" variant="body2">
            ↓
          </Typography>
          <Typography className="text-xs text-primary" variant="body2">
            DISCOVER THE <br />
            JOY OF COOKING <br />
            WITH US.
          </Typography>
          <Typography className="text-xs text-primary" variant="body2">
            YOUR TRUSTED <br />
            PARTNER IN THE <br />
            KITCHEN.
          </Typography>
          <Typography className="text-xs text-primary" variant="body2">
            ↓
          </Typography>
        </div>
        <div className="flex w-full flex-col justify-center gap-4">
          <Typography className="text-6xl text-primary" variant="h1">
            Meal Mystery
          </Typography>
          <div className="h-[1vh] w-full rounded-sm bg-primary"></div>
        </div>
      </div>
      <div className="flex h-auto justify-between">
        <div className="flex w-full flex-col items-start justify-start border-b border-r border-primary p-4">
          <a href={ROUTES.RECIPES}>
            <Typography
              className="text-2xl font-extrabold text-primary hover:text-accent"
              variant="body2"
            >
              Recepies
            </Typography>
          </a>
          <a href={ROUTES.NEW}>
            <Typography
              className="text-2xl font-extrabold text-primary hover:text-accent"
              variant="body2"
            >
              New Recipe
            </Typography>
          </a>
        </div>
        <div className="w-full border-b border-primary p-4">
          <Typography
            className="text-sm text-primary xl:w-full"
            variant="body2"
          >
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
          <FaGithub className="h-8 w-8 text-primary" />
        </a>
      </div>
    </section>
  );
};

export default Footer;
