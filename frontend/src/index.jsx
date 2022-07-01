import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
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
import UserLists from './components/UserLists';
import AnimeList from './components/AnimeList';

import './scss/UI.scss';

const GlobalStyle = createGlobalStyle`
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <AppNav />
      <div id="page">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lists" element={<UserLists />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/anime/:malId" element={<Anime />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/list/:listId" element={<AnimeList />} />
        </Routes>
      </div>
      <Footer />
    </HashRouter>
    <GlobalStyle />
  </React.StrictMode>,
);
