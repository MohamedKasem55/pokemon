import React, { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import PokemonListCard from "./PokemonListCard";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import styles from "./LoadMorePokemonList.module.css";

function LoadMorePokemonList({
  pokemons,
  totalItems,
  isFetching,
  isError,
  onRetry,
  currentPage,
  setCurrentPage,
}: {
  pokemons: Array<any>;
  totalItems: number;
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
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
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.grid)}>
        {VisiblePokemons.map((pokemon: IPokemonListItem) => (
          <PokemonListCard key={pokemon.id} {...pokemon} />
        ))}
      </div>

      <div className={cn(styles.footer)}>
        {isFetching && <div className={cn(styles.spinner)} />}
        {!isFetching && isError && (
          <div className={cn(styles.errorWrapper)}>
            <p className={cn(styles.errorText)}>Failed to load Pokémon. Please try again.</p>
            <button className={cn(styles.retryBtn)} onClick={onRetry}>Retry</button>
          </div>
        )}
        {!isFetching && !isError && showMore && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className={cn(styles.loadMoreBtn)}
          >
            Load More
          </button>
        )}
        {!isFetching && !isError && !showMore && (
          <p className={cn(styles.allLoadedText)}>All {totalItems} Pokémon loaded</p>
        )}
      </div>
    </div>
  );
}

export default LoadMorePokemonList;
