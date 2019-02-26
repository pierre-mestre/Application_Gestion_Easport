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
	}
}