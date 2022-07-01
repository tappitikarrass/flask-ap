import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Notify from './Notify';

import '../scss/UI.scss';
import '../scss/SignUp.scss';

function SignUp() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'username']);
  const signUpForm = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        username: 'asket',
        firstname: 'Stas',
        lastname: 'Asket',
        email: 'asket@gmail.com',
        phone: '3333',
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
    const userData = new FormData(signUpForm.current);
    const userDataJson = JSON.stringify(Object.fromEntries(userData));

    const response = await fetch(
      'http://localhost/backend/user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userDataJson,
      },
    );
    if (response.status === 400) {
      document.getElementById('signup-error').style.opacity = 1;
      setTimeout(() => {
        document.getElementById('signup-error').style.opacity = 0;
      }, 2000);
    }
    if (response.status === 200) {
      navigate('/login');
    }
  }

  return (
    <div id="signup" className="content">
      <Notify
        id="signup-error"
        type="error"
        title="Sign-up error"
        msg="User with such email or username already exists"
      />
      <h2>Sing Up</h2>
      <form
        id="signup-form"
        ref={signUpForm}
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        acceptCharset="utf-8"
      >
        <input
          id="username"
          {...register('username', {
            required: 'Username is required',
            maxLength:
            {
              value: 32,
              message: 'Max username length is 32 characters',
            },
          })}
          placeholder="Username"
          className="field-end"
        />
        <p>{errors.username?.message}</p>
        <div className="ui-row">
          <input
            id="firstname"
            {...register('firstname', { required: 'First name is required', maxLength: 256 })}
            placeholder="Firstname"
            className="field"
          />
          <input
            id="lastname"
            {...register('lastname', { required: 'Last name is required', maxLength: 256 })}
            placeholder="Lastname"
            className="field-end"
          />
        </div>
        <p>{errors.firstname?.message}</p>
        <p>{errors.lastname?.message}</p>
        <input
          id="email"
          {...register('email', { required: 'Email is required', maxLength: 256 })}
          placeholder="Email"
          type="email"
          className="field-end"
        />
        <p>{errors.email?.message}</p>
        <input
          id="phone"
          {...register('phone', {
            required: 'Phone is required',
            maxLength:
            {
              value: 16,
              message: 'Max phone length is 16 numbers.',
            },
          })}
          placeholder="Phone"
          className="field-end"
        />
        <p>{errors.phone?.message}</p>
        <input
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength:
            {
              value: 8,
              message: 'Min password length is 8 characters.',
            },
            maxLength:
            {
              value: 64,
              message: 'Max password length is 64 characters.',
            },
          })}
          placeholder="Password"
          type="password"
          className="field-end"
        />
        <p>{errors.password?.message}</p>
        <button id="signup-bt" type="submit" className="bt-blue">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
