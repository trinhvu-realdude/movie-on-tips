const base_url = "http://localhost:3000/";

const displayMoviesByCategory = async (endpoint) => {
    const data = await getMoviesByCategory(endpoint);
    const list = document.getElementById("movie-list");
    endpoint != "favourites" ? show(data, list, endpoint) : showFavourites(data, list);
}

const displayMovieById = async (id, endpoint) => {
    const data = await getMovieById(id, endpoint);
    showSpecificMovie(data);
}

const displayMovieByTitle = async (title, endpoint) => {
    const data = await getMovieByTitle(title, endpoint);
    showSpecificMovie(data);
}

const searchMovies = async (endpoint) => {
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

const show = (data, list, endpoint) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].poster !== "") {
            const posterForId = `
                <div class="container-poster">
                    <div class="poster" style="background-image: url('../img/${data[i].poster}')" data-text="${data[i].title}" onclick="displayMovieById(${data[i].id}, '${endpoint}')">
                        <div class="button-icon">
                            <img src='../img/heart.png' width="30" height="30" onclick="clickHeartButton(event, ${data[i].id}, '${data[i].title}', '${data[i].poster}')">
                        </div>
                    </div>
                </div>
            `;

            const posterForTitle = `
                <div class="container-poster">
                    <div class="poster" style="background-image: url('../img/${data[i].poster}')" data-text="${data[i].title}" onclick="displayMovieByTitle('${data[i].title}', '${endpoint}')">
                        <div class="button-icon">
                            <img src='../img/heart.png' width="30" height="30" onclick="clickHeartButton(event, ${data[i].id}, '${data[i].title}', '${data[i].poster}');">
                        </div>
                    </div>
                </div>
            `;
            list.innerHTML += endpoint === "top-rated-india" || endpoint === "top-rated-movies" ? posterForTitle : posterForId;
        }
    }
}

const showFavourites = (data, list) => {
    if (data.length != 0) {
        for (let i = data.length-1; i >= 0; i--) {
            if (data[i].poster !== "") {
                const posters = `
                    <div class="container-poster">
                        <div class="poster" style="background-image: url('../img/${data[i].poster}')" data-text="${data[i].title}">
                            <div class="button-icon">
                                <i class="fa fa-trash-o" style="font-size:30px;color:blue" onclick="clickGarbageButton(${data[i].id})"></i>
                            </div>
                        </div>
                    </div>
                `;
                list.innerHTML += posters;
            }
        } 
    } else {
        const display = `
            <div class="container-poster" style="font-size:20px">
                Your favourite list is empty
            </div>
        `;
        list.innerHTML += display;
    }
}

const showSpecificMovie = (data) => {
    let sum = 0;

    data.ratings.forEach(e => {
        sum += e;
    });

    let averageRating = (sum/data.ratings.length).toFixed(1);

    const modal = document.getElementById("modal");

    modal.style.display = "block";

    const movie = `
        <div class="modal-content">
            <span class="close" onclick="clickCloseButton()">&times;</span>
            <div class="left-side">
                <div class="left-side-content">
                    <h2 style="padding-bottom: 10px">${data.title}</h2>
                    <img src="../img/${data.poster}"/><br>
                    <button class="favourite-button" onclick="clickHeartButton(event, ${data.id}, '${data.title}', '${data.poster}')">Add to favourite</button>
                </div>
            </div>
            <div class="right-side">
                <div class="blank" style="height: 40px"></div>
                <div class="release-date">
                    Release Date: <strong>${data.releaseDate}</strong>
                </div>
                <div class="list-genre">
                    Genres: <strong>${data.genres.join(", ")}</strong>
                </div>
                <div class="list-cast">
                    Cast: <strong>${data.actors.join(", ")}</strong>
                </div>
                <div class="average-rating">
                    Average Rating: <strong>${averageRating}</strong>
                </div>
                <div class="imdb-rating">
                    IMDb Rating: <strong>${data.imdbRating == "" ? "0.0" : data.imdbRating}</strong>
                </div>
                <div class="description" style="line-height: 25px">
                    <strong>Description:</strong> ${data.storyline}
                </div>
            </div>
        </div>
    `;
    modal.innerHTML = movie;
}

const clickHeartButton = (event, id, title, poster) => {
    addMovieToFavourite(id, title, poster);
    event.stopPropagation();
}

const clickGarbageButton = (id) => {
    if (confirm("Are you sure to delete the movie?") == true) {
        deleteMovieFavourite(id);
    }
}

const clickCloseButton = () => {
    const modal = document.getElementById("modal");

    modal.style.display = "none";
}