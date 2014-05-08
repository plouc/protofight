/** @jsx React.DOM */

var DataStaticJsonNode = React.createClass({
    render: function () {
        return (
            <pre>{ this.props.settings.content }</pre>
        );
    }
});