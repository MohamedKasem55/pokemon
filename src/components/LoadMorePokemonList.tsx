import React, { useEffect, useMemo, useTransition, useState } from "react";
import cn from "classnames";
import { useSuspenseQuery } from "@tanstack/react-query";
import PokemonListCard from "./PokemonListCard";
import { fetchPokemons } from "../api/api";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import styles from "./LoadMorePokemonList.module.css";

const PAGE_SIZE = 20;

function LoadMorePokemonList({
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [visiblePokemons, setVisiblePokemons] = useState<IPokemonListItem[]>([]);

  const { data: { pokemons, totalItems } } = useSuspenseQuery({
    queryKey: ["pokemons", currentPage],
    queryFn: () => fetchPokemons(currentPage),
  });

  const showMore = useMemo(
    () => !totalItems || visiblePokemons.length < totalItems,
    [visiblePokemons.length, totalItems]
  );

  useEffect(() => {
    if (!pokemons.length) return;
    setVisiblePokemons((prev) => [...prev, ...pokemons]);
  }, [pokemons]);

  const handleLoadMore = () => {
    startTransition(() => setCurrentPage(currentPage + 1));
  };

  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.grid)}>
        {visiblePokemons.map((pokemon) => (
          <PokemonListCard key={pokemon.id} {...pokemon} />
        ))}
      </div>

      {!!visiblePokemons.length && (
        <p className={cn(styles.showingText)}>Showing {visiblePokemons.length} Pokémon</p>
      )}

      <div className={cn(styles.footer)}>
        {isPending && (
          <div className={cn(styles.loadingRow)}>
            <div className={cn(styles.spinner)} />
            <span className={cn(styles.loadingText)}>Loading More Pokémon...</span>
          </div>
        )}
        {!isPending && showMore && (
          <button onClick={handleLoadMore} className={cn(styles.loadMoreBtn)}>
            Load More
          </button>
        )}
        {!isPending && !showMore && (
          <p className={cn(styles.allLoadedText)}>All {totalItems} Pokémon loaded</p>
        )}
      </div>
    </div>
  );
}

export default LoadMorePokemonList;
