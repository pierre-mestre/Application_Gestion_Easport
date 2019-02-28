$(document).ready(function() {
	$('#create_team').on('click', '#submit_team', function() {
		fetch("/create-team/getUserInfo", {
	        method: "POST", // *GET, POST, PUT, DELETE, etc.
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",
	        },
	        body: JSON.stringify({}), // body data type must match "Content-Type" header
	    })
	    .then(response => response.json())
	    .then(json => {
	    	for(let i=1; i<=6; i++){
				if(!$('#player_'+i).data('id')){
					alert('Il vous manque ' + (7-i) + ' joueur(s)');
					return;
				}
			}
			if(!$('#team_name').val()){
				alert("Nom d'équipe invalide.");
				return;
			}

	    	var data = {
	    		coach_id : json.u_id,
	    		team_name : $('#team_name').val()
	    	};
	    	fetch("/create-team/insertTeam", {
		        method: "POST", // *GET, POST, PUT, DELETE, etc.
		        headers: {
		            "Content-Type": "application/json; charset=utf-8",
		        },
		        body: JSON.stringify(data), // body data type must match "Content-Type" header
		    })
		    .then(response => response.json())
		    .then(json => {
		    	fetch("/create-team/getTeam", {
			        method: "POST", // *GET, POST, PUT, DELETE, etc.
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",
			        },
			        body: JSON.stringify(data), // body data type must match "Content-Type" header
			    })
			    .then(response => response.json())
			    .then(json => {
			    	var data = {
			    		t_id : json.t_id,
			    		p_id : undefined
			    	};
			    	for(let i=1; i<=6; i++){
			    		data.p_id = $('#player_'+i).data('id');
			    		fetch("/create-team/insertPlayer", {
					        method: "POST", // *GET, POST, PUT, DELETE, etc.
					        headers: {
					            "Content-Type": "application/json; charset=utf-8",
					        },
					        body: JSON.stringify(data), // body data type must match "Content-Type" header
					    })
			    	}
			    });
		    });
	    });
	});

	$('#create_team').on('click', '#add_player', function() {
		if($('#player_6').data('id')) {
			alert('Nombre de joueurs maximum atteint.');
			return;
		}

		if(!$('#battletag_player').val()){
			alert('Nom invalide.');
			return;
		}

		data = {
			bt : $('#battletag_player').val()
		};

		fetch("/create-team/getUserByBattleTag", {
	        method: "POST", // *GET, POST, PUT, DELETE, etc.
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",
	        },
	        body: JSON.stringify(data), // body data type must match "Content-Type" header
	    })
	    .then(response => response.json())
	    .then(json => {
	    	if(!json.u_id) alert('Joueur introuvable.');
	    	else {
	    		for(let i=1; i<=6; i++){
	    			if($('#player_'+i).data('id') == json.u_id){
						alert('Joueur déjà dans la team.');
						return;
					}
					if(!$('#player_'+i).data('id')){
						$('#player_'+i).data('id', json.u_id);
						$('#player_'+i).get(0).innerHTML = json.pseudo;
						break;
					}
				}
	    	}
	    });
	});
});

/*if(json.success){
		    		alert('Équipe créée !');
		    		window.location.replace(`${window.location.origin}/profile`);
		    	}
		    	else {
		    		alert('Erreur lors de la création de l\'équipe. RIP.');
		    	}*/