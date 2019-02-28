import db from './db.js';

module.exports = {
	getUserBySignIn: function(email, password, callback){
		const values = [email, password];
		db.get('*', 'users', 'mail=$1 AND password=$2', values, callback);
	},

	setUserBySignUp: function(mail, password, pseudo, callback_s, callback_e){
		db.get('*', 'users', 'mail=$1', [mail], function(result) {
			if(result.rowCount > 0) {
				callback_e(mail);
			}
			else {
				const where = ['mail', 'password', 'pseudo'];
				const values = [mail, password, pseudo];
				db.set('users', where, values, callback_s);
			}
		});	
	},

	setTraining : function(idcoach, date, callback){
		const where = ['coach', 'date'];
		const values = [idcoach,date];
		db.set('entrainement', where, values, callback);
	},

	setLinkTraining : function(identrainement, idjoueur, callback){
		const where = ['identrainement', 'idjoueur'];
		const values = [identrainement, idjoueur];
		db.set('entrainement',where,values,callback);
	},

	setTeam : function(idcoach,nom,callback_s,callback_e){
		if(nom.length<64){
			for(var i=nom.length;i<64;i++){
				nom = nom + " ";
			}
		}
		let values = [nom];
		db.get('*','team','nom=$1',values,function(result){
			if(result.rowCount > 0){
				callback_e(result);
			}
			else{
				let where = ['nom','coach'];
				values = [nom, idcoach];
				db.set('team',where,values,callback_s);
			}
		});
	},

	getTeamByCoach: function(coach, callback){
		const values = [coach];
		db.get('*', 'team', 'coach=$1', values, callback);
	},

	getTeamByPlayer: function(player, callback){
		const values = [player];
		db.get('*', 'liaison', 'idjoueur=$1', values, function(result) {
			if(result.rowCount > 0) {
				const values = [result.rows[0].idteam];
				db.get('*', 'team', 'id=$1',values,callback);
			}
		});

	},

	getTrainingByCoach(coach, date, callback){
		const values = [coach, date];
		db.get('*', 'entrainement', 'coach=$1 AND date=$2', values, callback);
	},

	getTrainingByPlayer(player, callback){
        const values = [player];
        db.get('*', 'liaisonentrainement','idjoueur=$1', values, function(result){
            var training = [];
            if(result.rowCount > 0){
                var where = '';
                var values = [];
                var last = result.rows.length-1;
                values.push(result.rows[0].identrainement);
                where += 'id=$1';
                if(last == 1){
                    values.push(result.rows[1].identrainement);
                    where += ' || id=$2';
                }
                else if(last>1){ 
                    where += ' || ';
                    for(let i=1; i<last; i++){
                        values.push(result.rows[i].identrainement);
                        where += 'id=$'+(i+1)+' || ';
                    }
                    values.push(result.rows[last].identrainement);
                    where += 'id=$'+last;
                }
                console.log(where,values);
                db.get('*', 'entrainement', where, values, function(michel){
                    training.push(michel);
                    callback(training);
                });
            }       
        });
    }

}