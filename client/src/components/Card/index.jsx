import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "../Typography";
import Badge from "../Badge";

const Card = ({ id, title, diets, imageUrl, readyIn, index, imageHeight }) => {
  const [renderDiets] = useState(
    diets.map((diet, index) => (
      <Badge className={`capitalize ${index > 0 && "ml-4"}`}>{diet}</Badge>
    ))
  );
  return (
    <Link to={`/recipe/${id}`} className="flex-shrink-0 p-0 w-full ">
      <article
        className={`h-full border-t ${(index + 1) % 3 === 0 ? "" : "border-r"} border-current px-4 bg-primary flex flex-col items-start justify-start gap-6 p-4`}
      >
        <div>
          <Typography
            variant="body1"
            className="text-slate-950 font-extrabold text-xl"
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
          {renderDiets || <Badge className="capitalize ml-4">{"\u00A0"}</Badge>}
        </div>
      </article>
    </Link>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  diets: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
