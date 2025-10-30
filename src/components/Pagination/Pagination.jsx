import { getPaginationGroup } from "./PaginationLogic";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = getPaginationGroup(currentPage, totalPages);

  return (
    <div className="flex gap-2 md:gap-1 justify-center items-center mt-6 space-x-2 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers[0] > 1 && <span className="px-2">...</span>}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
      {pageNumbers[pageNumbers.length - 1] < totalPages && <span className="px-2">...</span>}

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
