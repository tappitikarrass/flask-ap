async function fetch_anime(mal_id) {
    const response = await fetch("http://localhost:5000/anime/" + mal_id.toString(), { method: 'GET' });
    const anime_data = await response.json();
    document.getElementById("title").innerHTML = anime_data.title;
    document.getElementById("score_val").innerHTML = anime_data.score;
    document.getElementById("banner_image").src = anime_data.image_url;
    document.getElementById("rating_val").innerHTML = anime_data.rating;
    document.getElementById("duration_val").innerHTML = anime_data.duration;
    document.getElementById("episodes_val").innerHTML = anime_data.num_episodes;
    document.getElementById("media_type_val").innerHTML = anime_data.media_type;
    document.getElementById("synopsis_val").innerHTML = anime_data.synopsis;

    var genres = anime_data.genres.toString().replaceAll(",", ", ");
    document.getElementById("genres_val").innerHTML = genres;

    if (anime_data.num_episodes > 1) {
        document.getElementById("duration_key").innerHTML = "Average duration per ep.:";
    }
}

fetch_anime(339);
// fetch_anime(47);
// fetch_anime(666);
