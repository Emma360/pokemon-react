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
          <div className="row">
            <div className="col-6 col-sm-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <button type="button" className="btn btn-outline-light">
                  <div className="card-body text-center bg-dark text-white">
                    <div key={pokemon.url}>
                      <h3 className="card-title">{pokemon.name}</h3>

                      <img src={pokemon.info.sprites.front_default} alt="" />
                      <h4> HP: {pokemon.info.stats[0].base_stat} </h4>
                      <h4> Attack: {pokemon.info.stats[1].base_stat} </h4>
                      <h4> Defence: {pokemon.info.stats[2].base_stat} </h4>
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
