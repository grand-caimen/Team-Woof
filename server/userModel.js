var User = require('./models.js').User;
var Quest = require('./models.js').Quest;
var Q    = require('q');
var jwt = require('jwt-simple');

module.exports = {

  userAddQuest: function(reqbody){
    console.log('userAddQuest has been called with ', reqbody);
    var creator = reqbody.creator
    var userUpdate = Q.nbind(User.update, User);
    var findOne = Q.nbind(Quest.findOne, Quest);
    findOne({ name: reqbody.name })
    .then(function(data){
      userUpdate({username: creator}, { $push: { createdQuests: data } });
    })
    .then(function(data){
      console.log('Added quest to user created quests ', data);
    })


  },

  addReview: function (req, res, next) {
    var inputUser = req.body.user;
    var inputReview = req.body.review;
    var inputRating = req.body.rating;
    var questName = req.body.questName;
    var userUpdate = Q.nbind(User.update, User);
    var update = Q.nbind(Quest.update, Quest);
    var findOne = Q.nbind(Quest.findOne, Quest);
    var sender;
    var xpToAdd = 0;
    update({ name: questName }, { $push: { reviews: { "review": inputReview, "username": inputUser } } })
      .then(function (data) {
        console.log('Review changes made confirmation', data);
      })
      .then(function (data) {
        update({ name: questName }, { $push: { rating: inputRating } }).then(function (data) {
          console.log('Rating chagnes made confirmation', data);
        });
      })
    .then(function (data) {
      findOne({ name: questName })
      .then(function (data) {
        sender = data;
        xpToAdd = data.time;
        userUpdate({ username: inputUser }, { $push: { completedQuests: data } });
      })
        .then(function (data) {
          console.log('User complete Quests changes made', data);
        })
      .then(function (data) {
        userUpdate({ username: inputUser }, { $inc: { xp: xpToAdd } });
      })
        .then(function (data) {
          console.log('XP modification made', data);
        })
      .then(function (data) {
        res.send(sender);
      })
    });
  },
 
  returnUser: function(req, res, next){
    var username = req.body.username;
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        res.status(200).send(user);
      })  
  },

  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          res.status(401).send( { message: 'Incorrect Username/Password'  });
        } else {
          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                res.status(401).send( { message: 'Incorrect Username/Password'  });
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          res.status(401).send( { message: 'Username Already Exists!'  });
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password,
            xp: 0
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        console.log('token from userModel: ', token);
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header if any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
