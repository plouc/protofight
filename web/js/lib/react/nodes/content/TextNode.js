/** @jsx React.DOM */

var ContentTextNode = React.createClass({
    render: function () {
        return (
            <p>{ this.props.settings.content }</p>
        );
    }
});