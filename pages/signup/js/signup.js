$(document).ready(function() {
    $('#signup').on('click', '#signup_submit', function () {
        var data = {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            mail: $('#mail').val(),
            password: $('#password').val(),
            pseudo: $('#pseudo').val()
        };
        fetch("/signup/post_signup", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(json => {
                alert('HELLO WORLD');
            }); // parses response to JSON
    });

    let onChange = function(){
        if($('#fname').val() != '' && $('#lname').val() != '' && $('#mail').val() != ''
            && $('#password').val() != '' && $('#pseudo').val() != '')
            $('#signup_submit').attr('disabled', false);
        else
            $('#signup_submit').attr('disabled', true);
    };

    $('#fname, #lname, #mail, #password, #pseudo').on('input', onChange).on('change', onChange);
});