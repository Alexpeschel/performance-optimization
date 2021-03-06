"use strict";

var  gulp = require('gulp'),
   rename = require('gulp-rename'),
     sass = require('gulp-sass'),
     maps = require('gulp-sourcemaps'),
      del = require('del'),
   useref = require('gulp-useref'),
   gulpif = require('gulp-if'),
minifyCss = require('gulp-clean-css'),
 imagemin = require('gulp-imagemin'),
   sprity = require('sprity');

var options = {
    src: 'src',
    dist: 'dist'
};

gulp.task('compileSass', function() {
  return gulp.src(options.src + "/scss/main.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/css'));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
});

gulp.task('uncss', function () {
    return gulp.src(options.src + '/css/main.css')
        .pipe(uncss({
            html: [options.src + '/index.html']
        }))
        .pipe(gulp.dest(options.src + '/css/out'));
});

gulp.task('jpgs', function() {
    return gulp.src(options.src + '/img/**/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(options.dist + '/img'));
});

gulp.task('clean', function() {
  del(['optimization-testing/public', 'css/main.css*']);
});

gulp.task('html', ['compileSass'], function() {
  return gulp.src(options.src + '/index.html')
      .pipe(useref())
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest(options.dist));
});

gulp.task('sprites', function () {
  return sprity.src({
    src: './src/img/avatars/*.jpg',
    style: './src/css/sprite.css',
  })
  .pipe(gulpif('*.jpg', gulp.dest('./src/img/avatars'), gulp.dest('./src/css')))
});

gulp.task("build", ['compileSass'], function() {
  return gulp.src(["css/main.css", "index.html", "img/**/*"], { base: './'})
             .pipe(gulp.dest(options.dist));
});

gulp.task("serve", ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
