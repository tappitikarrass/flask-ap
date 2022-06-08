import React from 'react';
import Button from './UIParts/Button';

class SignUp extends React.PureComponent {
  render() {
    return (
      <div className="content">
        <h2>Sing Up</h2>
        <form id="signup_form" method="post" acceptCharset="utf-8">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="field"
            required
          />
          <div className="fields-row">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              className="field"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              className="field-end"
              required
            />
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="field"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="field"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="field"
            required
          />
          <Button value="Sign Up" buttonClass="bt-blue" />
        </form>
      </div>
    );
  }
}

export default SignUp;
