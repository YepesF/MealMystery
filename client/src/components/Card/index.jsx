import PropTypes from "prop-types";
import Typography from "../Typography";
import { Link } from "react-router-dom";

const Card = ({ id, title, diets, imageUrl }) => {
  return (
    <Link to={`/recipe/${id}`}>
      <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
        <div className="p-4">
          <Typography variant="h3" className="text-slate-600 text-lg font-bold capitalize">
            {title}
          </Typography>
          <Typography variant="body1" className="text-slate-600 capitalize">
            {diets.join(", ")}
          </Typography>
        </div>
      </div>
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
