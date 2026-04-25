import React, { useEffect, useState } from "react";
import {
  IPokemonListItem,
  IPokemonDetailsResponse,
} from "../interfaces/pokemonDetails.interface";
import { fetchPokemonDetails } from "../api/api";

function PokemonListCard({ id, image, name }: IPokemonListItem) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="rounded-lg bg-white border-gray-200 border-2 p-3 flex flex-col items-center gap-2">
      <div className="relative w-full h-32">

      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={image}
        alt={name}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      </div>

      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-500">#{id}</p>
    </div>
  );
}

export default PokemonListCard;
