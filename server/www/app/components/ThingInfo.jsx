// Required modules
var React = require('react');

// Required actions
var actions = require('../actions/ThingActions');

module.exports = React.createClass({
	deleteThing: function(e) {
		e.preventDefault();
		actions.deleteThing(this.props.info);
	},
	render: function() {
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
					{ this.props.info.description }
					<span className="pull-right text-uppercase delete-button" onClick={ this.deleteThing }>&times;</span>
				</div>
				<div className="panel-body">
					{ this.props.info.location }
				</div>
			</div>
		);
	}
});