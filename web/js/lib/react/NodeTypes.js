/** @jsx React.DOM */

var NodeType = React.createClass({
    render: function () {
        return (
            <div>{ this.props.data.name }</div>
        );
    }
});

var NodeTypes = React.createClass({
    render: function () {
        var children = [];
        this.props.types.forEach(function (type) {
            children.push(<NodeType key={ type.type } data={ type }/>)
        });

        return (
            <div>{ children }</div>
        );
    }
});