import React from "react";
import cn from "classnames";
import styles from "./Pagination.module.css";

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

  const pageBtn = (page: number) =>
    cn(styles.btn, page === currentPage ? styles.btnActive : styles.btnDefault);

  return (
    <div className={cn(styles.container)}>
      <button
        className={cn(styles.btn, currentPage === 1 ? styles.btnDisabled : styles.btnDefault)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className={cn(styles.mobilePages)}>
        {mobilePages.map((page, i) =>
          page === "..." ? (
            <span key={`m-ellipsis-${i}`} className={cn(styles.ellipsis)}>…</span>
          ) : (
            <button key={page} className={pageBtn(page)} onClick={() => onPageChange(page)}>
              {page}
            </button>
          )
        )}
      </div>

      <div className={cn(styles.desktopPages)}>
        {desktopPages.map((page, i) =>
          page === "..." ? (
            <span key={`d-ellipsis-${i}`} className={cn(styles.ellipsis)}>…</span>
          ) : (
            <button key={page} className={pageBtn(page)} onClick={() => onPageChange(page)}>
              {page}
            </button>
          )
        )}
      </div>

      <button
        className={cn(styles.btn, currentPage === totalPages ? styles.btnDisabled : styles.btnDefault)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
