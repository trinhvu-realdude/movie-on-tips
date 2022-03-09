async function displayMovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    const list = document.getElementById("movie-list");

    for (let i = 0; i < data.length; i++) {
        if (data[i].poster !== "") {
            const cards = `
                <img class="poster" src="../img/${data[i].poster}" alt="${data[i].title}" width="240" height="360">
            `;
            list.innerHTML += cards;
        }
    }
}