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
import UsersList from './components/UsersList';
import Footer from './components/Footer';

import './scss/UI.scss';

const GlobalStyle = createGlobalStyle`
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
          <Route path="/admin/users" element={<UsersList />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    <GlobalStyle />
  </React.StrictMode>,
);
