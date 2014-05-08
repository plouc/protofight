/** @jsx React.DOM */

var LayoutCellNode = React.createClass({
    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');
        var classes  = 'grid__cell grid__cell--' + this.props.node.settings.columns;

        return (
            <div className={ classes }>{ children }</div>
        );
    }
});