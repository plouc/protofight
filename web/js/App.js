/** @jsx React.DOM */

'use strict';

var React         = require('react');
var $             = require('jquery');
var ProtofightApp = require('./core/components/ProtofightApp.jsx');
var Protofight    = require('./core/Protofight');

require('./nodes/ChartLine/index');
require('./nodes/ChartPie/index');
require('./nodes/DataJsonApiCall/index');
require('./nodes/DataStaticJson/index');
require('./nodes/ContentContainer/index');
require('./nodes/ContentMarkdown/index');
require('./nodes/ContentText/index');
require('./nodes/ContentCode/index');
require('./nodes/ContentPage/index');
require('./nodes/LayoutCell/index');
require('./nodes/LayoutRow/index');
require('./nodes/NavBreadcrumbs/index');
require('./nodes/NavMenu/index');

var NodeRegistry = require('./core/registry/NodeRegistry');


$(document).ready(function () {
    var protofight = new Protofight();

    React.renderComponent(<ProtofightApp app={ protofight }/>, $('._js_proto').get(0));
});