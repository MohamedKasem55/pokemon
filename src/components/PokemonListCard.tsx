import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { IPokemonListItem } from "../interfaces/pokemonDetails.interface";
import styles from "./PokemonListCard.module.css";

function PokemonListCard({ id, image, name }: IPokemonListItem) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={cn(styles.card)} onClick={() => navigate(`/pokemon/${id}`)}>
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
      <p className={cn(styles.pokemonId)}>#{String(id).padStart(3, "0")}</p>
    </div>
  );
}

export default PokemonListCard;
