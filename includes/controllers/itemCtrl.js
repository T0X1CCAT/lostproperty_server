
var mongoose = require('mongoose');
var User = mongoose.model('User');
var mongoFunctions = require('../mongo-functions');

module.exports.addItem = function(req, res) {

  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {
    var ok={status:'ok'}; 
    User.findById(req.payload._id
        , function(err, user) {
            mongoFunctions.insertItem(req, res, user, function(){
              
                ok = {status:'ok'};
                res.json(ok);
            
            });

      });    
  }
};

module.exports.updateItem = function(req, res) {

  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {
    var ok={status:'ok'}; 
    console.log('update item', req.body);
    mongoFunctions.updateItem(req, res, function(){
      
        ok = {status:'ok'};
        res.json(ok);
    
    });

  }
};

module.exports.getItem = function(req, res){


  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {
    mongoFunctions.findItem(req, res, 
      function(item){
        console.log('item is ', item);
          res.json(item);
      }
    );
    
  }

   
}; 

module.exports.deleteItem = function(req, res){


  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {

    //load user and make sure admin user
    User.findById(req.payload._id
        , function(err, user) {
            if(user.admin === true){
              mongoFunctions.deleteItem(req, res, function(){
                
                  ok = {status:'ok'};
                  res.json(ok);
              
              });
            }else{
              res.status(401).json({
                "message" : "UnauthorizedError: not admin profile"
              });
            }  

      });    
    
  }

   
}; 

module.exports.itemLocated = function(req, res){


  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {

    //load user and make sure admin user
    User.findById(req.payload._id
        , function(err, user) {
            if(user.admin === true){
              mongoFunctions.updateItemLocated(req, res, function(){
                
                  ok = {status:'ok'};
                  res.json(ok);
              
              });
            }else{
              res.status(401).json({
                "message" : "UnauthorizedError: not admin profile"
              });
            }  

      });    
    
  }

   
}; 


module.exports.findItems = function(req, res){


    
  mongoFunctions.findItems(req, res, 
      function(items){
          res.json(items);
      });
  

   
}; 
