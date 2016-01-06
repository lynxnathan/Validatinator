'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const gconcat = require('gulp-concat');
const jasmine = require('gulp-jasmine-browser');

const MINIFIED_FILE_NAME = 'validatinator.min.js';
const JS_DEV_FILES = 'dev/js/**/*.js';
const JS_TEST_FILES = 'dev/tests/**/*.js';
const JS_BUILD_DIR = 'js/';

gulp.task('compress-js', () => {
    return gulp.src(JS_DEV_FILES)
               .pipe(gconcat(MINIFIED_FILE_NAME))
               .pipe(uglify().on('error', gutil.log))
               .pipe(gulp.dest(JS_BUILD_DIR));
});

gulp.task('test', () => {
    return gulp.src([JS_DEV_FILES, JS_TEST_FILES])
               .pipe(watch([JS_DEV_FILES, JS_TEST_FILES]))
               .pipe(jasmine.specRunner())
               .pipe(jasmine.server({port: 8888}));
});

gulp.task('core-watch', () => {
    gulp.watch(JS_DEV_FILES, ['compress-js']);
});

gulp.task('default', ['core-watch', 'compress-js']);
