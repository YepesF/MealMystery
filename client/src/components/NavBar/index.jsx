import { ROUTES } from "../../constants";
import Typography from "../Typography";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Search from "../Search";
import icon from "../../public/icons/mealmastery.webp";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { motion } from "framer-motion";
import { MenuToggle } from "./components/MenuToggle";
import useScreenSize from "../../hooks/useScreenSize";

const NavBar = ({ isOpen, handleOpenMenu }) => {
  const { pathname } = useLocation();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const screenSize = useScreenSize();

  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header id="navbar" className="sticky top-0 z-20 w-full shadow-sm">
      <div className="flex h-10 w-full items-center justify-between bg-white px-4 py-6 dark:bg-primaryDark 2k:px-8">
        <motion.div
          className="flex gap-3 2k:w-96"
          animate={isOpen ? "open" : "closed"}
        >
          {screenSize < 1280 && <MenuToggle toggle={handleOpenMenu} />}
          <Link
            to={ROUTES.ROOT}
            className="flex h-full w-full items-center justify-center gap-3"
          >
            <img src={icon} className="w-8 object-cover" />
            {screenSize > 1280 && (
              <Typography className="text-lg text-accent" variant="h1">
                Meal Mystery
              </Typography>
            )}
          </Link>
        </motion.div>
        {screenSize > 1280 && (
          <nav className="flex w-full justify-center">
            <ul className="flex items-center justify-start 2k:gap-6">
              <li>
                <Link to={ROUTES.RECIPES}>
                  <Typography
                    className={`text-xs 2k:text-base ${pathname === ROUTES.RECIPES && "border-t-4"} border-accent p-2 hover:border-t-4 dark:text-primary dark:hover:text-accent`}
                    variant="caption"
                  >
                    + Recipes
                  </Typography>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.NEW}>
                  <Typography
                    className={`text-xs 2k:text-base ${pathname === ROUTES.NEW && "border-t-4"} border-accent p-2 hover:border-t-4 dark:text-primary dark:hover:text-accent`}
                    variant="caption"
                  >
                    + New Recipe
                  </Typography>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <div className="flex items-center justify-between 2k:w-full">
          {screenSize > 1280 && (
            <button
              onClick={handleToggleDrawer}
              className="flex w-[10vw] items-center justify-between rounded-sm bg-primary p-1 hover:bg-accent hover:fill-primary hover:text-primary"
            >
              <Typography className="text-sm sm:opacity-0" variant="caption">
                Search
              </Typography>
              <span className="">
                <IoSearchSharp />
              </span>
            </button>
          )}
          <span className="flex gap-3">
            {screenSize < 1280 && (
              <button
                className="dark: rounded-full bg-gray-100 p-2 hover:bg-accent hover:fill-primary dark:border dark:border-accent dark:bg-transparent dark:text-accent dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-primary"
                onClick={handleToggleDrawer}
              >
                <IoSearchSharp />
              </button>
            )}
            <button
              className="dark: rounded-full bg-gray-100 p-2 hover:bg-accent hover:fill-primary dark:border dark:border-accent dark:bg-transparent dark:text-accent dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-primary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
            <button className="dark: rounded-full bg-gray-100 p-2 hover:bg-accent hover:fill-primary focus:border-transparent dark:border dark:border-accent dark:bg-transparent dark:text-accent dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-primary">
              <TbWorld />
            </button>
          </span>
        </div>
      </div>
      <Search
        isDrawerOpen={isDrawerOpen}
        handleToggleDrawer={handleToggleDrawer}
      />
    </header>
  );
};

export default NavBar;
