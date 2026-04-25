import React, { useState } from "react";
import cn from "classnames";
import { fetchPokemons } from "../api/api";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadMorePokemonList from "../components/LoadMorePokemonList";
import PaginatedPokemonList from "../components/PaginatedPokemonList";
import styles from "./Pokemons.module.css";

function Pokemons() {
  const [isPagination, setIsPagination] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const {
    data: { pokemons, totalItems },
    isFetching,
    isError,
    refetch,
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
    <div className={cn(styles.wrapper, isPagination ? styles.wrapperPagination : styles.wrapperInfinite)}>
      <h1 className={cn(styles.title)}>Pokedex</h1>
      <p className={cn(styles.subtitle)}>Discover and explore Pokemon with page Controls</p>

      <div className={cn(styles.controls)}>
        <button
          onClick={() => updatePagination(true)}
          className={cn(styles.btn, isPagination ? styles.btnActive : styles.btnInactive)}
        >
          Page Controls
        </button>
        <button
          onClick={() => updatePagination(false)}
          className={cn(styles.btn, isPagination ? styles.btnInactive : styles.btnActive)}
        >
          Infinite Scroll
        </button>
      </div>

      {isPagination ? (
        <PaginatedPokemonList
          pokemons={pokemons}
          totalItems={totalItems}
          isFetching={isFetching}
          isError={isError}
          onRetry={refetch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <LoadMorePokemonList
          pokemons={pokemons}
          totalItems={totalItems}
          isFetching={isFetching}
          isError={isError}
          onRetry={refetch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Pokemons;
