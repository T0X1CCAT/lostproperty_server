var assert = require('assert');
var Category = require('./category');
var User = require('./user');
var Item = require('./item');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL);
//mongoose.connect('mongodb://localhost/lostproperty');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errro...'));

db.once('open', function callback(){
  console.log('lost property db opened');
});


module.exports = {
  insertCategory: function (req, resp, callback) {
    console.log('tom');
    console.log(req.body);

    var categoryExists = false;
    //does the category already exist?
    
    var findPromise = Category.find({'name_case_insensitive': req.body.name.toLowerCase()}).exec();

    findPromise.then(function(category){
        console.log('then ', category);
        if(category.length>0){
            callback(true);
        }else{
            console.log('save');
            var newCategory = new Category({'name': req.body.name, 'name_case_insensitive': req.body.name.toLowerCase()});
            var savePromise = newCategory.save();
            console.log('save then', savePromise);
            savePromise.then(function(category){
                callback(false);
            });
        }
    });

    
  },
  insertItem: function(req,resp, callback){
        var newItem = new Item(req.body);
        newItem.listedDate = new Date();
        var savePromise = newItem.save();
        console.log('save then', savePromise);
        savePromise.then(function(category){
            callback();
        });  
  },
  listCategories: function(  callback){
    var categories = [];
    db.collection('categories').find().sort({name_case_insensitive:1}).toArray(
        function(err, results){
            callback(results);
        }  
    );
   
   },
   findItems: function(req, resp, callback){
    
    var query = {
       
    };
    console.log('req.body.', req.body.data);
    if (req.body.data.itemName) {
        query.itemName =req.body.data.itemName;
    }

    if (req.body.data.itemCategory) {
        query.itemCategory =req.body.data.itemCategory;
    }

    if (req.body.data.itemDate) {
        query.itemDate =req.body.data.itemDate;
    }

    Item.find(query).populate('itemCategory').exec(function(err, results){
            callback(results);
        }
    );

    // db.collection('items').find({ 'itemName': req.body.itemName }).toArray(
    //     function(err, results){
    //         callback(results);
    //     }
    // );          
   }
   

};   
