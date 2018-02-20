// EXTERNAL DOCUMENT
//
// Name: Gulp Execution File
// Author: Matthias Willemsen
// Portfolio: https://mattwill.be
// Licence: MIT
// Version: 1.0#19FEB2018
// -- -- -- -- -- -- -- -- -- -- -- --
// Document: Gulp File [JS] - Node.JS
// Intended use: StuSync-Online
//

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');

gulp.task('serve', ['default'], () => {
  browserSync.init({ server: "./dist" });
  gulp.watch('src/*.html', () => {gulp.src('*.html').pipe(gulp.dest('dist')).on('change', browserSync.reload)});
  gulp.watch('src/scss/*.scss', () => {gulp.src('scss/*.scss').pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write('./maps')).pipe(gulp.dest('dist/css')).pipe(browserSync.stream())});
  gulp.watch('src/img/*', () => {gulp.src('img/*').pipe(gulp.dest('dist/img'))});
  gulp.watch('src/js/*.js', () => {gulp.src('js/*.js').pipe(babel({presets: ['env']})).pipe(gulp.dest('dist/js')).on('change', browserSync.reload)});
  gulp.watch('src/ts/*.ts', () => {gulp.src('ts/*.ts').pipe(ts({noImplicitAny: true})).pipe(babel({presets: ['env']})).pipe(gulp.dest('dist/js')).on('change', browserSync.reload)});
});

gulp.task('default', () => {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
  gulp.src('src/scss/*.scss').pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write('./maps')).pipe(gulp.dest('dist/css'));
  gulp.src('src/img/*').pipe(gulp.dest('dist/img'));
  gulp.src('src/js/*.js').pipe(babel({presets: ['env']})).pipe(gulp.dest('dist/js'));
  gulp.src('src/ts/*.ts').pipe(ts({noImplicitAny: true})).pipe(babel({presets: ['env']})).pipe(gulp.dest('dist/js'));
});

gulp.task('build', () => {
  gulp.src('src/*.html').pipe(gulp.dest('build'));
  gulp.src('src/scss/*.scss').pipe(sass()).pipe(gulp.dest('build/css'));
  gulp.src('src/img/*').pipe(imagemin()).pipe(gulp.dest('build/img'));
  gulp.src('src/js/*.js').pipe(babel({presets: ['env']})).pipe(gulp.dest('build/js'));
  gulp.src('src/ts/*.ts').pipe(ts({noImplicitAny: true})).pipe(babel({presets: ['env']})).pipe(gulp.dest('build/js'));
});