// Required modules
var gulp       = require('gulp');
var del        = require('del');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var apidoc     = require('gulp-apidoc');

// Gulp task to clean the "dist" directory
gulp.task('clean', function() {
	del(['app/dist/*']);
});

// Gulp task to convert jsx files to js files and copy them into the "dist" directory
gulp.task('bundle', ['clean'], function() {
	return browserify({
		entries: './app/main.jsx',
		debug: true
	})
		.transform(reactify)
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('app/dist/js'))
});

// Gulp task to copy files into the "dist" directory
gulp.task('copy', ['bundle'], function() {
	return gulp.src([
			'app/index.html',
			'app/lib/bootstrap-css/css/bootstrap.min.css',
			'app/lib/bootstrap-css/css/bootstrap.min.css.map',
			'node_modules/font-awesome/**/*',
			'app/style.css'
		])
		.pipe(gulp.dest('app/dist'));
});

// Gulp task to build the API documentation
gulp.task('apidoc', ['copy'], function(done) {
	return apidoc({
		src: "server/controllers/",
		dest: "app/dist/docs/"
	}, done);
});

// End of gulp tasks
gulp.task('default', ['apidoc'], function() {
	console.log('Gulp completed...');
});