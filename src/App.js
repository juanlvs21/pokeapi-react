import React, { Component } from "react";
import axios from "axios";

// Components
import FormSubmit from "./components/FormSearch";
import Loader from "./components/Loader";
import Error from "./components/Error";
import DetailsPokemon from "./components/DetailsPokemon";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: null,
      loading: false,
      error: false,
      search: "",
    };
  }

  handleSearchPokemon = (e) => {
    e.preventDefault(); // Prevents sending the form so that the page does not reload
    this.setState({
      loading: true, // The state of loading is changed to true, to show the load spinner
      error: false, // Errors are cleaned
    });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`)
      .then(({ data }) => {
        this.setState({
          pokemon: data,
        });
      })
      .catch((err) => {
        // If an error occurs, it is captured
        if (err.response && err.response.status === 404) {
          // If it is a 404 error answer that the Pokemon was not found
          this.setState({
            pokemon: null,
            error: "Pokémon no encontrado, intente de nuevo",
          });
        } else {
          // Otherwise, generalize that an error has occurred
          this.setState({
            pokemon: null,
            error: "Lo sentimos, ha ocurrido un error. Intente de nuevo",
          });
        }
      })
      .finally(() => this.setState({ loading: false })); // At the end of the request (regardless if a correct answer or an error) the state of loading stops
  };

  handleChange = (e) => this.setState({ search: e.target.value });

  render() {
    return (
      <main className="container">
        <section>
          <FormSubmit
            handleSearchPokemon={this.handleSearchPokemon}
            handleChange={this.handleChange}
            value={this.state.search}
            disabled={this.loading}
          />
          {/* If it is loading it shows the spinner */}
          {this.state.loading && (
            <div className="w-100 d-flex justify-content-center mt-50px">
              <Loader />
            </div>
          )}
          {/* If there is an error it displays the error message */}
          {this.state.error && <Error message={this.state.error} />}
        </section>

        <section className="mt-20px">
          {/* If the Pokemon exists its details are shown */}
          {this.state.pokemon && (
            <DetailsPokemon pokemon={this.state.pokemon} />
          )}
        </section>
      </main>
    );
  }
}

export default App;

// import React, { useState } from "react";
// import axios from "axios";

// // Components
// import FormSubmit from "./components/FormSearch";
// import Loader from "./components/Loader";
// import Error from "./components/Error";
// import DetailsPokemon from "./components/DetailsPokemon";

// function App() {
//   const [search, setSearch] = useState("");
//   const [pokemon, setPokemon] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearchPokemon = (e) => {
//     e.preventDefault(); // Prevents sending the form so that the page does not reload
//     setLoading(true); // The state of loading is changed to true, to show the load spinner
//     setError(null); // Errors are cleaned

//     axios
//       .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
//       .then(({ data }) => {
//         setPokemon(data); // The data obtained is saved
//       })
//       .catch((err) => {
//         // If an error occurs, it is captured
//         if (err.response && err.response.status === 404) {
//           // If it is a 404 error answer that the Pokemon was not found
//           setError("Pokémon no encontrado, intente de nuevo");
//           setPokemon(null);
//         } else {
//           // Otherwise, generalize that an error has occurred
//           setError("Lo sentimos, ha ocurrido un error. Intente de nuevo");
//           setPokemon(null);
//         }
//       })
//       .finally(() => setLoading(false)); // At the end of the request (regardless if a correct answer or an error) the state of loading stops
//   };

//   const handleChange = (e) => setSearch(e.target.value);

//   return (
//     <main className="container">
//       <section>
//         <FormSubmit
//           handleSearchPokemon={handleSearchPokemon}
//           handleChange={handleChange}
//           value={search}
//           disabled={loading}
//         />
//         {/* If it is loading it shows the spinner */}
//         {loading && (
//           <div className="w-100 d-flex justify-content-center mt-50px">
//             <Loader />
//           </div>
//         )}
//         {/* If there is an error it displays the error message */}
//         {error && <Error message={error} />}
//       </section>

//       <section className="mt-20px">
//         {/* If the Pokemon exists its details are shown */}
//         {pokemon && <DetailsPokemon pokemon={pokemon} />}
//       </section>
//     </main>
//   );
// }

// export default App;
