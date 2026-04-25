import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import { fetchPokemonDetails } from "../api/api";
import { getPokemonImageUrl } from "../api/utils";
import { statLabels } from "../const/statLabels";
import { typeColors } from "../const/typeColors";
import StatBar from "../components/StatBar";
import styles from "./PokemonDetails.module.css";

function PokemonDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["pokemon-details", id],
    queryFn: () => fetchPokemonDetails(id!),
  });

  if (isFetching) {
    return (
      <div className={cn(styles.spinnerWrapper)}>
        <div className={cn(styles.spinner)} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={cn(styles.errorWrapper)}>
        <p className={cn(styles.errorText)}>Failed to load Pokémon details.</p>
        <button className={cn(styles.retryBtn)} onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  const image = getPokemonImageUrl(data.id);
  const formattedId = `#${String(data.id).padStart(3, "0")}`;

  return (
    <div className={cn(styles.page)}>
      <button className={cn(styles.backBtn)} onClick={() => navigate(-1)}>
         Back to List
      </button>

      <div className={cn(styles.card)}>
        <div className={cn(styles.header)}>
          <h1 className={cn(styles.name)}> {data.name}</h1>
          <p className={cn(styles.pokemonId)}>{formattedId}</p>
        </div>

        <div className={cn(styles.body)}>
          {/* Left column */}
          <div className={cn(styles.leftCol)}>
            <div className={cn(styles.imageCircle)}>
              <img src={image} alt={data.name} className={cn(styles.image)} />
            </div>

            <div className={cn(styles.types)}>
              {data.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={cn(styles.typeBadge)}
                  style={{ backgroundColor: typeColors[type.name] ?? "#9ca3af" }}
                >
                  {type.name}
                </span>
              ))}
            </div>

            <div className={cn(styles.measurements)}>
              <div className={cn(styles.measurement)}>
                <span className={cn(styles.measureLabel)}>⚖ Height</span>
                <span className={cn(styles.measureValue)}>{data.height / 10} m</span>
              </div>
              <div className={cn(styles.measurement)}>
                <span className={cn(styles.measureLabel)}>🏠 Weight</span>
                <span className={cn(styles.measureValue)}>{data.weight / 10} kg</span>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className={cn(styles.rightCol)}>
            <div className={cn(styles.statsSection)}>
              <h2 className={cn(styles.sectionTitle)}>Base Stats</h2>
              {data.stats.map(({ stat, base_stat }) => (
                <StatBar
                  key={stat.name}
                  label={statLabels[stat.name] ?? stat.name}
                  value={base_stat}
                />
              ))}
            </div>

            <div>
              <h2 className={cn(styles.sectionTitle)}>Abilities</h2>
              <div className={cn(styles.abilities)}>
                {data.abilities.map(({ ability, is_hidden }) => (
                  <span key={ability.name} className={cn(styles.abilityBadge)}>
                    {ability.name}
                    {is_hidden && <span className={cn(styles.hiddenLabel)}>(Hidden)</span>}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className={cn(styles.sectionTitle)}>Base Experience</h2>
              <p className={cn(styles.baseExp)}>{data.base_experience} XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
