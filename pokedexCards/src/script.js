const containerEl = document.querySelector('#container');

const pokemonCount = 150;

const colors = {
  fire: '#fddfdf',
  grass: '#defde0',
  electric: '#fcf7de',
  fire: '#fddfdf',
  water: '#def3fd',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  flying: '#f5f5f5',
  fighting: '#e6e0d4',
  normal: '#f5f5f5',
};

const mainTypes = Object.keys(colors);

async function fechPokemon() {
  for (let i = 1; i <= pokemonCount; i++) {
    await getDataPokemon(i);
  }
}

async function getDataPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const res = await fetch(url);

  const pokeData = await res.json();

  createCardPokemon(pokeData);
}

function createCardPokemon(pokemon) {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const { id, name } = pokemon;

  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);

  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHtml = `
  <div class="image-container">
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png"
      alt="pokemon"
    />
  </div>

  <div class="pokemon-info">
    <span class="number">#0${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Tipo: <span>${type}</span></small>
  </div>
  `;

  pokemonEl.innerHTML = pokemonInnerHtml;

  containerEl.appendChild(pokemonEl);
}

fechPokemon();
