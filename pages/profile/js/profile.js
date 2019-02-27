$(document).ready(function() {
    fetch("/profile/get_user", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(json => {
        $('#mail').get(0).innerHTML = json.mail;
        $('#battletag').get(0).innerHTML = json.pseudo;
    });
});