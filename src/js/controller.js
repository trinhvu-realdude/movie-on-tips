const getMoviesByCategory = async (endpoint) => {
    const response = await fetch(base_url + endpoint);
    const data = await response.json();
    return data;
}

const getMovieById = async (id, endpoint) => {
    const response = await fetch(base_url + endpoint + `/${id}`);
    const data = await response.json();
    return data;
}

const getMovieByTitle = async (title, endpoint) => {
    const response = await fetch(base_url + endpoint + `?title=${title}`);
    const data = await response.json();
    return data[0];
}

const getMoviesBySearch = async (search, endpoint) => {
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

const addMovieToFavourite = async (id, title, poster) => {
    const favourites = await getMoviesByCategory("favourites"); 

    if (isDuplicate(id, title, favourites)) {
        alert(`${title} already existed in your favourite list.`);
    } else {
        const response = await fetch(base_url + "favourites", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieId: id, title: title, poster: poster })
        });
        await response.json();
        
        alert(`Add ${title} movie to favourite successfully!`);
    }
}

const deleteMovieFavourite = async (id) => {
    const response = await fetch (base_url + `favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

const isDuplicate = (id, title, list) => {
    if (id != undefined) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].movieId == id && list[i].title == title) {
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