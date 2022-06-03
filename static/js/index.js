function getPage(page) {
    var xHttpReq = new XMLHttpRequest();

    xHttpReq.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("viewer").innerHTML = this.responseText;
        }
    }
    
    // append script depending on current page
    document.body.removeChild(document.body.lastChild);
    document.head.removeChild(document.head.lastChild);

    file_name = page.replace(/\.[^/.]+$/, "");
    var script = document.createElement("script");
    var link = document.createElement("link");
    script.src = "js/" + file_name + ".js";
    link.rel = "stylesheet";
    link.href = "css/" + file_name + ".css";
    document.body.appendChild(script);
    document.head.appendChild(link);

    xHttpReq.open("GET", page, true);
    xHttpReq.send();
}
