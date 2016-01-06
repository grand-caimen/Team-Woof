var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Q        = require('q');


var Schema = mongoose.Schema;
var questSchema = new Schema({
	name: String,
	description: String,
	tags: [], 
	time: Number,
	id: Number,
	city: String,
	address: String,
	cost: Number,
	image: String,
	rating: [Number],
	reviews: [String],
	steps: [{
		location: Schema.Types.Mixed,
		description: String,
		time: Number,
    	cost: Number,
    	number: Number
	  }]
});

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},
	experience: Number,
	createdQuests: [],
	completedQuests: [],
	xp: Number

});


userSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});



var Quest = mongoose.model('Quest', questSchema);
var User = mongoose.model('User', userSchema);

module.exports.Quest = Quest;
module.exports.User = User;
