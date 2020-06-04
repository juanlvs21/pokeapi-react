import React from "react";

// Styles
import { input } from "../styles/modules/input.module.css";
import { btn } from "../styles/modules/btn.module.css";

const FormSearch = ({ handleSearchPokemon, handleChange, value, disabled }) => {
  return (
    <form
      className="w-full d-flex justify-content-center"
      onSubmit={handleSearchPokemon}
    >
      <input
        type="text"
        name="search"
        className={input}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      <button className={btn} disabled={disabled}>
        Buscar
      </button>
    </form>
  );
};

export default FormSearch;
