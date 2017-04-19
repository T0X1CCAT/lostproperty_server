var assert = require('assert');
var Category = require('./category');

module.exports = {
  insertCategory: function (req, resp, db, callback) {
    console.log('tom');
    console.log(req.body);

    var categoryExists = false;
    //does the category already exist?
    
    var findPromise = Category.find(req.body).exec();

    findPromise.then(function(category){
        console.log('then ', category);
        if(category.length>0){
            console.log('return false 1');
            callback(true);
        }else{
            console.log('save');
            var newCategory = new Category(req.body);
            var savePromise = newCategory.save();
            console.log('save then', savePromise);
            savePromise.then(function(category){
                console.log('return true 1');
                callback(false);
            });
        }
    });

    
  },

  listCategories: function( db, callback){
    var categories = [];
    db.collection('categories').find().toArray(
        function(err, results){
            callback(results);
        }  
    );
   
   }

};   
