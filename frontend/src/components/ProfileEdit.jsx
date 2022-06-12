import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import '../scss/ProfileEdit.scss';

function ProfileEdit() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'username']);
  const editForm = useRef();
  const [userData, setUserData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function effect() {
      const response = await fetch(
        `http://localhost/backend/user/${cookies.username}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      setUserData(await response.json());
    }
    effect();
  });

  async function onSubmit() {
    const updateData = new FormData(editForm.current);
    const updateJson = JSON.stringify(Object.fromEntries(updateData));

    const response = await fetch(
      `http://localhost/backend/user/${cookies.username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
        body: updateJson,
      },
    );
    if (response.status === 200) {
      navigate('/profile');
    }
  }

  return (
    <div id="profile-edit" className="content">
      <h2>Edit Profile</h2>
      <form
        id="edit-form"
        ref={editForm}
        method="post"
        acceptCharset="utf-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="ui-row">
          <input
            type="text"
            id="firstname"
            {...register('firstname', { required: 'First name is required', maxLength: 256 })}
            placeholder="First name"
            className="field"
            defaultValue={userData.firstname}
          />
          <input
            type="text"
            id="lastname"
            {...register('lastname', { required: 'Last name is required', maxLength: 256 })}
            placeholder="Last name"
            className="field-end"
            defaultValue={userData.lastname}
          />
        </div>
        <p>{errors.firstname?.message}</p>
        <p>{errors.lastname?.message}</p>
        <input
          type="text"
          id="email"
          {...register('email', { required: 'Email is required', maxLength: 256 })}
          placeholder="Email"
          className="field"
          defaultValue={userData.email}
        />
        <p>{errors.phone?.email}</p>
        <input
          type="text"
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
          className="field"
          defaultValue={userData.phone}
        />
        <p>{errors.phone?.message}</p>
        <input
          type="password"
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
          placeholder="New password"
          className="field"
        />
        <p>{errors.password?.message}</p>
        <div className="ui-row">
          <button type="submit" className="bt-blue">
            Save
          </button>
          <button
            type="submit"
            className="bt-red-end"
            onClick={() => navigate('/profile')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
