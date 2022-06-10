import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import '../scss/SignIn.scss';

function SignIn() {
  const loginForm = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      // defaultValues: {
      //   username: 'asket',
      //   password: '12345678',
      // },
    },
  );

  async function onSubmit() {
    const userData = new FormData(loginForm.current);
    const encodedCreds = window.btoa(`${userData.get('username')}:${userData.get('password')}`).toString('base64');
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
    console.log(await response.json());
  }

  return (
    <div id="signin" className="content">
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
