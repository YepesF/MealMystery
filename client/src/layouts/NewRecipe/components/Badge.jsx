import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../components/Typography";

const Badge = ({ text, onRemove }) => (
  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
    <Typography variant="body2">{text}</Typography>
    <button
      type="button"
      className="ml-2 bg-transparent border-0 text-blue-800 hover:text-blue-600"
      onClick={onRemove}
    >
      x
    </button>
  </span>
);

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Badge;
