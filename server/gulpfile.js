// Required modules
var gulp   = require('gulp');
var del    = require('del');
var apidoc = require('gulp-apidoc');

// Gulp task to clean the "dist" directory
gulp.task('clean', function() {
	del(['app/docs/*']);
});

// Gulp task to build the API documentation
gulp.task('apidoc', ['clean'], function(done) {
	apidoc({
		src: "server/controllers/",
		dest: "app/docs/",
		debug: true
	}, done);
});

// End of gulp tasks
gulp.task('default', ['apidoc'], function() {
	console.log('Gulp completed...');
});