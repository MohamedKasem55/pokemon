import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const loader = useRef<HTMLDivElement>(null);

  const showMore = useMemo(() => {
    return !totalItems || VisiblePokemons.length < totalItems;
  }, [VisiblePokemons.length, totalItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && showMore && !isFetching) {
          setCurrentPage((prev) => prev + 1);
          console.log(entries[0]);
        }
      },
      {
        threshold: 0.1,
      },
    );
    if (loader.current) observer.observe(loader.current!);
    return () => {
      if (loader.current) observer.unobserve(loader.current!);
    };
  }, [showMore, isFetching]);

  useEffect(() => {
    if (!pokemons.length) return;
    setVisiblePokemons((prev) => [...prev, ...pokemons]);
  }, [pokemons]);

  return (
    <div className=" w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-[80%] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
        {!!VisiblePokemons.length &&
          VisiblePokemons?.map((pokemon: IPokemonListItem) => {
            return <PokemonListCard key={pokemon.id} {...pokemon} />;
          })}
      </div>
      <div ref={loader}>
        {isFetching && (
          <div className="w-full flex flex-row justify-center items-center">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        )}
        {!showMore && (
          <div className="w-full flex flex-row justify-center items-center">
            <p className="text-sm text-gray-500">
              All {totalItems} Pokémon loaded
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfiniteScrollPokemonList;
