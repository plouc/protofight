/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../../core/mixins/LiveNodeMixin');
var d3            = require('d3');
var nv            = require('../../../core/nvd3');

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

module.exports = ChartPieNode;