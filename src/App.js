import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
export const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      for (let pokemon of pokemons) {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        pokemon.info = pokemonData;
      }

      setPokemonDetails(pokemons);
    };

    fetchPokemonInfo();
  }, [pokemons]);

  return (
    <div>
      {pokemonDetails.map((pokemon) => {
        return (
          <div class="row">
            <div class="col-6 col-sm-4">
              <div class="card p-0 overflow-hidden h-100 shadow">
                <button type="button" class="btn btn-outline-light">
                  <div class="card-body text-center bg-dark text-white">
                    <div key={pokemon.url}>
                      <h3 class="card-title">{pokemon.name}</h3>
                      <img src={pokemon.info.sprites.front_default} alt="" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
