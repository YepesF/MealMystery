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
          className="rounded border border-gray-400 bg-primary px-4 py-2 hover:border-transparent hover:bg-accent hover:text-primary"
        >
          Anterior
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded border px-4 py-2 ${
            currentPage === page
              ? "bg-accent text-primary"
              : "border-gray-400 bg-primary hover:border-transparent hover:bg-accent hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={goToNextPage}
          className="rounded border border-gray-400 bg-primary px-4 py-2 hover:border-transparent hover:bg-accent hover:text-primary"
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
