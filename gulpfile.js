var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat');

gulp.task('scss', function () {
    return gulp.src('./scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./scss/'));
});

gulp.task('pack-js', function () { 
    gulp.src('./js/build/', {read: false})
        .pipe(clean());   
    return gulp.src(['./js/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('./js/build/'));
});

gulp.task('default',['scss', 'pack-js'], function () {
    gulp.watch('./scss/*.scss', ['scss']);
    gulp.watch('./js/*.js', ['pack-js']);
});
