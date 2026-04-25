import React, { useEffect, useMemo, useState } from "react";
import PokemonListCard from "./PokemonListCard";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";

function InfiniteScrollPokemonList({
  pokemons,
  totalItems,
  isFetching,
  currentPage,
  setCurrentPage,
}: {
  pokemons: Array<any>;
  totalItems: number;
  isFetching: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const [VisiblePokemons, setVisiblePokemons] = useState<IPokemonListItem[]>([]);

  const showMore = useMemo(() => {
    return !totalItems || VisiblePokemons.length < totalItems;
  }, [VisiblePokemons.length, totalItems]);

  useEffect(() => {
    if (!pokemons.length) return;
    setVisiblePokemons((prev) => [...prev, ...pokemons]);
  }, [pokemons]);

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-[80%] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {VisiblePokemons.map((pokemon: IPokemonListItem) => (
          <PokemonListCard key={pokemon.id} {...pokemon} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 py-4">
        {isFetching && (
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
        )}
        {!isFetching && showMore && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            Load More
          </button>
        )}
        {!showMore && (
          <p className="text-sm text-gray-500">All {totalItems} Pokémon loaded</p>
        )}
      </div>
    </div>
  );
}

export default InfiniteScrollPokemonList;
