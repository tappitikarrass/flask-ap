function formSubmit(event) {
    var url = "http://localhost/backend/user";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
        console.log(request.responseText);
    };

    request.onerror = function() {
    };

    var form_data = new FormData(event.target);
    form_data.delete("confirm-password");

    form_data_json = JSON.stringify(Object.fromEntries(form_data));
    request.send(form_data_json);


    event.preventDefault();
}

document.getElementById("signup_form").addEventListener("submit", formSubmit);
