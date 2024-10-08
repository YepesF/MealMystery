import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// Material Tailwind
import { Spinner } from "@material-tailwind/react";

// Components
import Drawer from "../Drawer";
import Typography from "../Typography";
import Input from "../Input";

// Icon
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

// API
import { getAllRecipes } from "../../api/recepies";

// Lodash
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import Button from "../Button";

// Constants
import { ROUTES } from "../../constants";

const Search = ({ isDrawerOpen, handleToggleDrawer }) => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const debouncedChangeHandler = useCallback(
    debounce(async (value) => {
      setLoading(true);
      setSearched(true);
      const recipesData = await getAllRecipes(1, {
        value,
        lang: i18n.language,
      });
      setRecipes(recipesData.recipes);
      setLoading(false);
    }, 500),
    [],
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
    if (value.trim() === "") {
      setRecipes([]);
      setLoading(false);
      setSearched(false);
    } else {
      debouncedChangeHandler(value);
    }
  };

  const handleClear = () => {
    setValue("");
    setRecipes([]);
    setLoading(false);
    setSearched(false);
  };

  return (
    <Drawer
      className="!w-full dark:bg-primaryDark md:!w-1/2 hd:!w-[500px]"
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      placement="right"
      overlay={true}
      dismiss={true}
    >
      <div className="h-screen w-full p-8">
        <div className="flex items-center justify-between">
          <Typography
            className="text-base uppercase dark:text-accent"
            variant="button"
          >
            {t("Search.Search")}
          </Typography>
          <div
            className="flex cursor-pointer items-center justify-center gap-2 dark:text-accent"
            onClick={handleToggleDrawer}
          >
            <Typography className="text-sm font-light uppercase">
              {t("Search.Close")}
            </Typography>
            <IoClose className="h-5 w-5" />
          </div>
        </div>
        <Input
          variant="outlined"
          size="lg"
          color="current"
          error={false}
          success={false}
          icon={<FiSearch />}
          containerProps={{ className: "mt-10" }}
          shrink={true}
          placeholder={t("Search.Search...")}
          clearable={true}
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          autoFocus={true}
        />
        {value && (
          <div className="flex h-[90%] w-full items-start justify-center overflow-auto hide-scrollbar">
            {loading && (
              <div className="py-3">
                <Spinner color="red" className="text-accent" />
              </div>
            )}
            {!loading && searched && recipes.length === 0 && (
              <div className="w-full py-3">
                <Typography
                  className="text-xs uppercase dark:text-accent"
                  variant="button"
                >
                  {t("Search.Your search returns no result.")}
                </Typography>
              </div>
            )}
            {!loading && recipes.length > 0 && (
              <div className="h-full w-full">
                <div className="w-full border-b border-current py-3">
                  <Typography
                    className="text-xs uppercase dark:text-accent"
                    variant="button"
                  >
                    {t("Search.Recipes")}
                  </Typography>
                </div>
                <div className="mb-3">
                  {recipes.map(
                    (
                      { id, image, title, ready_in_minutes, title_es },
                      index,
                    ) => (
                      <Link
                        key={index}
                        to={`${ROUTES.RECIPE}/${id}`}
                        className="w-full flex-shrink-0 p-0"
                      >
                        <article className="flex items-start justify-center gap-3 border-b py-4 hover:bg-primary dark:border-gray-400 dark:bg-transparent dark:hover:bg-accent/20">
                          <div className="w-32 flex-shrink-0">
                            <img
                              className="h-full w-full object-cover"
                              src={image}
                              alt={title}
                            />
                          </div>
                          <div className="h-full w-full">
                            <Typography
                              className="text-sm uppercase dark:text-accent"
                              variant="button"
                            >
                              {i18n.language === "en" ? title : title_es}
                            </Typography>
                            <Typography
                              variant="body1"
                              className="text-xs capitalize dark:text-primary"
                            >
                              {t("Search.ready in")}: {ready_in_minutes}{" "}
                              {t("Search.minutes")}
                            </Typography>
                          </div>
                        </article>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {!!recipes.length && !!value.length && (
          <Link
            to={`${ROUTES.RECIPES}?query=${value}`}
            className="sticky bottom-5 w-full flex-shrink-0 p-0"
            onClick={handleToggleDrawer}
          >
            <Button className="w-full" variant="primary">
              {t("Search.View All Results")}
            </Button>
          </Link>
        )}
      </div>
    </Drawer>
  );
};

Search.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default Search;
