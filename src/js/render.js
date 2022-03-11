const base_url = "http://localhost:3000/";

const displayMoviesByCategory = async (endpoint) => {
    const data = await getMoviesByCategory(endpoint);
    const list = document.getElementById("movie-list");
    endpoint != "favourites" ? show(data, list, endpoint) : showFavourites(data, list);
}

const displayMovieById = async (id, endpoint) => {
    const data = await getMovieById(id, endpoint);
    console.log(data);
}

const displayMovieByTitle = async (title, endpoint) => {
    const data = await getMovieByTitle(title, endpoint);
    console.log(data);
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
                    <div class="poster" style="background-image: url('../img/${data[i].poster}')" data-text="${data[i].title}">
                        <div class="heart-icon">
                            <img src='../img/heart.png' width="30" height="30" onclick="clickHeartButton(${data[i].id}, '${data[i].title}', '${data[i].poster}')">
                        </div>
                    </div>
                </div>
            `;

            const posterForTitle = `
                <div class="container-poster">
                    <div class="poster" style="background-image: url('../img/${data[i].poster}')" data-text="${data[i].title}">
                        <div class="heart-icon">
                            <img src='../img/heart.png' width="30" height="30" onclick="clickHeartButton(${data[i].id}, '${data[i].title}', '${data[i].poster}')">
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
        for (let i = 0; i < data.length; i++) {
            if (data[i].poster !== "") {
                const posters = `
                    <div class="container-poster">
                        <div class="poster" style="background-image: url('../img/${data[i].poster}')" data-text="${data[i].title}">
                            <div class="heart-icon">
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

const clickHeartButton = async (id, title, poster) => {
    const favourites = await getMoviesByCategory("favourites");

    if (isDuplicate(id, title, favourites)) {
        alert(`${title} already existed in your favourite list.`);
    } else {
        await addMovieToFavourite(id, title, poster);
    }
}

const clickGarbageButton = async (id) => {
    if (confirm("Are you sure to delete the movie?") == true) {
        await deleteMovieFavourite(id);
    }
}

const isDuplicate = (id, title, list) => {
    if (id != undefined) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].movieId == id) {
                return true;
            } 
        }
        return false;
    } else {
        for (let i = 0; i < list.length; i++) {
            if (list[i].title == title) {
                return true;
            } 
        }
        return false;
    }
}