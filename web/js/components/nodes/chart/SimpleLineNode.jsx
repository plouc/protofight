/** @jsx React.DOM */

'use strict';

var React      = require('react');
var Protofight = require('../../../lib/Protofight');
var d3         = require('d3');
var nv         = require('../../../lib/nvd3');

var ChartSimpleLineNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    componentDidMount: function () {

        function sinAndCos() {
            var sin = [],sin2 = [],
                cos = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10)});
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Sine Wave', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: cos,
                    key: 'Cosine Wave',
                    color: '#2ca02c'
                },
                {
                    values: sin2,
                    key: 'Another sine wave',
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        }


        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                .margin({left: 100})            // Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  // We want nice looking tooltips and a guideline!
                .transitionDuration(350)        // how fast do you want the lines to transition?
                .showLegend(true)               // Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)                // Show the y-axis
                .showXAxis(true)                // Show the x-axis
            ;

            chart.xAxis // Chart x-axis settings
                .axisLabel('Time (ms)')
                .tickFormat(d3.format(',r'))
            ;

            chart.yAxis // Chart y-axis settings
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format('.02f'))
            ;

            var myData = sinAndCos();

            d3.select(this.getDOMNode())  // Select the <svg> element you want to render the chart in.
                .datum(myData)            // Populate the <svg> element with chart data...
                .call(chart)              // Finally, render the chart!
            ;

            // Update the chart when window resizes.
            nv.utils.windowResize(function() {
                chart.update();
            });

            return chart;
        }.bind(this));
    },
    render: function () {
        return (
            <svg />
        );
    }
});

exports.ChartSimpleLineNode = ChartSimpleLineNode;


var ChartSimpleLineEditNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            edit: false
        };
    },

    onEditClick: function () {
        this.setState({
            edit: !this.state.edit
        });
    },

    onSubmit: function (e) {
        console.log(e);
        e.preventDefault();
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
                    <form onSubmit={ this.onSubmit }>
                        <p>
                            <label>Margin left</label>
                            <input type="text" defaultValue={ this.props.node.settings.marginLeft } />

                            <label>Margin right</label>
                            <input type="text" defaultValue={ this.props.node.settings.marginRight } />
                        </p>
                        <p>
                            <label>Show X axis</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showXaxis } />

                            <label>Show Y axis</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showYaxis } />
                        </p>

                        <p>
                            <label>Use interactive guideline</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.useInteractiveGuideline } />
                        </p>
                        <p>
                            <label>Transition duration</label>
                            <input type="text" defaultValue={ this.props.node.settings.transitionDuration } />
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

exports.ChartSimpleLineEditNode = ChartSimpleLineEditNode;