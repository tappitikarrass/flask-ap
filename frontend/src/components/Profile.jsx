import React from 'react';
import '../scss/Profile.scss';

class Profile extends React.PureComponent {
  render() {
    return (
      <div id="profile">
        <h2>Profile</h2>
        <table>
          <tr>
            <th>Username</th>
            <td id="username" />
          </tr>
          <tr>
            <th>First name</th>
            <td id="firstname" />
          </tr>
          <tr>
            <th>Last name</th>
            <td id="lastname" />
          </tr>
          <tr>
            <th>Phone</th>
            <td id="phone" />
          </tr>
          <tr>
            <th>Email</th>
            <td id="email" />
          </tr>
        </table>
        <div className="fields-row">
          { /* <Button value="Edit" buttonClass="bt-blue" />
          <Button value="Delete" buttonClass="bt-red" />
          <Button value="Logout" buttonClass="bt-green-end" /> */ }
        </div>
      </div>
    );
  }
}

export default Profile;
