/** @jsx React.DOM */

var LayoutRowNode = React.createClass({
    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');

        return (
            <div className="grid__row">{ children }</div>
        );
    }
});