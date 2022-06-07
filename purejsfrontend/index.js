import getPage from './modules/main.js';
import fetchAnime from './modules/anime.js';
import { submitSignInForm } from './modules/signin.js';
import submitSignUpForm from './modules/signup.js';
import { fetchUser, logOut } from './modules/profile.js';
import { getCookie } from './modules/cookies.js';
import notify from './modules/notify.js';

export function anime() {
    const token = getCookie('token');
    if (token == null) {
        notify('error', 'Unauthorized', 'Login to search anime');
        return;
    }
    getPage('anime.html');
    function submit() {
        document.getElementById('search-bar').addEventListener('keyup', ({ key }) => {
            if (key === 'Enter') {
                fetchAnime();
            }
        });

        document.getElementById('search-bt').addEventListener('click', fetchAnime);
    }
    setTimeout(submit, 500);
}
document.getElementById('anime').addEventListener('click', anime);

export function signin() {
    const token = getCookie('token');
    if (token != null) {
        profile();
        return;
    }
    getPage('signin.html');
    function submit() {
        document.getElementById('signin-form').addEventListener('submit', submitSignInForm);
    }
    setTimeout(submit, 500);
}
document.getElementById('signin').addEventListener('click', signin);

export function profile() {
    if (getCookie('token') == null) {
        notify('error', 'Login first', 'Guests can\'t access profile page');
        return;
    }
    getPage('profile.html');
    fetchUser();
    function logOutFunc() {
        document.getElementById('logout').addEventListener('click', logOut);
    }
    setTimeout(logOutFunc, 500);
}
document.getElementById('profile').addEventListener('click', profile);

export function signup() {
    const token = getCookie('token');
    if (token != null) {
        profile();
        return;
    }
    getPage('signup.html');
    function submit() {
        document.getElementById('signup_form').addEventListener('submit', submitSignUpForm);
    }
    setTimeout(submit, 500);
}
document.getElementById('signup').addEventListener('click', signup);
