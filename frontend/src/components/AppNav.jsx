import React from 'react';
import { NavLink } from 'react-router-dom';

import '../scss/AppNav.scss';

function AppNav() {
  return (
    <nav id="app-nav">
      <NavLink id="homepage" to="/">
        Homepage
      </NavLink>
      <NavLink id="profile" to="/profile">
        Profile
      </NavLink>
      <NavLink id="login" to="/login">
        Login
      </NavLink>
      <NavLink id="signup" to="/signup">
        Sign Up
      </NavLink>
      <NavLink id="anime" to="/anime">
        Anime
      </NavLink>
      <NavLink id="users-list" to="/admin/users">
        Users List
      </NavLink>
    </nav>
  );
}

export default AppNav;
