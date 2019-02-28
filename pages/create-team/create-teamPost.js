module.exports = {
	getUserInfo : function(req, res, dao){
		req.body.u_id = req.session.u_id;
		res.set("Content-Type", "application/json");
		res.send(req.body);
	},

	insertTeam : function(req,res,dao){
		let coach_id = req.body.coach_id;
		let nom = req.body.team_name;
		dao.setTeam(
			coach_id,
			nom,
			function(result){
				req.body.success = result;
				res.set("Content-Type", "application/json");
				res.send(req.body);
			}, 
			function(result){
				req.body.success = false;
				res.set("Content-Type", "application/json");
				res.send(req.body);
			}
		);
	},

	getTeam : function(req, res, dao){
		dao.getTeamByLast(function(result){
			req.body.t_id = result.rows[result.rowCount-1].id;
			res.set("Content-Type", "application/json");
			res.send(req.body);
		});
	},

	insertPlayer : function(req, res, dao){
		let idt = req.body.t_id;
		let idj = req.body.p_id;
		dao.setLinkTeam(idt, idj, function(result){

		});
	},

	getUserByBattleTag : function(req, res, dao){
		let bt = req.body.bt;
		dao.getPlayerByPseudo(bt, function(result){
			if(result.rowCount > 0){
				req.body.u_id = result.rows[0].id;
				req.body.pseudo = result.rows[0].pseudo;
			}
			else req.body.u_id = undefined;
			res.set("Content-Type", "application/json");
			res.send(req.body);
		});
	}
}