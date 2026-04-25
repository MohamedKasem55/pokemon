import React, { useState } from "react";
import cn from "classnames";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import styles from "./PokemonListCard.module.css";

function PokemonListCard({ id, image, name }: IPokemonListItem) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={cn(styles.card)}>
      <div className={cn(styles.imageWrapper)}>
        {!imageLoaded && <div className={cn(styles.skeleton)} />}
        <img
          src={image}
          alt={name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={cn(styles.image, imageLoaded ? styles.imageVisible : styles.imageHidden)}
        />
      </div>
      <h3 className={cn(styles.name)}>{name}</h3>
      <p className={cn(styles.pokemonId)}>#{id}</p>
    </div>
  );
}

export default PokemonListCard;
