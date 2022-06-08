import React from 'react';

class ProfileEdit extends React.PureComponent {
  render() {
    return (
      <div className="content">
        <h2>Edit User</h2>
        <form action="profile.html">
          <div className="fields-row">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              className="field"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              className="field-end"
            />
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="field"
          />
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
            className="field"
          />
          <div className="input-row">
            <button type="submit" className="bt-blue">
              Save
            </button>
            <button type="submit" className="bt-red-end">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
