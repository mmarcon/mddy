var gulp = require('gulp');
var jshint = require("gulp-jshint");
var sass = require('gulp-sass');

var paths = {
    js: [
        'lib/**/*.js',
        'index.js',
        'bin/**/*.js'
    ],
    sass: [
        'static/scss/**/*.scss'
    ]
};

gulp.task('sass', function () {
    gulp.src('./static/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./static/css'));
});

gulp.task('hint', function() {
    gulp.src(paths.js)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('build', ['hint', 'sass']);

gulp.task('default', ['build']);
