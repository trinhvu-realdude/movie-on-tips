async function getMoviesByCategory(endpoint) {
    const response = await fetch(base_url + endpoint);
    const data = await response.json();

    return data;
}

async function getMovieById(id, endpoint) {
    const response = await fetch(base_url + endpoint + `/${id}`);
    const data = await response.json();
    return data;
}

async function getMovieByTitle(title, endpoint) {
    const response = await fetch(base_url + endpoint + `?title=${title}`);
    const data = await response.json();

    return data[0];
}

async function getMoviesBySearch(search, endpoint) {
    // let searchValue = document.getElementById("search").value;

    const response = await fetch(base_url + endpoint);
    const data = await response.json();

    let result = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(search.toLowerCase())) {
            result.push(data[i]);
        }
    }

    return result;
}