
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itemSchema = new Schema({
  itemName: String,
  itemDescription: String,
  itemCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
  itemLocation: String,
  itemDate: Date,
  listedDate: Date,
  itemTime: String,
  itemLostOrFound: String,
  user:{type:Schema.Types.ObjectId, ref:'User'},
  located:Boolean //it has been found
});

// the schema is useless so far
// we need to create a model using it
var Item = mongoose.model('Item', itemSchema);

// make this available to our users in our Node applications
module.exports = Item;