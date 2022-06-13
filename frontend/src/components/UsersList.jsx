import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import '../scss/UsersList.scss';

function UsersList() {
  const [cookies] = useCookies('token', 'username');
  const [users, setUsers] = useState([]);
  const [reqStatus, setReqStatus] = useState();

  useEffect(() => {
    async function effect() {
      const response = await fetch(
        'http://localhost/backend/user',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      const json = await response.json();
      setUsers(json);
      setReqStatus(response.status);
    }
    effect();
  }, []);

  if (reqStatus === 200) {
    return (
      <div id="users-list" className="content">
        <table id="users-table">
          <tbody>
            <tr>
              <td>id</td>
              <td>username</td>
              <td>email</td>
              <td>Fistname</td>
              <td>Lastname</td>
              <td>Phone</td>
            </tr>
            {
              users.map((value) => (
                <tr>
                  <td>{value.user_id}</td>
                  <td>{value.username}</td>
                  <td>{value.email}</td>
                  <td>{value.firstname}</td>
                  <td>{value.lastname}</td>
                  <td>{value.phone}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
  if (reqStatus !== 200) {
    return (
      <div id="users-list" className="content">
        <h2>Not allowed!</h2>
      </div>
    );
  }
}

export default UsersList;
