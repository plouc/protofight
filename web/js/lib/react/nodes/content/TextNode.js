/** @jsx React.DOM */

var ContentTextNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <p>{ this.props.settings.content }</p>
        );
    }
});