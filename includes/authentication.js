var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log('in reg func');
  
  //check for duplicate email address
  User.findOne({ email: req.body.email }, function (err, dbUser) {
     if (err) {
      res.status(404).json(err);
      return;
    }
    // Return if user not found in database
    if (dbUser) {
      res.status(200).json({errorMessage: 'There is already an existing user with the email address '+req.body.email});  
      return;
    } 
  
    if(!dbUser){
      var user = new User();

      user.name = req.body.name;
      user.email = req.body.email;
      user.admin = false;

      user.setPassword(req.body.password);

      user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    }  
  });  
};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log('login process');
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      console.log('error on login', err);
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log('user found', user);
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      console.log('user not found');
      res.status(401).json(info);
    }
  })(req, res);

};