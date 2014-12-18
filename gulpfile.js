var gulp = require('gulp'),
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('js', function(){

	gulp.src('jquery.sprite.js')
	.pipe(uglify())
	.pipe(concat('jquery.sprite.min.js'))
	.pipe(gulp.dest('./dist'))
	.pipe(notify({ message: 'js minified' }));

});

gulp.task('default', ['js']);