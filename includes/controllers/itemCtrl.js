
var mongoose = require('mongoose');
var User = mongoose.model('Item');
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
    
    mongoFunctions.insertItem(req, res, function(){
      
        ok = {status:'ok'};
        res.json(ok);
    
    });

   
  }
};

module.exports.findItems = function(req, res){


    
  mongoFunctions.findItems(req, res, 
      function(items){
          res.json(items);
      });
  

   
}; 
