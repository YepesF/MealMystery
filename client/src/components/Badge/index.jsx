import React from "react";
import PropTypes from "prop-types";

const Badge = ({ children, className = "", ...props }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-gray-400 px-2 py-0 text-[7px] font-bold text-gray-700 hover:border-transparent hover:bg-accent hover:text-primary dark:border-accent dark:text-accent dark:hover:text-primary 2k:py-1 2k:text-xs ${className}`}
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
