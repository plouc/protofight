/** @jsx React.DOM */

var React              = require('react');
var EditableNodeMixin  = require('../../mixins/EditableNodeMixin');
var LiveNodeMixin      = require('../../mixins/LiveNodeMixin');
var ContainerNodeMixin = require('../../mixins/ContainerNodeMixin');
var RemovableNodeMixin = require('../../mixins/RemovableNodeMixin');
var NodeMeta           = require('../../NodeMeta.jsx');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var d3                 = require('d3');
var nv                 = require('../../../lib/nvd3');

var ChartPieNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    componentDidMount: function () {
        nv.addGraph(function() {
            var chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true)
                .showLegend(false)
                .donut(true);

            d3.select(this.getDOMNode())
                .datum([
                    {
                        "label": "One",
                        "value" : 29.765957771107
                    } ,
                    {
                        "label": "Two",
                        "value" : 0
                    } ,
                    {
                        "label": "Three",
                        "value" : 32.807804682612
                    } ,
                    {
                        "label": "Four",
                        "value" : 196.45946739256
                    } ,
                    {
                        "label": "Five",
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label": "Six",
                        "value" : 98.079782601442
                    } ,
                    {
                        "label": "Seven",
                        "value" : 13.925743130903
                    } ,
                    {
                        "label": "Eight",
                        "value" : 5.1387322875705
                    }
                ])
                .transition().duration(1200)
                .call(chart);

            return chart;
        }.bind(this));
    },
    render: function () {
        return (
            <svg />
        );
    }
});
exports.ChartPieNode = ChartPieNode;



var ChartPieEditNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        EditableNodeMixin,
        RemovableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
            showLabel:  this.refs.showLabel.getDOMNode().value,
            showLegend: this.refs.showLegend.getDOMNode().value
        };

        return false;
    },

    render: function () {
        var classes = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        if (!this.props.node.settings) {
            this.props.node.settings = {};
        }

        var children = this.getChildrenNodes('edit');

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.props.node } app={ this.props.app } />
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                    <span className="button button--danger button--s" onClick={ this._onDeleteClick }>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <NodeMeta node={ this.state.node }/>
                    <form onSubmit={ this._onSubmit }>
                        <p>
                            <label>Show label</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showLabel } ref="showLabel" />
                        </p>
                        <p>
                            <label>Show legend</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showLegend } ref="showLegend" />
                        </p>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning" onClick={ this._onCancelEditClick }>cancel</span>
                        </p>
                    </form>
                </div>
                <div>{ children }</div>
            </div>
        );
    }
});
exports.ChartPieEditNode = ChartPieEditNode;