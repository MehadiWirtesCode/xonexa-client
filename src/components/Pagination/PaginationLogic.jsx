// PaginationHelper.js (optional, অন্য file এ রাখতে পারো)
export const getPaginationGroup = (currentPage, totalPages, pageLimit = 5) => {
  let start = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
  let end = start + pageLimit - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - pageLimit + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};
