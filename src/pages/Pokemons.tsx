import React, { useEffect, useState } from "react";
import { fetchPokemons } from "../api/api";
import PokemonListCard from "../components/PokemonListCard";
import {
  IPokemonListItemResponse,
  IPokemonListResponse,
} from "../interfaces/pokemonsList.interface";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import Pagination from "../components/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import InfiniteScrollPokemonList from "../components/InfiniteScrollPokemonList";
import PaginatedPokemonList from "../components/PaginatedPokemonList";
function Pokemons() {
  const [isPagination, setIsPagination] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const {
    data: { pokemons, totalItems },
    isFetching,
  } = useQuery<{
    pokemons: IPokemonListItem[];
    totalItems: number;
  }>({
    queryKey: ["pokemons", currentPage],
    queryFn: () => fetchPokemons(currentPage),
    initialData: { pokemons: [], totalItems: 0 },
    placeholderData: (previousData) => previousData,
  });
  const updatePagination = (value: boolean) => {
    setCurrentPage(1);
    if (!value) queryClient.resetQueries({ queryKey: ["pokemons"] });
    setIsPagination(value);
  };
  return (
    <div
      className={`${isPagination ? "bg-[#EAF0FE]" : "bg-[#E3FBED]"} h-[100%] flex flex-col gap-4 py-10
         items-center justify-center`}
    >
      <h1 className="text-lg font-bold">Pokedex</h1>
      <p className="text-sm text-gray-500">
        Discover and explore Pokemon with page Controls
      </p>
      <div className="flex flex-row gap-4 flex-wrap p-2 items-center justify-center">
        <button
          onClick={() => updatePagination(true)}
          className={`cursor-pointer px-4 py-3 rounded-lg ${isPagination ? "text-white bg-black" : "bg-white text-black"}`}
        >
          Page Controls
        </button>
        <button
          onClick={() => updatePagination(false)}
          className={`cursor-pointer px-4 py-3 rounded-lg ${isPagination ? "bg-white text-black" : "text-white bg-black"}`}
        >
          Infinite Scroll
        </button>
      </div>
      {isPagination ? (
        <PaginatedPokemonList
          pokemons={pokemons}
          totalItems={totalItems}
          isFetching={isFetching}
          currentPage={currentPage}
          setCurrentPage={(page: number) => setCurrentPage(page)}
        />
      ) : (
        <InfiniteScrollPokemonList
          pokemons={pokemons}
          totalItems={totalItems}
          isFetching={isFetching}
          currentPage={currentPage}
          setCurrentPage={(page: number) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default Pokemons;
