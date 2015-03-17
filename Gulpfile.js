'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  rework = require('gulp-rework'),
  inherit = require('rework-inherit'),
  vars = require('rework-vars'),
  imprt = require('rework-import'),
  reworkNPM = require('rework-npm'),
  autoprefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch'),
  babelify = require('babelify');


//register nodemon task
gulp.task('nodemon', function () {
  nodemon({ script: './bin/www', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});

gulp.task('watch', function() {
    var server = livereload();

    watch('./app/**/*.*' , function(file) {
        gulp.start('buildjs');
        server.changed(file.path);
    });
    watch( './css/**/*.css', function(file) {
        gulp.start('buildcss');
        server.changed(file.path);
    });

});
 

//lint js files
gulp.task('lint', function() {
    gulp.src(['*.js','routes/*.js', 'public/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('buildcss', function () {
    return gulp.src('./css/style.css')
        .pipe(rework(reworkNPM({ 
            shim: { 
                'purecss': 'build/pure.css'
            }}),
            vars(), 
            inherit(),
            imprt({
                path: './css/modules/'
            })
            )
        )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('buildjs', function () {
 
    return browserify({ entries:['./public/js/app/app.jsx'], debug: true })
        .transform(babelify.configure({
          experimental: false
        })) 
        .bundle()
        .on('error', function (e) {
            console.log('browserify error');
            console.log(arguments);
            throw e;
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js')) 
        .on('end', function () {
            console.log('ended');
        });
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['lint','nodemon', 'watch']);