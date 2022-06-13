import React, { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import '../scss/AnimeList.scss';

export default function AnimeList() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'username', 'user_id']);
  const { listId } = useParams();
  const [animeList, setAnimeList] = useState([]);

  const {
    register,
    handleSubmit,
  } = useForm();
  const addForm = useRef();

  useEffect(() => {
    async function effect() {
      const response = await fetch(
        `http://localhost/backend/list/${cookies.username}/${listId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );

      const json = await response.json();
      const jsonArray = [];
      jsonArray.push(json);
      setAnimeList(json);
    }
    effect();
  }, []);

  async function addAnime() {
    // fetch anime mal_id
    const queryData = new FormData(addForm.current);
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
    // actually add anime
    const postResponse = await fetch(
      `http://localhost/backend/list/${cookies.username}/${listId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(
          {
            mal_id: Number(animeData.mal_id),
            list_id: Number(listId),
          },
        ),
      },
    );
    const json = await postResponse.json();
    window.location.reload();
    return json;
  }

  async function removeAnime(malId) {
    const response = await fetch(
      `http://localhost/backend/list/${cookies.username}/${listId}/${malId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      },
    );
    if (response.status === 200) {
      window.location.reload();
    }
  }

  return (
    <div
      id="anime-list"
      className="content"
    >
      <div
        id="anime-search"
        className="ui-row"
      >
        <form
          id="anime-search-form"
          ref={addForm}
          method="post"
          onSubmit={handleSubmit(addAnime)}
          acceptCharset="utf-8"
        >
          <input
            id="anime-search-bar"
            {...register('query')}
            className="field"
            type="search"
            placeholder="Enter anime name"
          />
          <button
            id="add-bt"
            type="submit"
            className="bt-blue-end"
          >
            Add
          </button>
        </form>
      </div>
      <table id="anime-table">
        <tbody>
          <tr>
            <td>MyAnimeList Id</td>
            <td />
            <td />
          </tr>
          {
            animeList
              .filter((anime) => anime.list_id === Number(listId))
              .map((value, key) => (
                <tr key={key}>
                  <td>{value.mal_id}</td>
                  <td>
                    <button
                      id="open-bt"
                      className="bt-blue-end"
                      type="submit"
                      onClick={() => {
                        navigate(`/anime/${value.mal_id}`);
                      }}
                    >
                      Open
                    </button>
                  </td>
                  <td>
                    <button
                      id="open-bt"
                      className="bt-green-end"
                      type="submit"
                      onClick={() => {
                        window.open(`https://myanimelist.net/anime/${value.mal_id}`, '_blank');
                        // navigate(`/anime/${value.mal_id}`);
                      }}
                    >
                      MyAnimeList
                    </button>
                  </td>
                  <td>
                    <button
                      id="delete-bt"
                      className="bt-red-end"
                      type="submit"
                      onClick={() => {
                        removeAnime(value.mal_id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
