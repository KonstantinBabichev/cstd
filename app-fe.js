import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link, IndexLink} from 'react-router'

import {ArticlePreview, ArticleFull} from './components/article.js';

console.info('CStD : FE started');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

const history = useBasename(createHistory)({
  basename: '/'
});

const ACTIVE = { color: 'red' }
class App extends React.Component {
  render() {
    console.log('App ==== Router');
    //var initialState = this.props.params.articles;
    //console.log(initialState);

    return (
        <div>
          <h1>APP!</h1>

          <ul>
            <li><Link      to="/"           activeStyle={ACTIVE}>Home</Link></li>
            <li><Link      to="/articles"   activeStyle={ACTIVE}>Articles</Link></li>
            <li><Link      to="/about"      activeStyle={ACTIVE}>About</Link></li>
          </ul>

          {this.props.children}
        </div>
    )
  }
}

var x = 0;
var validate = function (nextState, transition, callback) {
  console.log('onEnteronEnteronEnteronEnter');
  console.log(nextState.routes);
  if (x > 1) {
    //nextState.routes[0].initialState = null;
    nextState.routes[1].initialState = null;
  }

  x = x + 1;
  callback()
};

render((
    <Router history={history} onEnter={validate}>
      <Route path={'/'} component={App} onEnter={validate}>
        <Route path={'/articles'} component={ArticlePreview} initialState={initialState} onEnter={validate}/>
        <Route path={'/articles/:id'} component={ArticleFull} initialState={initialState} onEnter={validate}/>
      </Route>
    </Router>
), document.getElementById('react-app'));