var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('scss', function () {
    return gulp.src('./scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./scss/'));
});

gulp.task('default',['scss'], function () {
    gulp.watch('./scss/*.scss', ['scss']);
});
