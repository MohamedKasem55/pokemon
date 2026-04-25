import React from "react";
import PokemonListCard from "./PokemonListCard";
import Pagination from "./Pagination";

function PaginatedPokemonList({
  pokemons,
  totalItems,
  isFetching,
  currentPage,
  setCurrentPage
}: {
  pokemons: Array<any>;
  totalItems: number;
  isFetching: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-[80%] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
        {!!pokemons.length &&
          pokemons?.map((pokemon: any) => {
            return <PokemonListCard {...pokemon} />;
          })}
      </div>
      {isFetching && (
        <div className="w-full flex flex-row justify-center items-center">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      )}

      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={20}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className="ml-4 text-sm text-gray-500">
          Page {currentPage} of {Math.ceil(totalItems / 20)} (20 items shown)
        </div>
      </div>
    </div>
  );
}

export default PaginatedPokemonList;
