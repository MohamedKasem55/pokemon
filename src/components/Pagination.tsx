import React from "react";

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
  return <div className="flex flex-row gap-2">
    <button className="bg-white text-black font-bold" >Previous</button>
    <button className="bg-white text-black font-bold" >1</button>

    <button className="bg-white text-black font-bold" >{currentPage-2}</button>
    <button className="bg-white text-black font-bold" >{currentPage-1}</button>

    <button className="bg-white text-black font-bold" >{currentPage}</button>

    <button className="bg-white text-black font-bold" >{totalPages-2}</button>
    <button className="bg-white text-black font-bold" >{totalPages-1}</button>

    <button className="bg-white text-black font-bold" >{totalPages}</button>
    <button className="bg-white text-black font-bold" >Next</button>
  </div>;
}

export default Pagination;
