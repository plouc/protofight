/** @jsx React.DOM */

var React = require('react');
var d3    = require('d3');
var nv    = require('../../../lib/nvd3');
var protofight;

var ChartPieNode = React.createClass({
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



var EditableNodeMixin = require('../../../mixins/EditableNodeMixin.jsx');

var ChartPieEditNode = React.createClass({
    mixins: [EditableNodeMixin],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
            showLabel:  this.refs.showLabel.getDOMNode().value,
            showLegend: this.refs.showLegend.getDOMNode().value
        };
        console.log('saving chart pie node', settings);




        return false;
    },

    render: function () {
        var classes  = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        if (!this.props.node.settings) {
            this.props.node.settings = {};
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                </div>
                <div className="node--edit">
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
                            <span className="button button--warning" onClick={ this.onEditClick }>cancel</span>
                        </p>
                    </form>
                </div>
            </div>
            );
    }
});

exports.ChartPieEditNode = ChartPieEditNode;