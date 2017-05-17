var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  email : String,
  hash: String,
  salt: String,
  admin: Boolean,
  dateCreated: Date
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};


userSchema.methods.generateJwt = function() {
  var now = moment();
  now.add(1,"h");
  
  console.log('gettime',now.valueOf() );
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    admin: this.admin,
    exp: parseInt(now.valueOf() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;