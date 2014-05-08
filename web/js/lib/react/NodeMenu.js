/** @jsx React.DOM */

var NodeMenu = React.createClass({
    render: function () {
        var children = [];
        this.props.nodes.forEach(function (node) {
            children.push(<NodeMenuItem key={ node._id } name={ node.name }/>)
        });
        return (
            <div>{ children }</div>
        );
    }
});

var NodeMenuItem = React.createClass({
    getInitialState: function() {
        return {
            active: false
        };
    },
    handleClick: function (e) {
        e.preventDefault();

        protofight.mountNode(this.props.key);

        this.setState({
            active: !this.state.active
        });
    },
    render: function () {
        var cx = React.addons.classSet;
        var classes = cx({
            'node-menu__item': true,
            '_is_active':      this.state.active
        });
        return (
            <a className={classes} onClick={this.handleClick}>{ this.props.name }</a>
        );
    }
});