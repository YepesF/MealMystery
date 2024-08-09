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
    <div className="flex items-center justify-center space-x-1 md:space-x-2">
      {currentPage > 1 && (
        <button
          onClick={goToPreviousPage}
          className="rounded border border-gray-400 bg-primary px-2 py-1 hover:border-transparent hover:bg-accent hover:text-primary dark:border-accent dark:bg-primaryDark dark:text-accent dark:hover:bg-accent dark:hover:text-primary hd:px-4 hd:py-2"
        >
          Back
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded border px-2 py-1 hd:px-4 hd:py-2 ${
            currentPage === page
              ? "border-transparent bg-accent text-primary"
              : "border-gray-400 bg-primary hover:border-transparent hover:bg-accent hover:text-primary dark:border-accent dark:bg-primaryDark dark:text-accent dark:hover:bg-accent dark:hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={goToNextPage}
          className="rounded border border-gray-400 bg-primary px-2 py-1 hover:border-transparent hover:bg-accent hover:text-primary dark:border-accent dark:bg-primaryDark dark:text-accent dark:hover:bg-accent dark:hover:text-primary hd:px-4 hd:py-2"
        >
          Next
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
