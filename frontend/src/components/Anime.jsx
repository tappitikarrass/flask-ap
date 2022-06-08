import React from 'react';
import Button from './UIParts/Button';
import '../scss/anime.scss';

async function searchAnime() {
  const queryString = document.getElementById('search-bar').value;
  const url = `http://localhost/backend/anime/search/${queryString}`;
  const response = await fetch(
    url,
    {
      method: 'GET',
    },
  );
  const animeData = await response.json();

  if (response.status === 200) {
    document.getElementsByClassName('content-anime')[0].style.display = 'flex';
  } else {
    document.getElementsByClassName('content-anime')[0].style.display = 'none';
    return;
  }

  const genres = animeData.genres.toString().replaceAll(',', ', ');
  document.getElementById('genres_val').innerHTML = genres;

  if (animeData.num_episodes > 1) {
    document.getElementById('duration_key').innerHTML = 'Average duration per ep.:';
  }
}

function AnimeTable() {
  return (
    <p>TODO: Create field component; make new anime layout</p>
  );
}

class Anime extends React.PureComponent {
  render() {
    return (
      <div id="anime">
        <div id="anime-search" className="fields-row">
          <input
            type="text"
            name="anime_search"
            placeholder="Search"
            className="field"
            id="search-bar"
          />
          <Button id="search-bt" value="Search" onClick={() => searchAnime()} />
        </div>
        <div className="content-anime">
          <div id="image">
            <img id="banner_image" src="" alt="Banner" />
          </div>
          <div id="info">
            <div id="summary">
              <h2 id="title">Title</h2>
            </div>
            <AnimeTable />
            <div id="text">
              <p id="synopsis_val" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// <table>
//   <tr>
//     <td className="key">Score:</td>
//     <td className="val" id="score_val" />
//   </tr>
//   <tr>
//     <td className="key">Genres:</td>
//     <td className="val" id="genres_val" />
//   </tr>
//   <tr>
//     <td className="key" id="duration_key">
//       Duration:
//     </td>
//     <td className="val" id="duration_val" />
//   </tr>
//   <tr>
//     <td className="key">Media type:</td>
//     <td className="val" id="media_type_val" />
//   </tr>
//   <tr>
//     <td className="key">Number of episodes:</td>
//     <td className="val" id="episodes_val" />
//   </tr>
//   <tr>
//     <td className="key">Rating:</td>
//     <td className="val" id="rating_val" />
//   </tr>
// </table>

export default Anime;
