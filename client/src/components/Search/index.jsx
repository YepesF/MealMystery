import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Material Tailwind
import { Spinner } from "@material-tailwind/react";

// Components
import Drawer from "../Drawer";
import Typography from "../Typography";
import Input from "../Input";

// Icon
import { FiSearch } from "react-icons/fi";

// API
import { getAllRecipes } from "../../api/recepies";

// Lodash
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import Button from "../Button";

// Constants
import { ROUTES } from "../../constants";

const Search = ({ isDrawerOpen, handleToggleDrawer }) => {
  const [value, setValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const debouncedChangeHandler = useCallback(
    debounce(async (value) => {
      setLoading(true);
      setSearched(true);
      const recipesData = await getAllRecipes(1, value);
      setRecipes(recipesData.recipes);
      setLoading(false);
    }, 500),
    []
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
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      size={500}
      placement="right"
      overlay={true}
      dismiss={true}
    >
      <div className="p-8 w-full h-screen">
        <div className="flex justify-between items-center">
          <Typography className="text-base uppercase" variant="button">
            search
          </Typography>
          <div className="flex justify-center items-center gap-4">
            <Typography className="text-sm font-light uppercase">
              close
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              onClick={handleToggleDrawer}
              className="cursor-pointer"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
        </div>
        <Input
          variant="outlined"
          size="lg"
          color="current"
          error={false}
          success={false}
          icon={<FiSearch />}
          containerProps={{ className: "mt-10 border-current" }}
          className="custom-input bg-primary"
          shrink={true}
          placeholder="Search..."
          clearable={true}
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          autoFocus={true}
        />
        {value && (
          <div className="w-full h-[90%] flex justify-center items-start overflow-auto hide-scrollbar">
            {loading && (
              <div className="py-3">
                <Spinner className=" text-green-600" />
              </div>
            )}
            {!loading && searched && recipes.length === 0 && (
              <div className="w-full py-3">
                <Typography className="text-xs uppercase" variant="button">
                  Your search returns no result.
                </Typography>
              </div>
            )}
            {!loading && recipes.length > 0 && (
              <div className="w-full h-full">
                <div className="w-full border-b border-current py-3">
                  <Typography className="text-xs uppercase" variant="button">
                    Recipes
                  </Typography>
                </div>
                <div className="mb-3">
                  {recipes.map(
                    ({ id, image, title, ready_in_minutes }, index) => (
                      <Link
                        key={index}
                        to={`${ROUTES.RECIPE}/${id}`}
                        className="flex-shrink-0 p-0 w-full"
                      >
                        <article className="py-4 flex items-start justify-center gap-3 border-b hover:bg-primary">
                          <div className="w-32 flex-shrink-0">
                            <img
                              className="w-full h-full object-cover"
                              src={image}
                              alt={title}
                            />
                          </div>
                          <div className="w-full h-full">
                            <Typography
                              className="text-sm uppercase"
                              variant="button"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="body1"
                              className="text-slate-950 text-xs capitalize"
                            >
                              ready in: {ready_in_minutes} minutes
                            </Typography>
                          </div>
                        </article>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {!loading && recipes.length > 0 && (
          <Link
            to={`${ROUTES.RECIPES}?query=${value}`}
            className="flex-shrink-0 p-0 w-full sticky bottom-5"
            onClick={handleToggleDrawer}
          >
            <Button className="w-full" variant="primary">
              View All Results
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
