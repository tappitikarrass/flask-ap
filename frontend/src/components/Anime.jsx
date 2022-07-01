import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../scss/Anime.scss';

function AnimeSearch() {
  const { malId } = useParams();
  const searchForm = useRef();
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'username']);

  const {
    register,
    handleSubmit,
  } = useForm();

  /* istanbul ignore next */
  function loadAnime(animeData) {
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

  useEffect(() => {
    /* istanbul ignore next */
    async function effect() {
      const response = await fetch(
        `http://localhost/backend/anime/${malId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      const animeData = await response.json();
      /* istanbul ignore if */
      if (response.status === 200) {
        loadAnime(animeData);
        document.getElementById('anime-title').style.display = 'inline';
        document.getElementById('anime-info').style.display = 'flex';
        document.getElementById('anime-description').style.display = 'flex';

        document.getElementById('msg-error').style.display = 'none';
      }
      if (response.status === 400) {
        document.getElementById('msg-error').style.display = 'inline';

        document.getElementById('anime-title').style.display = 'none';
        document.getElementById('anime-info').style.display = 'none';
        document.getElementById('anime-description').style.display = 'none';
      }
    }

    /* istanbul ignore if */
    if (cookies.token === 'undefined') {
      navigate('/login');
    } else {
      effect();
    }
  });

  /* istanbul ignore next */
  async function onSubmit() {
    const queryData = new FormData(searchForm.current);
    const queryDataJson = JSON.stringify(Object.fromEntries(queryData));

    const response = await fetch(
      'http://localhost/backend/anime/search/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: queryDataJson,
      },
    );

    const animeData = await response.json();
    if (response.status === 200) {
      loadAnime(animeData);
      document.getElementById('anime-title').style.display = 'inline';
      document.getElementById('anime-info').style.display = 'flex';
      document.getElementById('anime-description').style.display = 'flex';

      document.getElementById('msg-error').style.display = 'none';
    }
    if (response.status === 400) {
      document.getElementById('msg-error').style.display = 'inline';

      document.getElementById('anime-title').style.display = 'none';
      document.getElementById('anime-info').style.display = 'none';
      document.getElementById('anime-description').style.display = 'none';
    }
  }

  return (
    <div
      id="anime-search"
      className="ui-row"
    >
      <form
        id="anime-search-form"
        ref={searchForm}
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        acceptCharset="utf-8"
      >
        <input
          id="anime-search-bar"
          {...register('query')}
          className="field"
          type="search"
          placeholder="Search"
        />
        <button
          id="anime-search-bt"
          type="submit"
          className="bt-blue-end"
        >
          Search
        </button>
      </form>
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
      <p id="msg-error">Not found!</p>
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
