var Quest = require('./../models/quest.js');
var User = require('./../controllers/user-controller.js');

module.exports = {

  index: function (query) {
    Quest.find(query).then(function(quests){
      return res.send(quests);
    });
  },

  create: function (body) {
    Quest.find(body).then(function(quests){
      if (quests.length > 0) {
        res.send('An identical quest already exists');
      } else {
        var newQuest = new Quest(req.body);
        newQuest.save(function(err, result){
          if (err){
            console.log(err);
          }
          User.addQuest(req.body);
          return res.send(result);
        });
      }
    });
  }
}