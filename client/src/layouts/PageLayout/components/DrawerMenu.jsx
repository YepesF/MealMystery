import { Drawer } from "@material-tailwind/react";
import icon from "../../../public/icons/mealmastery.webp";
import Typography from "../../../components/Typography";
import { ROUTES } from "../../../constants";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const DrawerMenu = ({ isMenuOpen, handleCloseMenu }) => {
  const { t } = useTranslation();
  return (
    <Drawer
      className="!w-full dark:bg-primaryDark"
      open={isMenuOpen}
      onClose={handleCloseMenu}
      overlay={false}
    >
      <Link to={ROUTES.ROOT} className="flex w-full items-center gap-3 p-2">
        <img src={icon} className="w-8 object-cover" />
        <Typography className="text-lg text-accent" variant="h1">
          Meal Mystery
        </Typography>
      </Link>
      <div className="mt-4 flex h-[90vh] w-full flex-col items-start justify-between gap-3 p-2">
        <div className="w-full">
          <a href={ROUTES.RECIPES}>
            <Typography
              className="border-b border-t border-black text-2xl font-extrabold hover:text-accent dark:border-primary dark:text-primary dark:hover:text-accent"
              variant="body2"
            >
              {t("DrawerMenu.recipes")}
            </Typography>
          </a>
          <a href={ROUTES.NEW}>
            <Typography
              className="border-b border-black text-2xl font-extrabold text-accent hover:text-accent dark:border-primary dark:text-primary dark:hover:text-accent"
              variant="body2"
            >
              {t("DrawerMenu.newRecipe")}
            </Typography>
          </a>
        </div>
        <div className="flex w-full justify-center">
          <a
            href="https://github.com/YepesF/MealMystery"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-8 w-8 hover:text-accent dark:text-primary dark:hover:text-accent" />
          </a>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerMenu;
