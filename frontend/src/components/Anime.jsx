import React from 'react';
import Button from './UIParts/Button';
import Field from './UIParts/Field';
import '../scss/Anime.scss';
import '../scss/UI.scss';

function AnimeSearch() {
  async function searchAnime() {
    const queryString = encodeURIComponent(
      document.getElementById('anime-search-bar').value,
    );
    const url = 'http://localhost/backend/anime/search/';
    const response = await fetch(
      url,
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryString }),
      },
    );
    const animeData = await response.json();

    document.getElementById('anime-title').innerHTML = animeData.title;
    document.getElementById('score').innerHTML = animeData.score;
    document.getElementById('anime-banner').src = animeData.image_url;
    document.getElementById('rating').innerHTML = animeData.rating;
    document.getElementById('duration').innerHTML = animeData.duration;
    document.getElementById('episodes').innerHTML = animeData.num_episodes;
    document.getElementById('media-type').innerHTML = animeData.media_type;
    document.getElementById('anime-description').innerHTML = animeData.synopsis;

    const genres = animeData.genres.toString().replaceAll(',', ', ');
    document.getElementById('genres').innerHTML = genres;

    if (animeData.num_episodes > 1) {
      document.getElementById('duration-key').innerHTML = 'Average episode duration:';
    }
  }

  return (
    <div id="anime-search" className="ui-row">
      <Field id="anime-search-bar" fieldClass="field" type="search" placeholder="Search" />
      <Button id="anime-search-bt" buttonClass="bt-blue-end" value="Search" onClick={() => searchAnime()} />
    </div>
  );
}

function AnimeTable() {
  return (
    <table id="anime-info-table">
      <tbody>
        <tr>
          <td className="key">Score:</td>
          <td className="value" id="score" />
        </tr>
        <tr>
          <td className="key">Genres:</td>
          <td className="value" id="genres" />
        </tr>
        <tr>
          <td className="key" id="duration-key">
            Duration:
          </td>
          <td className="value" id="duration" />
        </tr>
        <tr>
          <td className="key">Media:</td>
          <td className="value" id="media-type" />
        </tr>
        <tr>
          <td className="key">Episodes:</td>
          <td className="value" id="episodes" />
        </tr>
        <tr>
          <td className="key">Rating:</td>
          <td className="value" id="rating" />
        </tr>
      </tbody>
    </table>
  );
}

function Anime() {
  return (
    <div id="anime" className="content">
      <AnimeSearch />
      <h2 id="anime-title">Title</h2>
      <div id="anime-info">
        <img id="anime-banner" alt="anime-banner" />
        <AnimeTable />
      </div>
      <div id="anime-description" />
    </div>
  );
}

export default Anime;
