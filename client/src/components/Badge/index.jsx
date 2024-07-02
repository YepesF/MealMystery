import React from "react";
import PropTypes from "prop-types";

const Badge = ({ children, className = "", ...props }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 border border-gray-400 text-gray-700 rounded-full text-xs font-bold hover:bg-secondary hover:border-transparent hover:text-primary ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Badge;
