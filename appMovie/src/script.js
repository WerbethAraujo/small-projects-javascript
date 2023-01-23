const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c06964cad59126fde61ff985e71ffff9&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=c06964cad59126fde61ff985e71ffff9&query="';

const form = document.querySelector('.form');
const searchEl = document.querySelector('#search');
const main = document.querySelector('#main');

getMoviesApi(API_URL);

async function getMoviesApi(url) {
  const res = await fetch(url);

  const data = await res.json();

  hendleMoviesData(data.results);
}

function hendleMoviesData(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;

    const movieEl = document.createElement('div');

    movieEl.classList.add('movie');

    movieEl.innerHTML = `<img
           src="${IMG_PATH + poster_path}"
           alt="${title}"
       />
         <div class="movie-info">
           <h3>${title}</h3>
           <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview" id="overview">
          <h3>Overview</h3>
          <p>
           ${overview}
         </p>
       </div>`;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 6) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = searchEl.value;

  if (searchTerm && searchTerm !== '') {
    getMoviesApi(SEARCH_API + searchTerm);

    searchEl.value = '';
  } else {
    window.location.reload();
  }
});
