import React from "react";
import cn from "classnames";
import PokemonListCard from "./PokemonListCard";
import SkeletonCard from "./SkeletonCard";
import Pagination from "./Pagination";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import styles from "./PaginatedPokemonList.module.css";

const PAGE_SIZE = 20;

function PaginatedPokemonList({
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
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.grid)}>
        {isFetching
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
          : pokemons.map((pokemon) => <PokemonListCard key={pokemon.id} {...pokemon} />)
        }
      </div>

      {!isFetching && isError && (
        <div className={cn(styles.errorWrapper)}>
          <p className={cn(styles.errorText)}>Failed to load Pokémon. Please try again.</p>
          <button className={cn(styles.retryBtn)} onClick={onRetry}>Retry</button>
        </div>
      )}

      {!isFetching && !isError && (
        <div className={cn(styles.paginationWrapper)}>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={PAGE_SIZE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          <div className={cn(styles.pageInfo)}>
            Page {currentPage} of {Math.ceil(totalItems / PAGE_SIZE)} ({PAGE_SIZE} items shown)
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginatedPokemonList;
