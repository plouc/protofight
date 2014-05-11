/** @jsx React.DOM */

var DataStaticJsonNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <pre>{ this.props.settings.content }</pre>
        );
    }
});