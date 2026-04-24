import React, { useEffect, useState } from "react";
import {
  IPokemonListItem,
  IPokemonDetailsResponse,
} from "../interfaces/pokemonDetails.interface";
import { fetchPokemonDetails } from "../api/api";

function PokemonListCard({ id,image,name }: IPokemonListItem) {

  return (
    <div className="rounded-lg bg-white border-gray-200 border-2 p-3 flex flex-col items-center gap-2">
        <img
          src={image}
          alt={name}
          loading="lazy"
        />
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">#{id}</p>
    </div>
  );
}

export default PokemonListCard;
