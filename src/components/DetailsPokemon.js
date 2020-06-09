import React from "react";

// Styles
import {
  card,
  cardContent,
  cardImage,
} from "../styles/modules/card.module.css";

const DetailsPokemon = ({ pokemon }) => {
  return (
    <div className={card}>
      <div className={cardContent}>
        <h1>{pokemon.name}</h1>
        <img
          className={cardImage}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>
    </div>
  );
};

export default DetailsPokemon;
