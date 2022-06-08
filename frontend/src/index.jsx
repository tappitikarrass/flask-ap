import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AppNav from './components/AppNav';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Anime from './components/Anime';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppNav />
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/anime" element={<Anime />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);
