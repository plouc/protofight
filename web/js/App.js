/** @jsx React.DOM */

'use strict';

var React         = require('react');
var ProtofightApp = require('./components/ProtofightApp.jsx');
var $             = require('jquery');

$(document).ready(function () {
    var protofight = require('./lib/Protofight').protofight();

    React.renderComponent(<ProtofightApp app={ protofight }/>, $('._js_proto').get(0));
});