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
var ctrlLoggedIn = require('../controllers/loggedInCtrl');
var ctrlCategory = require('../controllers/categoryCtrl');
var ctrlItem = require('../controllers/itemCtrl');

router.get('/api/category', ctrlCategory.getCategoryList);


router.post('/api/category', auth, ctrlCategory.addCategory);
router.post('/api/place', auth, ctrlItem.addItem);
router.post('/api/updateItem', auth, ctrlItem.updateItem);


router.post('/api/itemLocated', auth, ctrlItem.itemLocated);
router.get('/api/place', auth, ctrlItem.getItem);
router.post('/api/findItem', ctrlItem.findItems);//no authentication required
router.post('/api/deleteItem', auth, ctrlItem.deleteItem);

// profile
//router.get('/api/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/api/register', ctrlAuth.register);
router.post('/api/login', ctrlAuth.login);

// router.get('/*', function(req, res){
//   console.log('req * ');
//   res.sendFile('../../../public/index.html');
// });

module.exports = router;