import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "../Typography";
import Badge from "../Badge";
import { ROUTES } from "../../constants";

const Card = ({ id, title, diets, imageUrl, readyIn, index, imageHeight }) => {
  const renderDiets = diets.slice(0, 3).map((diet, index) => (
    <Badge key={index} className={`capitalize ${index > 0 && "ml-4"}`}>
      {diet}
    </Badge>
  ));

  return (
    <Link to={`${ROUTES.RECIPE}/${id}`} className="flex-shrink-0 p-0 w-full">
      <article
        className={`h-full border-t ${(index + 1) % 3 === 0 ? "" : "border-r"} border-current px-4 bg-primary flex flex-col items-start justify-start gap-6 p-4`}
      >
        <div className="w-full">
          <Typography
            variant="body1"
            className="text-slate-950 font-extrabold text-xl overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="text-slate-950 text-xs capitalize"
          >
            ready in: {readyIn} minutes
          </Typography>
        </div>
        <div className={`w-full h-[${imageHeight}vh] flex-shrink-0`}>
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="flex justify-center">
          {renderDiets.length > 0 ? (
            renderDiets
          ) : (
            <Badge className="capitalize ml-4">{"\u00A0"}</Badge>
          )}
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
  index: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
