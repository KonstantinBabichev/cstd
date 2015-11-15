var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  description : String
});

schema.statics.getArticles = function(id, callback) {

  Article.find({}).exec(function(err,docs){
    console.log('find');
    console.log(docs);
    callback(docs);
  });

};

module.exports = mongoose.model('Article', schema);