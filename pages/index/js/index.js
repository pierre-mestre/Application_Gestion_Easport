$(document).ready(function() {
    $('#index').on('click', '#button2.connexion', function () {
        var data = {
            battletag: $("#battletag_search").val()
        };
        /*fetch("/login/post_login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(json => {
            if(!json.found){

                return;
            }
            else {

            }
        }); // parses response to JSON*/
        alert(data.battletag);
    });
});