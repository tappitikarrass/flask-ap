import { getCookie } from './cookies.js';
import notify from './notify.js';

export default async function fetchAnime() {
    const token = getCookie('token');
    const queryString = document.getElementById('search-bar').value;
    const url = `http://localhost/backend/anime/search/${queryString}`;
    const response = await fetch(
        url,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    const animeData = await response.json();

    document.getElementById('title').innerHTML = animeData.title;
    document.getElementById('score_val').innerHTML = animeData.score;
    document.getElementById('banner_image').src = animeData.image_url;
    document.getElementById('rating_val').innerHTML = animeData.rating;
    document.getElementById('duration_val').innerHTML = animeData.duration;
    document.getElementById('episodes_val').innerHTML = animeData.num_episodes;
    document.getElementById('media_type_val').innerHTML = animeData.media_type;
    document.getElementById('synopsis_val').innerHTML = animeData.synopsis;

    if (response.status === 200) {
        document.getElementsByClassName('content-anime')[0].style.display = 'flex';
    } else {
        document.getElementsByClassName('content-anime')[0].style.display = 'none';
        notify('error', 'No results', 'No result found');
        return;
    }

    const genres = animeData.genres.toString().replaceAll(',', ', ');
    document.getElementById('genres_val').innerHTML = genres;

    if (animeData.num_episodes > 1) {
        document.getElementById('duration_key').innerHTML = 'Average duration per ep.:';
    }
}
