import React from 'react';
import Button from './UIParts/Button';
import Field from './UIParts/Field';
import '../scss/Anime.scss';
import '../scss/UI.scss';

function AnimeSearch() {
  return (
    <div id="anime-search" className="ui-row">
      <Field id="anime-search-bar" fieldClass="field" placeHolder="Search" />
      <Button id="anime-search-bt" buttonClass="bt-blue-end" value="Search" />
    </div>
  );
}

function AnimeTable() {
  return (
    <table id="anime-info-table">
      <tr>
        <td className="key">Score:</td>
        <td className="val" id="score_val" />
      </tr>
      <tr>
        <td className="key">Genres:</td>
        <td className="val" id="genres_val" />
      </tr>
      <tr>
        <td className="key" id="duration_key">
          Duration:
        </td>
        <td className="val" id="duration_val" />
      </tr>
      <tr>
        <td className="key">Media:</td>
        <td className="val" id="media_type_val" />
      </tr>
      <tr>
        <td className="key">Episodes:</td>
        <td className="val" id="episodes_val" />
      </tr>
      <tr>
        <td className="key">Rating:</td>
        <td className="val" id="rating_val" />
      </tr>
    </table>
  );
}

function Anime() {
  return (
    <div id="anime">
      <AnimeSearch />
      <h2 id="anime-title">Title</h2>
      <div id="anime-info">
        <img id="anime-banner" alt="anime-banner" src="https://api-cdn.myanimelist.net/images/anime/1408/114012l.jpg" />
        <AnimeTable />
      </div>
      <div id="anime-description">
        Lorem ipsum dolor sit amet, qui minim labore
        adipisicing minim sint cillum sint consectetur cupidatat.
        Lorem ipsum dolor sit amet, qui minim labore
        adipisicing minim sint cillum sint consectetur cupidatat.
        Lorem ipsum dolor sit amet, qui minim labore
        adipisicing minim sint cillum sint consectetur cupidatat.
        Lorem ipsum dolor sit amet, qui minim labore
        adipisicing minim sint cillum sint consectetur cupidatat.
      </div>
    </div>
  );
}

export default Anime;
