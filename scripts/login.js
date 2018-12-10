$(document).ready(function() {
    $('#login').on('click', '#login-submit', function () {
        var data = {
            pseudo: $("#username").val(),
            password: $("#password").val()
        };
        fetch("/post-login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(json => $("#login").html(json.html)); // parses response to JSON
    });

    $('#login').on('keyup', '.form-control', function(evt){
        if(evt.keyCode === 13) $('#login-submit').trigger('click');
    });
});