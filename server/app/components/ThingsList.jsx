// Required modules
var React = require('react');

// Required actions
var AddThing = require('./AddThing.jsx');

// Required components
var ThingInfo = require('./ThingInfo.jsx');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="col-md-6">
					<AddThing />
				</div>
				<div className="col-md-6">
					{
						this.props.things.map(function(thing, index) {
							return(
								<ThingInfo info={ thing } key={ 'thing' + index } />
							);
						})
					}
				</div>
			</div>
		);
	}
});