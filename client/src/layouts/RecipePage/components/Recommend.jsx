import { Spinner } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import Typography from "../../../components/Typography";
import Badge from "../../../components/Badge";
import useScreenSize from "../../../hooks/useScreenSize";
import { useTranslation } from "react-i18next";

const Recommend = ({ loading, recipes }) => {
  const { t } = useTranslation();
  const screenSize = useScreenSize();
  return (
    <div
      id="recommend"
      className="mt-[6vh] w-full p-2 dark:text-primary hd:min-h-[50rem]"
    >
      {loading && (
        <div className="flex h-[40rem] items-center justify-center">
          <Spinner color="red" className="h-16 w-16 text-accent" />
        </div>
      )}
      <div className="flex h-full w-full flex-col items-center justify-center hd:items-start">
        <Typography
          className="text-ellipsis whitespace-nowrap p-4 text-3xl font-extrabold capitalize hd:text-6xl"
          variant="h2"
        >
          {t("Recommend.title")}
        </Typography>
        <div className="flex h-full flex-col items-center justify-start hd:flex-row">
          {!loading &&
            recipes.map(
              ({ id, image, title, ready_in_minutes, diets }, index) => (
                <Link
                  key={index}
                  to={`${ROUTES.RECIPE}/${id}`}
                  className="flex-shrink-0 p-0 md:w-full hd:w-1/3"
                >
                  <article
                    className={`h-full border-t p-4 ${screenSize > 1280 && index < recipes.length - 1 ? "border-r" : ""} flex flex-col items-start justify-start gap-6 border-gray-400 bg-primary dark:bg-primaryDark dark:text-primary hd:px-4`}
                  >
                    <div className="w-full">
                      <Typography
                        variant="body1"
                        className="text-ellipsis whitespace-nowrap font-extrabold md:text-xl hd:text-xl"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-xs capitalize md:text-sm hd:text-xl"
                      >
                        {t("Recommend.readyInMinutes")}{" "}
                        <strong className="ml-2 text-accent">
                          {ready_in_minutes}
                        </strong>
                      </Typography>
                    </div>
                    <div className="w-full flex-shrink-0 hd:h-[40rem]">
                      <img
                        className="h-full w-full object-cover"
                        src={image}
                        alt={title}
                      />
                    </div>
                    <div className="flex h-full justify-center">
                      {diets.length ? (
                        diets.slice(0, 3).map((diet, index) => (
                          <Badge
                            key={index}
                            className={`capitalize ${index > 0 && "ml-4"}`}
                          >
                            {t(diet)}
                          </Badge>
                        ))
                      ) : (
                        <Badge className="h-full opacity-0">&nbsp;</Badge>
                      )}
                    </div>{" "}
                  </article>
                </Link>
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
