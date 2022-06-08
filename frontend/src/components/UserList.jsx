import React from 'react';

class UserList extends React.PureComponent {
  render() {
    return (
      <div className="content">
        <h2>Users</h2>
        <table>
          <tr>
            <th>Username</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>
              <button
                type="submit"
                className="table-bt-open"
                onClick="window.location.href='profile.html'"
              >
                foobar
              </button>
            </td>
            <td className="cell-inactive">
              <p className="cell-center">Admin</p>
            </td>
            <td>
              <button type="submit" className="table-bt-remove">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit" className="table-bt-open" onClick="">
                stepanko
              </button>
            </td>
            <td className="cell-inactive">
              <p className="cell-center">User</p>
            </td>
            <td>
              <button type="submit" className="table-bt-remove">
                Delete
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default UserList;
