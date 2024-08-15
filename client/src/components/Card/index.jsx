import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "../Typography";
import Badge from "../Badge";
import { ROUTES } from "../../constants";
import useScreenSize from "../../hooks/useScreenSize";
import { useTranslation } from "react-i18next";

const Card = ({
  id,
  title,
  diets = [],
  imageUrl,
  readyIn,
  index,
  imageHeight,
  decoration = false,
  title_es,
}) => {
  const { t, i18n } = useTranslation();
  const screenSize = useScreenSize();
  const renderDiets =
    diets.length > 0 &&
    diets.slice(0, screenSize < 768 ? 2 : 3).map((diet, index) => (
      <Badge key={index} className="capitalize">
        {diet}
      </Badge>
    ));

  const borders = decoration
    ? screenSize < 768
      ? "border-t dark:border-primary border-gray-400"
      : screenSize < 1280
        ? `border-t ${(index + 1) % 2 === 0 ? "" : "border-r"} dark:border-primary border-gray-400`
        : `border-t ${(index + 1) % 3 === 0 ? "" : "border-r"} dark:border-primary border-gray-400`
    : "";

  return (
    <Link to={`${ROUTES.RECIPE}/${id}`} className="w-full flex-shrink-0 p-0">
      <article
        className={`h-full ${borders} flex flex-col items-start justify-start gap-4 bg-primary p-4 px-4 dark:bg-primaryDark hd:gap-6`}
      >
        <div className="w-full">
          <Typography
            variant="body1"
            className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-extrabold dark:text-primary md:text-xl hd:text-xl"
          >
            {i18n.language === "en" ? title : title_es}
          </Typography>
          <Typography
            variant="body1"
            className="overflow-hidden text-ellipsis whitespace-nowrap text-xs capitalize dark:text-primary md:text-sm hd:text-xl"
          >
            {t("Search.ready in")}: {readyIn} {t("Search.minutes")}
          </Typography>
        </div>
        <div className={`w-full h-[${imageHeight}vh] flex-shrink-0`}>
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="flex w-full flex-wrap gap-1">
          {renderDiets.length > 0 ? renderDiets : <div>&nbsp;</div>}
        </div>
      </article>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  diets: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  readyIn: PropTypes.number.isRequired,
  index: PropTypes.number,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
};

export default Card;
