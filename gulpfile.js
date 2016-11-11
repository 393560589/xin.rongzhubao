var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify');
    imageisux = require('gulp-imageisux');

gulp.task('lessIn',function(){
    gulp.src('less/less.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
})

gulp.task('commonless',function(){
    gulp.src('less/common.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
})

gulp.task('jsmin',function(){
    gulp.src('build/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})

gulp.task('img',function(){
    gulp.src('./img/*')
        .pipe(imageisux('./image',true))
})

gulp.task('watchLess',function(){
    gulp.watch('less/*.less',['lessIn','commonless'])
})