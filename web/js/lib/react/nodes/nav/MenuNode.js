/** @jsx React.DOM */

var NavMenuNode = React.createClass({
    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');
        return (
            <div className="menu">{ children }</div>
        );
    }
});