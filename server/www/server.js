// Required Modules
var express	= require('express');
var path	= require('path');

// Starting Web Server
var app = express();
app.set('port', 1337);
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});
app.use(express.static(path.join(__dirname, '/public')));
