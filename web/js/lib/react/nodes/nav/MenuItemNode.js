/** @jsx React.DOM */

var NavMenuItemNode = React.createClass({
    render: function () {
        return (
            <span className="menu__item">
                <a href="#">{ this.props.node.name }</a>
            </span>
        );
    }
});