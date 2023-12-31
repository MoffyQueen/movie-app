const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
  
const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search")

const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
};

getMovies(API_URL);

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
          
        movieEl.innerHTML = `
      <img src = "${IMG_PATH + poster_path}" alt = "${title}" />
      <div class = 'movie-info'>
        <h3>${title}</h3>
        <span> ${vote_average} </span>
      </div>
      <div class= 'overview'>
        <h3>Overview</h3>
        ${overview}
      </div>
      `;
        
        main.appendChild(movieEl);
    });
}

function giveClassByRate(rate) {
    if (rate >= 8) {
        return "green";
    } else if (rate >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.Value.trim();
    console.log(searchTerm);
    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }
});