import React, { Suspense, useState } from "react";
import cn from "classnames";
import { useQueryClient, QueryErrorResetBoundary } from "@tanstack/react-query";
import LoadMorePokemonList from "../components/LoadMorePokemonList";
import PaginatedPokemonList from "../components/PaginatedPokemonList";
import ErrorBoundary from "../components/ErrorBoundary";
import SkeletonGrid from "../components/SkeletonGrid";
import styles from "./Pokemons.module.css";

function Pokemons() {
  const [isPagination, setIsPagination] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const updatePagination = (value: boolean) => {
    setCurrentPage(1);
    if (!value) queryClient.resetQueries({ queryKey: ["pokemons"] });
    setIsPagination(value);
  };

  return (
    <div className={cn(styles.wrapper, isPagination ? styles.wrapperPagination : styles.wrapperInfinite)}>
      <h1 className={cn(styles.title)}>⚡ Pokédex</h1>
      <p className={cn(styles.subtitle)}>
        Discover and explore Pokemon with {isPagination ? "page controls" : "infinite scroll"}
      </p>

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

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary key={isPagination ? "pagination" : "infinite"} onReset={reset}>
            <Suspense fallback={<SkeletonGrid />}>
              {isPagination
                ? <PaginatedPokemonList currentPage={currentPage} setCurrentPage={setCurrentPage} />
                : <LoadMorePokemonList currentPage={currentPage} setCurrentPage={setCurrentPage} />
              }
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}

export default Pokemons;
