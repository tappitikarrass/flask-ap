import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import '../scss/Homepage.scss';

function Homepage() {
  const [cookies, setCookie] = useCookies(['token', 'username', 'user_id']);

  useEffect(() => {
    if (cookies.token == null) {
      setCookie(
        'token',
        'undefined',
        {
          path: '/',
          sameSite: 'Lax',
        },
      );
      setCookie(
        'username',
        'undefined',
        {
          path: '/',
          sameSite: 'Lax',
        },
      );
      setCookie(
        'user_id',
        'undefined',
        {
          path: '/',
          sameSite: 'Lax',
        },
      );
    }
  });

  return (
    <div id="homepage" className="content">
      <h2>Anime catalogue SPA build with Flask and ReactJS</h2>
    </div>
  );
}

export default Homepage;
