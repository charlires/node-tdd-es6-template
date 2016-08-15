var gulp = require("gulp"),
    util = require("gulp-util"),
    mocha = require("gulp-mocha")
    compiler = require("gulp-babel"),
    sourcemap = require("gulp-sourcemaps");
    header = require("gulp-header"),
    clean = require("gulp-clean"),

gulp.task("watch", function(){
  gulp.watch('src/**/*.js', ['test']);
});

gulp.task('test', ['clean','compile'], function(){
  return gulp.src("build/src/**/*.spec.js")
    .pipe(mocha());
});

gulp.task('compile',[], function(){
  return gulp.src('src/**/*.js')
    .pipe(header("require('source-map-support').install();"))
    .pipe(sourcemap.init())
    .pipe(compiler())
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/src"));
});

gulp.task('clean', function(){
  return gulp.src('build/src/*', {read: false})
    .pipe(clean());
});
