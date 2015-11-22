var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  description : String
});

var _articles = [
  {
    _id : "1",
    title : "title 1",
    description : "Lorem ipsum 1"
  },
  {
    _id : "2",
    title : "title 2",
    description : "Lorem ipsum 2"
  },
  {
    _id : "3",
    title : "title 3",
    description : "Lorem ipsum 3"
  }
];

schema.statics.getArticles = function(id, callback) {

  Article.find({}).exec(function(err,docs){
    console.log('find');
    console.log(docs);
    callback(docs);
  });

};

schema.statics.getAll = function(cb) {
  return new Promise(function(resolve, reject) {
    resolve(_articles)
  });
};

schema.statics.getById = function(id) {
  return new Promise(function(resolve, reject) {

    var article = _articles.find(function(element, index, array){
      return element._id == id
    });

    resolve(article);
  });
};

module.exports = mongoose.model('Article', schema);