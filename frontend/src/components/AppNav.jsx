import React from 'react';
import { Link } from 'react-router-dom';

import '../scss/AppNav.scss';

class AppNav extends React.PureComponent {
  render() {
    return (
      <nav id="app-nav">
        <Link id="homepage" to="/">
          Homepage
        </Link>
        <Link id="profile" to="/profile">
          Profile
        </Link>
        <Link id="login" to="/login">
          Login
        </Link>
        <Link id="signup" to="/signup">
          Sign Up
        </Link>
        <Link id="anime" to="/anime">
          Anime
        </Link>
      </nav>
    );
  }
}

export default AppNav;
