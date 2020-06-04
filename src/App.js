import React, { useState } from "react";

// Components
import FormSubmit from "./components/FormSearch";
import Loader from "./components/Loader";
import Error from "./components/Error";
import DetailsPokemon from "./components/DetailsPokemon";

function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchPokemon = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((res) => {
        if (res.status === 404) {
          setError("Pokémon no encontrado, intente de nuevo");
          setPokemon(null);
        }
        return res.json();
      })
      .then((json) => {
        setPokemon(json);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <main className="container">
      <section>
        <FormSubmit
          handleSearchPokemon={handleSearchPokemon}
          handleChange={handleChange}
          value={search}
          disabled={loading}
        />
        {loading && (
          <div className="w-100 d-flex justify-content-center mt-50px">
            <Loader />
          </div>
        )}
        {error && <Error message={error} />}
      </section>
      <section className="mt-20px">
        {pokemon && <DetailsPokemon pokemon={pokemon} />}
      </section>
    </main>
  );
}

export default App;
