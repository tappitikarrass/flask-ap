import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import AppNav from './components/AppNav';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import ProfileEdit from './components/ProfileEdit';
import SignIn from './components/SignIn';
import Anime from './components/Anime';
import Footer from './components/Footer';

import './scss/main.scss';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  .content {
    padding: 0;
    padding-top: 2em;
    padding-bottom: 2em;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppNav />
      <div id="page">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    <GlobalStyle />
  </React.StrictMode>,
);
