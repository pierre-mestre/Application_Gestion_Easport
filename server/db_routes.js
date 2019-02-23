import db from './db.js';

module.exports = {
	getUserBySignIn: function(email, password, callback){
		const values = [email, password];
		db.get('*', 'public.user', 'u_mail=$1 AND u_password=$2', values, callback);
	},

	setUserBySignUp: function(fname, lname, mail, password, pseudo, birthdate, callback_s, callback_e){
		db.get('*', 'public.user', 'u_mail=$1', [mail], function(result) {
			if(result.rowCount > 0) {
				callback_e(mail);
			}
			else {
				const where = ['u_fname', 'u_lname', 'u_mail', 'u_password', 'u_pseudo', 'u_birthdate'];
				const values = [fname, lname, mail, password, pseudo, birthdate];
				db.set('public.user', where, values, callback_s);
			}
		});
		
	}

}