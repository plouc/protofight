/** @jsx React.DOM */

'use strict';

var React     = require('react');
var NodeTypes = require('./NodeTypes.jsx').NodeTypes;

var RightPanel = React.createClass({
    render: function () {
        //ng-class="{ 'aside--right--closed': !asideRight }"
        //{ 'fa-angle-left': !asideRight, 'fa-angle-right': asideRight }

        return (
            <aside className="aside aside--right">
                <h2>components</h2>
                <span className="aside__toggle aside__toggle--right">
                    <i className="fa"></i>
                </span>
                <NodeTypes app={ this.props.app } />
            </aside>
        );
    }
});

module.exports = RightPanel;