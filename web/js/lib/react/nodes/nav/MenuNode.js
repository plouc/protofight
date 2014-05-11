/** @jsx React.DOM */

var NavMenuNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');
        return (
            <div className="menu">{ children }</div>
        );
    }
});



var NavMenuEditNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'edit');

        return (
            <div className="node">
                <span class="node__title">{ this.props.node.name }</span>
                <div>{ children }</div>
            </div>
        );
    }
});