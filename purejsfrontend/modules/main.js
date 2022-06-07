// import submitSignInForm from './signin';

export default function getPage(page) {
    const xHttpReq = new XMLHttpRequest();

    xHttpReq.onreadystatechange = function f() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('viewer').innerHTML = this.responseText;
        }
    };

    // append script depending on current page
    document.body.removeChild(document.body.lastChild);
    document.head.removeChild(document.head.lastChild);

    const fileName = page.replace(/\.[^/.]+$/, '');
    const script = document.createElement('script');
    const link = document.createElement('link');

    // script.src = `js/${fileName}.js`;
    link.rel = 'stylesheet';
    link.href = `css/${fileName}.css`;

    document.body.appendChild(script);
    document.head.appendChild(link);

    xHttpReq.open('GET', page, true);
    xHttpReq.send();
}

// document.getElementById('signin_form').addEventListener('submit', submitSignInForm);
// document.getElementById('anime').addEventListener('click', getPage('anime.html'));
