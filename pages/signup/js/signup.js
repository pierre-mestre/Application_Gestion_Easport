$(document).ready(function() {
    $('#signup').on('click', '#signup_submit', function () {
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

    let onChange = function(){
        if($('#mail').val() != '' && $('#password').val() != '' && $('#pseudo').val() != ''){
            $('#signup_submit').attr('disabled', false);
        }
        else
            $('#signup_submit').attr('disabled', true);
    };

    $('#mail, #password, #pseudo').on('input', onChange).on('change', onChange);
    $
});