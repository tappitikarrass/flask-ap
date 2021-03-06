import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import Notify from './Notify';
import '../scss/SignIn.scss';

function SignIn() {
  const navigate = useNavigate();
  const [
    cookies,
    setCookie,
    removeCookie,
  ] = useCookies(['token', 'username', 'user_id']);

  const loginForm = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        username: 'asket',
        password: '12345678',
      },
    },
  );

  useEffect(() => {
    /* istanbul ignore next */
    if (cookies.token !== 'undefined') {
      navigate('/profile');
    }
  }, []);

  /* istanbul ignore next */
  async function onSubmit() {
    const userData = new FormData(loginForm.current);
    const encodedCreds = window.btoa(
      `${userData.get('username')}:${userData.get('password')}`,
    ).toString('base64');
    const response = await fetch(
      'http://localhost/backend/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedCreds}`,
        },
      },
    );
    if (response.status === 200) {
      if (cookies.token != null) {
        removeCookie('token');
        removeCookie('username');
      }
      const tokenJson = await response.json();
      setCookie(
        'token',
        tokenJson.token,
        {
          path: '/',
          sameSite: 'Lax',
        },
      );
      setCookie(
        'username',
        userData.get('username'),
        {
          path: '/',
          sameSite: 'Lax',
        },
      );

      // set user id
      const userResponse = await fetch(
        `http://localhost/backend/user/${userData.get('username')}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenJson.token}`,
          },
        },
      );
      const userJson = await userResponse.json();

      setCookie(
        'user_id',
        userJson.user_id,
        {
          path: '/',
          sameSite: 'Lax',
        },
      );

      navigate('/profile');
    } else {
      document.getElementById('login-error').style.opacity = 1;
      setTimeout(() => {
        document.getElementById('login-error').style.opacity = 0;
      }, 2000);
    }
  }

  return (
    <div id="signin" className="content">
      <Notify
        id="login-error"
        type="error"
        title="Login error"
        msg="Wrong username or password"
      />
      <h2>Sign In</h2>
      <form
        id="signin-form"
        ref={loginForm}
        method="post"
        acceptCharset="utf-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          {...register('username', { required: 'Username is required.' })}
          placeholder="Username"
          className="field"
        />
        <p>{errors.username?.message}</p>
        <input
          type="password"
          {...register('password', { required: 'Password is required.' })}
          placeholder="Password"
          className="field"
        />
        <p>{errors.password?.message}</p>
        <button id="login-bt" type="submit" className="bt-blue-end">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
