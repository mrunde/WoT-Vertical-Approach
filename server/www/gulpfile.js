// Required modules
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

// Gulp task to convert jsx files to js files and copy them into the "dist" directory
gulp.task('bundle', function() {
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
	return gulp.src(['app/index.html', 'app/lib/bootstrap-css/css/bootstrap.min.css', 'app/style.css'])
		.pipe(gulp.dest('app/dist'));
});

// End of gulp tasks
gulp.task('default', ['copy'], function() {
	console.log('Gulp completed...');
});