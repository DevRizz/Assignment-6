const movieInput = document.querySelector("#movieInput");
const searchButton = document.querySelector("#search");
const output = document.querySelector("#result");
const API_KEY = "3c7a6cb0";

async function getSearchResults() {
    const query = movieInput.value.trim();

    if (query.length === 0) {
        output.innerHTML = `<p class="error">Please enter a movie name</p>`;
        return;
    }

    output.innerHTML = '<p class="loading">Searching...</p>';

    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            output.innerHTML = data.Search.map(movie => `
                <div class="movie">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450.png?text=No+Poster'}" alt="${movie.Title} poster">
                    <div class="movie-info">
                        <h2 class="movie-name">${movie.Title}</h2>
                        <p class="movie-year">${movie.Year}</p>
                    </div>
                </div>
            `).join('');
        } else {
            output.innerHTML = '<p class="error">No movies found. Please try another search.</p>';
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        output.innerHTML = '<p class="error">An error occurred while fetching data. Please try again later.</p>';
    }
}

searchButton.addEventListener('click', getSearchResults);
movieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getSearchResults();
    }
});
