import React, { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import PokemonListCard from "./PokemonListCard";
import SkeletonCard from "./SkeletonCard";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import styles from "./LoadMorePokemonList.module.css";

const PAGE_SIZE = 20;

function LoadMorePokemonList({
  pokemons,
  totalItems,
  isFetching,
  isError,
  onRetry,
  currentPage,
  setCurrentPage,
}: {
  pokemons: IPokemonListItem[];
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

  const isInitialLoad = isFetching && VisiblePokemons.length === 0;

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
        {isInitialLoad &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
        }
      </div>

      {!!VisiblePokemons.length && (
        <p className={cn(styles.showingText)}>Showing {VisiblePokemons.length} Pokémon</p>
      )}

      <div className={cn(styles.footer)}>
        {!isInitialLoad && isFetching && (
          <div className={cn(styles.loadingRow)}>
            <div className={cn(styles.spinner)} />
            <span className={cn(styles.loadingText)}>Loading More Pokémon...</span>
          </div>
        )}
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
