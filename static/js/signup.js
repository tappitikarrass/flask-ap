function formSubmit(event) {
    var url = "http://localhost/backend/user";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
        console.log(request.responseText);
        if(request.status == 400) {
            notify("error", "Already exists", "User with such username or email is already registered.");
        }
        if(request.status == 200) {
            notify("common", "Success", "Registration completed successfully");
        }
    };

    request.onerror = function() {
    };

    var formData = new FormData(event.target);

    formDataJson = JSON.stringify(Object.fromEntries(formData));
    request.send(formDataJson);


    event.preventDefault();
}

function notify(type, title, description) {
    var notifyDiv = document.createElement("div");
    var notifyTextDiv = document.createElement("div");
    var notifyTitle = document.createElement("h3");
    var notifyDescription = document.createElement("p");

    notifyDivClass = "notification-" + type;
    notifyDiv.className = notifyDivClass;
    notifyTextDiv.className = "notification-text";
    notifyTitle.className = "notification-title";
    notifyDescription.className = "notification-description";

    notifyTitle.innerHTML += title;
    notifyDescription.innerHTML += description;
    notifyTextDiv.appendChild(notifyTitle);
    notifyTextDiv.appendChild(notifyDescription);
    notifyDiv.appendChild(notifyTextDiv);

    document.body.appendChild(notifyDiv);
    notifyDiv.style.opacity = 0;
    setTimeout(() => {
        document.getElementsByClassName(notifyDivClass)[0].style.opacity = 1;
    }, "1")

    setTimeout(() => {
        document.getElementsByClassName(notifyDivClass)[0].style.opacity = 0;
    }, "3000")

    setTimeout(() => {
        document.body.removeChild(document.body.lastChild);
    }, "4000")
}