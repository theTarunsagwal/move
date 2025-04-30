const input = document.getElementById('input');
const form = document.getElementById('form');
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

fetchMovies(API_URL);

async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  const movieGrid = document.querySelector('.movie-grid');
  movieGrid.innerHTML = ''; 

  movies.forEach(movie => {
    const { title, poster_path, overview, vote_average } = movie;

    const movieCard = document.createElement('div');
    movieCard.classList.add('card');
    movieCard.style.background = `no-repeat center/cover url(${IMG_PATH + poster_path})`;


    movieCard.innerHTML = `
    
    <div class="card__content">
                  <p class="card__title">${title}<span>${vote_average}</span></p>
                  <p class="card__description">${overview}</p>
                </div>
      
                `;
                // <div class="overview">
                //   <h2></h2>
                //   <p>Overview</p>
                //   <h3 class="${getRatingClass(vote_average)}"></h3>
                //   <p></p>
                // </div>

    movieGrid.appendChild(movieCard);
  });
}

function getRatingClass(vote) {
  if (vote >= 8) return 'green';
  if (vote >= 5) return 'blue';
  return 'red';
}

// Search functionality
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = input.value.trim();

  if (searchTerm) {
    fetchMovies(SEARCH_API + searchTerm);
    input.value = ''; // Clear input
  }
});
