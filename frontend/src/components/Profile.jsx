import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../scss/Profile.scss';

function Profile() {
  const [userData, setUserData] = useState([]);
  const [cookies, removeCookie] = useCookies(['token', 'username', 'user_id']);
  const navigate = useNavigate();

  /* istanbul ignore next */
  async function logOut() {
    if (cookies.token == null) {
      return;
    }

    const response = await fetch(
      'http://localhost/backend/logout',
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      },
    );
    /* istanbul ignore next */
    if (response.status === 200) {
      removeCookie('token');
      removeCookie('username');
      removeCookie('user_id');
      navigate('/login');
    }
  }

  /* istanbul ignore next */
  async function deleteUser() {
    if (cookies.token == null) {
      return;
    }

    const userName = cookies.username;
    const response = await fetch(
      `http:///localhost/backend/user/${userName}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      },
    );

    if (response.status === 200) {
      removeCookie('token');
      removeCookie('username');
      navigate('/login');
    }
  }

  useEffect(() => {
    async function effect() {
      const response = await fetch(
        `http://localhost/backend/user/${cookies.username}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      /* istanbul ignore next */
      setUserData(await response.json());
    }
    /* istanbul ignore next */
    if (cookies.token === 'undefined') {
      navigate('/login');
    } else {
      effect();
    }
  });

  return (
    <div id="profile" className="content">
      <h2>Profile</h2>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <td id="username">
              {userData.username}
            </td>
          </tr>
          <tr>
            <th>First name</th>
            <td id="firstname">
              {userData.firstname}
            </td>
          </tr>
          <tr>
            <th>Last name</th>
            <td id="lastname">
              {userData.lastname}
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td id="phone">
              {userData.phone}
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td id="email">
              {userData.email}
            </td>
          </tr>
        </tbody>
      </table>
      <div id="bt-row" className="ui-row">
        <button
          type="submit"
          className="bt-blue"
          onClick={() => { 
            /* istanbul ignore next */
            navigate('/profile/edit');
          }}
        >
          Edit
        </button>
        <button
          type="submit"
          className="bt-red"
          onClick={deleteUser}
        >
          Delete
        </button>
        <button
          type="submit"
          className="bt-green-end"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
