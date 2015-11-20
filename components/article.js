var React = require('react');
var router = require('react-router');
var Link = router.Link;

var ArticlePreview = React.createClass({
    handleClick: function () {
        console.log('You clicked!');
    },

    render: function () {
        console.log('articlePreview ==== ');
        var self = this,
            articles = this.props.articles;

        return <ul>
            {articles.map(function (article, i) {
                var href = "/article/" + article._id;
                return <li key={i}>
                    <Link to={href}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                    </Link>
                </li>;
            })}
        </ul>
    }
});

var ArticleFull = React.createClass({
    handleClick: function () {
        console.log('You clicked!');
    },

    render: function () {
        console.log('articleFull ==== ');
        var self = this,
            article = this.props.article;

        return <div>
            <a className="article" onClick={self.handleClick}>
                <span className="title">Full view</span>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
            </a>
        </div>
    }
});


exports.ArticlePreview = ArticlePreview;
exports.ArticleFull = ArticleFull;