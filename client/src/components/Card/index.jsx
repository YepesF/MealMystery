import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "../Typography";
import Badge from "../Badge";
import { ROUTES } from "../../constants";

const Card = ({
  id,
  title,
  diets = [],
  imageUrl,
  readyIn,
  index,
  imageHeight,
  decoration = false,
}) => {
  const renderDiets =
    diets.length > 0 &&
    diets.slice(0, 3).map((diet, index) => (
      <Badge key={index} className={`capitalize ${index > 0 && "ml-4"}`}>
        {diet}
      </Badge>
    ));

  const borders = decoration
    ? `border-t ${(index + 1) % 3 === 0 ? "" : "border-r"} border-gray-400`
    : "";

  return (
    <Link to={`${ROUTES.RECIPE}/${id}`} className="w-full flex-shrink-0 p-0">
      <article
        className={`h-full ${borders} flex flex-col items-start justify-start gap-4 bg-primary p-4 px-4 dark:bg-primaryDark 2k:gap-6`}
      >
        <div className="w-full">
          <Typography
            variant="body1"
            className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-extrabold dark:text-primary md:text-xl 2k:text-xl"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="overflow-hidden text-ellipsis whitespace-nowrap text-xs capitalize dark:text-primary md:text-sm 2k:text-xl"
          >
            ready in: {readyIn} minutes
          </Typography>
        </div>
        <div className={`w-full h-[${imageHeight}vh] flex-shrink-0`}>
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="flex justify-center">
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
