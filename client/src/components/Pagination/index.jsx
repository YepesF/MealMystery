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
          className="px-4 py-2 border rounded border-gray-400  bg-primary hover:bg-accent hover:text-primary hover:border-transparent"
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
              ? "bg-accent text-primary"
              : "bg-primary border-gray-400 hover:bg-accent hover:border-transparent hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={goToNextPage}
          className="px-4 py-2 border border-gray-400 rounded bg-primary hover:bg-accent hover:text-primary hover:border-transparent"
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
