import PropTypes from "prop-types";
import Typography from "../Typography";

const Card = ({ title, diets, imageUrl }) => {
  return (
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
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  diets: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Card;
