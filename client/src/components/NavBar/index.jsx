import { ROUTES } from "../../constants";
import Typography from "../Typography";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Search from "../Search";
import icon from "../../public/icons/mealmastery.webp";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const NavBar = () => {
  const { pathname } = useLocation();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  return (
    <header id="navbar" className="sticky top-0 w-full shadow-sm z-20">
      <div className="h-10 w-full bg-white dark:bg-black flex justify-between items-center px-8 py-6">
        <div className="w-96">
          <Link
            to={ROUTES.ROOT}
            className="w-full h-full flex justify-center items-center gap-3"
          >
            <img src={icon} className="w-8 object-cover" />
            <Typography className="text-lg text-accent" variant="h1">
              Meal Mystery
            </Typography>
          </Link>
        </div>
        <nav className="w-full flex justify-center">
          <ul className="flex justify-start items-center gap-6">
            <li>
              <Link to={ROUTES.RECIPES}>
                <Typography
                  className={`text-base ${pathname === ROUTES.RECIPES && "border-t-4"} hover:border-t-4 border-accent p-2`}
                  variant="caption"
                >
                  + Recipes
                </Typography>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.NEW}>
                <Typography
                  className={`text-base ${pathname === ROUTES.NEW && "border-t-4"} hover:border-t-4 border-accent p-2`}
                  variant="caption"
                >
                  + New Recipe
                </Typography>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-full flex justify-between items-center">
          <button
            onClick={handleToggleDrawer}
            className="bg-primary hover:bg-accent hover:text-primary hover:fill-primary rounded-sm w-[10vw] p-1 flex justify-between items-center"
          >
            <Typography className="text-sm" variant="caption">
              Search
            </Typography>
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </span>
          </button>
          <span className="flex gap-3">
            <button
              className="bg-primary hover:bg-accent hover:fill-primary rounded-full p-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
            <button className="bg-primary hover:bg-accent hover:fill-primary rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
              >
                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
              </svg>
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
