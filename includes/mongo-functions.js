var assert = require('assert');
var Category = require('./category');
var Item = require('./item');

module.exports = {
  insertCategory: function (req, resp, db, callback) {
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
  insertItem: function(req,resp, db, callback){
        var newItem = new Item(req.body);
        newItem.listedDate = new Date();
        var savePromise = newItem.save();
        console.log('save then', savePromise);
        savePromise.then(function(category){
            callback();
        });  
  },
  listCategories: function( db, callback){
    var categories = [];
    db.collection('categories').find().sort({name_case_insensitive:1}).toArray(
        function(err, results){
            callback(results);
        }  
    );
   
   }

};   
