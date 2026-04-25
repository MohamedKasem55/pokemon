import React from "react";

function getPageNumbers(currentPage: number, totalPages: number, radius: number): (number | "...")[] {
  if (totalPages <= 1) return [1];

  let start = Math.max(2, currentPage - radius);
  let end = Math.min(totalPages - 1, start + radius * 2);
  start = Math.max(2, end - radius * 2);

  const pages: (number | "...")[] = [1];

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");

  pages.push(totalPages);
  return pages;
}

function Pagination({
  totalItems,
  itemsPerPage = 20,
  currentPage,
  onPageChange,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const mobilePages = getPageNumbers(currentPage, totalPages, 0);
  const desktopPages = getPageNumbers(currentPage, totalPages, 2);

  const btnBase = "min-w-[2.25rem] h-9 px-2 rounded font-semibold text-sm transition-colors";
  const btnDefault = `${btnBase} bg-white text-gray-700 hover:bg-gray-100 border border-gray-300`;
  const btnActive = `${btnBase} bg-black text-white border border-black`;
  const btnDisabled = `${btnBase} bg-white text-gray-300 border border-gray-200 cursor-not-allowed`;

  return (
    <div className="flex flex-row items-center gap-1">
      <button
        className={`${currentPage === 1 ? btnDisabled : btnDefault} w-full!`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="flex md:hidden items-center gap-1">
        {mobilePages.map((page, i) =>
          page === "..." ? (
            <span key={`m-ellipsis-${i}`} className="min-w-[2.25rem] h-9 flex items-center justify-center text-black text-sm">…</span>
          ) : (
            <button key={page} className={page === currentPage ? btnActive : btnDefault} onClick={() => onPageChange(page)}>
              {page}
            </button>
          )
        )}
      </div>

      <div className="hidden md:flex items-center gap-1">
        {desktopPages.map((page, i) =>
          page === "..." ? (
            <span key={`d-ellipsis-${i}`} className="min-w-[2.25rem] h-9 flex items-center justify-center text-black text-sm">…</span>
          ) : (
            <button key={page} className={page === currentPage ? btnActive : btnDefault} onClick={() => onPageChange(page)}>
              {page}
            </button>
          )
        )}
      </div>

      <button
        className={`${currentPage === totalPages ? btnDisabled : btnDefault} w-fit!`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next 
      </button>
    </div>
  );
}

export default Pagination;
