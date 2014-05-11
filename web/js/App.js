/** @jsx React.DOM */

var protofight;
$(document).ready(function () {
    protofight = new Protofight();

    React.renderComponent(<ProtofightApp app={ protofight }/>, $('._js_proto').get(0));
});