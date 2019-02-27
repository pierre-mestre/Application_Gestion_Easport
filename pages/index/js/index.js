$(document).ready(function() {
    $('#index').on('click', '#button2.connexion', function () {
        var data = {
            battletag: $("#battletag_search").val()
        };
        fetch("/index/api_get_player", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(json => {
            if(!json.stats){
                alert('nothing');
                return;
            }
            else {
                const stats = json.stats;
                $('#img_1').attr('src', stats.portrait);
                $('#img_2').attr('src', stats.levelFrame);
                $('#img_3').attr('src', stats.rank_img);
                $('#img_4').attr('src', stats.star);
            }
        }); // parses response to JSON
    });
});