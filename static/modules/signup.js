import notify from './notify.js';

export default function submitSingUpForm(event) {
    const url = 'http://localhost/backend/user';
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function f() {
        // console.log(request.responseText);
        if (request.status === 400) {
            notify('error', 'Already exists', 'User with such username or email is already registered.');
        }
        if (request.status === 200) {
            notify('common', 'Success', 'Registration completed successfully');
        }
    };

    request.onerror = function f() {
    };

    const formData = new FormData(event.target);

    const formDataJson = JSON.stringify(Object.fromEntries(formData));
    request.send(formDataJson);

    event.preventDefault();
}
