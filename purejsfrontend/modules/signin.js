import notify from './notify.js';
import { profile } from '../index.js';
import { fetchUser } from './profile.js';
import { setCookie } from './cookies.js';

export { notify };
export async function submitSignInForm(event) {
    const url = 'http://localhost/backend/login';
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    const formData = new FormData(event.target);

    request.onload = function f() {
        const tokenJson = JSON.parse(request.responseText);

        if (request.status === 404) {
            notify('error', 'User not found', 'Wrong username.');
        }
        if (request.status === 403) {
            notify('error', 'Unable to login', 'Wrong password.');
        }
        if (request.status === 200) {
            setCookie('token', tokenJson.token, 1);
            setCookie('username', formData.get('username'), 1);
            profile();
        }
    };

    request.onerror = function f() {
    };

    const encodedCreds = btoa(`${formData.get('username')}:${formData.get('password')}`);

    request.setRequestHeader('Authorization', `Basic ${encodedCreds}`);
    request.send();

    event.preventDefault();
}
