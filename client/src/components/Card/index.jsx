import PropTypes from "prop-types";
import Typography from "../Typography";
import { Link } from "react-router-dom";

const Card = ({ id, title, diets, imageUrl, index }) => {
  return (
    <Link to={`/recipe/${id}`} className="flex-shrink-0 p-0 w-full h-[70vh] ">
      <article className={`h-full border-t ${index  - 2 ? "border-r" : ""} border-current px-4 bg-primary flex flex-col items-start justify-evenly py-8`}>
        <div className="mb-10">
          <Typography variant="body1" className="text-slate-950 font-extrabold text-xl">
            {title}
          </Typography>
          <Typography variant="body1" className="text-slate-950 text-xs">
            {diets.join(", ")}
          </Typography>
        </div>
        <div className="w-full h-48 flex-shrink-0">
          <img className="w-full h-full object-cover" src={imageUrl} alt={title} />
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