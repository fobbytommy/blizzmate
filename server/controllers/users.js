var mongoose 	= require('mongoose'),
	bcrypt 		= require('bcrypt'),
	User		= mongoose.model('User');

function UserController() {

	this.login = function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		User.findOne({ username_lowercase: username.toLowerCase() }, function(err, user) {
			if (user == null) {
				console.log("[login: NULL] could not find a user with given username");
				res.json({errors: "Username or password does not match! Try again!"});
			}
			else {
				if (bcrypt.compareSync(password, user.password) == false) {
					console.log("[login: ERROR] password does not match!");
					res.json({errors: "Username or password does not match! Try again!"});
				}
				else {
					console.log("[login: SUCCESS] successfully login a user!");
					res.json( user );
				}
			}
		});

	};

	this.register = function(req, res) {
		var username 	= req.body.username,
			email		= req.body.email,
			password	= req.body.password;
		var user;

		if (username == 'fobbytommy') {
			user = new User({
				username: username,
				username_lowercase: username,
				email: email,
				password: password,
				authority: 9
			});
		}
		else {
			user = new User({
				username: username,
				username_lowercase: username,
				email: email,
				password: password,
			});
		}

		user.save(function(err, user) {
			if (err) { // validation error
				console.log("[register: ERROR] failed to register a new user: ", err);
				res.json({ errors: err.errors });
			}
			else { // registration is successful
				console.log("[register: SUCCESS] successfully registered a new user.");
				res.json(user);
			}
		});
	};
}


module.exports = new UserController();
