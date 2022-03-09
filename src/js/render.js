const base_url = "http://localhost:3000/";

async function displayMoviesByCategory(endpoint) {
    const response = await fetch(base_url + endpoint);
    const data = await response.json();

    const list = document.getElementById("movie-list");

    for (let i = 0; i < data.length; i++) {
        if (data[i].poster !== "") {
            if (endpoint === "top-rated-india" || endpoint === "top-rated-movies") {
                const cards = `
                    <div class="container-poster">
                        <a onclick="getMovieByTitle('${data[i].title}', '${endpoint}')">
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
                        <a onclick="getMovieById('${data[i].id}', '${endpoint}')">
                            <img class="poster" src="../img/${data[i].poster}" alt="${data[i].title}">
                            <div class="movie-info">
                                <div class="movie-title">${data[i].title}</div>
                            </div>
                        </a>
                    </div>
                `;
                list.innerHTML += cards;
            }
        }
    }
}

async function getMovieById(id, endpoint) {
    const response = await fetch(base_url + endpoint);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            console.log(data[i]);
        }
    }
}

async function getMovieByTitle(title, endpoint) {
    const response = await fetch(base_url + endpoint);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        if (data[i].title === title) {
            console.log(data[i]);
        }
    }
}