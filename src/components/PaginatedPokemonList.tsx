import React from "react";
import cn from "classnames";
import PokemonListCard from "./PokemonListCard";
import Pagination from "./Pagination";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import styles from "./PaginatedPokemonList.module.css";

function PaginatedPokemonList({
  pokemons,
  totalItems,
  isFetching,
  currentPage,
  setCurrentPage,
}: {
  pokemons: IPokemonListItem[];
  totalItems: number;
  isFetching: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.grid)}>
        {pokemons.map((pokemon) => (
          <PokemonListCard key={pokemon.id} {...pokemon} />
        ))}
      </div>

      {isFetching && (
        <div className={cn(styles.loadingWrapper)}>
          <p className={cn(styles.loadingText)}>Loading...</p>
        </div>
      )}

      <div className={cn(styles.paginationWrapper)}>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={20}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className={cn(styles.pageInfo)}>
          Page {currentPage} of {Math.ceil(totalItems / 20)} (20 items shown)
        </div>
      </div>
    </div>
  );
}

export default PaginatedPokemonList;
