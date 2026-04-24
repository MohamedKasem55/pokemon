import {   IPokemonDetailsResponse, IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import { IPokemonListResponse } from "../interfaces/pokemonsList.interface";
import { getPokemonId, getPokemonImageUrl } from "./utils";

export const fetchPokemons = async () : Promise <Array<IPokemonListItem>> => {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    let data : IPokemonListResponse = await response.json();
    return data.results.map((pokemon) => {
        let id = getPokemonId(pokemon.url);
        return {
            id,
            name: pokemon.name,
            image : getPokemonImageUrl(id)
        }
    })
}
export const fetchPokemonDetails = async (id: string) : Promise<IPokemonListItem> => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data:IPokemonDetailsResponse = await response.json();
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default || data.sprites.front_shiny || ""
    }
}