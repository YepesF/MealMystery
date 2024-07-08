import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  const goToPreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= 1) {
      onPageChange(previousPage);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {currentPage > 1 && (
        <button
          onClick={goToPreviousPage}
          className="px-4 py-2 border rounded bg-white text-black hover:bg-gray-200"
        >
          Anterior
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border rounded ${
            currentPage === page
              ? "bg-green-500 text-white"
              : "bg-white text-black hover:bg-green-500"
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={goToNextPage}
          className="px-4 py-2 border rounded bg-white text-black hover:bg-gray-200"
        >
          Siguiente
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
