$(document).ready(function() {
    data = {
        test: 'test'
    };
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

        fetch("/index/api_get_player", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({battletag: json.pseudo}), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(json => {
            if(!json.stats){
                alert('nothing');
                return;
            }
            else {
                const stats = json.stats;
                // Image
                const nothing = '/../static/IMAGE/rien.png';
                $('#img_1').attr('src', stats.portrait || nothing);
                $('#img_2').attr('src', stats.levelFrame || nothing);
                $('#img_3').attr('src', stats.rank_img || nothing);
                $('#img_4').attr('src', stats.star || nothing);
                $('.profile_pic:first').removeAttr('hidden');
            }
        });
    });
});