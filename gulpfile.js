'use strict';

var directory = "workdirectory";
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var del = require('del');
var debug = require('gulp-debug');


gulp.task('sass',function () {
  return gulp.src(directory+'/sass/**/*.scss')//, {
         // since: gulp.lastRun('sass')
     // })
  // .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/css'))
})
gulp.task('js',function () {
    return gulp.src(directory+'/js/*.*', {
            since: gulp.lastRun('js')
        })
        .pipe(debug({
            title: "js"
        }))
        .pipe(gulp.dest('public/js'))
})

gulp.task('assets', function() {
    return gulp.src(directory+'/index.html', {
            since: gulp.lastRun('assets')
        })
        .pipe(debug({
            title: "assets"
        }))
        .pipe(gulp.dest('public'))
})
gulp.task('css', function() {
    return gulp.src(directory+'/css/*.css', {
            since: gulp.lastRun('css')
        })
        .pipe(debug({
            title: "css"
        }))
        .pipe(gulp.dest('public/css'))
})
gulp.task('img',function () {
    return gulp.src(directory+'/img/*.*', {
            since: gulp.lastRun('img')
        })
        .pipe(debug({
            title: "img"
        }))
        .pipe(gulp.dest('public/img'))
})

gulp.task('clean', function() {
    return del('public');
});
gulp.task('build', gulp.series('clean','assets','sass','css','js','img'))

gulp.task('watch',function () {
  gulp.watch(directory+'/sass/**/*.scss', gulp.series('sass'));
  gulp.watch(directory+'/css/**/*.css', gulp.series('css'));
})
gulp.task('serve', function() {
    browserSync.init({
        server: 'public',
        notify: {
    styles: {
        top: 'auto',
        bottom: '0',
        margin: '0px',
        padding: '5px',
        position: 'fixed',
        fontSize: '10px',
        zIndex: '9999',
        borderRadius: '5px 0px 0px',
        color: 'white',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'rgba(60, 197, 31, 0.498039)'
    }
}
    });
    gulp.watch('public').on('change', browserSync.reload);
})


gulp.task('run',
    gulp.series('build', gulp.parallel('watch','serve')));
