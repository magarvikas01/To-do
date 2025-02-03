export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-600 text-white mr-2"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-600 text-white ml-2"
        >
          Next
        </button>
      </div>
    );
  };