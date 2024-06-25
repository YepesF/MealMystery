import PropTypes from "prop-types";
import Typography from "../Typography";

const Card = ({ title, subtitle, price, imageUrl }) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <Typography
          variant="h3"
          className="text-gray-600 text-lg font-bold capitalize"
        >
          {title}
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          {subtitle}
        </Typography>
        <div className="text-xl font-semibold text-gray-800 mt-2">{price}</div>
      </div>
      <div className="flex justify-between p-4 border-t border-gray-200">
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          View
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded-lg flex items-center">
          Compare
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Card;
