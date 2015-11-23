var React = require('react');
var Link = require('react-router').Link;

console.log(123);

class ArticlePreview extends React.Component {
  constructor(props) {
    super(props);
    console.log('========== ArticlePreview constructor ==========');

    console.log('BE'); // BE
    console.log(props.params.articles); // BE
    console.log('FE'); // FE
    console.log(props.route.initialState); // FE
    console.log('props'); // props
    console.log(props);
    console.log('========== ArticlePreview constructor ==========');
    var articles = props.route.initialState || props.params.articles; // FE || BE

    this.state = {
      articles: articles
    };

    console.log(articles);
    if (!articles) {
      var self = this;
      var url = '/api/articles';

      console.log('========== ArticlePreview constructor Fetching ==========');
      fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (articles) {
            console.log('========== ArticlePreview constructor Fetched ==========');
            self.setState({articles: articles});
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
  }

  componentDidMount() {
    console.log('========== ArticlePreview componentDidMount ==========');
  }

  render() {
    console.log('========== ArticlePreview render ==========');
    if (!this.state || !this.state.articles) return null;

    var self = this,
        articles = this.props.articles || this.state.articles || this.props.params.articles;

    return <ul>
      {articles.map(function (article, i) {
        var href = "/articles/" + article._id;
        console.log(href);
        return <li key={i}>
          <Link to={href}>
            <h3 className="preview__title">{article.title}</h3>

            <p>{article.description}</p>
          </Link>
        </li>;
      })}
    </ul>
  }
}

class ArticleFull extends React.Component {
  constructor(props) {
    super(props);
    console.log('========== Article constructor ==========');
    if (this.state) {console.log(this.state.article);}
    console.log(props.params.article); // BE
    console.log(props.route.initialState); // FE
    console.log(props);
    console.log('========== Article constructor ==========');
    var article = props.route.initialState || props.params.article; // FE || BE

    this.state = {
      article: article
    };

    console.log(this.state.article);
    if (!article) {
      var self = this;
      var url = "/api/articles/" + this.props.params.id;

      console.log('========== Article constructor Fetching ==========');
      fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (article) {
            console.log('========== Article constructor Fetched ==========');
            self.setState({article: article});
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
  }

  componentDidMount() {
    console.log('========== Article componentDidMount ==========');
  }

  render() {
    console.log('========== ArticleFull render ==========');
    console.log(this.state);
    if (!this.state || !this.state.article) return null;
    console.log('========== ArticleFull render continued ==========');
    var self = this,
        article = this.props.article || this.state.article || this.props.params.article;

    console.log(article);
    console.log(44444);
    return (
        <div>
          <span className="title">Full view</span>

          <h1>{article.title}</h1>

          <p>{article.description}</p>
        </div>
    )
  }
}

exports.ArticlePreview = ArticlePreview;
exports.ArticleFull = ArticleFull;