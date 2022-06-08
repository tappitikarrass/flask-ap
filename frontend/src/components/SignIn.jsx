import React from 'react';
import Button from './UIParts/Button';

class SignIn extends React.PureComponent {
  render() {
    return (
      <div className="content">
        <h2>Sign In</h2>
        <form id="signin-form" method="post" acceptCharset="utf-8">
          <input
            type="text"
            name="username"
            placeholder="Username"
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
          <Button value="Sign In" buttonClass="bt-blue" />
        </form>
      </div>
    );
  }
}

export default SignIn;
