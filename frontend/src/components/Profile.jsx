import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../scss/Profile.scss';

function Profile() {
  const [userData, setUserData] = useState([]);
  const [cookies, removeCookie] = useCookies(['token', 'username']);
  const navigate = useNavigate();

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

    if (response.status === 200) {
      removeCookie('token');
      removeCookie('username');
      navigate('/login');
    }
  }

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
      setUserData(await response.json());
    }
    effect();
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
          onClick={() => { navigate('/profile/edit'); }}
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
