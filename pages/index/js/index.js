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

                // Image
                const nothing = '/../static/IMAGE/rien.png';
                $('#img_1').attr('src', stats.portrait || nothing);
                $('#img_2').attr('src', stats.levelFrame || nothing);
                $('#img_3').attr('src', stats.rank_img || nothing);
                $('#img_4').attr('src', stats.star || nothing);
                
                // General
                $('#stats_pseudo').get(0).innerHTML = stats.username;
                $('#stats_niveau').get(0).innerHTML = stats.level || '0';

                const filler = '0';
                // Quickplay
                $('#stats_n_time').get(0).innerHTML = stats.playtime.quickplay || filler;
                $('#stats_n_won').get(0).innerHTML = stats.games.quickplay.won || filler;
                // Competitive
                $('#stats_c_time').get(0).innerHTML = stats.playtime.competitive || filler;
                $('#stats_c_rank').get(0).innerHTML = stats.competitive.rank || filler;
                $('#stats_c_played').get(0).innerHTML = stats.games.competitive.played || filler;
                $('#stats_c_won').get(0).innerHTML = stats.games.competitive.won || filler;
                $('#stats_c_draw').get(0).innerHTML = stats.games.competitive.draw || filler;
                $('#stats_c_lose').get(0).innerHTML = stats.games.competitive.lost || filler;
            }
        }); // parses response to JSON
    });
});