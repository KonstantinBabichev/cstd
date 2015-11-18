import React from 'react';
import ReactDOM from 'react-dom';
import {HelloMessage} from './components/article.js';


(function() {
    var lrHost = location.protocol + '//' + location.hostname + ':34322';
    var s = document.createElement('script');
    s.async = true;
    s.setAttribute('src', lrHost + '/livereload.js?extra=capture-console');
    document.body.appendChild(s);
})();

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
ReactDOM.render(
    <HelloMessage articles={initialState}/>,
    document.getElementById('react-app')
);
