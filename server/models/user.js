var mongoose	= require('mongoose'),
	uniqueVal	= require('mongoose-unique-validator'),
	bcrypt		= require('bcrypt');

var userSchema = new mongoose.Schema({

	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		uniqueCaseInsensitive: true,
		required: [true, 'Email address is required.'],
		validate: {
			validator: function(email) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
			},
			message: "'{VALUE}' is not a valid email address!"
		}
	},
	// literal username, with client's desired caps (e.g. foBbYtOmMy)
	username: {
		type: String
	},
	// for validation and verification purposes, without caps (e.g. fobbytommy)
	username_lowercase: {
		type: String,
		required: [true, 'Username is required'],
		trim: true,
		lowercase: true,
		unique: true,
		uniqueCaseInsensitive: true,
		minlength: [3, "Username, '{VALUE}', is too short! Minimum length is 3 characters!"],
		maxlength: [15, "Username, '{VALUE}', is too long! Maximum length is 15 characters!"],
		validate: {
			validator: function(username) {
				return /^[a-zA-Z0-9_]+$/.test(username);
			},
			message: "'{VALUE}' is not a valid username. Only pure alphbets, numbers, and underscores (_) can be used"
		}
	},
	password: {
		type: String,
		required: [true, "Password is required."],
		minlength: [8, "Your password is too short! Minium length is 8!"],
		maxlength: [32, "Your password is too long! Maximum length is 32!"],
		validate: {
			validator: function(password) {
				// least 1 number, uppercase, and special character
				// return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( password );

				// least 1 uppercase
				return /^(?=.*[A-Z])[A-Za-z\d$@$!%*?&]{8,32}$/.test(password);
			},
			// message: "Password failed validation, you must have at least 1 number, uppercase, and special character."
			message: "Password failed validation, you must have at least 1 uppercase."
		}
	},
	authority: {
		type: Number,
		default: 1 // normal user gets 1
	}

}, { timestamps: true });

// use a mongoose plugin for unique validation for userSchema
userSchema.plugin(uniqueVal, {message: "'{VALUE}' is already taken. Use another {PATH}!"});

// create a method to generate hash for the password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// before saving, call the generateHash method to hash the password
userSchema.pre('save', function(done) {
	this.password = this.generateHash(this.password);
	done();
});

mongoose.model('User', userSchema);
