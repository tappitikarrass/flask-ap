import { getCookie, eraseCookie } from './cookies.js';
import getPage from './main.js';
import { signin } from '../index.js';

export async function fetchUser() {
    const userName = getCookie('username');
    const token = getCookie('token');
    const url = `http://localhost/backend/user/${userName}`;
    const response = await fetch(
        url,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    const userData = await response.json();

    document.getElementById('username').innerHTML = userData.username;
    document.getElementById('firstname').innerHTML = userData.firstname;
    document.getElementById('lastname').innerHTML = userData.lastname;
    document.getElementById('phone').innerHTML = userData.phone;
    document.getElementById('email').innerHTML = userData.email;
}

export async function logOut() {
    const token = getCookie('token');
    const url = 'http://localhost/backend/logout';
    const response = await fetch(
        url,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    eraseCookie('username');
    eraseCookie('token');
    // getPage('signin.html');
    signin();
}
