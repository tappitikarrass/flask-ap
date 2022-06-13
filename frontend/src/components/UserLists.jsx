import React, { useRef, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../scss/UserLists.scss';

export default function UserLists() {
  const navigate = useNavigate();
  const createListForm = useRef();
  const [cookies] = useCookies('token', 'username', 'user_id');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function effect() {
      const response = await fetch(
        `http://localhost/backend/list/${cookies.username}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      const json = await response.json();
      setLists(json);
    }
    if (cookies.token === 'undefined') {
      navigate('/login');
    } else {
      effect();
    }
  }, []);

  async function onSubmit() {
    const listData = new FormData(createListForm.current);

    const response = await fetch(
      'http://localhost/backend/list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(
          {
            user_id: cookies.user_id,
            name: listData.get('listname'),
          },
        ),
      },
    );
    const json = await response.json();
    window.location.reload();
    return json;
  }

  async function deleteList(listId) {
    const response = await fetch(
      `http://localhost/backend/list/${cookies.username}/${listId}`,
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
    <div id="user-lists" className="content">
      <form
        id="create-list"
        ref={createListForm}
        method="post"
        acceptCharset="utf-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="ui-row">
          <input
            {...register('listname', {
              required: 'List name is required',
              minLength:
              {
                value: 5,
                message: 'Min list name length is 5 characters.',
              },
              maxLength:
              {
                value: 256,
                message: 'Max list name length is 256 characters.',
              },
            })}
            type="text"
            className="field"
            placeholder="List name"
          />
          <button
            id="create-list-bt"
            type="submit"
            className="bt-blue-end"
          >
            Create
          </button>
        </div>
      </form>
      <p>{errors.listName?.message}</p>
      <table id="lists-table">
        <tbody>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td />
            <td />
          </tr>
          {
            lists.filter((list) => list.user_id === Number(cookies.user_id)).map((value) => (
              <tr key={value.list_id}>
                <td>{value.list_id}</td>
                <td>{value.name}</td>
                <td>
                  <button
                    id="delete-list-bt"
                    className="bt-green-end"
                    type="submit"
                    onClick={() => {
                      navigate(`/list/${value.list_id}`);
                    }}
                  >
                    Open
                  </button>
                </td>
                <td>
                  <button
                    id="delete-list-bt"
                    className="bt-red-end"
                    type="submit"
                    onClick={() => {
                      deleteList(value.list_id);
                    }}
                  >
                    Delete
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
