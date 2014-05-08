/** @jsx React.DOM */

var ContentContainerNode = React.createClass({
    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');
        return (
            <div>{ children }</div>
        );
    }
});