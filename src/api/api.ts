import {
  IPokemonDetailsResponse,
  IPokemonListItem,
} from "../interfaces/pokemonDetails.interface";
import { IPokemonListResponse } from "../interfaces/pokemonsList.interface";
import { getPokemonId, getPokemonImageUrl } from "./utils";

export const fetchPokemons = async (currentPage:number): Promise<{
  pokemons: Array<IPokemonListItem>;
  totalItems: number;
}> => {
  const offset = (currentPage - 1) * 20;
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
  );
  let data: IPokemonListResponse = await response.json();
  let pokemons: Array<IPokemonListItem> = data.results.map((pokemon) => {
    let id = getPokemonId(pokemon.url);
    return {
      id,
      name: pokemon.name,
      image: getPokemonImageUrl(id),
    };
  });
  return { pokemons, totalItems: data.count };
};
export const fetchPokemonDetails = async (
  id: string,
): Promise<IPokemonDetailsResponse> => {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
};
