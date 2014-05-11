/** @jsx React.DOM */

var LayoutCellNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');
        var classes  = 'grid__cell grid__cell--' + this.props.node.settings.columns;

        return (
            <div className={ classes }>{ children }</div>
        );
    }
});



var LayoutCellEditNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            edit: false
        };
    },

    handleSubmit: function () {
        return false;
    },

    handleEditClick: function () {
        this.setState({
            edit: !this.state.edit
        });
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'edit');

        var classes  = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <span className="button button--s" onClick={ this.handleEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <form onSubmit={ this.handleSubmit }>
                        <p>
                            <label>Columns</label>
                            <input type="text" defaultValue={ this.props.node.settings.columns } ref="columns" />
                        </p>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning">cancel</span>
                        </p>
                    </form>
                </div>
                <div>{ children }</div>
            </div>
        );
    }
});