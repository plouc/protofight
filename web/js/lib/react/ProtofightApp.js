/** @jsx React.DOM */

var ProtofightApp = React.createClass({
    getInitialState: function () {
        return {
            currentNode: ''
        };
    },

    handleNodeClick: function (component, e) {
        this.props.app.mountNode(component.props.key)
            .done(function (node) {
                this.setState({
                    currentNode: node
                });
            }.bind(this));
    },

    render: function () {
        //ng-class="{ 'site-content--left-closed': !asideLeft, 'site-content--right-closed': !asideRight }"

        return (
            <div>
                <LeftPanel app={ this.props.app } nodeClickedHandler={ this.handleNodeClick } />
                <NodeView app={ this.props.app } node={ this.state.currentNode } />
                <RightPanel app={ this.props.app } />
            </div>
        );
    }
});



var LeftPanel = React.createClass({
    getInitialState: function () {
        return {
            nodes: []
        };
    },

    componentDidMount: function () {
        this.props.app.listNodes()
            .done(function (nodes) {
                this.setState({
                    nodes: nodes
                });
            }.bind(this));
    },

    render: function () {
        //ng-class="{ 'aside--left--closed': !asideLeft }"
        //{ 'fa-angle-left': asideLeft, 'fa-angle-right': !asideLeft }

        return (
            <aside className="aside aside--left">
                <h2>Nodes</h2>
                <span className="aside__toggle aside__toggle--left">
                    <i className="fa"></i>
                </span>
                <NodeMenu app={ this.props.app } nodes={ this.state.nodes } nodeClickedHandler={ this.props.nodeClickedHandler } />
            </aside>
        )
    }
});



var RightPanel = React.createClass({
    render: function () {
        //ng-class="{ 'aside--right--closed': !asideRight }"
        //{ 'fa-angle-left': !asideRight, 'fa-angle-right': asideRight }

        return (
            <aside className="aside aside--right">
                <h2>components</h2>
                <span className="aside__toggle aside__toggle--right">
                    <i className="fa"></i>
                </span>
                <NodeTypes app={ this.props.app } />
            </aside>
        );
    }
});



var NodeView = React.createClass({
    getInitialState: function () {
        return {
            viewMode: 'struct'
        };
    },

    handleClick: function (mode, e) {
        this.setState({
            viewMode: mode
        });
    },

    render: function () {
        var classes = 'site-content node-view--' + this.state.viewMode;

        var nodeStruct  = '';
        var nodePreview = '';
        var nodeRaw     = '';

        if (this.props.node && this.state.viewMode == 'struct') {
            nodeStruct  = this.props.app.getNodeComponent(this.props.node, 'edit');
        }

        if (this.props.node && this.state.viewMode == 'preview') {
            nodePreview = this.props.app.getNodeComponent(this.props.node, 'view');
        }

        if (this.props.node && this.state.viewMode == 'raw') {
            nodeRaw = JSON.stringify(this.props.node, '', 4);
        }

        return (
            <div className={ classes }>
                <div className="content-struct">{ nodeStruct }</div>
                <div className="content-preview">{ nodePreview }</div>
                <div className="content-raw">
                    <pre>{ nodeRaw }</pre>
                </div>
                <div className="switch-view">
                    <span onClick={ this.handleClick.bind(this, 'struct') }>
                        <i className="fa fa-sitemap"></i>
                        structure
                    </span>
                    <span onClick={ this.handleClick.bind(this, 'preview') }>
                        <i className="fa fa-eye"></i>
                        preview
                    </span>
                    <span onClick={ this.handleClick.bind(this, 'raw') }>
                        <i className="fa fa-code"></i>
                        raw
                    </span>
                </div>
            </div>
        );
    }
});