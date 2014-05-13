/** @jsx React.DOM */

'use strict';

var React         = require('react');
var Protofight    = require('./lib/Protofight');
var ProtofightApp = require('./components/ProtofightApp.jsx');
var $             = require('jquery');

$(document).ready(function () {
    var protofight = new Protofight();

    React.renderComponent(<ProtofightApp app={ protofight }/>, $('._js_proto').get(0));
});