//import React from "react";
var React = require('react');

//export default class AppHandler extends React.Component {
//  render() {
//    return <div>Hello App Handler</div>;
//  }
//}

var AppHandler = React.createClass({
  render: function () {
    return <div>Hello App Handler</div>;
  }
});

module.exports = AppHandler;