const gulp = require('gulp'),
      openURL = require('open'),
      $ = require('gulp-load-plugins')(),
      rimraf = require('rimraf'),
      runSequence = require('run-sequence'),
      gutil = require('gulp-util'),
      cors = require('cors');
/**
 * Defining all required directories 
 */
const app = {
        src: 'src',
        lib: 'lib',
        dist: 'dist',
        temp: 'temp'
}


/**
 * Definiting all path variables
 */
const paths = {
    scripts: app.src + '/**/*.js',
    index: app.src + '/index.html'
}


/**
 * Clean Tasks
 */

 gulp.task('clean:dist', function(cb){
    rimraf('./' + app.dist, cb)
 });

 /**
  * Copy Tasks
  */
  gulp.task('copy:template', function(){
    gulp.src([app.src + '/**/*.html', '!' + app.src + '/index.html'])
    .pipe(gulp.dest(app.dist))
  });

  gulp.task('copy', ['copy:template']);

  /**
   * Client build
   */
gulp.task('client:build', function(){
    let jsFilter = $.filter([app.src + '/**/*.js'], {restore: true})

    return gulp.src(paths.index)
           .pipe($.useref())
           .pipe(jsFilter)
        //    .pipe($.babel({
        //     presets: ['es2015']
        //     }))
           .pipe($.uglify())
           .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
           .pipe(jsFilter.restore)
           .pipe(gulp.dest(app.dist))
});

   //Main build task
 gulp.task('build',['clean:dist'], function(){
     runSequence(['copy', 'client:build']);
 })

/**
 * Watch tasks
 */

 gulp.task('watch', function(){
        $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe($.connect.reload())
 });

 /**
  * Serve
  */

  gulp.task('start:client', ['start:server'], function(){
    openURL('http://localhost:9000/src/');
  })
gulp.task('start:server',function(){
    $.connect.server({
        root: '.',
        livereload: true,
        port: 9000,
        middleware: function() {
            return [cors()];
        }
    })
})
  gulp.task('serve', function(cb){
        runSequence(['start:client', 'watch'], cb)
  })

  gulp.task('serve:prod', function () {
    $.connect.server({
        root: [app.dist],
        livereload: true,
        port: 9001
    });
});