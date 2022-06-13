import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import '../scss/Homepage.scss';

function Homepage() {
  const [cookies, setCookie] = useCookies(['token', 'username']);

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
    }
  });

  return (
    <div id="homepage" className="content">
      <p>homepage</p>
    </div>
  );
}

export default Homepage;
