import React, { useTransition } from "react";
import cn from "classnames";
import { useSuspenseQuery } from "@tanstack/react-query";
import PokemonListCard from "../PokemonListCard/PokemonListCard";
import Pagination from "../Pagination/Pagination";
import { fetchPokemons } from "../../api/api";
import styles from "./PaginatedPokemonList.module.css";

const PAGE_SIZE = 20;

function PaginatedPokemonList({
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const { data: { pokemons, totalItems } } = useSuspenseQuery({
    queryKey: ["pokemons", currentPage],
    queryFn: () => fetchPokemons(currentPage),
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (page: number) => {
    startTransition(() => setCurrentPage(page));
  };

  return (
    <div className={cn(styles.wrapper, isPending && styles.pending)}>
      <div className={cn(styles.grid)}>
        {pokemons.map((pokemon) => (
          <PokemonListCard key={pokemon.id} {...pokemon} />
        ))}
      </div>

      <div className={cn(styles.paginationWrapper)}>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <div className={cn(styles.pageInfo)}>
          Page {currentPage} of {Math.ceil(totalItems / PAGE_SIZE)} ({PAGE_SIZE} items shown)
        </div>
      </div>
    </div>
  );
}

export default PaginatedPokemonList;
