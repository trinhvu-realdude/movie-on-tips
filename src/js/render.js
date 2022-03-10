const base_url = "http://localhost:3000/";

async function displayMoviesByCategory(endpoint) {
    const data = await getMoviesByCategory(endpoint);
    const list = document.getElementById("movie-list");
    show(data, list, endpoint);
}

async function displayMovieById(id, endpoint) {
    const data = await getMovieById(id, endpoint);
    console.log(data);
}

async function displayMovieByTitle(title, endpoint) {
    const data = await getMovieByTitle(title, endpoint);
    console.log(data);
}

async function searchMovies(endpoint) {
    let search = document.getElementById("search").value;
    const data = await getMoviesBySearch(search, endpoint);
    const movieList = document.getElementById("movie-list");
    const searchList = document.getElementById("search-list");

    if (search === "") {
        movieList.style.display = "block";
        searchList.style.display = "none";
    } else {
        movieList.style.display = "none";
        searchList.style.display = "block";

        while (searchList.children.length !== 0) {
            searchList.removeChild(searchList.children[0]);
        }
        show(data, searchList, endpoint);
    }
}

async function show(data, list, endpoint) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].poster !== "") {
            if (endpoint === "top-rated-india" || endpoint === "top-rated-movies") {
                const cards = `
                    <div class="container-poster">
                        <a onclick="displayMovieByTitle('${data[i].title}', '${endpoint}')">
                            <img class="poster" src="../img/${data[i].poster}" alt="${data[i].title}">
                            <div class="movie-info">
                                <div class="movie-title">${data[i].title}</div>
                            </div>
                        </a>
                    </div>
                `;
                list.innerHTML += cards;
            } else {
                const cards = `
                    <div class="container-poster">
                        <a onclick="displayMovieById('${data[i].id}', '${endpoint}')">
                            <img class="poster" src="../img/${data[i].poster}" alt="${data[i].title}">
                        </a>
                    </div>
                `;
                list.innerHTML += cards;
            }
        }
    }
}