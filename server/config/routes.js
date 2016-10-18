// load contorollers
var users = require('./../controllers/users');


module.exports = function(app) {

	app.post('/users/login', users.login);
	app.post('/users/register', users.register);

};
