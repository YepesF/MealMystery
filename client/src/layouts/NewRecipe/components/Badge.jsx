import React from "react";

const Badge = ({ text, onRemove }) => (
  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
    {text}
    <button
      type="button"
      className="ml-2 bg-transparent border-0 text-blue-800 hover:text-blue-600"
      onClick={onRemove}
    >
      x
    </button>
  </span>
);

export default Badge;
