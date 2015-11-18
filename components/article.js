var React = require('react');

var HelloMessage = React.createClass({
  handleClick: function () {
    console.log('You clicked!');
  },

  render: function () {
    var self = this,
        articles = this.props.articles;

    articles = articles.map(function (article, i) {
      var href = "/article/" + article._id;
      return <li key={i}>
        <div>hello</div>
        <a href={href} className="article" onClick={self.handleClick}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </a>
      </li>;
    });

    return <ul>
      {articles}
    </ul>
  }
});


exports.HelloMessage = HelloMessage;