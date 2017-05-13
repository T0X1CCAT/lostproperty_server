
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports.loggedInPermissions = function(req, res) {

  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {
     console.log('payload id found', req.payload._id);
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};