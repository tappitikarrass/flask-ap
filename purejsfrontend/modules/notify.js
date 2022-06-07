export default function notify(type, title, description) {
    const notifyDiv = document.createElement('div');
    const notifyTextDiv = document.createElement('div');
    const notifyTitle = document.createElement('h3');
    const notifyDescription = document.createElement('p');

    const notifyDivClass = `notification-${type}`;
    notifyDiv.className = notifyDivClass;
    notifyTextDiv.className = 'notification-text';
    notifyTitle.className = 'notification-title';
    notifyDescription.className = 'notification-description';

    notifyTitle.innerHTML += title;
    notifyDescription.innerHTML += description;
    notifyTextDiv.appendChild(notifyTitle);
    notifyTextDiv.appendChild(notifyDescription);
    notifyDiv.appendChild(notifyTextDiv);

    document.body.appendChild(notifyDiv);
    notifyDiv.style.opacity = 0;
    setTimeout(() => {
        document.getElementsByClassName(notifyDivClass)[0].style.opacity = 1;
    }, '1');

    setTimeout(() => {
        document.getElementsByClassName(notifyDivClass)[0].style.opacity = 0;
    }, '3000');

    setTimeout(() => {
        document.body.removeChild(document.body.lastChild);
    }, '4000');
}
