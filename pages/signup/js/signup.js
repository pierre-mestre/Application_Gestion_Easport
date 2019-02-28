$(document).ready(function() {
    $('#signup').on('click', '#signup_submit', function () {
        if($('#password').val() != $('#password_confirm').val()) return;
        if(!$('#mail').val() || !$('#pseudo').val() || !$('#password').val()) return;
        var data = {
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
                if(json.success){
                    alert('Votre compte a bien été créé.');
                    window.location.replace(`${window.location.origin}/login`);
                } else {
                    $(`#${json.err}`).css('color', 'red');
                    alert('Cette adresse mail est déjà utilisée.');
                }
            }); // parses response to JSON
    });
});