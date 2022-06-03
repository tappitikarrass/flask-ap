function getPage(page) {
    var xHttpReq = new XMLHttpRequest();

    xHttpReq.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("viewer").innerHTML = this.responseText;
        }
    }
    
    // append script depending on current page
    document.body.removeChild(document.body.lastChild);

    file_name = page.replace(/\.[^/.]+$/, "");
    var script = document.createElement('script');
    script.src = "js/" + file_name + ".js";
    document.body.appendChild(script);

    xHttpReq.open("GET", page, true);
    xHttpReq.send();
}
