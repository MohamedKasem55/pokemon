import React, { useEffect, useState } from "react";
import { fetchPokemons } from "../api/api";
import PokemonListCard from "../components/PokemonListCard";
import {
  IPokemonListItemResponse,
  IPokemonListResponse,
} from "../interfaces/pokemonsList.interface";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import Pagination from "../components/Pagination";
import {useQuery} from "@tanstack/react-query";
function Pokemons() {

  const [isPagination, setIsPagination] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {data: {pokemons, totalItems},isFetching} = useQuery<{
    pokemons: IPokemonListItem[];
    totalItems: number;
}>({
    queryKey: ["pokemons", currentPage],
    queryFn: () => fetchPokemons(currentPage),
    initialData: { pokemons: [], totalItems: 0 },
    
  });  
  return (
    <div
      className={`${isPagination ? "bg-[#EAF0FE]" : "bg-[#E3FBED]"} h-[100%] flex flex-col gap-4 py-10 items-center justify-center`}
    >
      <h1 className="text-lg font-bold">Pokedex</h1>
      <p className="text-sm text-gray-500">
        Discover and explore Pokemon with page Controls
      </p>
      <div className="flex flex-row gap-4 flex-wrap p-2 items-center justify-center">
        <button
          onClick={() => setIsPagination(true)}
          className={`cursor-pointer px-4 py-3 rounded-lg ${isPagination ? "text-white bg-black" : "bg-white text-black"}`}
        >
          Page Controls
        </button>
        <button
          onClick={() => setIsPagination(false)}
          className={`cursor-pointer px-4 py-3 rounded-lg ${isPagination ? "bg-white text-black" : "text-white bg-black"}`}
        >
          Infinite Scroll
        </button>
      </div>
      <div className="w-[80%] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
        { !!pokemons.length && pokemons?.map((pokemon: any) => {
          return <PokemonListCard {...pokemon} />;
        })}
      </div>
      {( isFetching) && (
        <div className="w-full flex flex-row justify-center items-center">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      )}
      {isPagination && (
        <div className="w-full flex flex-row justify-center items-center">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={20}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default Pokemons;
