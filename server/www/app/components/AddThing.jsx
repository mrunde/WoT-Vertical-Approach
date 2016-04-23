// Required modules
var React = require('react');
var actions = require('../actions/ThingActions');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			description: '',
			location: ''
		}
	},
	addThing: function(e) {
		e.preventDefault();
		actions.addThing(this.state);
	},
	handleInputChange: function(e) {
		e.preventDefault();
		var name = e.target.name;
		var state = this.state;
		state[name] = e.target.value;
		this.setState(state);
	},
	render: function() {
		return(
			<form className="form" onSubmit={ this.addThing }>
				<div className="form-group">
					<label className="control-label" htmlFor="description">Description:</label>
					<input type="text" className="form-control" id="description" name="description" value={ this.state.description } onChange={ this.handleInputChange } placeholder="Description" />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="location">Thing Location</label>
					<input type="text" className="form-control" id="location" name="location" value={ this.state.location } onChange={ this.handleInputChange } placeholder="Thing Location" />
				</div>
				<div className="form-group">
					<button className="btn" type="submit">Add Thing</button>
				</div>
			</form>
		)
	}
});