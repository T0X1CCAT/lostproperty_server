var express = require('express');
var mongoFunctions = require('../mongo-functions');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

//var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../authentication');

// profile
//router.get('/api/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/api/register', ctrlAuth.register);
router.post('/api/login', ctrlAuth.login);


router.get('/api/category', function(req, res){
  var categories = mongoFunctions.listCategories( 
    function(categories){
      res.json(categories);
    });
 
});
router.post('/api/category', (req, res) => {
  var ok={status:'ok'}; 
  
   mongoFunctions.insertCategory(req, res, function(exists){
    if (exists){
      ok = {status:'name_exists'};
      res.json(ok);
    }else{
      ok = {status:'ok'};
      res.json(ok);
    }

  });

});

router.post('/api/item', (req, res) => {
  var ok={status:'ok'}; 
  
   mongoFunctions.insertItem(req, res, function(){
    
      ok = {status:'ok'};
      res.json(ok);
  
  });

});

// router.get('/*', function(req, res){
//   console.log('req * ');
//   res.sendFile('../../../public/index.html');
// });

module.exports = router;