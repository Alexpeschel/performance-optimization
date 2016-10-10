"use strict";

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task('compileSass', function() {
  return gulp.src("scss/main.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
  del(['optimization-testing/public', 'css/main.css*']);
});

gulp.task("build", ['compileSass'], function() {
  return gulp.src(["css/main.css", "index.html", "img/**/*"], { base: './'})
             .pipe(gulp.dest('optimization-testing/public'));
});

gulp.task("serve", ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
