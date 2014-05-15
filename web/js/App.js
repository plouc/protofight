/** @jsx React.DOM */

'use strict';

var React         = require('react');
var ProtofightApp = require('./components/ProtofightApp.jsx');
var $             = require('jquery');
var Protofight    = require('./lib/Protofight');

$(document).ready(function () {
    var protofight = new Protofight();

    React.renderComponent(<ProtofightApp app={ protofight }/>, $('._js_proto').get(0));
});