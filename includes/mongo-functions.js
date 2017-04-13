var assert = require('assert');

module.exports = {
  insertCategory: function (req, resp, db) {
    console.log('tom');
    console.log(req.body);
    db.collection('categories').insertOne(
        req.body
    , function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the categories collection.");
    });

  }
};
