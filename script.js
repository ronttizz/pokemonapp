const pokedex = document.querySelector("#grid");
const API = fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");

API.then((res) => res.json()).then((data) => {
  const fetches = data.results.map((pokemon) => {
    return fetch(pokemon.url).then((res) => res.json());
  });
  Promise.all(fetches).then((res) => displayPokemon(res));
});

const displayPokemon = (pokemons) => {
  pokemons.forEach((pokemon) => {
    const types = [];
    pokemon.types.forEach((type) => types.push(type.type.name));
    let typesString = types.join(" ");
    pokedex.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
       <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" class="cardImage"/>
       <div class="cardName">
         <p class="pokemonName">${pokemon.name}</p>
         <p class="types">${typesString}</p>
       </div>
     </div>`
    );
  });
};
